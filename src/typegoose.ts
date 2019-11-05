/* imports */
import * as assert from 'assert';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import * as semver from 'semver';
import { deprecate, format } from 'util';

/* istanbul ignore next */
if (semver.lt(mongoose.version, '5.7.7')) {
  throw new Error('Please use mongoose 5.7.7 or higher');
}

import * as defaultClasses from './defaultClasses';
import { DecoratorKeys } from './internal/constants';
import { constructors, models } from './internal/data';
import { NoValidClass } from './internal/errors';
import { _buildSchema } from './internal/schema';
import { getName, mergeMetadata, mergeSchemaOptions } from './internal/utils';
import { logger } from './logSettings';
import {
  AnyParamConstructor,
  DocumentType,
  IModelOptions,
  Ref,
  ReturnModelType
} from './types';

/* exports */
export { mongoose }; // export the internally used one, to not need to always import it
export { setLogLevel, LogLevels } from './logSettings';
export * from './prop';
export * from './hooks';
export * from './plugin';
export * from '.';
export * from './typeguards';
export * from './optionsProp';
export { defaultClasses };
export { DocumentType, Ref, ReturnModelType };
export { Severity, IGlobalOptions } from './types';
export { getClassForDocument } from './internal/utils';
export * from './globalOptions';

/** @deprecated */
export abstract class Typegoose {
  /* istanbul ignore next */
  constructor() {
    // tslint:disable-next-line:no-empty
    deprecate(() => { }, 'Typegoose Class is Deprecated!')();
  }

  /* istanbul ignore next */
  /** @deprecated */
  public getModelForClass<T, U extends AnyParamConstructor<T>>(cl: U, settings?: any) {
    return deprecate(getModelForClass.bind(undefined, cl, settings), 'Typegoose Class is Deprecated!')(cl);
  }

  /* istanbul ignore next */
  /** @deprecated */
  public setModelForClass<T, U extends AnyParamConstructor<T>>(cl: U, settings?: any) {
    return deprecate(getModelForClass.bind(undefined, cl, settings), 'Typegoose Class is Deprecated!')(cl);
  }

  /* istanbul ignore next */
  /** @deprecated */
  public buildSchema<T, U extends AnyParamConstructor<T>>(cl: U) {
    return deprecate(buildSchema, 'Typegoose Class is Deprecated!')(cl);
  }
}

/**
 * Get a Model for a Class
 * Executes .setModelForClass if it cant find it already
 * @param cl The uninitialized Class
 * @returns The Model
 * @public
 * @example
 * ```ts
 * class Name {}
 *
 * const NameModel = getModelForClass(Name);
 * ```
 */
export function getModelForClass<T, U extends AnyParamConstructor<T>>(cl: U, options?: IModelOptions) {
  assert(typeof cl === 'function', new NoValidClass(cl));
  options = typeof options === 'object' ? options : {};

  const roptions: IModelOptions = mergeMetadata(DecoratorKeys.ModelOptions, options, cl);
  const name = getName(cl);

  if (models.has(name)) {
    return models.get(name) as ReturnModelType<U, T>;
  }

  const model = roptions?.existingConnection?.model.bind(roptions.existingConnection)
    ?? roptions?.existingMongoose?.model.bind(roptions.existingMongoose)
    ?? mongoose.model.bind(mongoose);

  const compiledmodel: mongoose.Model<any> = model(name, buildSchema(cl, roptions.schemaOptions));
  const refetchedOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, cl) as IModelOptions ?? {};

  if (refetchedOptions?.options?.runSyncIndexes) {
    compiledmodel.syncIndexes();
  }

  return addModelToTypegoose(compiledmodel, cl);
}

/* istanbul ignore next */
/**
 * Builds the Schema & The Model
 * DEPRECTAED: use getModelForClass
 * @param cl The uninitialized Class
 * @returns The Model
 * @deprecated
 */
export function setModelForClass<T, U extends AnyParamConstructor<T>>(cl: U) {
  return deprecate(
    getModelForClass.bind(undefined, cl),
    'setModelForClass is deprecated, please use getModelForClass (see README#Migrate to 6.0.0)');
}

/**
 * Generates a Mongoose schema out of class props, iterating through all parents
 * @param cl The not initialized Class
 * @returns Returns the Build Schema
 */
