/** @format */

import 'reflect-metadata';
import * as mongoose from 'mongoose';

(mongoose as any).Promise = global.Promise;

import { constructors, hooks, methods, models, plugins, schema, virtuals } from './data';

export * from './method';
export * from './prop';
export * from './hooks';
export * from './plugin';
export * from '.';
export { getClassForDocument } from './utils';

export type InstanceType<T> = T & mongoose.Document;
export type ModelType<T> = mongoose.Model<InstanceType<T>> & T;

export interface GetModelForClassOptions {
  existingMongoose?: mongoose.Mongoose;
  schemaOptions?: mongoose.SchemaOptions;
  existingConnection?: mongoose.Connection;
}

export class Typegoose {
  getModelForClass<T>(t: T, { existingMongoose, schemaOptions, existingConnection }: GetModelForClassOptions = {}) {
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

  setModelForClass<T>(t: T, { existingMongoose, schemaOptions, existingConnection }: GetModelForClassOptions = {}) {
    const name = this.constructor.name;

    // get schema of current model
    let sch = this.buildSchema<T>(t, name, schemaOptions);
    // get parents class name
    let parentCtor = Object.getPrototypeOf(this.constructor.prototype).constructor;
    // iterate trough all parents
    while (parentCtor && parentCtor.name !== 'Typegoose' && parentCtor.name !== 'Object') {
      // extend schema
      sch = this.buildSchema<T>(t, parentCtor.name, schemaOptions, sch);
      // next parent
      parentCtor = Object.getPrototypeOf(parentCtor.prototype).constructor;
    }

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

  private buildSchema<T>(t: T, name: string, schemaOptions: any, sch?: mongoose.Schema) {
    const Schema = mongoose.Schema;

    if (!sch) {
      sch = schemaOptions ? new Schema(schema[name], schemaOptions) : new Schema(schema[name]);
    } else {
      sch.add(schema[name]);
    }

    const staticMethods = methods.staticMethods[name];
    if (staticMethods) {
      sch.statics = Object.assign(staticMethods, sch.statics || {});
    } else {
      sch.statics = sch.statics || {};
    }

    const instanceMethods = methods.instanceMethods[name];
    if (instanceMethods) {
      sch.methods = Object.assign(instanceMethods, sch.methods || {});
    } else {
      sch.methods = sch.methods || {};
    }

    if (hooks[name]) {
      const preHooks = hooks[name].pre;
      preHooks.forEach(preHookArgs => {
        (sch as any).pre(...preHookArgs);
      });
      const postHooks = hooks[name].post;
      postHooks.forEach(postHookArgs => {
        (sch as any).post(...postHookArgs);
      });
    }

    if (plugins[name]) {
      for (const plugin of plugins[name]) {
        sch.plugin(plugin.mongoosePlugin, plugin.options);
      }
    }

    const getterSetters = virtuals[name];
    if (getterSetters) {
      for (const key of Object.keys(getterSetters)) {
        if (getterSetters[key].options && getterSetters[key].options.overwrite) {
          sch.virtual(key, getterSetters[key].options)
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

    const indices = Reflect.getMetadata('typegoose:indices', t) || [];
    for (const index of indices) {
      sch.index(index.fields, index.options);
    }

    return sch;
  }
}
