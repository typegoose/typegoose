/* imports */
import * as mongoose from 'mongoose';
import 'reflect-metadata';

import { constructors, hooks, methods, models, plugins, schema, virtuals } from './data';

/* exports */
export * from './method';
export * from './prop';
export * from './hooks';
export * from './plugin';
export * from '.';
export * from './typeguards';
export { getClassForDocument } from './utils';

export type DocumentType<T> = T & mongoose.Document;
export type ModelType<T> = mongoose.Model<DocumentType<T>> & T;

export interface GetModelForClassOptions {
  /** An Existing Mongoose Connection */
  existingMongoose?: mongoose.Mongoose;
  /** Supports all Mongoose's Schema Options */
  schemaOptions?: mongoose.SchemaOptions;
  /** An Existing Connection */
  existingConnection?: mongoose.Connection;
}

/**
 * Main Class
 */
export class Typegoose {
  /**
   * Get a Model for a Class
   * Executes .setModelForClass if it cant find it already
   * @param t The uninitialized Class
   * @param __namedParameters The Options
   * @param existingMongoose An Existing Mongoose Connection
   * @param schemaOptions Supports all Mongoose's Schema Options
   * @param existingConnection An Existing Connection
   * @returns The Model
   * @public
   */
  public getModelForClass<T>(
    t: T,
    { existingMongoose, schemaOptions, existingConnection }: GetModelForClassOptions = {}
  ) {
    const name = this.constructor.name;
    if (!models[name]) {
      this.setModelForClass(t, {
        existingMongoose,
        schemaOptions,
        existingConnection,
      });
    }

    return models[name] as ModelType<this> & T;
  }

  /**
   * Builds the Schema & The Model
   * @param t The uninitialized Class
   * @param __namedParameters The Options
   * @param existingMongoose An Existing Mongoose Connection
   * @param schemaOptions Supports all Mongoose's Schema Options
   * @param existingConnection An Existing Connection
   * @returns The Model
   * @public
   */
  public setModelForClass<T>(
    t: T,
    { existingMongoose, schemaOptions, existingConnection }: GetModelForClassOptions = {}
  ) {
    const name = this.constructor.name;

    const sch = this.buildSchema<T>(t, { existingMongoose, schemaOptions });

    let model = mongoose.model.bind(mongoose);
    if (existingConnection) {
      model = existingConnection.model.bind(existingConnection);
    } else if (existingMongoose) {
      model = existingMongoose.model.bind(existingMongoose);
    }

    models[name] = model(name, sch);
    constructors[name] = this.constructor;

    return models[name] as ModelType<this> & T;
  }

  /**
   * Generates a Mongoose schema out of class props, iterating through all parents
   * @param t The not initialized Class
   * @param schemaOptions Options for the Schema
   * @returns Returns the Build Schema
   */
  public buildSchema<T>(t: T, { schemaOptions }: GetModelForClassOptions = {}) {
    const name = this.constructor.name;

    // get schema of current model
    let sch = _buildSchema<T>(t, name, schemaOptions);
    /** Parent Constructor */
    let parentCtor = Object.getPrototypeOf(this.constructor.prototype).constructor;
    // iterate trough all parents
    while (parentCtor && parentCtor.name !== 'Typegoose' && parentCtor.name !== 'Object') {
      // extend schema
      sch = _buildSchema<T>(t, parentCtor.name, schemaOptions, sch);
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
 * @param schemaOptions Options for the Schema
 * @param sch Already Existing Schema?
 * @returns Returns the Build Schema
 * @private
 */
function _buildSchema<T>(t: T, name: string, schemaOptions: any, sch?: mongoose.Schema) {
  /** Simplify the usage */
  const Schema = mongoose.Schema;

  if (!sch) {
    sch = schemaOptions ? new Schema(schema[name], schemaOptions) : new Schema(schema[name]);
  } else {
    sch.add(schema[name]);
  }

  /** Simplify the usage */
  const staticMethods = methods.staticMethods[name];
  if (staticMethods) {
    sch.statics = Object.assign(staticMethods, sch.statics || {});
  } else {
    sch.statics = sch.statics || {};
  }

  /** Simplify the usage */
  const instanceMethods = methods.instanceMethods[name];
  if (instanceMethods) {
    sch.methods = Object.assign(instanceMethods, sch.methods || {});
  } else {
    sch.methods = sch.methods || {};
  }

  if (hooks[name]) { // checking to just dont get errors like "hooks[name].pre is not defined"
    hooks[name].pre.forEach(preHookArgs => {
      (sch as any).pre(...preHookArgs);
    });
    hooks[name].post.forEach(postHookArgs => {
      (sch as any).post(...postHookArgs);
    });
  }

  if (plugins[name]) { // same as the "if (hooks[name])"
    for (const plugin of plugins[name]) {
      sch.plugin(plugin.mongoosePlugin, plugin.options);
    }
  }

  /** Simplify the usage */
  const getterSetters = virtuals[name];
  if (getterSetters) {
    for (const key of Object.keys(getterSetters)) {
      if (getterSetters[key].options && getterSetters[key].options.overwrite) {
        sch.virtual(key, getterSetters[key].options);
      } else {
        if (getterSetters[key].get) {
          sch.virtual(key, getterSetters[key].options).get(getterSetters[key].get);
        }

        if (getterSetters[key].set) {
          sch.virtual(key, getterSetters[key].options).set(getterSetters[key].set);
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
