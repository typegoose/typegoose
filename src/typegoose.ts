/* imports */
import * as mongoose from 'mongoose';
import { shim } from 'object.fromentries';
import 'reflect-metadata';

/* istanbul ignore next */
if (!Object.fromEntries) {
  shim();
}

import { deprecate } from 'util';
import { buildSchemas, constructors, models } from './data';
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

/** @deprecated */
export abstract class Typegoose {
  /* istanbul ignore next */
  constructor() {
    // tslint:disable-next-line:no-empty
    deprecate(() => { }, 'Typegoose Class is Deprecated!')();
  }

  /* istanbul ignore next */
  /** @deprecated */
  public getModelForClass<T, U extends NoParamConstructor<T>>(cl: U, settings?: any) {
    return deprecate(getModelForClass, 'Typegoose Class is Deprecated!')(cl);
  }

  /* istanbul ignore next */
  /** @deprecated */
  public setModelForClass<T, U extends NoParamConstructor<T>>(cl: U, settings?: any) {
    return deprecate(setModelForClass, 'Typegoose Class is Deprecated!')(cl);
  }

  /* istanbul ignore next */
  /** @deprecated */
  public buildSchema<T, U extends NoParamConstructor<T>>(cl: U) {
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

  return addModelToTypegoose(model(name, buildSchema(cl)), cl);
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
  if (buildSchemas.get(cl.name)) {
    return buildSchemas.get(cl.name);
  }
  let sch: mongoose.Schema<U>;
  /** Parent Constructor */
  let parentCtor = Object.getPrototypeOf(cl.prototype).constructor;
  // iterate trough all parents
  while (parentCtor && parentCtor.name !== 'Object') {
    /* istanbul ignore next */
    if (parentCtor.name === 'Typegoose') { // TODO: remove this if, if the Typegoose class gets removed [DEPRECATION]
      // tslint:disable-next-line:no-console
      console.error('The Typegoose Class is deprecated, please try to remove it');
    }
    // extend schema
    sch = _buildSchema(parentCtor, sch);
    // set next parent
    parentCtor = Object.getPrototypeOf(parentCtor.prototype).constructor;
  }
  // get schema of current model
  sch = _buildSchema(cl, sch);

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
export function addModelToTypegoose<T, U extends NoParamConstructor<T>>(model: mongoose.Model<any>, cl: U) {
  if (!(model.prototype instanceof mongoose.Model)) {
    throw new TypeError(`"${model}" is not a valid Model!`);
  }
  if (typeof cl !== 'function') {
    throw new TypeError(`"${cl}" is not a function(/constructor)!`);
  }

  const name = cl.name;

  models.set(name, model);
  constructors.set(name, cl);

  return models.get(name) as ReturnModelType<U, T>;
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
export function getDiscriminatorModelForClass<T, U extends NoParamConstructor<T>>(
  from: mongoose.Model<any>,
  cl: U,
  id?: string
) {
  const name = cl.name;
  if (models.get(name)) {
    return models.get(name) as ReturnModelType<U, T>;
  }

  const sch = buildSchema(cl);
  const model = from.discriminator(name, sch, id ? id : name);

  return addModelToTypegoose(model, cl);
}
