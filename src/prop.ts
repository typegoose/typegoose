import * as mongoose from 'mongoose';
import { format, isNullOrUndefined } from 'util';
import { DecoratorKeys } from './internal/constants';
import { schemas, virtuals } from './internal/data';
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
import { logger } from './logSettings';
import { buildSchema } from './typegoose';
import {
  ArrayPropOptions,
  DecoratedPropertyMetadata,
  DecoratedPropertyMetadataMap,
  MapPropOptions,
  PropOptions,
  PropOptionsWithValidate,
  WhatIsIt
} from './types';

/**
 * Base Function for prop & arrayProp
 * @param input All the options needed for prop's
 */
function baseProp(input: DecoratedPropertyMetadata): void {
  const {
    Type,
    key,
    origOptions,
    target,
    whatis
  } = input;
  if (Type === target.constructor) { // prevent "infinite" buildSchema loop / Maximum Stack size exceeded
    throw new TypeError('It seems like the type used is the same as the target class, which is currently not supported\n'
      + `Please look at https://github.com/typegoose/typegoose/issues/42 for more infomation, for now please avoid using it!`);
  }

  // assign a Unique ID to the target class
  utils.createUniqueID(target);

  const existingMapForTarget = Reflect.getOwnMetadata(DecoratorKeys.PropCache, target) as DecoratedPropertyMetadataMap;
  if (isNullOrUndefined(existingMapForTarget)) {
    Reflect.defineMetadata(DecoratorKeys.PropCache, new Map<string, DecoratedPropertyMetadata>(), target);
  }
  const mapForTarget = existingMapForTarget
    || Reflect.getOwnMetadata(DecoratorKeys.PropCache, target) as DecoratedPropertyMetadataMap;

  mapForTarget.set(key, { origOptions, Type, target, key, whatis });

  logger.debug('Added "%s.%s" to the Decorator Cache', target.constructor.name, key);
}

/**
 * Function that is the actual processing of the prop's (used for caching)
 * @param input All the options needed for prop's
 */
export function _buildPropMetadata(input: DecoratedPropertyMetadata) {
  let { Type } = input;
  const {
    key,
    origOptions,
    target,
    whatis
  } = input;
  const rawOptions = Object.assign({}, origOptions);
  logger.debug('Starting to process "%s.%s"', target.constructor.name, key);

  if (!isNullOrUndefined(rawOptions.type)) {
    logger.info('Prop Option "type" is set to', rawOptions.type);
    Type = rawOptions.type;
  }

  if (utils.isNotDefined(Type) && isNullOrUndefined(rawOptions.type)) {
    buildSchema(Type, { _id: typeof rawOptions._id === 'boolean' ? rawOptions._id : true });
  }
  const name: string = utils.getName(target.constructor);

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
    if (!isNullOrUndefined(rawOptions && rawOptions.type)) {
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
  const refType = rawOptions.refType || rawOptions.type || mongoose.Schema.Types.ObjectId;
  if (!isNullOrUndefined(ref)) {
    delete rawOptions.ref;
    const refName = typeof ref === 'string' ? ref : utils.getName(ref);

    switch (whatis) {
      case WhatIsIt.ARRAY:
        schemas.get(name)[key][0] = {
          ...schemas.get(name)[key][0],
          type: refType,
          ref: refName,
          ...rawOptions
        };
        break;
      case WhatIsIt.NONE:
        schemas.get(name)[key] = {
          ...schemas.get(name)[key],
          type: refType,
          ref: refName,
          ...rawOptions
        };
        break;
      default:
        throw new TypeError(format('"ref" is not supported for "%s"! (%s, %s)',
          whatis, utils.getName(target), key));
    }

    return;
  }

  const refPath = rawOptions.refPath;
  if (refPath) {
    if (typeof refPath !== 'string') {
      throw new TypeError(format('"refPath" for "%s, %s" should be of type String!',
        utils.getName(target), key));
    }
    delete rawOptions.refPath;

    switch (whatis) {
      case WhatIsIt.ARRAY:
        schemas.get(name)[key][0] = {
          ...schemas.get(name)[key][0],
          type: refType,
          refPath,
          ...rawOptions
        };
        break;
      case WhatIsIt.NONE:
        schemas.get(name)[key] = {
          ...schemas.get(name)[key],
          type: refType,
          refPath,
          ...rawOptions
        };
        break;
      default:
        throw new TypeError(format('"refPath" is not supported for "%s"! (%s, %s)',
          whatis, utils.getName(target), key));
    }

    return;
  }

  const enumOption = rawOptions.enum;
  if (!isNullOrUndefined(enumOption)) {
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

  {
    // check if Type is actually a real working Type
    if (isNullOrUndefined(Type) || typeof Type !== 'function') {
      throw new InvalidTypeError(target.constructor.name, key, Type);
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
          ...utils.mapArrayOptions(rawOptions, Type, target, key)
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
    utils.warnMixed(target, key);
    schemas.get(name)[key] = {
      ...schemas.get(name)[key],
      ...options,
      type: mongoose.Schema.Types.Mixed
    };

    return;
  }

  switch (whatis) {
    case WhatIsIt.ARRAY:
      const virtualSchemaArrayItem = buildSchema(Type, {
        _id: typeof rawOptions._id === 'boolean' ? rawOptions._id : true
      });
      schemas.get(name)[key] = {
        ...schemas.get(name)[key][0], // [0] is needed, because "initasArray" adds this (empty)
        ...options,
        type: [virtualSchemaArrayItem]
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
}

/**
 * Set Property Options for the property below
 * @param options Options
 * @public
 */
export function prop(options: PropOptionsWithValidate = {}) {
  return (target: any, key: string) => {
    const Type = Reflect.getMetadata(DecoratorKeys.Type, target, key);
    if (!Type) {
      throw new NoMetadataError(key);
    }

    // soft errors
    {
      if ('items' in options) {
        logger.warn(new Error(
          format('You might not want to use option "items" in a @prop, use @arrayProp (%s.%s)', utils.getName(target), key)
        ));
      }

      if ('of' in options) {
        logger.warn(new Error(
          format('You might not want to use option "of" in a @prop, use @mapProp (%s.%s)', utils.getName(target), key)
        ));
      }
    }

    baseProp({
      Type,
      key,
      origOptions: options,
      target,
      whatis: WhatIsIt.NONE
    });
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

    if ('items' in options) {
      logger.warn(new Error(
        format('You might not want to use option "items" in a @mapProp, use @arrayProp (%s.%s)', utils.getName(target), key)
      ));
    }

    baseProp({
      Type,
      key,
      origOptions: options,
      target,
      whatis: WhatIsIt.MAP
    });
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

    if ('of' in options) {
      logger.warn(new Error(
        format('You might not want to use option "of" in a @arrayProp, use @mapProp (%s.%s)', utils.getName(target), key)
      ));
    }

    if ('items' in options) {
      delete options.items;
    }
    if ('itemsRef' in options) {
      options.ref = options.itemsRef;
      delete options.itemsRef;
    }
    if ('itemsRefPath' in options) {
      options.refPath = options.itemsRefPath;
      delete options.itemsRefPath;
    }
    if ('itemsRefType' in options) {
      options.refType = options.itemsRefType;
      delete options.itemsRefType;
    }

    baseProp({
      Type,
      key,
      origOptions: options,
      target,
      whatis: WhatIsIt.ARRAY
    });
  };
}
