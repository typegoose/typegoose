/** @format */

import * as mongoose from 'mongoose';

import { methods, schema, virtuals } from './data';
import { InvalidPropError, NoMetadataError, NotNumberTypeError, NotStringTypeError } from './errors';
import { initAsArray, initAsObject, isNumber, isObject, isPrimitive, isString } from './utils';

export type Func = (...args: any[]) => any;

export type RequiredType = boolean | [boolean, string] | string | Func | [Func, string];

export type ValidatorFunction = (value: any) => boolean | Promise<boolean>;
export type Validator =
  | ValidatorFunction
  | RegExp
  | {
    validator: ValidatorFunction;
    message?: string;
  };

export interface BasePropOptions {
  /** include this value? 
   * @default true 
   */
  select?: boolean;
  /** is this value required? */
  required?: RequiredType;
  /** only values from an string array? */
  enum?: string[] | object;
  /** does the value should have a default? */
  default?: any;
  validate?: Validator | Validator[];
  /** should this value be unique? */
  unique?: boolean;
  /** should this value get an index? */
  index?: boolean;
  sparse?: boolean;
  expires?: string | number;
  /** should subdocuments get their own id? */
  _id?: boolean;
}

export interface PropOptions extends BasePropOptions {
  ref?: any;
  refPath?: string;
}

export interface ValidateNumberOptions {
  min?: number | [number, string];
  max?: number | [number, string];
}

export interface ValidateStringOptions {
  lowercase?: boolean;
  uppercase?: boolean;
  trim?: boolean;
  match?: RegExp | [RegExp, string];
  enum?: string[];
  minlength?: number | [number, string];
  maxlength?: number | [number, string];
}

export interface TransformStringOptions {
  lowercase?: boolean; // whether to always call .toLowerCase() on the value
  uppercase?: boolean; // whether to always call .toUpperCase() on the value
  trim?: boolean; // whether to always call .trim() on the value
}

export interface VirtualOptions {
  ref: string;
  localField: string;
  foreignField: string;
  justOne: boolean;
  /** Set to true, when it is an "virtual populate-able" */
  overwrite: boolean;
}

export type PropOptionsWithNumberValidate = PropOptions & ValidateNumberOptions;
export type PropOptionsWithStringValidate = PropOptions & TransformStringOptions & ValidateStringOptions;
export type PropOptionsWithValidate = PropOptionsWithNumberValidate | PropOptionsWithStringValidate | VirtualOptions;

/** This Enum is meant for baseProp to decide for diffrent props (like if it is an arrayProp or prop or mapProp) */
enum WhatIsIt {
  ARRAY = 'Array',
  MAP = 'Map',
  NONE = ''
}

const isWithStringValidate = (options: PropOptionsWithStringValidate) =>
  (
    options.lowercase
    || options.uppercase
    || options.trim
    || options.match
    || options.enum
    || options.minlength
    || options.maxlength
  );

const isWithStringTransform = (options: PropOptionsWithStringValidate) =>
  options.lowercase || options.uppercase || options.trim;

const isWithNumberValidate = (options: PropOptionsWithNumberValidate) => options.min || options.max;

