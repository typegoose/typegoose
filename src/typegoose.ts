/* imports */
import * as mongoose from 'mongoose';
import { shim } from 'object.fromentries';
import 'reflect-metadata';

/* istanbul ignore next */
if (!Object.fromEntries) {
  shim();
}

import { deprecate } from 'util';
import { constructors, models } from './data';
import * as defaultClasses from './defaultClasses';
import { IModelOptions } from './optionsProp';
import { _buildSchema } from './schema';
import { DocumentType, NoParamConstructor, Ref, ReturnModelType } from './types';

/* exports */
export * from './method';
export * from './prop';
export * from './hooks';
export * from './plugin';
export * from '.';
export * from './typeguards';
export * from './optionsProp';
export { defaultClasses };
export { DocumentType, Ref, ReturnModelType };
export { getClassForDocument } from './utils';

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
export function getModelForClass<T, U extends NoParamConstructor<T>>(cl: U) {
  const name = cl.name;
  if (models.get(name)) {
    return models.get(name) as ReturnModelType<U, T>;
  }

  const options: IModelOptions = Reflect.getMetadata('typegoose:options', cl) || {};

  let model = mongoose.model.bind(mongoose);
  if (options.existingConnection) {
    model = options.existingConnection.model.bind(options.existingConnection);
  } else if (options.existingMongoose) {
    model = options.existingMongoose.model.bind(options.existingMongoose);
  }

  models.set(name, model(name, buildSchema(cl)));
  constructors.set(name, cl);

  return models.get(name) as ReturnModelType<U, T>;
}

/* istanbul ignore next */
/**
 * Builds the Schema & The Model
 * DEPRECTAED: use getModelForClass
 * @param cl The uninitialized Class
 * @returns The Model
 * @deprecated
 */
export function setModelForClass<T, U extends NoParamConstructor<T>>(cl: U) {
  return deprecate(
    getModelForClass(cl),
    'setModelForClass is deprecated, please use getModelForClasse (see README#Migrate to 6.0.0');
}

/**
 * Generates a Mongoose schema out of class props, iterating through all parents
 * @param cl The not initialized Class
 * @returns Returns the Build Schema
 */
export function buildSchema<T, U extends NoParamConstructor<T>>(cl: U) {
  let sch: mongoose.Schema<U>;
  /** Parent Constructor */
  let parentCtor = Object.getPrototypeOf(cl.prototype).constructor;
  // iterate trough all parents
  while (parentCtor && parentCtor.name !== 'Object') {
    // extend schema
    sch = _buildSchema(parentCtor, sch);
    // set next parent
    parentCtor = Object.getPrototypeOf(parentCtor.prototype).constructor;
  }
  // get schema of current model
  sch = _buildSchema(cl, sch);

  return sch;
}
