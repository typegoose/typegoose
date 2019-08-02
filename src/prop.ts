import * as mongoose from 'mongoose';

import { isNullOrUndefined } from 'util';
import { methods, schemas, virtuals } from './data';
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
   * @default true (Implicitly)
   */
  select?: boolean;
  /** is this value required?
   * @default false (Implicitly)
   */
  required?: RequiredType;
  /** Only accept Values from the Enum(|Array) */
  enum?: string[] | object;
  /** Give the Property a default Value */
  default?: any;
  /** Give an Validator RegExp or Function */
  validate?: Validator | Validator[];
  /** should this value be unique?
   * @link https://docs.mongodb.com/manual/indexes/#unique-indexes
   */
  unique?: boolean;
  /** should this value get an index?
   * @link https://docs.mongodb.com/manual/indexes
   */
  index?: boolean;
  /** @link https://docs.mongodb.com/manual/indexes/#sparse-indexes */
  sparse?: boolean;
  /** when should this property expire?
   * @link https://docs.mongodb.com/manual/tutorial/expire-data
   */
  expires?: string | number;
  /** should subdocuments get their own id?
   * @default true (Implicitly)
   */
  _id?: boolean;
}

export interface PropOptions extends BasePropOptions {
  /** Reference an other Document (you should use Ref<T> as Prop type) */
  ref?: any;
  /** Take the Path and try to resolve it to a Model */
  refPath?: string;
  /** 
   * Give the Property an alias in the output
   * Note: you should include the alias as a variable in the class, but not with a prop decorator
   * @example
   * ```ts
   * class Dummy extends Typegoose {
   *   @prop({ alias: "helloWorld" })
   *   public hello: string; // normal, with @prop
   *   public helloWorld: string; // is just for type Completion, will not be included in the DB
   * }
   * ```
   */
  alias?: string;
}

export interface ValidateNumberOptions {
  /** The Number must be at least this high */
  min?: number | [number, string];
  /** The Number can only be lower than this */
  max?: number | [number, string];
}

export interface ValidateStringOptions {
  /** Only Allowes if the value matches an RegExp */
  match?: RegExp | [RegExp, string];
  /** Only Allowes if the value is in the Enum */
  enum?: string[];
  /** Only Allowes if the value is at least the lenght */
  minlength?: number | [number, string];
  /** Only Allowes if the value is not longer than the maxlenght */
  maxlength?: number | [number, string];
}

