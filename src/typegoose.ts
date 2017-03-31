import 'reflect-metadata';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';

const methods = { staticMethods: {}, instanceMethods: {} };
const schema = {};
const models = {};

const isPrimitive = (Type) => _.includes(['String', 'Number', 'Boolean'], Type.name);
const isArray = (Type) => Type.name === 'Array';

const initAsObject = (name, key) => {
  if (!schema[name]) {
    schema[name] = {};
  }
  if (!schema[name][key]) {
    schema[name][key] = {};
  }
};

const initAsArray = (name, key) => {
  if (!schema[name]) {
    schema[name] = {};
  }
  if (!schema[name][key]) {
    schema[name][key] = [{}];
  }
};

export const prop = (target: any, key: string) => {
  const Type = Reflect.getMetadata('design:type', target, key);
  const instance = new Type();

  const subSchema = schema[instance.constructor.name];
  if (!subSchema && !isPrimitive(Type)) {
    throw new Error(`${Type.name} is not a primitive type nor a Typegoose schema (Not extending it).`);
  }

  const name = target.constructor.name;
  initAsObject(name, key);

  if (isPrimitive(Type)) {
    schema[name][key] = {
      ...schema[name][key],
      type: Type,
    };
  } else {
    schema[name][key] = {
      ...schema[name][key],
      ...subSchema,
    };
  }
};

export const refProp = (refModel: any) => (target: any, key: string) => {
  const name = target.constructor.name;
  initAsObject(name, key);

  schema[name][key] = {
    ...schema[name][key],
    type: mongoose.Schema.Types.ObjectId,
    ref: refModel.name,
  };
};

export const required = (target: any, key: string) => {
  const type = Reflect.getMetadata('design:type', target, key);

  const name = target.constructor.name;
  if (isArray(type)) {
    initAsArray(name, key);
    schema[name][key][0] = {
      ...schema[name][key][0],
      required: true,
    };
  } else {
    initAsObject(name, key);
    schema[name][key] = {
      ...schema[name][key],
      required: true,
    };
  }
};

export const enumProp = (enumeration: any) => (target: any, key: string) => {
  const name = target.constructor.name;
  initAsObject(name, key);
  schema[name][key] = {
    ...schema[name][key],
    type: String,
    enum: _.values(enumeration),
  };
};

export const arrayProp = (type: any) => (target: any, key: string) => {
  const Type = type;
  const instance = new Type();

  const subSchema = schema[instance.constructor.name];
  if (!subSchema && !isPrimitive(Type)) {
    throw new Error(`${Type.name} is not a primitive type nor a Typegoose schema (Not extending it).`);
  }

  const name = target.constructor.name;
  initAsArray(name, key);

  if (isPrimitive(Type)) {
    schema[name][key][0] = {
      ...schema[name][key][0],
      type: Type,
    };
  } else {
    schema[name][key][0] = {
      ...schema[name][key][0],
      ...subSchema,
    };
  }
};

export type Ref<T> = T | string;
type MethodType = 'instanceMethods' | 'staticMethods';

const baseMethod = (target: any, key: string, descriptor: TypedPropertyDescriptor<any>, methodType: MethodType) => {
  if (descriptor === undefined) {
    descriptor = Object.getOwnPropertyDescriptor(target, key);
  }

  let name;
  if (methodType === 'instanceMethods') {
    name = target.constructor.name;
  }
  if (methodType === 'staticMethods') {
    name = target.name;
  }

  if (!methods[methodType][name]) {
    methods[methodType][name] = {};
  }

  const method = descriptor.value;
  methods[methodType][name] = {
    ...methods[methodType][name],
    [key]: method,
  };
};

export const staticMethod = (target: any, key: string, descriptor: TypedPropertyDescriptor<any>) =>
  baseMethod(target, key, descriptor, 'staticMethods');

export const instanceMethod = (target: any, key: string, descriptor: TypedPropertyDescriptor<any>) =>
  baseMethod(target, key, descriptor, 'instanceMethods');

export type InstanceType<T> = T & mongoose.Document;

export type ModelType<T> = mongoose.Model<InstanceType<T>> & T;

export class Typegoose {
  id: string;

  getModelForClass<T>(t: T) {
    const name = (this.constructor as any).name;
    if (!models[name]) {
      const sch = new mongoose.Schema(schema[name]);

      const staticMethods = methods.staticMethods[name];
      console.log(name, 'staticM', staticMethods);

      sch.statics = staticMethods;

      const instanceMethods = methods.instanceMethods[name];
      sch.methods = instanceMethods;

      models[name] = mongoose.model<InstanceType<this>>(name, sch);
    }

    return models[name] as ModelType<this> & T;
  }
}
