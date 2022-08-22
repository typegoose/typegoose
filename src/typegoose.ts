/* imports */
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import * as semver from 'semver';
import { assertion, assertionIsClass, getName, isNullOrUndefined, mergeMetadata, mergeSchemaOptions } from './internal/utils';

/* istanbul ignore next */
if (!isNullOrUndefined(process?.version) && !isNullOrUndefined(mongoose?.version)) {
  // for usage on client side
  /* istanbul ignore next */
  if (semver.lt(mongoose?.version, '6.5.0')) {
    throw new Error(`Please use mongoose 6.5.0 or higher (Current mongoose: ${mongoose.version}) [E001]`);
  }

  /* istanbul ignore next */
  if (semver.lt(process.version.slice(1), '12.22.0')) {
    throw new Error('You are using a NodeJS Version below 12.22.0, Please Upgrade! [E002]');
  }
}

import { parseENV, setGlobalOptions } from './globalOptions';
import { DecoratorKeys } from './internal/constants';
import { constructors, models } from './internal/data';
import { _buildSchema } from './internal/schema';
import { logger } from './logSettings';
import { isModel } from './typeguards';
import type {
  AnyParamConstructor,
  BeAnObject,
  DocumentType,
  IModelOptions,
  Ref,
  ReturnModelType,
  SubDocumentType,
  ArraySubDocumentType,
} from './types';
import { ExpectedTypeError, FunctionCalledMoreThanSupportedError, NotValidModelError } from './internal/errors';

/* exports */
// export the internally used "mongoose", to not need to always import it
export { mongoose, setGlobalOptions };
export { setLogLevel, LogLevels } from './logSettings';
export * from './prop';
export * from './hooks';
export * from './plugin';
export * from './index';
export * from './modelOptions';
export * from './queryMethod';
export * from './typeguards';
export * as defaultClasses from './defaultClasses';
export * as errors from './internal/errors';
export * as types from './types';
// the following types are re-exported (instead of just in "types") because they are often used types
export { DocumentType, Ref, ReturnModelType, SubDocumentType, ArraySubDocumentType };
export { getClassForDocument, getClass, getName } from './internal/utils';
export { Severity, PropType } from './internal/constants';

parseENV(); // call this before anything to ensure they are applied

/**
 * Build a Model From a Class
 * @param cl The Class to build a Model from
 * @param options Overwrite SchemaOptions (Merged with Decorator)
 * @returns The finished Model
 * @public
 * @example
 * ```ts
 * class ClassName {}
 *
 * const NameModel = getModelForClass(ClassName);
 * ```
 */
export function getModelForClass<U extends AnyParamConstructor<any>, QueryHelpers = BeAnObject>(cl: U, options?: IModelOptions) {
  assertionIsClass(cl);
  const rawOptions = typeof options === 'object' ? options : {};

  const mergedOptions: IModelOptions = mergeMetadata(DecoratorKeys.ModelOptions, rawOptions, cl);
  const name = getName(cl, rawOptions); // use "rawOptions" instead of "mergedOptions" to consistently differentiate between classes & models

  if (models.has(name)) {
    return models.get(name) as ReturnModelType<U, QueryHelpers>;
  }

  const model =
    mergedOptions?.existingConnection?.model.bind(mergedOptions.existingConnection) ??
    mergedOptions?.existingMongoose?.model.bind(mergedOptions.existingMongoose) ??
    mongoose.model.bind(mongoose);

  const compiledmodel: mongoose.Model<any> = model(name, buildSchema(cl, mergedOptions.schemaOptions, rawOptions));
  const refetchedOptions = (Reflect.getMetadata(DecoratorKeys.ModelOptions, cl) as IModelOptions) ?? {};

  if (refetchedOptions?.options?.runSyncIndexes) {
    // no async/await, to wait for execution on connection in the background
    compiledmodel.syncIndexes();
  }

  return addModelToTypegoose<U, QueryHelpers>(compiledmodel, cl, {
    existingMongoose: mergedOptions?.existingMongoose,
    existingConnection: mergedOptions?.existingConnection,
  });
}

