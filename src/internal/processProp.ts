import { logger } from '../logSettings';
import { buildSchema, mongoose, Passthrough } from '../typegoose';
import type {
  AnyParamConstructor,
  DecoratedPropertyMetadata,
  DiscriminatorObject,
  KeyStringAny,
  NestedDiscriminatorsMap,
  VirtualPopulateMap,
} from '../types';
import { DecoratorKeys, WhatIsIt } from './constants';
import { schemas } from './data';
import {
  CannotBeSymbolError,
  InvalidTypeError,
  InvalidWhatIsItError,
  NotAllVPOPElementsError,
  NotNumberTypeError,
  NotStringTypeError,
  OptionRefDoesNotSupportArraysError,
  RefOptionIsUndefinedError,
  SelfContainingClassError,
  StringLengthExpectedError,
} from './errors';
import * as utils from './utils';

/**
 * Function that is the actual processing of the prop's (used for caching)
 * @param input All the options needed for prop's
 */
export function processProp(input: DecoratedPropertyMetadata): void {
  const { key, target } = input;
  const name = utils.getName(target);
  const rawOptions: KeyStringAny = Object.assign({}, input.options);
  let Type: any | undefined = Reflect.getMetadata(DecoratorKeys.Type, target, key);
  const propKind = input.whatis ?? detectWhatIsIt(Type);

  logger.debug('Starting to process "%s.%s"', name, key);
  utils.assertion(typeof key === 'string', new CannotBeSymbolError(name, key));

  // optionDeprecation(rawOptions);

  {
    // soft errors & "type"-alias mapping
    switch (propKind) {
      case WhatIsIt.NONE:
        break;
      case WhatIsIt.MAP:
      case WhatIsIt.ARRAY:
        // set the "Type" to undefined if "ref" or "refPath" are defined, as an fallback in case "type" is also not defined
        if (('ref' in rawOptions || 'refPath' in rawOptions) && !('type' in rawOptions)) {
          Type = undefined;
        }

        break;
    }
  }

  if (!utils.isNullOrUndefined(rawOptions.type)) {
    logger.info('Prop Option "type" is set to ', rawOptions.type);
    const gotType = utils.getType(rawOptions.type);
    Type = gotType.type;

    if (gotType.dim > 0) {
      rawOptions.dim = gotType.dim;
    }

    delete rawOptions.type;
  }

  // prevent "infinite" buildSchema loop / Maximum Stack size exceeded
  if (Type === target.constructor) {
    throw new SelfContainingClassError(name, key);
  }

  // map to correct buffer type, otherwise it would result in "Mixed"
  if (Type === mongoose.Types.Buffer) {
    Type = mongoose.Schema.Types.Buffer;
  }

  // confirm that "WhatIsIt" is an ARRAY and if that the Type is still an *ARRAY, set them to Mixed
  // for issues like https://github.com/typegoose/typegoose/issues/300
  if (propKind === WhatIsIt.ARRAY && detectWhatIsIt(Type) === WhatIsIt.ARRAY) {
    logger.debug('Type is still *ARRAY, defaulting to Mixed');
    Type = mongoose.Schema.Types.Mixed;
  }

  // confirm that "WhatIsIt" is an MAP and if that the Type is still an *MAP, set them to Mixed
  if (propKind === WhatIsIt.MAP && detectWhatIsIt(Type) === WhatIsIt.MAP) {
    logger.debug('Type is still *Map, defaulting to Mixed');
    Type = mongoose.Schema.Types.Mixed;
  }

  if (utils.isNotDefined(Type)) {
    buildSchema(Type);
  }

  if ('discriminators' in rawOptions) {
    logger.debug('Found option "discriminators" in "%s.%s"', name, key);
    const gotType = utils.getType(rawOptions.discriminators, true);
    // REFACTOR: re-write this to be a Error inside errors.ts
    utils.assertion(
      gotType.dim === 1,
      new Error(
        `"PropOptions.discriminators" dosnt support Arrays higher and lower than 1 (got "${gotType.dim}" dimensions at "${name}.${key}") [E020]`
      )
    );
    const discriminators: DiscriminatorObject[] = (gotType.type as (AnyParamConstructor<any> | DiscriminatorObject)[]).map((val, index) => {
      if (utils.isConstructor(val)) {
        return { type: val };
      }
      if (typeof val === 'object') {
        if (!('type' in val)) {
          throw new Error(`"${name}.${key}" discriminator index "${index}" is an object, but does not contain the "type" property!`);
        }

        return val;
      }

      throw new Error(`"${name}.${key}" discriminators index "${index}" is not an object or an constructor!`);
    });

    const disMap: NestedDiscriminatorsMap = new Map(Reflect.getMetadata(DecoratorKeys.NestedDiscriminators, target.constructor) ?? []);
    disMap.set(key, discriminators);
    Reflect.defineMetadata(DecoratorKeys.NestedDiscriminators, disMap, target.constructor);

    delete rawOptions.discriminators;
  }

  // allow setting the type asynchronously
  if ('ref' in rawOptions) {
    const gotType = utils.getType(rawOptions.ref);
    utils.assertion(gotType.dim === 0, new OptionRefDoesNotSupportArraysError(gotType.dim, name, key));
    rawOptions.ref = gotType.type;
    utils.assertion(!utils.isNullOrUndefined(rawOptions.ref), new RefOptionIsUndefinedError(name, key));

    rawOptions.ref =
      typeof rawOptions.ref === 'string'
        ? rawOptions.ref
        : utils.isConstructor(rawOptions.ref)
        ? utils.getName(rawOptions.ref)
        : rawOptions.ref;
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

  if ('justOne' in rawOptions) {
    logger.warn(
      `Option "justOne" is defined in "${name}.${key}" but no Virtual-Populate-Options!\n` +
        'Look here for more: https://typegoose.github.io/typegoose/docs/api/virtuals#virtual-populate'
    );
  }

  const schemaProp = utils.initProperty(name, key, propKind);

  // do this early, because the other options (enum, ref, refPath, discriminators) should not matter for this one
  if (Type instanceof Passthrough) {
    logger.debug('Type is "instanceof Passthrough" ("%s.%s", %s, direct: %s)', name, key, propKind, Type.direct);
    // this is because the check above narrows down the type, which somehow is not compatible
    const newType: any = Type.raw;

    if (Type.direct) {
      schemaProp[key] = newType;

      return;
    }

    switch (propKind) {
      case WhatIsIt.ARRAY:
        // TODO: somehow this does not work, see https://github.com/Automattic/mongoose/issues/10750
        logger.warn(
          'Passthrough was used for "%s.%s", with WhatIsIt.ARRAY, which currently does not work, see https://github.com/Automattic/mongoose/issues/10750',
          name,
          key
        );
        schemaProp[key] = utils.mapArrayOptions(rawOptions, newType, target, key);

        return;
      case WhatIsIt.MAP:
        const mapped = utils.mapOptions(rawOptions, newType, target, key);

        schemaProp[key] = {
          ...mapped.outer,
          type: Map,
          of: { type: newType, ...mapped.inner },
        };

        return;
      case WhatIsIt.NONE:
        schemaProp[key] = {
          ...rawOptions,
          type: newType,
        };

        return;
      default:
        throw new InvalidWhatIsItError(propKind, name, key, 'whatis(Passthrough)');
    }
  }

  // use "Type" if it is an suitable ref-type, otherwise default back to "ObjectId"
  const refType = utils.isAnRefType(Type) ? Type : mongoose.Schema.Types.ObjectId;

  if ('ref' in rawOptions) {
    const ref = rawOptions.ref;
    delete rawOptions.ref;

    switch (propKind) {
      case WhatIsIt.ARRAY:
        schemaProp[key] = utils.mapArrayOptions(rawOptions, refType, target, key, undefined, { ref });
        break;
      case WhatIsIt.NONE:
        schemaProp[key] = {
          type: refType,
          ref,
          ...rawOptions,
        };
        break;
      case WhatIsIt.MAP:
        const mapped = utils.mapOptions(rawOptions, refType, target, key);

        schemaProp[key] = {
          ...mapped.outer,
          type: Map,
          of: {
            type: refType,
            ref,
            ...mapped.inner,
          },
        };
        break;
      default:
        throw new InvalidWhatIsItError(propKind, name, key, 'whatis(ref)');
    }

    return;
  }

  if ('refPath' in rawOptions) {
    const refPath = rawOptions.refPath;
    delete rawOptions.refPath;

    utils.assertion(
      typeof refPath === 'string' && refPath.length > 0,
      new StringLengthExpectedError(1, refPath, `${name}.${key}`, 'refPath')
    );

    switch (propKind) {
      case WhatIsIt.ARRAY:
        schemaProp[key] = utils.mapArrayOptions(rawOptions, refType, target, key, undefined, { refPath });
        break;
      case WhatIsIt.NONE:
        schemaProp[key] = {
          type: refType,
          refPath,
          ...rawOptions,
        };
        break;
      default:
        throw new InvalidWhatIsItError(propKind, name, key, 'whatis(refPath)');
    }

    return;
  }

  // check if Type is actually a real working Type
  if (utils.isNullOrUndefined(Type) || typeof Type !== 'function') {
    throw new InvalidTypeError(name, key, Type);
  }

  const enumOption = rawOptions.enum;

  if (!utils.isNullOrUndefined(enumOption)) {
    // check if the supplied value is already "mongoose-consumeable"
    if (!Array.isArray(enumOption)) {
      if (Type === String || Type === mongoose.Schema.Types.String) {
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
      } else if (Type === Number || Type === mongoose.Schema.Types.Number) {
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
        // this will happen if the enum type is not "String" or "Number"
        // most likely this error happened because the code got transpiled with babel or "tsc --transpile-only"
        // REFACTOR: re-write this to be a Error inside errors.ts
        throw new Error(
          `Invalid type used for enums!, got: "${Type}" (${name}.${key}) [E012]` +
            "Is the code transpiled with Babel or 'tsc --transpile-only' or 'ts-node --transpile-only'?\n" +
            'See https://typegoose.github.io/typegoose/docs/api/decorators/prop/#enum'
        );
      }
    }
  }

  if (!utils.isNullOrUndefined(rawOptions.addNullToEnum)) {
    rawOptions.enum = Array.isArray(rawOptions.enum) ? rawOptions.enum : [];
    rawOptions.enum.push(null);
    delete rawOptions.addNullToEnum;
  }

  {
    let included: string[] = utils.isWithStringValidate(rawOptions);

    if (!utils.isString(Type)) {
      // warn if String-Validate options are included, but is not string
      utils.warnNotCorrectTypeOptions(name, key, 'String', 'String-Validate', included);
    }

    included = utils.isWithStringTransform(rawOptions);

    if (!utils.isString(Type)) {
      // warn if String-Transform options are included, but is not string
      utils.warnNotCorrectTypeOptions(name, key, 'String', 'String-Transform', included);
    }

    included = utils.isWithNumberValidate(rawOptions);

    if (!utils.isNumber(Type)) {
      // warn if Number-Validate options are included, but is not number
      utils.warnNotCorrectTypeOptions(name, key, 'Number', 'Number-Validate', included);
    }

    included = utils.isWithEnumValidate(rawOptions);

    if (!utils.isString(Type) && !utils.isNumber(Type)) {
      // warn if "enum" is included, but is not Number or String
      utils.warnNotCorrectTypeOptions(name, key, 'String | Number', 'extra', included);
    }
  }

  /** Is this Type (/Class) in the schemas Map? */
  const isInSchemas = schemas.has(utils.getName(Type));

  if (utils.isPrimitive(Type)) {
    if (utils.isObject(Type, true)) {
      utils.warnMixed(target, key);
    }

    switch (propKind) {
      case WhatIsIt.ARRAY:
        schemaProp[key] = utils.mapArrayOptions(rawOptions, Type, target, key);

        return;
      case WhatIsIt.MAP:
        const mapped = utils.mapOptions(rawOptions, Type, target, key);

        schemaProp[key] = {
          ...mapped.outer,
          type: Map,
          of: { type: Type, ...mapped.inner },
        };

        return;
      case WhatIsIt.NONE:
        schemaProp[key] = {
          ...rawOptions,
          type: Type,
        };

        return;
      default:
        throw new InvalidWhatIsItError(propKind, name, key, 'whatis(primitive)');
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
      ...rawOptions,
      type: mongoose.Schema.Types.Mixed,
    };

    return;
  }

  const virtualSchema = buildSchema(Type);
  switch (propKind) {
    case WhatIsIt.ARRAY:
      schemaProp[key] = utils.mapArrayOptions(rawOptions, virtualSchema, target, key, Type);

      return;
    case WhatIsIt.MAP:
      // special handling if the lower type should be an array
      if ('dim' in rawOptions) {
        logger.debug('Map SubDocument Array for "%s.%s"', name, key);

        const { type, ...outer } = utils.mapArrayOptions(rawOptions, virtualSchema, target, key, Type);

        schemaProp[key] = {
          ...outer,
          type: Map,
          of: type,
        };

        return;
      }

      const mapped = utils.mapOptions(rawOptions, virtualSchema, target, key, Type);

      schemaProp[key] = {
        ...mapped.outer,
        type: Map,
        of: { type: virtualSchema, ...mapped.inner },
      };

      return;
    case WhatIsIt.NONE:
      schemaProp[key] = {
        ...rawOptions,
        type: virtualSchema,
      };

      return;
    default:
      throw new InvalidWhatIsItError(propKind, name, key, 'whatis(subSchema)');
  }
}

// The following function ("optionDeprecation") is disabled until used again
/**
 * Check for deprecated options, and if needed process them
 * @param options
 */
// function optionDeprecation(options: any) {}

/**
 * Detect "WhatIsIt" based on "Type"
 * @param Type The Type used for detection
 */
function detectWhatIsIt(Type: any): WhatIsIt {
  logger.debug('Detecting WhatIsIt');

  if (
    Type === Array ||
    Type === mongoose.Types.Array ||
    Type === mongoose.Schema.Types.Array ||
    Type === mongoose.Types.DocumentArray ||
    Type === mongoose.Schema.Types.DocumentArray
  ) {
    return WhatIsIt.ARRAY;
  }
  if (Type === Map || Type === mongoose.Types.Map || Type === mongoose.Schema.Types.Map) {
    return WhatIsIt.MAP;
  }

  return WhatIsIt.NONE;
}
