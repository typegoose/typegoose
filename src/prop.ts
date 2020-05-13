import * as mongoose from 'mongoose';
import { format } from 'util';

import { DecoratorKeys, WhatIsIt } from './internal/constants';
import { schemas } from './internal/data';
import {
  InvalidPropError,
  InvalidTypeError,
  NoMetadataError,
  NotAllVPOPElementsError,
  NotNumberTypeError,
  NotStringTypeError
} from './internal/errors';
import * as utils from './internal/utils';
import { logger } from './logSettings';
import { buildSchema } from './typegoose';
import type {
  ArrayPropOptions,
  DecoratedPropertyMetadata,
  DecoratedPropertyMetadataMap,
  MapPropOptions,
  PropOptionsWithValidate,
  VirtualPopulateMap
} from './types';

/**
 * Base Function for prop & arrayProp
 * @param input All the options needed for prop's
 */
function baseProp(input: DecoratedPropertyMetadata): void {
  const { Type, key, origOptions, target, whatis } = input;
  if (Type === target.constructor) {
    // prevent "infinite" buildSchema loop / Maximum Stack size exceeded
    throw new TypeError(
      'It seems like the type used is the same as the target class, which is currently not supported\n' +
      `Please look at https://github.com/typegoose/typegoose/issues/42 for more information, for now please avoid using it!`
    );
  }

  const existingMapForTarget = Reflect.getOwnMetadata(DecoratorKeys.PropCache, target) as DecoratedPropertyMetadataMap;
  if (utils.isNullOrUndefined(existingMapForTarget)) {
    Reflect.defineMetadata(DecoratorKeys.PropCache, new Map<string, DecoratedPropertyMetadata>(), target);
  }
  const mapForTarget = existingMapForTarget ?? (Reflect.getOwnMetadata(DecoratorKeys.PropCache, target) as DecoratedPropertyMetadataMap);

  mapForTarget.set(key, { origOptions, Type, target, key, whatis });

  logger.debug('Added "%s.%s" to the Decorator Cache', utils.getName(target.constructor), key);
}

/**
 * Function that is the actual processing of the prop's (used for caching)
 * @param input All the options needed for prop's
 */