/**
 * Get Model from internal cache
 * @param key Model's name key
 * @example
 * ```ts
 * class ClassName {}
 * getModelForClass(ClassName); // build the model
 * const NameModel = getModelWithString<typeof ClassName>("ClassName");
 * ```
 */
export function getModelWithString<U extends AnyParamConstructor<any>, QueryHelpers = BeAnObject>(
  key: string
): undefined | ReturnModelType<U, QueryHelpers> {
  assertion(typeof key === 'string', () => new ExpectedTypeError('key', 'string', key));

  return models.get(key) as any;
}

/**
 * Generates a Mongoose schema out of class props, iterating through all parents
 * @param cl The Class to build a Schema from
 * @param options Overwrite SchemaOptions (Merged with Decorator)
 * @param overwriteOptions Overwrite ModelOptions (aside from schemaOptions) (Not Merged with Decorator)
 * @returns Returns the Build Schema
 * @example
 * ```ts
 * class ClassName {}
 * const NameSchema = buildSchema(ClassName);
 * const NameModel = mongoose.model("Name", NameSchema);
 * ```
 */
export function buildSchema<U extends AnyParamConstructor<any>>(
  cl: U,
  options?: mongoose.SchemaOptions,
  overwriteOptions?: IModelOptions
): mongoose.Schema<DocumentType<InstanceType<U>>> {
  assertionIsClass(cl);

  logger.debug('buildSchema called for "%s"', getName(cl, overwriteOptions));

  const mergedOptions = mergeSchemaOptions(options, cl);

  let sch: mongoose.Schema<DocumentType<InstanceType<U>>> | undefined = undefined;
  /** Parent Constructor */
  let parentCtor = Object.getPrototypeOf(cl.prototype).constructor;
  /* This array is to execute from lowest class to highest (when extending) */
  const parentClasses: AnyParamConstructor<any>[] = [];

  // iterate trough all parents
  while (parentCtor?.name !== 'Object') {
    // add lower classes (when extending) to the front of the array to be processed first
    parentClasses.unshift(parentCtor);

    // set next parent
    parentCtor = Object.getPrototypeOf(parentCtor.prototype).constructor;
  }

  // iterate and build class schemas from lowest to highest (when extending classes, the lower class will get build first) see https://github.com/typegoose/typegoose/pull/243
  for (const parentClass of parentClasses) {
    // extend schema
    sch = _buildSchema(parentClass, sch!, mergedOptions, false);
  }

  // get schema of current model
  sch = _buildSchema(cl, sch, mergedOptions, true, overwriteOptions);

  return sch;
}

/**
 * Add a Class-Model Pair to the Typegoose Cache
 * This can be used to add custom Models to Typegoose, with the type information of "cl"
 * Note: no guarrantee that the type information is fully correct when used manually
 * @param model The Model to store
 * @param cl The Class to store
 * @param options Overwrite existingMongoose or existingConnection
 * @example
 * ```ts
 * class ClassName {}
 *
 * const schema = buildSchema(ClassName);
 * // modifications to the schema can be done
 * const model = addModelToTypegoose(mongoose.model("Name", schema), ClassName);
 * ```
 */
export function addModelToTypegoose<U extends AnyParamConstructor<any>, QueryHelpers = BeAnObject>(
  model: mongoose.Model<any>,
  cl: U,
  options?: { existingMongoose?: mongoose.Mongoose; existingConnection?: any }
) {
  const mongooseModel = options?.existingMongoose?.Model || options?.existingConnection?.base?.Model || mongoose.Model;

  assertion(model.prototype instanceof mongooseModel, new NotValidModelError(model, 'addModelToTypegoose.model'));
  assertionIsClass(cl);

  const name = model.modelName;

  assertion(
    !models.has(name),
    new FunctionCalledMoreThanSupportedError(
      'addModelToTypegoose',
      1,
      `This was caused because the model name "${name}" already exists in the typegoose-internal "models" cache`
    )
  );

  if (constructors.get(name)) {
    logger.info('Class "%s" already existed in the constructors Map', name);
  }

  models.set(name, model);
  constructors.set(name, cl);

  return models.get(name) as ReturnModelType<U, QueryHelpers>;
}