export interface TransformStringOptions {
  /** Should it be lowercased before save? */
  lowercase?: boolean;
  /** Should it be uppercased before save? */
  uppercase?: boolean;
  /** Should it be trimmed before save? */
  trim?: boolean;
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

/**
 * Return true if there are Options
 * @param options The raw Options
 */
function isWithStringValidate(options: PropOptionsWithStringValidate): boolean {
  return !isNullOrUndefined(
    options.match
    || options.enum
    || options.minlength
    || options.maxlength
  );
}

/**
 * Return true if there are Options
 * @param options The raw Options
 */
function isWithStringTransform(options: PropOptionsWithStringValidate) {
  return !isNullOrUndefined(options.lowercase || options.uppercase || options.trim);
}

/**
 * Return true if there are Options
 * @param options The raw Options
 */
function isWithNumberValidate(options: PropOptionsWithNumberValidate) {
  return !isNullOrUndefined(options.min || options.max);
}

/**
 * Base Function for prop & arrayProp
 * @param rawOptions The options (like require)
 * @param Type What Type it is
 * @param target <no info>
 * @param key <no info>
 * @param isArray is it an array?
 */
function baseProp(rawOptions: any, Type: any, target: any, key: string, whatis: WhatIsIt = WhatIsIt.NONE): void {
  const name: string = target.constructor.name;
  const isGetterSetter = Object.getOwnPropertyDescriptor(target, key);
  if (isGetterSetter) {
    if (!virtuals.get(name)) {
      virtuals.set(name, new Map());
    }

    if (isGetterSetter.get) {
      virtuals.get(name).set(key, {
        ...virtuals.get(name).get(key),
        get: isGetterSetter.get,
        options: rawOptions,
      });
    }

    if (isGetterSetter.set) {
      virtuals.get(name).set(key, {
        ...virtuals.get(name).get(key),
        set: isGetterSetter.set,
        options: rawOptions,
      });
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
    schemas.get(name)[key] = {
      ...schemas.get(name)[key],
      type: mongoose.Schema.Types.ObjectId,
      ref,
    };
    return;
  } else if (ref) {
    schemas.get(name)[key] = {
      ...schemas.get(name)[key],
      type: mongoose.Schema.Types.ObjectId,
      ref: ref.name,
    };
    return;
  }

  const itemsRef = rawOptions.itemsRef;
  if (typeof itemsRef === 'string') {
    schemas.get(name)[key][0] = {
      ...schemas.get(name)[key][0],
      type: mongoose.Schema.Types.ObjectId,
      ref: itemsRef,
    };
    return;
  } else if (itemsRef) {
    schemas.get(name)[key][0] = {
      ...schemas.get(name)[key][0],
      type: mongoose.Schema.Types.ObjectId,
      ref: itemsRef.name,
    };
    return;
  }

  const refPath = rawOptions.refPath;
  if (refPath && typeof refPath === 'string') {
    schemas.get(name)[key] = {
      ...schemas.get(name)[key],
      type: mongoose.Schema.Types.ObjectId,
      refPath,
    };
    return;
  }

  const itemsRefPath = rawOptions.itemsRefPath;
  if (itemsRefPath && typeof itemsRefPath === 'string') {
    schemas.get(name)[key][0] = {
      ...schemas.get(name)[key][0],
      type: mongoose.Schema.Types.ObjectId,
      refPath: itemsRefPath,
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
    schemas.get(name)[key] = {
      ...schemas.get(name)[key],
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
  const subSchema = schemas.get(instance.constructor.name);
  if (!subSchema && !isPrimitive(Type) && !isObject(Type)) {
    throw new InvalidPropError(Type.name, key);
  }

  const { ['ref']: r, ['items']: i, ['of']: o, ...options } = rawOptions;
  if (isPrimitive(Type)) {
    if (whatis === WhatIsIt.ARRAY) {
      schemas.get(name)[key] = {
        ...schemas.get(name)[key][0],
        ...options,
        // HACK: replace this with "[Type]" if https://github.com/Automattic/mongoose/issues/8034 got fixed
        type: [Type.name === 'ObjectID' ? 'ObjectId' : Type]
      };
      return;
    }
    if (whatis === WhatIsIt.MAP) {
      const { mapDefault } = options;
      delete options.mapDefault;
      schemas.get(name)[key] = {
        ...schemas.get(name)[key],
        type: Map,
        default: mapDefault,
        of: { type: Type, ...options }
      };
      return;
    }
    schemas.get(name)[key] = {
      ...schemas.get(name)[key],
      ...options,
      type: Type
    };
    return;
  }

  // If the 'Type' is not a 'Primitive Type' and no subschema was found treat the type as 'Object'
  // so that mongoose can store it as nested document
  if (isObject(Type) && !subSchema) {
    schemas.get(name)[key] = {
      ...schemas.get(name)[key],
      ...options,
      type: Object
    };
    return;
  }

  if (whatis === WhatIsIt.ARRAY) {
    schemas.get(name)[key] = {
      ...schemas.get(name)[key][0], // [0] is needed, because "initasArray" adds this (empty)
      ...options,
      type: [{
        ...(typeof options._id !== 'undefined' ? { _id: options._id } : {}),
        ...subSchema,
      }]
    };
    return;
  }

  if (whatis === WhatIsIt.MAP) {
    schemas.get(name)[key] = {
      ...schemas.get(name)[key],
      type: Map,
      ...options
    };
    (schemas.get(name)[key] as mongoose.SchemaTypeOpts<Map<any, any>>).of = {
      ...(schemas.get(name)[key] as mongoose.SchemaTypeOpts<Map<any, any>>).of,
      ...subSchema
    };
    return;
  }
  const Schema = mongoose.Schema;

  const supressSubschemaId = rawOptions._id === false;
  const virtualSchema = new Schema({ ...subSchema }, supressSubschemaId ? { _id: false } : {});

  const schemaInstanceMethods = methods.instanceMethods.get(instance.constructor.name);
  if (schemaInstanceMethods) {
    virtualSchema.methods = Object.fromEntries(schemaInstanceMethods);
  }

  schemas.get(name)[key] = {
    ...schemas.get(name)[key],
    ...options,
    type: virtualSchema
  };
  return;
}

/**
 * Set Property Options for the property below
 * @param options Options
 * @public
 */
export function prop(options: PropOptionsWithValidate = {}) {
  return (target: any, key: string) => {
    const Type = (Reflect as any).getMetadata('design:type', target, key);

    if (!Type) {
      throw new NoMetadataError(key);
    }

    baseProp(options, Type, target, key, WhatIsIt.NONE);
  };
}

export interface ArrayPropOptions extends BasePropOptions {
  /** What array is it? 
   * Note: this is only needed because Reflect & refelact Metadata cant give an accurate Response for an array
   */
  items?: any;
  /** Same as {@link PropOptions.ref}, only that it is for an array */
  itemsRef?: any;
  /** Same as {@link PropOptions.refPath}, only that it is for an array */
  itemsRefPath?: any;
}
export interface MapPropOptions extends BasePropOptions {
  of?: any;
  mapDefault?: any;
}

/**
 * Set Property(that are Maps) Options for the property below
 * @param options Options for the Map
 * @public
 */
export function mapProp(options: MapPropOptions) {
  return (target: any, key: string) => {
    const Type = options.of;
    baseProp(options, Type, target, key, WhatIsIt.MAP);
  };
}
/**
 * Set Property(that are Arrays) Options for the property below
 * @param options Options
 * @public
 */
export function arrayProp(options: ArrayPropOptions) {
  return (target: any, key: string) => {
    const Type = options.items;
    baseProp(options, Type, target, key, WhatIsIt.ARRAY);
  };
}

/**
 * Reference another Model
 */
export type Ref<T> = T | mongoose.Schema.Types.ObjectId;
