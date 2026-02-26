import { logger } from '../logSettings';
import { buildSchema, mongoose, Passthrough } from '../typegoose';
import type {
  AnyParamConstructor,
  DiscriminatorObject,
  IModelOptions,
  KeyStringAny,
  MappedInnerOuterOptions,
  NestedDiscriminatorsMap,
  ProcessPropOptions,
  VirtualPopulateMap,
} from '../types';
import { DecoratorKeys, PropType } from './constants';
import {
  CannotBeSymbolError,
  InvalidEnumTypeError,
  InvalidTypeError,
  InvalidPropTypeError,
  NotAllVPOPElementsError,
  NotNumberTypeError,
  NotStringTypeError,
  OptionDoesNotSupportOptionError,
  RefOptionIsUndefinedError,
  SelfContainingClassError,
  StringLengthExpectedError,
  DuplicateOptionsError,
} from './errors';
import * as utils from './utils';

/**
 * Function that is the actual processing of the prop's (used for caching)
 * @param input All the options needed for prop's
 */
export function processProp(input: ProcessPropOptions): void {
  const { key, target, mergedOptions } = input;
  const name = utils.getName(target);
  const rawOptions: KeyStringAny = Object.assign({}, input.options);
  let Type: any | undefined = Reflect.getMetadata(DecoratorKeys.Type, target, key);
  let propKind = input.propType ?? detectPropType(Type);

  logger.debug('Starting to process "%s.%s"', name, key);
  utils.assertion(typeof key === 'string', () => new CannotBeSymbolError(name, key));

  // optionDeprecation(rawOptions);

  {
    // soft errors & "type"-alias mapping
    switch (propKind) {
      case PropType.NONE:
        break;
      case PropType.MAP:
      case PropType.ARRAY:
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

      // Infer "type: [TYPE]" as a array, only if the PropType is not manually set or already inferred as something else
      // This is useful if reflection fails or when working without "emitDecoratorMetadata"
      if (utils.isNullOrUndefined(input.propType) && propKind == PropType.NONE) {
        logger.debug('Detected "type" being set to a array, using PropType.ARRAY');
        propKind = PropType.ARRAY;
      }
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

  // confirm that "PropType" is an ARRAY and if that the Type is still an *ARRAY, set them to Mixed
  // for issues like https://github.com/typegoose/typegoose/issues/300
  if (propKind === PropType.ARRAY && detectPropType(Type) === PropType.ARRAY) {
    logger.debug('Type is still *ARRAY, defaulting to Mixed');
    Type = mongoose.Schema.Types.Mixed;
  }

  // confirm that "PropType" is an MAP and if that the Type is still an *MAP, set them to Mixed
  if (propKind === PropType.MAP && detectPropType(Type) === PropType.MAP) {
    logger.debug('Type is still *Map, defaulting to Mixed');
    Type = mongoose.Schema.Types.Mixed;
  }

  if (utils.isNotDefined(Type)) {
    buildSchema(Type);
  }

  const modelOptionsOfType: IModelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, Type ?? {}) ?? {};

  // throw a error when both "discriminators" as a prop-option and as a model-option are defined
  if ('discriminators' in rawOptions && !utils.isNullOrUndefined(modelOptionsOfType?.options?.discriminators)) {
    throw new DuplicateOptionsError(['discriminators(prop-option)', 'discriminators(model-option)']);
  }

  if ('discriminators' in rawOptions || !utils.isNullOrUndefined(modelOptionsOfType?.options?.discriminators)) {
    const discriminatorsToUse = rawOptions?.discriminators ?? modelOptionsOfType?.options?.discriminators;
    logger.debug('Found option "discriminators" in "%s.%s"', name, key);
    const gotType = utils.getType(discriminatorsToUse, true);
    utils.assertion(gotType.dim === 1, () => new OptionDoesNotSupportOptionError('discriminators', 'dim', '1', `dim: ${gotType.dim}`));
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
    utils.assertion(gotType.dim === 0, () => new OptionDoesNotSupportOptionError('ref', 'dim', '0', `dim: ${gotType.dim}`));
    rawOptions.ref = gotType.type;
    utils.assertion(!utils.isNullOrUndefined(rawOptions.ref), () => new RefOptionIsUndefinedError(name, key));

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

  const schemaProp = utils.getCachedSchema(input.cl);

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
      case PropType.ARRAY:
        schemaProp[key] = utils.mapArrayOptions(rawOptions, newType, target, key, mergedOptions);

        return;
      case PropType.MAP: {
        const mapped = utils.mapOptions(rawOptions, newType, target, key, mergedOptions);

        schemaProp[key] = {
          ...mapped.outer,
          type: Map,
          of: { type: newType, ...mapped.inner },
        };

        return;
      }
      case PropType.NONE:
        schemaProp[key] = {
          ...rawOptions,
          type: newType,
        };

        return;
      default:
        throw new InvalidPropTypeError(propKind, name, key, 'PropType(Passthrough)');
    }
  }

  // use "Type" if it is an suitable ref-type, otherwise default back to "ObjectId"
  const refType = utils.isAnRefType(Type) ? Type : mongoose.Schema.Types.ObjectId;

  if ('ref' in rawOptions) {
    const ref = rawOptions.ref;
    delete rawOptions.ref;

    switch (propKind) {
      case PropType.ARRAY:
        schemaProp[key] = utils.mapArrayOptions(rawOptions, refType, target, key, mergedOptions, undefined, { ref });
        break;
      case PropType.NONE:
        schemaProp[key] = {
          type: refType,
          ref,
          ...rawOptions,
        };
        break;
      case PropType.MAP: {
        const mapped = utils.mapOptions(rawOptions, refType, target, key, mergedOptions);

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
      }
      default:
        throw new InvalidPropTypeError(propKind, name, key, 'PropType(ref)');
    }

    return;
  }

  if ('refPath' in rawOptions) {
    const refPath = rawOptions.refPath;
    delete rawOptions.refPath;

    utils.assertion(
      (typeof refPath === 'string' && refPath.length > 0) || typeof refPath === 'function',
      () => new StringLengthExpectedError(1, refPath, `${name}.${key}`, 'refPath')
    );

    switch (propKind) {
      case PropType.ARRAY:
        schemaProp[key] = utils.mapArrayOptions(rawOptions, refType, target, key, mergedOptions, undefined, { refPath });
        break;
      case PropType.NONE:
        schemaProp[key] = {
          type: refType,
          refPath,
          ...rawOptions,
        };
        break;
      default:
        throw new InvalidPropTypeError(propKind, name, key, 'PropType(refPath)');
    }

    return;
  }

  // check if Type is actually a real working Type
  if (utils.isNullOrUndefined(Type) || typeof Type !== 'function') {
    throw new InvalidTypeError(name, key, Type);
  }

  if (!utils.isNullOrUndefined(rawOptions.enum)) {
    let useType = rawOptions.enum;
    let inValues = false;

    if (rawOptions.enum?.constructor === Object && 'values' in rawOptions.enum) {
      useType = rawOptions.enum.values;
      inValues = true;
    }

    // disabling lint line, because eslint seemingly cant handle a changing value and a unchanging value in the same destruction
    // eslint-disable-next-line prefer-const
    let { dim: enumDim, type: enumType }: { dim: number; type: any } = utils.getType(useType, true);
    utils.assertion(enumDim === 1 || enumDim === 0, () => new OptionDoesNotSupportOptionError('enum', 'dim', '0 or 1', `dim: ${enumDim}`));

    // check if the option is already a array (mongoose enum), if not convert it
    if (!Array.isArray(enumType)) {
      if (Type === String || Type === mongoose.Schema.Types.String) {
        enumType = Object.entries<string>(enumType) // get all key-value pairs of the enum
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
        enumType = Object.entries<string | number>(enumType) // get all key-value pairs of the enum
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
        throw new InvalidEnumTypeError(name, key, Type);
      }
    }

    // re-assign the option with the updated type
    if (inValues) {
      rawOptions.enum.values = enumType;
    } else {
      rawOptions.enum = enumType;
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
  const hasCachedSchema = !utils.isNullOrUndefined(Reflect.getMetadata(DecoratorKeys.CachedSchema, Type));

  if (utils.isPrimitive(Type)) {
    if (utils.isObject(Type, true)) {
      utils.warnMixed(target, key, mergedOptions);
    }

    switch (propKind) {
      case PropType.ARRAY:
        schemaProp[key] = utils.mapArrayOptions(rawOptions, Type, target, key, mergedOptions);

        return;
      case PropType.MAP: {
        let mapped: MappedInnerOuterOptions;
        let finalType: mongoose.SchemaTypeOptions<any>;

        // Map the correct options for the end type
        if (utils.isTypeMeantToBeArray(rawOptions)) {
          mapped = utils.mapOptions(rawOptions, mongoose.Schema.Types.Array, target, key, mergedOptions);
          // "rawOptions" is not used here, because that would duplicate some options to where the should not be
          finalType = utils.mapArrayOptions({ ...mapped.inner, dim: rawOptions.dim }, Type, target, key, mergedOptions);
        } else {
          mapped = utils.mapOptions(rawOptions, Type, target, key, mergedOptions);
          finalType = { ...mapped.inner, type: Type };
        }

        schemaProp[key] = {
          ...mapped.outer,
          type: Map,
          of: { ...finalType },
        };

        return;
      }
      case PropType.NONE:
        schemaProp[key] = {
          ...rawOptions,
          type: Type,
        };

        return;
      default:
        throw new InvalidPropTypeError(propKind, name, key, 'PropType(primitive)');
    }
  }

  // If the 'Type' is not a 'Primitive Type' and no subschema was found treat the type as 'Object'
  // so that mongoose can store it as nested document
  if (utils.isObject(Type) && !hasCachedSchema) {
    utils.warnMixed(target, key, mergedOptions);
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
    case PropType.ARRAY:
      schemaProp[key] = utils.mapArrayOptions(rawOptions, virtualSchema, target, key, Type);

      return;
    case PropType.MAP: {
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
    }
    case PropType.NONE:
      schemaProp[key] = {
        ...rawOptions,
        type: virtualSchema,
      };

      return;
    default:
      throw new InvalidPropTypeError(propKind, name, key, 'PropType(subSchema)');
  }
}

// The following function ("optionDeprecation") is disabled until used again
/**
 * Check for deprecated options, and if needed process them
 * @param options
 */
// function optionDeprecation(options: any) {}

/**
 * Detect "PropType" based on "Type"
 * @param Type The Type used for detection
 */
function detectPropType(Type: any): PropType {
  logger.debug('Detecting PropType');

  if (
    Type === Array ||
    Type === mongoose.Types.Array ||
    Type === mongoose.Schema.Types.Array ||
    Type === mongoose.Types.DocumentArray ||
    Type === mongoose.Schema.Types.DocumentArray
  ) {
    return PropType.ARRAY;
  }
  if (Type === Map || Type === mongoose.Types.Map || Type === mongoose.Schema.Types.Map) {
    return PropType.MAP;
  }

  return PropType.NONE;
}