/**
 * Deletes a existing model so that it can be overwritten with another model
 * (deletes from mongoose.connection and typegoose models cache and typegoose constructors cache)
 * @param name The Model's mongoose name
 * @example
 * ```ts
 * class ClassName {}
 * const NameModel = getModelForClass(ClassName);
 * deleteModel("ClassName");
 * ```
 */
export function deleteModel(name: string) {
  assertion(typeof name === 'string', () => new ExpectedTypeError('name', 'string', name));

  logger.debug('Deleting Model "%s"', name);

  const model = models.get(name);

  if (!isNullOrUndefined(model)) {
    model.db.deleteModel(name);
  }

  models.delete(name);
  constructors.delete(name);
}

/**
 * Delete a model, with the given class
 * Same as "deleteModel", only that it can be done with the class instead of the name
 * @param cl The Class to delete the model from
 * @example
 * ```ts
 * class ClassName {}
 * const NameModel = getModelForClass(ClassName);
 * deleteModelWithClass(ClassName);
 * ```
 */
export function deleteModelWithClass<U extends AnyParamConstructor<any>>(cl: U) {
  assertionIsClass(cl);

  let name = getName(cl);

  if (!models.has(name)) {
    logger.debug(`Class "${name}" is not in "models", trying to find in "constructors"`);
    let found = false;

    // type "Map" does not have a "find" function, and using "get" would maybe result in the incorrect values
    for (const [cname, constructor] of constructors) {
      if (constructor === cl) {
        logger.debug(`Found Class in "constructors" with class name "${name}" and entered name "${cname}""`);
        name = cname;
        found = true;
      }
    }

    if (!found) {
      logger.debug(`Could not find class "${name}" in constructors`);

      return;
    }
  }

  return deleteModel(name);
}

/**
 * Build a Model from the given Class and add it as a discriminator onto "from"
 * @param from The Model to add the new discriminator model to
 * @param cl The Class to make a discriminator model from
 * @param options Overwrite ModelOptions (Merged with ModelOptions from class)
 * @example
 * ```ts
 * class Main {
 *   @prop({ ref: () => BaseDiscriminator })
 *   public discriminators?: Ref<BaseDiscriminator>;
 * }
 *
 * class BaseDiscriminator {
 *   @prop()
 *   public propertyOnAllDiscriminators?: string;
 * }
 *
 * class AnotherDiscriminator {
 *   @prop()
 *   public someValue?: string;
 * }
 *
 * const MainModel = getModelForClass(Main);
 *
 * const BaseDiscriminatorModel = getModelFroClass(BaseDiscriminator);
 * const AnotherDiscriminatorModel = getDiscriminatorModelForClass(BaseDiscriminatorModel, AnotherDiscriminator);
 * // add other discriminator models the same way as "AnotherDiscriminatorModel"
 * ```
 */
export function getDiscriminatorModelForClass<U extends AnyParamConstructor<any>, QueryHelpers = BeAnObject>(
  from: mongoose.Model<any, any>,
  cl: U,
  options?: IModelOptions
): ReturnModelType<U, QueryHelpers>;
/**
 * Build a Model from the given Class and add it as a discriminator onto "from"
 * @param from The Model to add the new discriminator model to
 * @param cl The Class to make a discriminator model from
 * @param value The Identifier to use to differentiate documents (default: cl.name)
 * @example
 * ```ts
 * class Main {
 *   @prop({ ref: () => BaseDiscriminator })
 *   public discriminators?: Ref<BaseDiscriminator>;
 * }
 *
 * class BaseDiscriminator {
 *   @prop()
 *   public propertyOnAllDiscriminators?: string;
 * }
 *
 * class AnotherDiscriminator {
 *   @prop()
 *   public someValue?: string;
 * }
 *
 * const MainModel = getModelForClass(Main);
 *
 * const BaseDiscriminatorModel = getModelFroClass(BaseDiscriminator);
 * const AnotherDiscriminatorModel = getDiscriminatorModelForClass(BaseDiscriminatorModel, AnotherDiscriminator);
 * // add other discriminator models the same way as "AnotherDiscriminatorModel"
 * ```
 */