const baseProp = (rawOptions: any, Type: any, target: any, key: any, whatis: WhatIsIt = WhatIsIt.NONE) => {
  const name: string = target.constructor.name;
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
        options: rawOptions,
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
        options: rawOptions,
      };
    }
    return;
  }

  if (whatis === WhatIsIt.ARRAY) {
    initAsArray(name, key);
  } else {
    initAsObject(name, key);
  }

  const ref = rawOptions.ref;
  if (typeof ref === 'string') {
    schema[name][key] = {
      ...schema[name][key],
      type: mongoose.Schema.Types.ObjectId,
      ref,
    };
    return;
  } else if (ref) {
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

  const refPath = rawOptions.refPath;
  if (refPath && typeof refPath === 'string') {
    schema[name][key] = {
      ...schema[name][key],
      type: mongoose.Schema.Types.ObjectId,
      refPath,
    };
    return;
  }

  const itemsRefPath = rawOptions.itemsRefPath;
  if (itemsRefPath && typeof itemsRefPath === 'string') {
    schema[name][key][0] = {
      ...schema[name][key][0],
      type: mongoose.Schema.Types.ObjectId,
      itemsRefPath,
    };
    return;
  }

  const enumOption = rawOptions.enum;
  if (enumOption) {
    if (!Array.isArray(enumOption)) {
      rawOptions.enum = Object.keys(enumOption).map(propKey => enumOption[propKey]);
    }
  }

  const selectOption = rawOptions.select;
  if (typeof selectOption === 'boolean') {
    schema[name][key] = {
      ...schema[name][key],
      select: selectOption,
    };
  }

  // check for validation inconsistencies
  if (isWithStringValidate(rawOptions) && !isString(Type)) {
    throw new NotStringTypeError(key);
  }

  if (isWithNumberValidate(rawOptions) && !isNumber(Type)) {
    throw new NotNumberTypeError(key);
  }

  // check for transform inconsistencies
  if (isWithStringTransform(rawOptions) && !isString(Type)) {
    throw new NotStringTypeError(key);
  }

  const instance = new Type();
  const subSchema = schema[instance.constructor.name];
  if (!subSchema && !isPrimitive(Type) && !isObject(Type)) {
    throw new InvalidPropError(Type.name, key);
  }

  const { ['ref']: r, ['items']: i, ['of']: o, ...options } = rawOptions;
  if (isPrimitive(Type)) {
    if (whatis === WhatIsIt.ARRAY) {
      schema[name][key] = {
        ...schema[name][key][0],
        ...options,
        type: [Type],
      };
      return;
    }
    if (whatis === WhatIsIt.MAP) {
      const { mapDefault } = options;
      delete options.mapDefault;
      schema[name][key] = {
        ...schema[name][key],
        type: Map,
        default: mapDefault,
        of: { type: Type, ...options },
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

  // If the 'Type' is not a 'Primitive Type' and no subschema was found treat the type as 'Object'
  // so that mongoose can store it as nested document
  if (isObject(Type) && !subSchema) {
    schema[name][key] = {
      ...schema[name][key],
      ...options,
      type: Object,
    };
    return;
  }

  if (whatis === WhatIsIt.ARRAY) {
    schema[name][key] = {
      ...schema[name][key][0],
      ...options,
      type: [{
        ...(typeof options._id !== 'undefined' ? { _id: options._id } : {}),
        ...subSchema,
      }],
    };
    return;
  }

  if (whatis === WhatIsIt.MAP) {
    schema[name][key] = {
      ...schema[name][key],
      type: Map,
      ...options
    };
    schema[name][key].of = {
      ...schema[name][key].of,
      ...subSchema,
    };
    return;
  }
  const Schema = mongoose.Schema;

  const supressSubschemaId = rawOptions._id === false;
  const virtualSchema = new Schema({ ...subSchema }, supressSubschemaId ? { _id: false } : {});

  const schemaInstanceMethods = methods.instanceMethods[instance.constructor.name];
  if (schemaInstanceMethods) {
    virtualSchema.methods = schemaInstanceMethods;
  }

  schema[name][key] = {
    ...schema[name][key],
    ...options,
    type: virtualSchema,
  };
  return;
};

export const prop = (options: PropOptionsWithValidate = {}) => (target: any, key: string) => {
  const Type = (Reflect as any).getMetadata('design:type', target, key);

  if (!Type) {
    throw new NoMetadataError(key);
  }

  baseProp(options, Type, target, key, WhatIsIt.NONE);
};

export interface ArrayPropOptions extends BasePropOptions {
  items?: any;
  itemsRef?: any;
  itemsRefPath?: any;
}
export interface MapPropOptions extends BasePropOptions {
  of?: any;
  mapDefault?: any;
}

export const arrayProp = (options: ArrayPropOptions) => (target: any, key: string) => {
  const Type = options.items;
  baseProp(options, Type, target, key, WhatIsIt.ARRAY);
};

/**
 * Set Options for the Map (options -> mongoose)
 * @param options Options for the Map
 * @public
 */
export const mapProp = (options: MapPropOptions) => (target: any, key: string) => {
  const Type = options.of;
  baseProp(options, Type, target, key, WhatIsIt.MAP);
};

export type Ref<T> = T | mongoose.Schema.Types.ObjectId;
