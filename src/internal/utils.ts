import { mergeWith, omit } from 'lodash';
import * as mongoose from 'mongoose';
import { format } from 'util';

import { logger } from '../logSettings';
import type {
  AnyParamConstructor,
  Func,
  IModelOptions,
  IObjectWithTypegooseFunction,
  IObjectWithTypegooseName,
  IPrototype,
  PropOptionsWithNumberValidate,
  PropOptionsWithStringValidate,
  VirtualOptions
} from '../types';
import { DecoratorKeys, Severity, WhatIsIt } from './constants';
import { constructors, globalOptions, schemas } from './data';
import { NoValidClass } from './errors';

/**
 * Returns true, if the type is included in mongoose.Schema.Types
 * @param Type The Type
 * @returns true, if it includes it
 */
export function isPrimitive(Type: any): boolean {
  if (typeof Type?.name === 'string') {
    // try to match "Type.name" with all the Property Names of "mongoose.Schema.Types"
    // (like "String" with "mongoose.Schema.Types.String")
    return (
      Object.getOwnPropertyNames(mongoose.Schema.Types).includes(Type.name) ||
      // try to match "Type.name" with all "mongoose.Schema.Types.*.name"
      // (like "SchemaString" with "mongoose.Schema.Types.String.name")
      Object.values(mongoose.Schema.Types).findIndex(v => v.name === Type.name) >= 0
    );
  }

  return false;
}

/**
 * Returns true, if the type is included in mongoose.Schema.Types except the aliases
 * @param Type The Type
 * @returns true, if it includes it
 */
export function isAnRefType(Type: any): boolean {
  if (typeof Type?.name === 'string') {
    const tmp = Object.getOwnPropertyNames(mongoose.Schema.Types).filter(x => {
      switch (x) {
        case 'Oid':
        case 'Bool':
        case 'Object':
          return false;
        default:
          return true;
      }
    });

    // try to match "Type.name" with all the Property Names of "mongoose.Schema.Types" except the ones with aliases
    // (like "String" with "mongoose.Schema.Types.String")
    return (
      tmp.includes(Type.name) ||
      // try to match "Type.name" with all "mongoose.Schema.Types.*.name"
      // (like "SchemaString" with "mongoose.Schema.Types.String.name")
      Object.values(mongoose.Schema.Types).findIndex(v => v.name === Type.name) >= 0
    );
  }

  return false;
}

/**
 * Returns true, if it is an Object
 * @param Type The Type
 * @param once Just run it once?
 * @returns true, if it is an Object
 */
export function isObject(Type: any, once: boolean = false): boolean {
  if (typeof Type?.name === 'string') {
    let prototype = Type.prototype;
    let name = Type.name;
    while (name) {
      if (name === 'Object' || name === 'Mixed') {
        return true;
      }
      if (once) {
        break;
      }
      prototype = Object.getPrototypeOf(prototype);
      name = prototype?.constructor.name;
    }
  }

  return false;
}

/**
 * Returns true, if it is an Number
 * @param Type The Type
 * @returns true, if it is an Number
 */
export function isNumber(Type: any): Type is number {
  const name = Type?.name ?? '';

  return name === 'Number' || name === mongoose.Schema.Types.Number.name;
}

/**
 * Returns true, if it is an String
 * @param Type The Type
 * @returns true, if it is an String
 */
export function isString(Type: any): Type is string {
  const name = Type?.name ?? '';

  return name === 'String' || name === mongoose.Schema.Types.String.name;
}

/**
 * Initialize the property in the schemas Map
 * @param name Name of the current Model/Class
 * @param key Key of the property
 * @param whatis What should it be for a type?
 */
export function initProperty(name: string, key: string, whatis: WhatIsIt) {
  const schemaProp = !schemas.has(name) ? schemas.set(name, {}).get(name)! : schemas.get(name)!;

  switch (whatis) {
    case WhatIsIt.ARRAY:
      schemaProp[key] = [{}];
      break;
    case WhatIsIt.MAP:
    case WhatIsIt.NONE:
      schemaProp[key] = {};
      break;
    default:
      throw new TypeError('"whatis" is not supplied OR doesn\'t have a case yet!');
  }

  return schemaProp;
}

/**
 * Get the Class for a given Document
 * @param document The Document
 */
export function getClassForDocument(document: mongoose.Document): NewableFunction | undefined {
  const modelName = (document.constructor as mongoose.Model<typeof document>).modelName;

  return constructors.get(modelName);
}

/**
 * Get the Class for a given Schema
 * @param input
 */
