import * as mongoose from 'mongoose';

import { isNullOrUndefined } from 'util';
import { DecoratorKeys } from './internal/constants';
import { decoratorCache, schemas, virtuals } from './internal/data';
import {
  InvalidPropError,
  InvalidTypeError,
  NoMetadataError,
  NotAllVPOPElementsError,
  NotNumberTypeError,
  NotStringTypeError
} from './internal/errors';
import { _buildSchema } from './internal/schema';
import * as utils from './internal/utils';
import { buildSchema } from './typegoose';
import {
  AnyParamConstructor,
  ArrayPropOptions,
  MapPropOptions,
  PropOptions,
  PropOptionsWithValidate
} from './types';

/** This Enum is meant for baseProp to decide for diffrent props (like if it is an arrayProp or prop or mapProp) */
enum WhatIsIt {
  ARRAY,
  MAP,
  NONE
}

/**
 * Base Function for prop & arrayProp
 * @param rawOptions The options (like require)
 * @param Type What Type it is
 * @param target Target Class
 * @param key Value Key of target class
 * @param isArray is it an array?
 */
function baseProp(
  rawOptions: any,
  Type: AnyParamConstructor<any>,
  target: any,
  key: string,
  whatis: WhatIsIt = WhatIsIt.NONE
): void {
  const initname = utils.createUniqueID(target);

  decoratorCache.get(initname).decorators.set(key, () => {
    if (utils.isNotDefined(Type)) {
      if (Type !== target) { // prevent "infinite" buildSchema loop / Maximum Class size exceeded
        buildSchema(Type, { _id: typeof rawOptions._id === 'boolean' ? rawOptions._id : true });
      }
    }
    const name: string = utils.getName(target.constructor);
    rawOptions = Object.assign(rawOptions, {});

    if (!virtuals.get(name)) {
      virtuals.set(name, new Map());
    }

    if (utils.isWithVirtualPOP(rawOptions)) {
      if (!utils.includesAllVirtualPOP(rawOptions)) {
        throw new NotAllVPOPElementsError(name, key);
      }
      virtuals.get(name).set(key, rawOptions);

      return;
    }

    if (whatis === WhatIsIt.ARRAY) {
      utils.initAsArray(name, key);
    } else {
      utils.initAsObject(name, key);
    }

    if (!isNullOrUndefined(rawOptions.set) || !isNullOrUndefined(rawOptions.get)) {
      if (typeof rawOptions.set !== 'function') {
        throw new TypeError(`"${name}.${key}" does not have a set function!`);
      }
      if (typeof rawOptions.get !== 'function') {
        throw new TypeError(`"${name}.${key}" does not have a get function!`);
      }

      const newType = rawOptions && rawOptions.type ? rawOptions.type : Type;
      if (rawOptions && rawOptions.type) {
        delete rawOptions.type;
      }
      /*
       * Note:
       * this dosnt have a check if prop & returntype of the function is the same,
       * because it cant be accessed at runtime
       */
      schemas.get(name)[key] = {
        ...schemas.get(name)[key],
        type: newType,
        ...rawOptions
      };

      return;
    }

    const ref = rawOptions.ref;
    const refType = rawOptions.refType || mongoose.Schema.Types.ObjectId;
    if (ref) {
      delete rawOptions.ref;
      schemas.get(name)[key] = {
        ...schemas.get(name)[key],
        type: refType,
        ref: typeof ref === 'string' ? ref : ref.name,
        ...rawOptions
      };

      return;
    }

    const itemsRef = rawOptions.itemsRef;
    const itemsRefType = rawOptions.itemsRefType || mongoose.Schema.Types.ObjectId;
    if (itemsRef) {
      delete rawOptions.itemsRef;
      schemas.get(name)[key][0] = {
        ...schemas.get(name)[key][0],
        type: itemsRefType,
        ref: typeof itemsRef === 'string' ? itemsRef : itemsRef.name,
        ...rawOptions
      };

      return;
    }

    const refPath = rawOptions.refPath;
    if (refPath && typeof refPath === 'string') {
      delete rawOptions.refPath;
      schemas.get(name)[key] = {
        ...schemas.get(name)[key],
        type: itemsRefType,
        refPath,
        ...rawOptions
      };

      return;
    }

    const itemsRefPath = rawOptions.itemsRefPath;
    if (itemsRefPath && typeof itemsRefPath === 'string') {
      delete rawOptions.itemsRefPath;
      schemas.get(name)[key][0] = {
        ...schemas.get(name)[key][0],
        type: itemsRefType,
        refPath: itemsRefPath,
        ...rawOptions
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

    // check if Type is actually a real working Type
    if (isNullOrUndefined(Type) || typeof Type !== 'function') {
      throw new InvalidTypeError(target.name, key, Type);
    }

    // check for validation inconsistencies
    if (utils.isWithStringValidate(rawOptions) && !utils.isString(Type)) {
      throw new NotStringTypeError(key);
    }

    // check for transform inconsistencies
    if (utils.isWithStringTransform(rawOptions) && !utils.isString(Type)) {
      throw new NotStringTypeError(key);
    }

    if (utils.isWithNumberValidate(rawOptions) && !utils.isNumber(Type)) {
      throw new NotNumberTypeError(key);
    }

    const subSchema = schemas.get(utils.getName(Type));
    if (!subSchema && !utils.isPrimitive(Type) && !utils.isObject(Type)) {
      throw new InvalidPropError(Type.name, key); // This seems to be never thrown!
    }

    const { ['items']: items, ...options } = rawOptions;
    if (utils.isPrimitive(Type)) {
      switch (whatis) {
        case WhatIsIt.ARRAY:
          schemas.get(name)[key] = {
            ...schemas.get(name)[key][0],
            ...options,
            type: [Type]
          };

          return;
        case WhatIsIt.MAP:
          // "default" is a reserved keyword, thats why "_default" is used
          const { default: _default }: PropOptions = options;
          delete options.default;
          delete options.of;
          schemas.get(name)[key] = {
            ...schemas.get(name)[key],
            type: Map,
            default: _default,
            of: { type: Type, ...options }
          };

          return;
        case WhatIsIt.NONE:
          schemas.get(name)[key] = {
            ...schemas.get(name)[key],
            ...options,
            type: Type
          };

          return;
        default:
          throw new Error(`"${whatis}"(whatis(primitive)) is invalid for "${name}.${key}"`);
      }
    }

    // If the 'Type' is not a 'Primitive Type' and no subschema was found treat the type as 'Object'
    // so that mongoose can store it as nested document
    if (utils.isObject(Type) && !subSchema) {
      schemas.get(name)[key] = {
        ...schemas.get(name)[key],
        ...options,
        type: Object // i think this could take some improvements
      };

      return;
    }

    switch (whatis) {
      case WhatIsIt.ARRAY:
        schemas.get(name)[key] = {
          ...schemas.get(name)[key][0], // [0] is needed, because "initasArray" adds this (empty)
          ...options,
          type: [{
            ...(typeof options._id === 'boolean' ? { _id: options._id } : {}),
            ...subSchema
          }]
        };

        return;
      case WhatIsIt.MAP:
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
      case WhatIsIt.NONE:
        const virtualSchema = buildSchema(Type, {
          _id: typeof rawOptions._id === 'boolean' ? rawOptions._id : true
        });
        schemas.get(name)[key] = {
          ...schemas.get(name)[key],
          ...options,
          type: virtualSchema
        };

        return;
      default:
        throw new Error(`"${whatis}"(whatis(subSchema)) is invalid for "${name}.${key}"`);
    }
  });
}

/**
 * Set Property Options for the property below
 * @param options Options
 * @public
 */
export function prop(options: PropOptionsWithValidate = {}) {
  return (target: any, key: string) => {
    const Type = Reflect.getMetadata(DecoratorKeys.Prop, target, key);
    if (!Type) {
      throw new NoMetadataError(key);
    }

    baseProp(options, Type, target, key, WhatIsIt.NONE);
  };
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
