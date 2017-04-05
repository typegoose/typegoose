import 'reflect-metadata';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';

import { schema, models, methods, virtuals } from './data';

export * from './method';
export * from './prop';

export type InstanceType<T> = T & mongoose.Document;
export type ModelType<T> = mongoose.Model<InstanceType<T>> & T;


export class Typegoose {
  id: string;

  getModelForClass<T>(t: T) {
    const name = (this.constructor as any).name;
    if (!models[name]) {
      const sch = new mongoose.Schema(schema[name]);

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

      models[name] = mongoose.model<InstanceType<this>>(name, sch);
    }

    return models[name] as ModelType<this> & T;
  }
}