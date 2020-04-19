/* imports */
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import * as semver from 'semver';
import { format } from 'util';

/* istanbul ignore next */
if (semver.lt(mongoose.version, '5.9.9')) {
  throw new Error('Please use mongoose 5.9.9 or higher');
}

if (semver.lt(process.version.slice(1), '10.15.0')) {
  logger.warn('You are using a NodeJS Version below 10.15.0, Please Upgrade!');
}

import { parseENV, setGlobalOptions } from './globalOptions';
import { DecoratorKeys } from './internal/constants';
import { constructors, models } from './internal/data';
import { _buildSchema } from './internal/schema';
import { assertion, assertionIsClass, getName, mergeMetadata, mergeSchemaOptions } from './internal/utils';
import { logger } from './logSettings';
import type {
  AnyParamConstructor,
  DocumentType,
  IModelOptions,
  Ref,
  ReturnModelType
} from './types';

/* exports */
export { mongoose, setGlobalOptions }; // export the internally used one, to not need to always import it
export { setLogLevel, LogLevels } from './logSettings';
export * from './prop';
export * from './hooks';
export * from './plugin';
export * from './index';
export * from './typeguards';
export * from './optionsProp';
export * as defaultClasses from './defaultClasses';
export * as errors from './internal/errors';
export * as types from './types';
export { DocumentType, Ref, ReturnModelType };
export { getClassForDocument, getClass, getName } from './internal/utils';
export { Severity } from './internal/constants';

parseENV(); // call this before anything to ensure they are applied

/**
 * Get a Model for a Class
 * Executes .setModelForClass if it can't find it already
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
  assertionIsClass(cl);
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

/**
 * Get Model from internal cache
 * @param key ModelName key
 */
export function getModelWithString<U extends AnyParamConstructor<any>>(key: string): undefined | ReturnModelType<U> {
  assertion(typeof key === 'string', TypeError(format('Expected "key" to be a string, got "%s"', key)));

  return models.get(key) as any;
}

/**
 * Generates a Mongoose schema out of class props, iterating through all parents
 * @param cl The not initialized Class
 * @returns Returns the Build Schema
 */
export function buildSchema<T, U extends AnyParamConstructor<T>>(cl: U, options?: mongoose.SchemaOptions) {
  assertionIsClass(cl);

  const mergedOptions = mergeSchemaOptions(options, cl);

  let sch: mongoose.Schema<U>;
  /** Parent Constructor */
  let parentCtor = Object.getPrototypeOf(cl.prototype).constructor;
  // iterate trough all parents
  while (parentCtor?.name !== 'Object') {
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
 * This can be used to add custom Models to Typegoose, with the type information of cl
 * Note: no gurantee that the type information is fully correct
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
  assertion(model.prototype instanceof mongoose.Model, new TypeError(`"${model}" is not a valid Model!`));
  assertionIsClass(cl);

  const name = getName(cl);

  if (models.has(name)) {
    throw new Error(format('It seems like "addModelToTypegoose" got called twice\n'
      + 'Or multiple classes with the same name are used, which is not supported!'
      + '(%s)', name));
  }
  if (constructors.get(name)) {
    logger.info('Class "%s" already existed in the constructors Map', name);
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
  assertion(typeof name === 'string', new TypeError('name is not an string! (deleteModel)'));
  assertion(models.has(name), new Error(`Model "${name}" could not be found`));

  logger.debug('Deleting Model "%s"', name);

  models.get(name).db.deleteModel(name);

  models.delete(name);
  constructors.delete(name);
}

/**
 * Delete a model, with the given class
 * @param cl The Class
 */
export function deleteModelWithClass<T, U extends AnyParamConstructor<T>>(cl: U) {
  assertionIsClass(cl);

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
  assertion(from.prototype instanceof mongoose.Model, new TypeError(`"${from}" is not a valid Model!`));
  assertionIsClass(cl);

  const name = getName(cl);
  if (models.has(name)) {
    return models.get(name) as ReturnModelType<U, T>;
  }
  const sch = buildSchema(cl) as mongoose.Schema & { paths: any; };

  const discriminatorKey = sch.get('discriminatorKey');
  if (sch.path(discriminatorKey)) {
    sch.paths[discriminatorKey].options.$skipDiscriminatorCheck = true;
  }

  const model = from.discriminator(name, sch, id ? id : name);

  return addModelToTypegoose(model, cl);
}
