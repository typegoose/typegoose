import * as mongoose from 'mongoose';
import * as _ from 'lodash';

import { schema, virtuals } from './data';
import { isPrimitive, initAsObject, initAsArray, isString, isNumber } from './utils';
import { InvalidPropError, NotNumberTypeError, NotStringTypeError } from './errors';

type RequiredType = boolean | [boolean, string] | string | Function | [Function, string];

interface BasePropOptions {
  required?: RequiredType;
  enum?: string[];
  default?: any;
}

interface PropOptions extends BasePropOptions {
  ref?: any;
}

interface ValidateNumberOptions {
  min?: number | [number, string];
  max?: number | [number, string];
}

interface ValidateStringOptions {
  minlength?: number | [number, string];
  maxlength?: number | [number, string];
  match?: RegExp | [RegExp, string];
}

type PropOptionsWithNumberValidate = PropOptions & ValidateNumberOptions;
type PropOptionsWithStringValidate = PropOptions & ValidateStringOptions;
type PropOptionsWithValidate = PropOptionsWithNumberValidate | PropOptionsWithStringValidate;

const isWithStringValidate = (options: PropOptionsWithStringValidate) =>
  (options.minlength || options.maxlength || options.match)

const isWithNumberValidate = (options: PropOptionsWithNumberValidate) =>
  (options.min || options.max)

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
      return schema[name][key][0] = {
        ...schema[name][key][0],
        ...options,
        type: Type,
      };
    }
    return schema[name][key] = {
      ...schema[name][key],
      ...options,
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

export const prop = (options: PropOptionsWithValidate = {}) => (target: any, key: string) => {
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