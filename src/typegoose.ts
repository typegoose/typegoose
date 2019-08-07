/* imports */
import * as mongoose from 'mongoose';
import { shim } from 'object.fromentries';
import 'reflect-metadata';

/* istanbul ignore next */
if (!Object.fromEntries) {
  shim();
}

import { constructors, hooks, methods, models, plugins, schemas, virtuals } from './data';
import * as defaultClasses from './defaultClasses';
import { IModelOptions } from './optionsProp';
import { DocumentType, EmptyVoidFn, NoParamConstructor, Ref, ReturnModelType } from './types';

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
 * Generates a Mongoose schema out of class props, iterating through all parents
 * @param t The not initialized Class
 * @returns Returns the Build Schema
 */
export function buildSchema<T, U extends NoParamConstructor<T>>(t: U) {
  const name = t.name;

  // get schema of current model
  let sch = _buildSchema(t, name);
  /** Parent Constructor */
  let parentCtor = Object.getPrototypeOf(t.prototype).constructor;
  // iterate trough all parents
  while (parentCtor && parentCtor.name !== 'Object') {
    // extend schema
    sch = _buildSchema(t, parentCtor.name, sch);
    // next parent
    parentCtor = Object.getPrototypeOf(parentCtor.prototype).constructor;
  }

  return sch;
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
  if (!models.get(name)) {
    setModelForClass(cl);
  }

  return models.get(name) as ReturnModelType<U, T>;
}

/**
 * Builds the Schema & The Model
 * Note: you should use {@link getModelForClass} otherwise the model will be redefined!
 * @param cl The uninitialized Class
 * @returns The Model
 * @public
 * @example
 * ```ts
 * class Name {}
 *
 * const NameModel = setModelForClass(Name);
 * ```
 */
export function setModelForClass<T, U extends NoParamConstructor<T>>(cl: U) {
  const name = cl.name;
  const options: IModelOptions = Reflect.getMetadata('typegoose:options', cl) || {};

  const sch = buildSchema(cl);

  let model = mongoose.model.bind(mongoose);
  if (options.existingConnection) {
    model = options.existingConnection.model.bind(options.existingConnection);
  } else if (options.existingMongoose) {
    model = options.existingMongoose.model.bind(options.existingMongoose);
  }

  models.set(name, model(name, sch));
  constructors.set(name, cl);

  return models.get(name) as ReturnModelType<U, T>;
}

/**
 * Private schema builder out of class props
 * -> If you discover this, dont use this function, use Typegoose.buildSchema!
 * @param cl The not initialized Class
 * @param name The Name to save the Schema Under (Mostly Constructor.name)
 * @param sch Already Existing Schema?
 * @returns Returns the Build Schema
 * @private
 */
function _buildSchema<T, U extends NoParamConstructor<T>>(cl: U, name: string, sch?: mongoose.Schema) {
  /** Simplify the usage */
  const Schema = mongoose.Schema;
  const { schemaOptions }: IModelOptions = Reflect.getMetadata('typegoose:options', cl) || {};

  if (!schemas.get(name)) {
    schemas.set(name, {});
  }

  if (!sch) {
    sch = new Schema(schemas.get(name), schemaOptions);
  } else {
    sch.add(schemas.get(name));
  }

  /** Simplify the usage */
  const staticMethods = methods.staticMethods.get(name);
  if (staticMethods) {
    sch.statics = Object.assign(Object.fromEntries(staticMethods), sch.statics || {});
  } else {
    sch.statics = sch.statics || {};
  }

  /** Simplify the usage */
  const instanceMethods = methods.instanceMethods.get(name);
  if (instanceMethods) {
    sch.methods = Object.assign(Object.fromEntries(instanceMethods), sch.methods || {});
  } else {
    sch.methods = sch.methods || {};
  }

  const hook = hooks.get(name);
  if (hook) {
    hook.pre.forEach((func, method) => {
      sch.pre(method as string, func as EmptyVoidFn);
      // ^ look at https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37333
    });

    hook.post.forEach((v, k) => sch.post(k, v));
  }

  if (plugins.get(name)) {
    for (const plugin of plugins.get(name)) {
      sch.plugin(plugin.mongoosePlugin, plugin.options);
    }
  }

  /** Simplify the usage */
  const getterSetters = virtuals.get(name);
  if (getterSetters) {
    for (const [key, virtual] of getterSetters) {
      if (virtual.options && virtual.options.overwrite) {
        sch.virtual(key, virtual.options);
      } else {
        if (virtual.get) {
          sch.virtual(key, virtual.options).get(virtual.get);
        }

        if (virtual.set) {
          sch.virtual(key, virtual.options).set(virtual.set);
        }
      }
    }
  }

  /** Get Metadata for indices */
  const indices = Reflect.getMetadata('typegoose:indices', cl) || [];
  for (const index of indices) {
    sch.index(index.fields, index.options);
  }

  return sch;
}
