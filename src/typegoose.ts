import 'reflect-metadata';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';

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

  initAsObject(target.constructor.name, key);

  if (isPrimitive(Type)) {
    schema[target.constructor.name][key] = {
      ...schema[target.constructor.name][key],
      type: Type,
    };
  } else {
    schema[target.constructor.name][key] = {
      ...schema[target.constructor.name][key],
      ...subSchema,
    };
  }
};

export const refProp = (refModel: any) => (target: any, key: string) => {
  initAsObject(target.constructor.name, key);

  schema[target.constructor.name][key] = {
    ...schema[target.constructor.name][key],
    type: mongoose.Schema.Types.ObjectId,
    ref: refModel.name,
  };
};

export const required = (target: any, key: string) => {
  const type = Reflect.getMetadata('design:type', target, key);

  if (isArray(type)) {
    initAsArray(target.constructor.name, key);
    schema[target.constructor.name][key][0] = {
      ...schema[target.constructor.name][key][0],
      required: true,
    };
  } else {
    initAsObject(target.constructor.name, key);
    schema[target.constructor.name][key] = {
      ...schema[target.constructor.name][key],
      required: true,
    };
  }
};

export const enumProp = (enumeration: any) => (target: any, key: string) => {
  initAsObject(target.constructor.name, key);
  schema[target.constructor.name][key] = {
    ...schema[target.constructor.name][key],
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

  initAsArray(target.constructor.name, key);

  if (isPrimitive(Type)) {
    schema[target.constructor.name][key][0] = {
      ...schema[target.constructor.name][key][0],
      type: Type,
    };
  } else {
    schema[target.constructor.name][key][0] = {
      ...schema[target.constructor.name][key][0],
      ...subSchema,
    };
  }
};

export type Ref<T> = T | string;

export class Typegoose {
  id: string;
  constructor() {
    const name = (this.constructor as any).name;
    console.log(name);

    console.log(schema[name]);
    if (!models[name]) {
      models[name] = mongoose.model<this & mongoose.Document>(name, schema[name]);
    }
  }

  _getModel() {
    return models[(this.constructor as any).name] as mongoose.Model<this & mongoose.Document>;
  }
}
