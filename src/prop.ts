import * as mongoose from 'mongoose';
import * as _ from 'lodash';

import { schema } from './data';
import { isPrimitive, initAsObject, initAsArray } from './utils';
import { InvalidPropError } from './errors';

export const prop = (target: any, key: string) => {
  const Type = Reflect.getMetadata('design:type', target, key);
  const instance = new Type();

  const subSchema = schema[instance.constructor.name];
  if (!subSchema && !isPrimitive(Type)) {
    throw new InvalidPropError(Type.name, key);
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

export const arrayProp = (type: any) => (target: any, key: string) => {
  const Type = type;
  const instance = new Type();

  const subSchema = schema[instance.constructor.name];
  if (!subSchema && !isPrimitive(Type)) {
    throw new InvalidPropError(Type.name, key);
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

export const refProp = (refModel: any) => (target: any, key: string) => {
  const name = target.constructor.name;
  initAsObject(name, key);

  schema[name][key] = {
    ...schema[name][key],
    type: mongoose.Schema.Types.ObjectId,
    ref: refModel.name,
  };
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

export const refArrayProp = (refModel: any) => (target: any, key: string) => {
  const name = target.constructor.name;
  initAsArray(name, key);

  schema[name][key][0] = {
    ...schema[name][key][0],
    type: mongoose.Schema.Types.ObjectId,
    ref: refModel.name,
  };
};