export function getClass(
  input:
    | (mongoose.Document & IObjectWithTypegooseFunction)
    | (mongoose.Schema.Types.Embedded & IObjectWithTypegooseFunction)
    | string
    | IObjectWithTypegooseName
    | any
): NewableFunction | undefined {
  if (typeof input === 'string') {
    return constructors.get(input);
  }
  if (typeof input?.typegooseName === 'string') {
    return constructors.get(input.typegooseName);
  }

  if (typeof input?.typegooseName === 'function') {
    return constructors.get(input.typegooseName());
  }

  throw new ReferenceError('Input was not a string AND didnt have a .typegooseName function AND didnt have a .typegooseName string');
}

/**
 * Return true if there are Options
 * @param options The raw Options
 */
export function isWithStringValidate(options: PropOptionsWithStringValidate): options is PropOptionsWithStringValidate {
  return !isNullOrUndefined(options.match ?? options.minlength ?? options.maxlength);
}

/**
 * Return true if there are Options
 * @param options The raw Options
 */
export function isWithStringTransform(options: PropOptionsWithStringValidate): options is PropOptionsWithStringValidate {
  return !isNullOrUndefined(options.lowercase ?? options.uppercase ?? options.trim);
}

/**
 * Return true if there are Options
 * @param options The raw Options
 */
export function isWithNumberValidate(options: PropOptionsWithNumberValidate): options is PropOptionsWithNumberValidate {
  return !isNullOrUndefined(options.min ?? options.max);
}

const virtualOptions = ['localField', 'foreignField'];

/**
 * Check if Options include Virtual Populate Options
 * @param options RawOptions of the Prop
 */
export function isWithVirtualPOP(options: any): options is VirtualOptions {
  return Object.keys(options).some(v => virtualOptions.includes(v));
}

export const allVirtualoptions = virtualOptions.slice(0);
allVirtualoptions.push('ref');

/**
 * Check if All the required Options are present
 * @param options RawOptions of the Prop
 */
export function includesAllVirtualPOP(options: VirtualOptions): options is VirtualOptions {
  return allVirtualoptions.every(v => Object.keys(options).includes(v));
}

/**
 * Merge value & existing Metadata & Save it to the class
 * Difference with "mergeMetadata" is that this one DOES save it to the class
 * @param key Metadata key
 * @param value Raw value
 * @param cl The constructor
 * @internal
 */
export function assignMetadata(key: DecoratorKeys, value: unknown, cl: new () => {}): any {
  if (isNullOrUndefined(value)) {
    return value;
  }

  const newValue = mergeMetadata(key, value, cl);
  Reflect.defineMetadata(key, newValue, cl);

  return newValue;
}

/**
 * Merge value & existing Metadata
 * Difference with "assignMetadata" is that this one DOES NOT save it to the class
 * @param key Metadata key
 * @param value Raw value
 * @param cl The constructor
 * @internal
 */
export function mergeMetadata<T = any>(key: DecoratorKeys, value: unknown, cl: new () => {}): T {
  assertion(typeof key === 'string', new TypeError(`"${key}"(key) is not a string! (assignMetadata)`));
  assertionIsClass(cl);

  // Please don't remove the other values from the function, even when unused - it is made to be clear what is what
  return mergeWith({}, Reflect.getMetadata(key, cl), value, (_objValue, srcValue, ckey, _object, _source, _stack) =>
    customMerger(ckey, srcValue)
  );
}

/**
 * Used for lodash customizer's (cloneWith, cloneDeepWith, mergeWith)
 * @param key the key of the current object
 * @param val the value of the object that should get returned for "existingMongoose" & "existingConnection"
 */
function customMerger(key: string | number, val: unknown): any {
  if (isNullOrUndefined(key) || typeof key !== 'string') {
    return undefined;
  }
  if (/^(existingMongoose|existingConnection)$/.test(key)) {
    return val;
  }

  return undefined;
}

/**
 * Merge only schemaOptions from ModelOptions of the class
 * @param value The value to use
 * @param cl The Class to get the values from
 */
export function mergeSchemaOptions<T, U extends AnyParamConstructor<T>>(value: mongoose.SchemaOptions | undefined, cl: U) {
  return mergeMetadata<IModelOptions>(DecoratorKeys.ModelOptions, { schemaOptions: value }, cl).schemaOptions;
}

/**
 * Tries to return the right target
 * if target.constructor.name is "Function", return target, otherwise target.constructor
 * @param target The target to determine
 */
export function getRightTarget(target: any): any {
  return target.constructor?.name === 'Function' ? target : target.constructor;
}

