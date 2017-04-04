import * as mongoose from 'mongoose';
import * as _ from 'lodash';

import { schema } from './data';
import { isPrimitive, initAsObject, initAsArray } from './utils';
import { InvalidPropError } from './errors';

type RequiredType = boolean | [boolean, string] | string | Function | [Function, string];

interface BasePropOptions {
  required?: RequiredType;
  enum?: Object;
}

interface PropOptions extends BasePropOptions {
  ref?: any;
}

export const baseProp = (rawOptions, Type, target, key, isArray = false) => {
  const name = target.constructor.name;
  if (isArray) {
    initAsArray(name, key);
  } else {
    initAsObject(name, key);
  }

  const ref = rawOptions.ref;
  if (ref) {
    return schema[name][key] = {
      ...schema[name][key],
      type: mongoose.Schema.Types.ObjectId,
      ref: ref.name,
    };
  }

  const itemsRef = rawOptions.itemsRef;
  if (itemsRef) {
    return schema[name][key][0] = {
      ...schema[name][key][0],
      type: mongoose.Schema.Types.ObjectId,
      ref: itemsRef.name,
    };
  }

  const instance = new Type();
  const subSchema = schema[instance.constructor.name];
  if (!subSchema && !isPrimitive(Type)) {
    throw new InvalidPropError(Type.name, key);
  }
  const options = _.omit(rawOptions, ['ref', 'enum', 'items']);
  if (isPrimitive(Type)) {
    const enumValues = rawOptions.enum ? _.values(rawOptions.enum) : {};
    if (isArray) {
      return schema[name][key][0] = {
        ...schema[name][key][0],
        ...options,
        ...enumValues,
        type: Type,
      };
    }
    return schema[name][key] = {
      ...schema[name][key],
      ...options,
      ...enumValues,
      type: Type,
    };
  }

  if (isArray) {
    return schema[name][key][0] = {
      ...schema[name][key][0],
      ...options,
      ...subSchema,
    };
  }
  return schema[name][key] = {
    ...schema[name][key],
    ...options,
    ...subSchema,
  };
};

export const prop = (options: PropOptions = {}) => (target: any, key: string) => {
  const Type = Reflect.getMetadata('design:type', target, key);
  return baseProp(options, Type, target, key);
};

interface ArrayPropOptions extends BasePropOptions {
  items?: any;
  itemsRef?: any;
}

export const arrayProp = (options: ArrayPropOptions) => (target: any, key: string) => {
  const Type = options.items;
  return baseProp(options, Type, target, key, true);
};

export type Ref<T> = T | string;