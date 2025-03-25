/* imports */
import mongoose from 'mongoose';
import 'reflect-metadata';
import * as semver from 'semver';
import {
  assertion,
  assertionIsClass,
  getMergedModelOptions,
  getName,
  isCachingEnabled,
  isGlobalCachingEnabled,
  isNullOrUndefined,
  mapModelOptionsToNaming,
  warnNotMatchingExisting,
} from './internal/utils';

// using "typeof process", because somehow js gives a ReferenceError when using "process === undefined" in browser
/* istanbul ignore next */
if (typeof process !== 'undefined' && !isNullOrUndefined(process?.version) && !isNullOrUndefined(mongoose?.version)) {
  // for usage on client side
  /* istanbul ignore next */
  if (semver.lt(mongoose?.version, '8.13.0')) {
    throw new Error(`Please use mongoose 8.13.0 or higher (Current mongoose: ${mongoose.version}) [E001]`);
  }

  /* istanbul ignore next */
  if (semver.lt(process.version.slice(1), '16.20.1')) {
    throw new Error('You are using a NodeJS Version below 16.20.1, Please Upgrade! [E002]');
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
  IBuildSchemaOptions,
} from './types';
import { CacheDisabledError, ExpectedTypeError, FunctionCalledMoreThanSupportedError, NotValidModelError } from './internal/errors';

parseENV(); // call this before anything to ensure they are applied (including before defaultclasses)

/* exports */
// export the internally used "mongoose", to not need to always import it
export { mongoose, setGlobalOptions };
export { setLogLevel, LogLevels } from './logSettings';
export * from './prop';
export * from './hooks';
export * from './plugin';
export * from './indexes';
export * from './searchIndexes';
export * from './modelOptions';
export * from './queryMethod';
export * from './typeguards';
export * as defaultClasses from './defaultClasses';
export * as errors from './internal/errors';
export * as types from './types';
// the following types are re-exported (instead of just in "types") because they are often used types
export { DocumentType, Ref, ReturnModelType, SubDocumentType, ArraySubDocumentType };
export { getClass, getName } from './internal/utils';
export { Severity, PropType } from './internal/constants';

/**
 * Build a Model From a Class
 * @param cl The Class to build a Model from
 * @param options Overwrite Options, like for naming or general SchemaOptions the class gets compiled with
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
  const overwriteNaming = mapModelOptionsToNaming(rawOptions); // use "rawOptions" instead of "mergedOptions" to consistently differentiate between classes & models

  const mergedOptions = getMergedModelOptions(rawOptions, cl);
  const name = getName(cl, overwriteNaming);

  if (isCachingEnabled(mergedOptions.options?.disableCaching) && models.has(name)) {
    return models.get(name) as ReturnModelType<U, QueryHelpers>;
  }

  const modelFn =
    mergedOptions?.existingConnection?.model.bind(mergedOptions.existingConnection) ??
    mergedOptions?.existingMongoose?.model.bind(mergedOptions.existingMongoose) ??
    mongoose.model.bind(mongoose);

  const compiledModel: mongoose.Model<any> = modelFn(name, buildSchema(cl, mergedOptions));

  return addModelToTypegoose<U, QueryHelpers>(compiledModel, cl, {
    existingMongoose: mergedOptions?.existingMongoose,
    existingConnection: mergedOptions?.existingConnection,
    disableCaching: mergedOptions.options?.disableCaching,
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
  assertion(isGlobalCachingEnabled(), () => new CacheDisabledError('getModelWithString'));

  return models.get(key) as any;
}

/**
 * Generates a Mongoose schema out of class props, iterating through all parents
 * @param cl The Class to build a Schema from
 * @param options Overwrite Options, like for naming or general SchemaOptions the class gets compiled with
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
  options?: IModelOptions
): mongoose.Schema<DocumentType<InstanceType<U>>> {
  assertionIsClass(cl);

  const overwriteNaming = mapModelOptionsToNaming(options);
  logger.debug('buildSchema called for "%s"', getName(cl, overwriteNaming));

  // dont re-run the merging if already done so before (like in getModelForClass)
  const mergedOptions = getMergedModelOptions(options, cl);

  let sch: mongoose.Schema<DocumentType<InstanceType<U>>> | undefined = undefined;
  /** Parent Constructor */
  let parentCtor = Object.getPrototypeOf(cl.prototype).constructor;
  /* This array is to execute from lowest class to highest (when extending) */
  const parentClasses: [AnyParamConstructor<any>, IBuildSchemaOptions][] = [];
  /** Options for the next lower class that gets unshifted to {@link parentClasses} (ie the super-class) */
  let superOptions: IBuildSchemaOptions = {};

  // first run for some options based on input class options (if any), because the while-loop is for the prototypes (if any)
  {
    // get new options because "mergedOptions" is merged with lower options, but "upperOptions" requires the "own" version, if any
    const mergedOwnOptions = getMergedModelOptions(options, cl, true);
    applySuperOptions(superOptions, mergedOwnOptions);
  }

  // iterate trough all parents to the lowest class
  while (parentCtor?.name !== 'Object') {
    // add lower classes (when extending) to the front of the array to be processed first
    parentClasses.unshift([parentCtor, superOptions]);

    // clone object, because otherwise it will affect the upper classes too because the same reference is used
    superOptions = { ...superOptions };

    {
      // only get the own metadata, possible because "upperOptions" at the moment only requires the "own" metadata
      const ropt: IModelOptions = Reflect.getOwnMetadata(DecoratorKeys.ModelOptions, parentCtor) ?? {};

      applySuperOptions(superOptions, ropt);
    }

    // set next parent
    parentCtor = Object.getPrototypeOf(parentCtor.prototype).constructor;
  }

  // iterate and build class schemas from lowest to highest (when extending classes, the lower class will get build first) see https://github.com/typegoose/typegoose/pull/243
  for (const [parentClass, extraOptions] of parentClasses) {
    // extend schema
    sch = _buildSchema(parentClass, sch!, mergedOptions, false, undefined, extraOptions);
  }

  // get schema of current model
  sch = _buildSchema(cl, sch, mergedOptions, true, overwriteNaming);

  return sch;
}