/**
 * Get the correct name of the class's model
 * (with suffix)
 * @param cl The Class
 */
export function getName<T, U extends AnyParamConstructor<T>>(cl: U) {
  const ctor: any = getRightTarget(cl);
  const options: IModelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, ctor) ?? {};
  const baseName: string = ctor.name;

  if (options.options?.automaticName) {
    const suffix = options.options?.customName ?? options.schemaOptions?.collection;

    return !isNullOrUndefined(suffix) ? `${baseName}_${suffix}` : baseName;
  }

  if (typeof options.options?.customName === 'string') {
    if (options.options.customName.length <= 0) {
      throw new TypeError(`"customName" must be a string AND at least one character ("${baseName}")`);
    }

    return options.options.customName;
  }

  return baseName;
}

/**
 * Returns if it is not defined in "schemas"
 * @param cl The Type
 */
export function isNotDefined(cl: any) {
  return typeof cl === 'function' && !isPrimitive(cl) && cl !== Object && cl !== mongoose.Schema.Types.Buffer && !schemas.has(getName(cl));
}

/**
 * Map Options to "inner" & "outer"
 * -> inner: means inner of "type: [{here})"
 * -> outer: means outer of "type: [{}], here"
 *
 * Specific to Arrays
 * @param rawOptions The raw options
 * @param Type The Type of the array
 * @param target The Target class
 * @param pkey Key of the Property
 */
export function mapArrayOptions(
  rawOptions: any,
  Type: AnyParamConstructor<any> | mongoose.Schema,
  target: any,
  pkey: string,
  loggerType?: AnyParamConstructor<any>
): mongoose.SchemaTypeOpts<any> {
  logger.debug('mapArrayOptions called');

  if (!(Type instanceof mongoose.Schema)) {
    loggerType = Type;
  }

  const options = Object.assign({}, rawOptions); // for sanity
  const mapped = mapOptions(rawOptions, Type, target, pkey, false, loggerType);

  /** The Object that gets returned */
  const returnObject = {
    ...mapped.outer,
    type: [
      {
        type: Type,
        ...mapped.inner
      }
    ]
  };

  if (typeof options?.innerOptions === 'object') {
    for (const [key, value] of Object.entries(options.innerOptions)) {
      returnObject.type[0][key] = value;
    }
  }
  if (typeof options?.outerOptions === 'object') {
    for (const [key, value] of Object.entries(options.outerOptions)) {
      returnObject[key] = value;
    }
  }

  returnObject.type = createArrayFromDimensions(rawOptions, returnObject.type, getName(target), pkey);

  if (loggerType) {
    logger.debug('(Array) Final mapped Options for Type "%s"', getName(loggerType), returnObject);
  }

  return returnObject;
}

/**
 * Map Options to "inner" & "outer"
 * @param rawOptions The raw options
 * @param Type The Type of the array
 * @param target The Target class
 * @param pkey Key of the Property
 */
export function mapOptions(
  rawOptions: any,
  Type: AnyParamConstructor<any> | (mongoose.Schema & IPrototype),
  target: any,
  pkey: string,
  errorOC: boolean = true,
  loggerType?: AnyParamConstructor<any>
) {
  logger.debug('mapOptions called');

  /** The Object that gets returned */
  const ret = {
    inner: {},
    outer: {}
  };

  if (!(Type instanceof mongoose.Schema)) {
    loggerType = Type;
    if (getName(loggerType) in mongoose.Schema.Types) {
      logger.info('Converting "%s" to mongoose Type', getName(loggerType));
      Type = mongoose.Schema.Types[getName(loggerType)];

      /* istanbul ignore next */
      if (Type === mongoose.Schema.Types.Mixed) {
        warnMixed(target, pkey);
      }
    }
  }

  /** The OptionsConstructor to use */
  let OptionsCTOR: undefined | AnyParamConstructor<any> = Type?.prototype?.OptionsConstructor;

  // Fix because "Schema" is not a valid type and doesn't have a ".prototype.OptionsConstructor"
  if (Type instanceof mongoose.Schema) {
    // TODO: remove "as any" cast if "OptionsConstructor" is implemented in @types/mongoose
    OptionsCTOR = (mongoose as any).Schema.Types.Embedded.prototype.OptionsConstructor;
  }

  if (isNullOrUndefined(OptionsCTOR)) {
    if (errorOC && loggerType) {
      throw new TypeError(`Type does not have an valid "OptionsConstructor"! (${getName(loggerType)} on ${getName(target)}.${pkey})`);
    }

    return ret;
  }

  const options = Object.assign({}, rawOptions); // for sanity
  delete options.items;

  // "mongoose as any" is because the types package does not yet have an entry for "SchemaTypeOptions"
  // TODO: remove "as any" cast if "OptionsConstructor" is implemented in @types/mongoose
  if (OptionsCTOR.prototype instanceof (mongoose as any).SchemaTypeOptions) {
    // console.log("test2", target, pkey, Type, OptionsCTR.prototype);
    for (const [key, value] of Object.entries(options)) {
      if (Object.getOwnPropertyNames(OptionsCTOR.prototype).includes(key)) {
        ret.inner[key] = value;
      } else {
        ret.outer[key] = value;
      }
    }
  } else {
    if (loggerType) {
      logger.info('The Type "%s" has a property "OptionsConstructor" but it does not extend "SchemaTypeOptions', getName(loggerType));
    }
  }

  if (loggerType) {
    logger.debug('Final mapped Options for Type "%s"', getName(loggerType), ret);
  }

  return ret;
}

