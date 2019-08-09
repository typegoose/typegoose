import * as mongoose from 'mongoose';

import { isNullOrUndefined } from 'util';
import { schemas, virtuals } from './data';
import {
  InvalidPropError,
  NoMetadataError,
  NotAllElementsError,
  NotNumberTypeError,
  NotStringTypeError
} from './errors';
import { _buildSchema } from './schema';
import {
  BasePropOptions,
  NoParamConstructor,
  PropOptionsWithNumberValidate,
  PropOptionsWithStringValidate,
  PropOptionsWithValidate
} from './types';
import { initAsArray, initAsObject, isNumber, isObject, isPrimitive, isString } from './utils';

/** This Enum is meant for baseProp to decide for diffrent props (like if it is an arrayProp or prop or mapProp) */
enum WhatIsIt {
  ARRAY,
  MAP,
  NONE
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

const virtualOptions = ['localField', 'foreignField'];

/**
 * Base Function for prop & arrayProp
 * @param rawOptions The options (like require)
 * @param Type What Type it is
 * @param target <no info>
 * @param key <no info>
 * @param isArray is it an array?
 */
function baseProp(
  rawOptions: any,
  Type: NoParamConstructor<any>,
  target: any,
  key: string,
  whatis: WhatIsIt = WhatIsIt.NONE
): void {
  const name: string = target.constructor.name;
  rawOptions = Object.assign(rawOptions, {});

  if (!virtuals.get(name)) {
    virtuals.set(name, new Map());
  }

  if (Object.keys(rawOptions).some((val) => virtualOptions.includes(val))) {
    if (!virtualOptions.every((val) => Object.keys(rawOptions).includes(val))) {
      throw new NotAllElementsError(name, key, virtualOptions);
    }
    virtuals.get(name).set(key, rawOptions);

    return;
  }

  if (whatis === WhatIsIt.ARRAY) {
    initAsArray(name, key);
  } else {
    initAsObject(name, key);
  }

  if (!isNullOrUndefined(rawOptions.set) || !isNullOrUndefined(rawOptions.get)) {
    if (typeof rawOptions.set !== 'function') {
      throw new TypeError(`"${name}.${key}" does not have a set function!`);
    }
    if (typeof rawOptions.get !== 'function') {
      throw new TypeError(`"${name}.${key}" does not have a get function!`);
    }
    /*
     * Note:
     * this dosnt have a check if prop & returntype of the function is the same, because it cant be accessed at runtime
     */
    schemas.get(name)[key] = {
      ...schemas.get(name)[key],
      type: Type,
      set: rawOptions.set,
      get: rawOptions.get
    };
  }

  const ref = rawOptions.ref;
  if (typeof ref === 'string') {
    schemas.get(name)[key] = {
      ...schemas.get(name)[key],
      type: mongoose.Schema.Types.ObjectId,
      ref
    };

    return;
  } else if (ref) {
    schemas.get(name)[key] = {
      ...schemas.get(name)[key],
      type: mongoose.Schema.Types.ObjectId,
      ref: ref.name
    };

    return;
  }

  const itemsRef = rawOptions.itemsRef;
  if (typeof itemsRef === 'string') {
    schemas.get(name)[key][0] = {
      ...schemas.get(name)[key][0],
      type: mongoose.Schema.Types.ObjectId,
      ref: itemsRef
    };

    return;
  } else if (itemsRef) {
    schemas.get(name)[key][0] = {
      ...schemas.get(name)[key][0],
      type: mongoose.Schema.Types.ObjectId,
      ref: itemsRef.name
    };

    return;
  }

  const refPath = rawOptions.refPath;
  if (refPath && typeof refPath === 'string') {
    schemas.get(name)[key] = {
      ...schemas.get(name)[key],
      type: mongoose.Schema.Types.ObjectId,
      refPath
    };

    return;
  }

  const itemsRefPath = rawOptions.itemsRefPath;
  if (itemsRefPath && typeof itemsRefPath === 'string') {
    schemas.get(name)[key][0] = {
      ...schemas.get(name)[key][0],
      type: mongoose.Schema.Types.ObjectId,
      refPath: itemsRefPath
    };

    return;
  }

  const enumOption = rawOptions.enum;
  if (enumOption) {
    if (!Array.isArray(enumOption)) {
      rawOptions.enum = Object.keys(enumOption).map((propKey) => enumOption[propKey]);
    }
  }

  const selectOption = rawOptions.select;
  if (typeof selectOption === 'boolean') {
    schemas.get(name)[key] = {
      ...schemas.get(name)[key],
      select: selectOption
    };
  }

  // check for validation inconsistencies
  if (isWithStringValidate(rawOptions) && !isString(Type)) {
    throw new NotStringTypeError(key);
  }

  // check for transform inconsistencies
  if (isWithStringTransform(rawOptions) && !isString(Type)) {
    throw new NotStringTypeError(key);
  }

  if (isWithNumberValidate(rawOptions) && !isNumber(Type)) {
    throw new NotNumberTypeError(key);
  }

  const subSchema = schemas.get(Type.name);
  if (!subSchema && !isPrimitive(Type) && !isObject(Type)) {
    throw new InvalidPropError(Type.name, key); // This seems to be never thrown!
  }

  const { ['ref']: r, ['items']: i, ['of']: o, ...options } = rawOptions;
  if (isPrimitive(Type)) {
    if (whatis === WhatIsIt.ARRAY) {
      schemas.get(name)[key] = {
        ...schemas.get(name)[key][0],
        ...options,
        type: [Type]
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
        ...subSchema
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

  const virtualSchema = _buildSchema(Type, null, { _id: rawOptions._id });
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
    const Type = Reflect.getMetadata('design:type', target, key);

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