/**
 * Apply options to "superOptions" object, based on "modelOptions"
 * @param superOptions The "superOptions" object
 * @param modelOptions The Model Options of the current class
 */
function applySuperOptions(superOptions: IBuildSchemaOptions, modelOptions: IModelOptions) {
  // only affect options of lower classes, not the class the options are from
  if (modelOptions.options?.disableLowerIndexes) {
    superOptions.buildIndexes = false;
  }
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
  options?: { existingMongoose?: mongoose.Mongoose; existingConnection?: any; disableCaching?: boolean }
) {
  // run this before the assertions below, for compatability with mongoose browser (browser version does not have "mongoose.Model")
  // see https://github.com/typegoose/typegoose/issues/981
  if (!isCachingEnabled(options?.disableCaching)) {
    logger.info('Caching is not enabled, skipping adding');

    return model as ReturnModelType<U, QueryHelpers>;
  }

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
  assertion(isGlobalCachingEnabled(), () => new CacheDisabledError('deleteModelWithClass'));

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
  assertion(isGlobalCachingEnabled(), () => new CacheDisabledError('deleteModelWithClass'));

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
  from: mongoose.Model<any, any, any, any>,
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
  from: mongoose.Model<any, any, any, any>,
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
  from: mongoose.Model<any, any, any, any>,
  cl: U,
  value?: string,
  options?: IModelOptions
): ReturnModelType<U, QueryHelpers>;
export function getDiscriminatorModelForClass<U extends AnyParamConstructor<any>, QueryHelpers = BeAnObject>(
  from: mongoose.Model<any, any, any, any>,
  cl: U,
  value_or_options?: string | IModelOptions,
  options?: IModelOptions
) {
  assertion(isModel(from), new NotValidModelError(from, 'getDiscriminatorModelForClass.from'));
  assertionIsClass(cl);

  const value = typeof value_or_options === 'string' ? value_or_options : undefined;
  const rawOptions = typeof value_or_options !== 'string' ? value_or_options : typeof options === 'object' ? options : {};
  const overwriteNaming = mapModelOptionsToNaming(rawOptions); // use "rawOptions" instead of "mergedOptions" to consistently differentiate between classes & models
  const mergedOptions = getMergedModelOptions(rawOptions, cl);
  const name = getName(cl, overwriteNaming);

  if (isCachingEnabled(mergedOptions.options?.disableCaching) && models.has(name)) {
    return models.get(name) as ReturnModelType<U, QueryHelpers>;
  }

  if (mergedOptions.existingConnection && mergedOptions.existingConnection !== from.db) {
    warnNotMatchingExisting(from.modelName, getName(cl), 'existingConnection');
  }
  if (mergedOptions.existingMongoose && mergedOptions.existingMongoose !== from.base) {
    warnNotMatchingExisting(from.modelName, getName(cl), 'existingMongoose');
  }

  const sch: mongoose.Schema<any> = buildSchema(cl, mergedOptions);

  const mergeHooks = mergedOptions.options?.enableMergeHooks ?? false;
  // Note: this option is not actually for "merging plugins", but if "true" it will *overwrite* all plugins with the base-schema's
  const mergePlugins = mergedOptions.options?.enableMergePlugins ?? false;

  const discriminatorKey = sch.get('discriminatorKey');

  if (!!discriminatorKey && sch.path(discriminatorKey)) {
    (sch.paths[discriminatorKey] as any).options.$skipDiscriminatorCheck = true;
  }

  const compiledModel = from.discriminator(name, sch, {
    value: value ? value : name,
    mergeHooks,
    mergePlugins,
  });

  return addModelToTypegoose<U, QueryHelpers>(compiledModel, cl, {
    disableCaching: mergedOptions.options?.disableCaching,
  });
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