/**
 * Warn, Error or Allow if an mixed type is set
 * -> this function exists for de-duplication
 * @param target Target Class
 * @param key Property key
 */
export function warnMixed(target: any, key: string | symbol): void | never {
  const name = getName(target);
  const modelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, getRightTarget(target)) ?? {};

  switch (modelOptions?.options?.allowMixed) {
    default:
    case Severity.WARN:
      logger.warn('Implicitly setting "Mixed" is not allowed! (%s, %s)', name, key);

      break;
    case Severity.ALLOW:
      break;
    case Severity.ERROR:
      throw new TypeError(format('Implicitly setting "Mixed" is not allowed! (%s, %s)', name, key));
  }

  return; // always return, if "allowMixed" is not "ERROR"
}

/**
 * Because since node 4.0.0 the internal util.is* functions got deprecated
 * @param val Any value to test if null or undefined
 */
export function isNullOrUndefined(val: unknown): val is null | undefined {
  return val === null || val === undefined;
}

/**
 * Assign Global ModelOptions if not already existing
 * @param target Target Class
 */
export function assignGlobalModelOptions(target: any) {
  if (isNullOrUndefined(Reflect.getMetadata(DecoratorKeys.ModelOptions, target))) {
    logger.info('Assigning global Schema Options to "%s"', getName(target));
    assignMetadata(DecoratorKeys.ModelOptions, omit(globalOptions, 'globalOptions'), target);
  }
}

/**
 * Get the status of "_id"
 * -> Check if _id should be present, or not
 * @param Type The Class to check on
 * @param rawOptions baseProp's rawOptions
 */
export function get_idStatus(Type: any, rawOptions: any): boolean {
  if (typeof rawOptions?._id === 'boolean') {
    return rawOptions._id;
  }

  const TypeModelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, Type);
  if (typeof TypeModelOptions?.schemaOptions?._id === 'boolean') {
    return TypeModelOptions.schemaOptions._id;
  }

  return true;
}

/**
 * Loop over "dimensions" and create an array from that
 * @param rawOptions baseProp's rawOptions
 * @param extra What is actually in the deepest array
 * @param name name of the target for better error logging
 * @param key key of target-key for better error logging
 */
export function createArrayFromDimensions(rawOptions: any, extra: any, name: string, key: string) {
  // dimensions start at 1 (not 0)
  const dim = typeof rawOptions.dim === 'number' ? rawOptions.dim : 1;
  if (dim < 1) {
    throw new RangeError(format('"dim" needs to be higher than 0 (%s.%s)', name, key));
  }
  delete rawOptions.dim; // delete this property to not actually put it as an option
  logger.info('createArrayFromDimensions called with %d dimensions', dim);

  let retArray: any[] = Array.isArray(extra) ? extra : [extra];
  // index starts at 1 because "retArray" is already once wrapped in an array
  for (let index = 1; index < dim; index++) {
    retArray = [retArray];
  }

  return retArray as any[];
}

/**
 * Assert an condition, if "false" throw error
 * Note: it is not named "assert" to differentiate between node and jest types
 * @param cond The Condition to throw
 * @param error An Custom Error to throw
 */
export function assertion(cond: any, error?: Error): asserts cond {
  if (!cond) {
    throw error ?? new Error('Assert failed - no custom error');
  }
}

/**
 * Assert if val is an function (constructor for classes)
 * @param val Value to test
 */
export function assertionIsClass(val: any): asserts val is Func {
  assertion(typeof val === 'function', new NoValidClass(val));
}
