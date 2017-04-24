import 'reflect-metadata';
import { Document, Model, Schema, model } from 'mongoose';
import * as _ from 'lodash';

import { schema, models, methods, virtuals } from './data';

export * from './method';
export * from './prop';

export type InstanceType<T> = T & Document;
export type ModelType<T> = Model<InstanceType<T>> & T;

export class Typegoose {
  id: string;

  getModelForClass<T>(t: T) {
    const name = (this.constructor as any).name;
    if (!models[name]) {
      const sch = new Schema(schema[name]);

      const staticMethods = methods.staticMethods[name];
      sch.statics = staticMethods;

      const instanceMethods = methods.instanceMethods[name];
      sch.methods = instanceMethods;

      const getterSetters = virtuals[name];
      _.forEach(getterSetters, (value, key) => {
        if (value.get) {
          sch.virtual(key).get(value.get);
        }
        if (value.set) {
          sch.virtual(key).set(value.set);
        }
      });

      models[name] = model<InstanceType<this>>(name, sch);
    }

    return models[name] as ModelType<this> & T;
  }
}