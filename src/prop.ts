import * as mongoose from 'mongoose';
import * as _ from 'lodash';

import { schema, virtuals } from './data';
import { isPrimitive, initAsObject, initAsArray, isString, isNumber } from './utils';
import { InvalidPropError, NotNumberTypeError, NotStringTypeError, NoMetadataError } from './errors';

export type Func = (...args: any[]) => any;

export type RequiredType = boolean | [boolean, string] | string | Func | [Func, string];

export interface BasePropOptions {
  required?: RequiredType;
  enum?: string[] | object;
  default?: any;
  unique?: boolean;
  index?: boolean;
  sparse?: boolean;
  expires?: string | number;
}

export interface PropOptions extends BasePropOptions {
  ref?: any;
}

export interface ValidateNumberOptions {
  min?: number | [number, string];
  max?: number | [number, string];
}

export interface ValidateStringOptions {
  minlength?: number | [number, string];
  maxlength?: number | [number, string];
  match?: RegExp | [RegExp, string];
}

export type PropOptionsWithNumberValidate = PropOptions & ValidateNumberOptions;
export type PropOptionsWithStringValidate = PropOptions & ValidateStringOptions;
export type PropOptionsWithValidate = PropOptionsWithNumberValidate | PropOptionsWithStringValidate;

const isWithStringValidate = (options: PropOptionsWithStringValidate) =>
  (options.minlength || options.maxlength || options.match);

const isWithNumberValidate = (options: PropOptionsWithNumberValidate) =>
  (options.min || options.max);

const baseProp = (rawOptions, Type, target, key, isArray = false) => {
  const name = target.constructor.name;
  const isGetterSetter = Object.getOwnPropertyDescriptor(target, key);
  if (isGetterSetter) {
    if (isGetterSetter.get) {
      if (!virtuals[name]) {
        virtuals[name] = {};
      }
      if (!virtuals[name][key]) {
        virtuals[name][key] = {};
      }
      virtuals[name][key] = {
        ...virtuals[name][key],
        get: isGetterSetter.get,
      };
    }

    if (isGetterSetter.set) {
      if (!virtuals[name]) {
        virtuals[name] = {};
      }
      if (!virtuals[name][key]) {
        virtuals[name][key] = {};
      }
      virtuals[name][key] = {
        ...virtuals[name][key],
        set: isGetterSetter.set,
      };
    }
    return;
  }

  if (isArray) {
    initAsArray(name, key);
  } else {
    initAsObject(name, key);
  }

  const ref = rawOptions.ref;
  if (ref) {
    schema[name][key] = {
      ...schema[name][key],
      type: mongoose.Schema.Types.ObjectId,
      ref: ref.name,
    };
    return;
  }

  const itemsRef = rawOptions.itemsRef;
  if (itemsRef) {
    schema[name][key][0] = {
      ...schema[name][key][0],
      type: mongoose.Schema.Types.ObjectId,
      ref: itemsRef.name,
    };
    return;
  }

  const enumOption = rawOptions.enum;
  if (enumOption) {
    if (!Array.isArray(enumOption)) {
      rawOptions.enum = Object.keys(enumOption).map((propKey) => enumOption[propKey]);
    }
  }

  // check for validation inconsistencies
  if (isWithStringValidate(rawOptions) && !isString(Type)) {
    throw new NotStringTypeError(key);
  }

  if (isWithNumberValidate(rawOptions) && !isNumber(Type)) {
    throw new NotNumberTypeError(key);
  }

  const instance = new Type();
  const subSchema = schema[instance.constructor.name];
  if (!subSchema && !isPrimitive(Type)) {
    throw new InvalidPropError(Type.name, key);
  }

  const options = _.omit(rawOptions, ['ref', 'items']);
  if (isPrimitive(Type)) {
    if (isArray) {
      schema[name][key][0] = {
        ...schema[name][key][0],
        ...options,
        type: Type,
      };
      return;
    }
    schema[name][key] = {
      ...schema[name][key],
      ...options,
      type: Type,
    };
    return;
  }

  if (isArray) {
    schema[name][key][0] = {
      ...schema[name][key][0],
      ...options,
      ...subSchema,
    };
    return;
  }
  schema[name][key] = {
    ...schema[name][key],
    ...options,
    ...subSchema,
  };
  return;
};

export const prop = (options: PropOptionsWithValidate = {}) => (target: any, key: string) => {
  const Type = (Reflect as any).getMetadata('design:type', target, key);

  if (!Type) {
    throw new NoMetadataError(key);
  }

  baseProp(options, Type, target, key);
};

export interface ArrayPropOptions extends BasePropOptions {
  items?: any;
  itemsRef?: any;
}

export const arrayProp = (options: ArrayPropOptions) => (target: any, key: string) => {
  const Type = options.items;
  baseProp(options, Type, target, key, true);
};

export type Ref<T> = T | string;