export function getDiscriminatorModelForClass<U extends AnyParamConstructor<any>, QueryHelpers = BeAnObject>(
  from: mongoose.Model<any, any>,
  cl: U,
  value?: string
): ReturnModelType<U, QueryHelpers>;
/**
 * Build a Model from the given Class and add it as a discriminator onto "from"
 * @param from The Model to add the new discriminator model to
 * @param cl The Class to make a discriminator model from
 * @param value The Identifier to use to differentiate documents (default: cl.name)
 * @param options Overwrite ModelOptions (Merged with ModelOptions from class)
 * @example
 * ```ts
 * class Main {
 *   @prop({ ref: () => BaseDiscriminator })
 *   public discriminators?: Ref<BaseDiscriminator>;
 * }
 *
 * class BaseDiscriminator {
 *   @prop()
 *   public propertyOnAllDiscriminators?: string;
 * }
 *
 * class AnotherDiscriminator {
 *   @prop()
 *   public someValue?: string;
 * }
 *
 * const MainModel = getModelForClass(Main);
 *
 * const BaseDiscriminatorModel = getModelFroClass(BaseDiscriminator);
 * const AnotherDiscriminatorModel = getDiscriminatorModelForClass(BaseDiscriminatorModel, AnotherDiscriminator);
 * // add other discriminator models the same way as "AnotherDiscriminatorModel"
 * ```
 */
export function getDiscriminatorModelForClass<U extends AnyParamConstructor<any>, QueryHelpers = BeAnObject>(
  from: mongoose.Model<any, any>,
  cl: U,
  value?: string,
  options?: IModelOptions
): ReturnModelType<U, QueryHelpers>;
export function getDiscriminatorModelForClass<U extends AnyParamConstructor<any>, QueryHelpers = BeAnObject>(
  from: mongoose.Model<any, any>,
  cl: U,
  value_or_options?: string | IModelOptions,
  options?: IModelOptions
) {
  assertion(isModel(from), new NotValidModelError(from, 'getDiscriminatorModelForClass.from'));
  assertionIsClass(cl);

  const value = typeof value_or_options === 'string' ? value_or_options : undefined;
  const rawOptions = typeof value_or_options !== 'string' ? value_or_options : typeof options === 'object' ? options : {};
  const mergedOptions: IModelOptions = mergeMetadata(DecoratorKeys.ModelOptions, rawOptions, cl);
  const name = getName(cl, rawOptions); // use "rawOptions" instead of "mergedOptions" to consistently differentiate between classes & models

  if (models.has(name)) {
    return models.get(name) as ReturnModelType<U, QueryHelpers>;
  }

  const sch: mongoose.Schema<any> = buildSchema(cl, mergedOptions.schemaOptions, rawOptions);

  const discriminatorKey = sch.get('discriminatorKey');

  if (!!discriminatorKey && sch.path(discriminatorKey)) {
    (sch.paths[discriminatorKey] as any).options.$skipDiscriminatorCheck = true;
  }

  const model = from.discriminator(name, sch, value ? value : name);

  return addModelToTypegoose<U, QueryHelpers>(model, cl);
}

/**
 * Use this class if raw mongoose for a path is wanted
 * It is still recommended to use the typegoose classes directly
 * @see Using `Passthrough`, the paths created will also result as an `Schema` (since mongoose 6.0), see {@link https://github.com/Automattic/mongoose/issues/7181 Mongoose#7181}
 * @example
 * ```ts
 * class Dummy {
 *   @prop({ type: () => new Passthrough({ somePath: String }) })
 *   public somepath: { somePath: string };
 * }
 *
 * class Dummy {
 *   @prop({ type: () => new Passthrough({ somePath: String }, true) })
 *   public somepath: { somePath: string };
 * }
 * ```
 */
export class Passthrough {
  // this property has no types, because it can slightly differentiate than a normal mongoose schema (like being a direct array)
  public raw: any;
  public direct: boolean;

  /**
   * Use this like `new mongoose.Schema()`
   * @param raw The Schema definition
   * @param direct Directly insert "raw", instead of using "type" (this will not apply any other inner options)
   */
  constructor(raw: any, direct?: boolean) {
    this.raw = raw;
    this.direct = direct ?? false;
  }
}