export function _buildPropMetadata(input: DecoratedPropertyMetadata) {
  let { Type } = input;
  const { key, origOptions, target, whatis } = input;
  const rawOptions = Object.assign({}, origOptions);
  logger.debug('Starting to process "%s.%s"', utils.getName(target), key);

  if (!utils.isNullOrUndefined(rawOptions.type)) {
    logger.info('Prop Option "type" is set to', rawOptions.type);
    Type = rawOptions.type;
    delete rawOptions.type;
  }

  if (utils.isNotDefined(Type)) {
    buildSchema(Type);
  }
  const name = utils.getName(target);

  // allow setting the type asynchronously
  if (rawOptions?.ref instanceof Function && utils.isNullOrUndefined(rawOptions?.ref.prototype)) {
    logger.debug('"%s.%s" option ref is an arrow-function', name, key);
    rawOptions.ref = rawOptions.ref();
    utils.assertion(
      !utils.isNullOrUndefined(rawOptions.ref),
      new Error(format('Option "ref" for "%s.%s" was defined with an arrow-function, but the function returned null/undefined!', name, key))
    );
  }

  if (!utils.isNullOrUndefined(rawOptions.ref)) {
    rawOptions.ref = typeof rawOptions.ref === 'string' ? rawOptions.ref : utils.getName(rawOptions.ref);
  }

  if (utils.isWithVirtualPOP(rawOptions)) {
    if (!utils.includesAllVirtualPOP(rawOptions)) {
      throw new NotAllVPOPElementsError(name, key);
    }

    const virtuals: VirtualPopulateMap = new Map(Reflect.getMetadata(DecoratorKeys.VirtualPopulate, target.constructor) ?? []);
    virtuals.set(key, rawOptions);
    Reflect.defineMetadata(DecoratorKeys.VirtualPopulate, virtuals, target.constructor);

    return;
  }

  const schemaProp = utils.initProperty(name, key, whatis);

  if (!utils.isNullOrUndefined(rawOptions.set) || !utils.isNullOrUndefined(rawOptions.get)) {
    utils.assertion(typeof rawOptions?.set === 'function', new TypeError(`"${name}.${key}" does not have a set function!`));
    utils.assertion(typeof rawOptions?.get === 'function', new TypeError(`"${name}.${key}" does not have a get function!`));

    /*
     * Note:
     * this doesn't have a check if prop & returntype of the function is the same,
     * because it can't be accessed at runtime
     */
    schemaProp[key] = {
      ...schemaProp[key],
      type: Type,
      ...rawOptions
    };

    return;
  }

  const ref = rawOptions?.ref;
  // use "rawOptions.refType" if set, otherwise "Type" if it is an suitable ref-type, otherwise default back to "ObjectId"
  const refType = rawOptions?.refType ?? (utils.isAnRefType(Type) ? Type : undefined) ?? mongoose.Schema.Types.ObjectId;
  if (!utils.isNullOrUndefined(ref)) {
    delete rawOptions.ref;

    switch (whatis) {
      case WhatIsIt.ARRAY:
        schemaProp[key] = utils.createArrayFromDimensions(
          rawOptions,
          {
            ...schemaProp[key][0],
            type: refType,
            ref,
            ...rawOptions
          },
          name,
          key
        );
        break;
      case WhatIsIt.NONE:
        schemaProp[key] = {
          ...schemaProp[key],
          type: refType,
          ref,
          ...rawOptions
        };
        break;
      default:
        throw new TypeError(format('"ref" is not supported for "%s"! (%s, %s)', whatis, utils.getName(target), key));
    }

    return;
  }

  const refPath = rawOptions?.refPath;
  if (refPath) {
    utils.assertion(
      typeof refPath === 'string',
      new TypeError(format('"refPath" for "%s, %s" should be of type String!', utils.getName(target), key))
    );

    delete rawOptions.refPath;

    switch (whatis) {
      case WhatIsIt.ARRAY:
        schemaProp[key] = utils.createArrayFromDimensions(
          rawOptions,
          {
            ...schemaProp[key][0],
            type: refType,
            refPath,
            ...rawOptions
          },
          name,
          key
        );
        break;
      case WhatIsIt.NONE:
        schemaProp[key] = {
          ...schemaProp[key],
          type: refType,
          refPath,
          ...rawOptions
        };
        break;
      default:
        throw new TypeError(format('"refPath" is not supported for "%s"! (%s, %s)', whatis, utils.getName(target), key));
    }

    return;
  }

  const enumOption = rawOptions?.enum;
  if (!utils.isNullOrUndefined(enumOption)) {
    // check if the supplied value is already "mongoose-consumeable"
    if (!Array.isArray(enumOption)) {
      if (Type === String) {
        rawOptions.enum = Object.entries<string>(enumOption) // get all key-value pairs of the enum
          // no reverse-filtering because if it is full of strings, there is no reverse mapping
          .map(([enumKey, enumValue]) => {
            // convert key-value pairs to an mongoose-usable enum
            // safeguard, this should never happen because TypeScript only sets "design:type" to "String"
            // if the enum is full of strings
            if (typeof enumValue !== 'string') {
              throw new NotStringTypeError(name, key, enumKey, typeof enumValue);
            }

            return enumValue;
          });
      } else if (Type === Number) {
        rawOptions.enum = Object.entries<string | number>(enumOption) // get all key-value pairs of the enum
          // filter out the "reverse (value -> name) mappings"
          // https://www.typescriptlang.org/docs/handbook/enums.html#reverse-mappings
          .filter(([enumKey, enumValue], _i, arr) => {
            // safeguard, this should never happen because typescript only sets "design:type" to "Number"
            // if the enum is full of numbers
            if (utils.isNullOrUndefined(enumValue) || arr.findIndex(([k]) => k === enumValue.toString()) <= -1) {
              // if there is no reverse mapping, throw an error
              throw new NotNumberTypeError(name, key, enumKey, typeof enumValue);
            }

            return typeof enumValue === 'number';
          })
          .map(([enumKey, enumValue]) => {
            // convert key-value pairs to an mongoose-useable enum
            if (typeof enumValue !== 'number') {
              throw new NotNumberTypeError(name, key, enumKey, typeof enumValue);
            }

            return enumValue;
          });
      } else {
        // this will happen if the enum contains both types ("design:type" will be "Object")
        // this should never happen, because it is prevented by typescript (failsafe)
        throw new Error(`Invalid type used for map!, got: "${Type}" (${name}.${key})`);
      }
    }
  }

  if (!utils.isNullOrUndefined(rawOptions.addNullToEnum)) {
    rawOptions.enum = Array.isArray(rawOptions.enum) ? rawOptions.enum : [];
    rawOptions.enum.push(null);
    delete rawOptions.addNullToEnum;
  }

  const selectOption = rawOptions?.select;
  if (typeof selectOption === 'boolean') {
    schemaProp[key] = {
      ...schemaProp[key],
      select: selectOption
    };
  }

  {
    // check if Type is actually a real working Type
    if (utils.isNullOrUndefined(Type) || typeof Type !== 'function') {
      throw new InvalidTypeError(utils.getName(target), key, Type);
    }

    // check for validation inconsistencies
    if (utils.isWithStringValidate(rawOptions) && !utils.isString(Type)) {
      throw new NotStringTypeError(name, key);
    }

    // check for transform inconsistencies
    if (utils.isWithStringTransform(rawOptions) && !utils.isString(Type)) {
      throw new NotStringTypeError(name, key);
    }

    if (utils.isWithNumberValidate(rawOptions) && !utils.isNumber(Type)) {
      throw new NotNumberTypeError(name, key);
    }
  }

  /** Is this Type (/Class) in the schemas Map? */
  const isInSchemas = schemas.has(utils.getName(Type));
  if (!isInSchemas && !utils.isPrimitive(Type) && !utils.isObject(Type)) {
    throw new InvalidPropError(Type.name, key); // This seems to be never thrown!
  }

  if (utils.isPrimitive(Type)) {
    if (utils.isObject(Type, true)) {
      utils.warnMixed(target, key);
    }
    switch (whatis) {
      case WhatIsIt.ARRAY:
        schemaProp[key] = {
          ...schemaProp[key][0],
          ...utils.mapArrayOptions(rawOptions, Type, target, key)
        };

        return;
      case WhatIsIt.MAP:
        const mapped = utils.mapOptions(rawOptions, Type, target, key, true);

        schemaProp[key] = {
          ...schemaProp[key],
          ...mapped.outer,
          type: Map,
          of: { type: Type, ...mapped.inner }
        };

        return;
      case WhatIsIt.NONE:
        schemaProp[key] = {
          ...schemaProp[key],
          ...rawOptions,
          type: Type
        };

        return;
      default:
        throw new Error(`"${whatis}"(whatis(primitive)) is invalid for "${name}.${key}"`);
    }
  }

  // If the 'Type' is not a 'Primitive Type' and no subschema was found treat the type as 'Object'
  // so that mongoose can store it as nested document
  if (utils.isObject(Type) && !isInSchemas) {
    utils.warnMixed(target, key);
    logger.warn(
      'if someone can see this message, please open an new issue at https://github.com/typegoose/typegoose/issues with reproduction code for tests'
    );
    schemaProp[key] = {
      ...schemaProp[key],
      ...rawOptions,
      type: mongoose.Schema.Types.Mixed
    };

    return;
  }

  const virtualSchema = buildSchema(Type);
  switch (whatis) {
    case WhatIsIt.ARRAY:
      schemaProp[key] = {
        ...schemaProp[key][0], // [0] is needed, because "initasArray" adds this (empty)
        ...utils.mapArrayOptions(rawOptions, virtualSchema, target, key, Type)
      };

      return;
    case WhatIsIt.MAP:
      const mapped = utils.mapOptions(rawOptions, virtualSchema, target, key, false, Type);

      schemaProp[key] = {
        ...schemaProp[key],
        ...mapped.outer,
        type: Map,
        of: { type: virtualSchema, ...mapped.inner }
      };

      return;
    case WhatIsIt.NONE:
      schemaProp[key] = {
        ...schemaProp[key],
        ...rawOptions,
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
    utils.assertion(!utils.isNullOrUndefined(Type), new NoMetadataError(key));

    // soft errors
    {
      if ('items' in options) {
        logger.warn('You might not want to use option "items" in a @prop, use @arrayProp (%s.%s)', utils.getName(target), key);
      }

      if ('of' in options) {
        logger.warn('You might not want to use option "of" in a @prop, use @mapProp (%s.%s)', utils.getName(target), key);
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
    const Type = options?.of;
    delete options.of;

    if ('items' in options) {
      logger.warn('You might not want to use option "items" in a @mapProp, use @arrayProp (%s.%s)', utils.getName(target), key);
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
    const Type = options?.items;

    if ('of' in options) {
      logger.warn('You might not want to use option "of" in a @arrayProp, use @mapProp (%s.%s)', utils.getName(target), key);
    }

    // Delete the "items" option from options because it got set as "Type"
    if ('items' in options) {
      delete options.items;
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

// Export it PascalCased
export const Prop = prop;
export const ArrayProp = arrayProp;
export const MapProp = mapProp;
