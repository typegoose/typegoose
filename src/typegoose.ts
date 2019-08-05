/* imports */
import * as mongoose from 'mongoose';
import { shim } from 'object.fromentries';
import 'reflect-metadata';
import { isNullOrUndefined } from 'util';

if (!Object.fromEntries) {
  shim();
}

import { constructors, hooks, methods, models, plugins, schemas, virtuals } from './data';
import { IModelOptions } from './optionsProp';

/* exports */
export * from './method';
export * from './prop';
export * from './hooks';
export * from './plugin';
export * from '.';
export * from './typeguards';
export * from './optionsProp';
export { getClassForDocument } from './utils';

export type DocumentType<T> = T & mongoose.Document;
export type ModelType<T> = mongoose.Model<DocumentType<T>> & T;

/**
 * Main Class
 */
export class Typegoose {
  /**
   * Get a Model for a Class
   * Executes .setModelForClass if it cant find it already
   * @param t The uninitialized Class
   * @returns The Model
   * @public
   */
  public getModelForClass<T>(t: T) {
    const name = this.constructor.name;
    if (!models.get(name)) {
      this.setModelForClass(t);
    }

    return models.get(name) as ModelType<this> & T;
  }

  /**
   * Builds the Schema & The Model
   * @param t The uninitialized Class
   * @returns The Model
   * @public
   */
  public setModelForClass<T>(t: T) {
    const name = this.constructor.name;
    const options: IModelOptions = Reflect.getMetadata('typegoose:options', t) || {};

    const sch = this.buildSchema<T>(t);

    let model = mongoose.model.bind(mongoose);
    if (options.existingConnection) {
      model = options.existingConnection.model.bind(options.existingConnection);
    } else if (options.existingMongoose) {
      model = options.existingMongoose.model.bind(options.existingMongoose);
    }

    models.set(name, model(name, sch));
    constructors.set(name, this.constructor);

    return models.get(name) as ModelType<this> & T;
  }

  /**
   * Generates a Mongoose schema out of class props, iterating through all parents
   * @param t The not initialized Class
   * @returns Returns the Build Schema
   */
  public buildSchema<T>(t: T) {
    const name = this.constructor.name;

    // get schema of current model
    let sch = _buildSchema<T>(t, name);
    /** Parent Constructor */
    let parentCtor = Object.getPrototypeOf(this.constructor.prototype).constructor;
    // iterate trough all parents
    while (parentCtor && parentCtor.name !== 'Typegoose' && parentCtor.name !== 'Object') {
      // extend schema
      sch = _buildSchema<T>(t, parentCtor.name, sch);
      // next parent
      parentCtor = Object.getPrototypeOf(parentCtor.prototype).constructor;
    }

    return sch;
  }
}

/**
 * Private schema builder out of class props
 * -> If you discover this, dont use this function, use Typegoose.buildSchema!
 * @param t The not initialized Class
 * @param name The Name to save the Schema Under (Mostly Constructor.name)
 * @param sch Already Existing Schema?
 * @returns Returns the Build Schema
 * @private
 */
function _buildSchema<T>(t: T, name: string, sch?: mongoose.Schema) {
  /** Simplify the usage */
  const Schema = mongoose.Schema;
  const { schemaOptions }: IModelOptions = Reflect.getMetadata('typegoose:options', t) || {};

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
    hook.pre.forEach((v, k) => {
      if (!isNullOrUndefined(v.parallel)) {
        sch.pre(k, v.parallel, v.func);
      } else {
        sch.pre(k as string, v.func); // look at https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37333
      }
    });

    hook.post.forEach((v, k) => sch.post(k, v.func));
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
  const indices = Reflect.getMetadata('typegoose:indices', t) || [];
  for (const index of indices) {
    sch.index(index.fields, index.options);
  }

  return sch;
}