export function buildSchema<T, U extends AnyParamConstructor<T>>(cl: U, options?: mongoose.SchemaOptions) {
  assert(typeof cl === 'function', new NoValidClass(cl));

  const mergedOptions = mergeSchemaOptions(options, cl);

  let sch: mongoose.Schema<U>;
  /** Parent Constructor */
  let parentCtor = Object.getPrototypeOf(cl.prototype).constructor;
  // iterate trough all parents
  while (parentCtor?.name !== 'Object') {
    /* istanbul ignore next */
    if (parentCtor.name === 'Typegoose') { // TODO: remove this "if", if the Typegoose class gets removed [DEPRECATION]
      deprecate(() => undefined, 'The Typegoose Class is deprecated, please try to remove it')();

      break;
    }
    // extend schema
    sch = _buildSchema(parentCtor, sch, mergedOptions);
    // set next parent
    parentCtor = Object.getPrototypeOf(parentCtor.prototype).constructor;
  }
  // get schema of current model
  sch = _buildSchema(cl, sch, mergedOptions);

  return sch;
}

/**
 * This can be used to add custom Models to Typegoose, with the type infomation of cl
 * Note: no gurantee that the type infomation is fully correct
 * @param model The model to store
 * @param cl The Class to store
 * @example
 * ```ts
 * class T {}
 *
 * const schema = buildSchema(T);
 * // modifications to the schame can be done
 * const model = addModelToTypegoose(mongoose.model(schema), T);
 * ```
 */
export function addModelToTypegoose<T, U extends AnyParamConstructor<T>>(model: mongoose.Model<any>, cl: U) {
  assert(model.prototype instanceof mongoose.Model, new TypeError(`"${model}" is not a valid Model!`));
  assert(typeof cl === 'function', new NoValidClass(cl));

  const name = getName(cl);

  if (constructors.has(name)) {
    throw new Error(format('It seems like "addModelToTypegoose" got called twice\n'
      + 'Or multiple classes with the same name are used, which is not supported!'
      + '(%s)', name));
  }

  models.set(name, model);
  constructors.set(name, cl);

  return models.get(name) as ReturnModelType<U, T>;
}

/**
 * Deletes an existing model so that it can be overwritten
 * with another model
 *
 * @param key
 */
export function deleteModel(name: string) {
  assert(typeof name === 'string', new TypeError('name is not an string! (deleteModel)'));
  assert(models.has(name), new Error(`Model "${name}" could not be found`));

  logger.debug('Deleting Model "%s"', name);

  mongoose.connection.deleteModel(name);
  models.delete(name);
  constructors.delete(name);
}

/**
 * Delete a model, with the given class
 * @param cl The Class
 */
export function deleteModelWithClass<T, U extends AnyParamConstructor<T>>(cl: U) {
  assert(typeof cl === 'function', new NoValidClass(cl));

  return deleteModel(getName(cl));
}

/**
 * Build a Model from a given class and return the model
 * @param from The Model to build From
 * @param cl The Class to make a model out
 * @param id The Identifier to use to differentiate documents (default: cl.name)
 * @example
 * ```ts
 * class C1 {}
 * class C2 extends C1 {}
 *
 * const C1Model = getModelForClass(C1);
 * const C2Model = getDiscriminatorModelForClass(C1Model, C1);
 * ```
 */
export function getDiscriminatorModelForClass<T, U extends AnyParamConstructor<T>>(
  from: mongoose.Model<any>,
  cl: U,
  id?: string
) {
  assert(from.prototype instanceof mongoose.Model, new TypeError(`"${from}" is not a valid Model!`));
  assert(typeof cl === 'function', new NoValidClass(cl));

  const name = getName(cl);
  if (models.has(name)) {
    return models.get(name) as ReturnModelType<U, T>;
  }
  const sch = buildSchema(cl) as mongoose.Schema & { paths: object };

  const discriminatorKey = sch.get('discriminatorKey');
  if (sch.path(discriminatorKey)) {
    sch.paths[discriminatorKey].options.$skipDiscriminatorCheck = true;
  }

  const model = from.discriminator(name, sch, id ? id : name);

  return addModelToTypegoose(model, cl);
}
