import { intersection, mergeWith, omit } from 'lodash';
import * as mongoose from 'mongoose';

import { logger } from '../logSettings';
import type {
  AnyParamConstructor,
  Func,
  GetTypeReturn,
  IModelOptions,
  IObjectWithTypegooseFunction,
  IObjectWithTypegooseName,
  IPrototype,
  KeyStringAny,
  PropOptionsForNumber,
  PropOptionsForString,
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
      Object.values(mongoose.Schema.Types).findIndex((v) => v.name === Type.name) >= 0
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
    // Note: this is not done "once" because types can be added as custom types
    const tmp = Object.getOwnPropertyNames(mongoose.Schema.Types).filter((x) => {
      switch (x) {
        case 'Oid':
        case 'Bool':
        case 'Object':
        case 'Boolean':
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
      Object.values(mongoose.Schema.Types).findIndex((v) => v.name === Type.name) >= 0
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
      /* istanbul ignore next */ // ignore because this case should really never happen (typescript prevents this)
      throw new TypeError(`"${whatis}"(whatis(subSchema)) is invalid for "${name}.${key}" [E013]`);
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

  throw new ReferenceError(
    'Input was not a string AND didnt have a .typegooseName function AND didnt have a .typegooseName string [E014]'
  );
}

/**
 * Return an array of options that are included
 * @param options The raw Options
 */
export function isWithStringValidate(options: PropOptionsForString): string[] {
  return intersection(Object.keys(options), ['match', 'minlength', 'maxlength']);
}

/**
 * Return an array of options that are included
 * @param options The raw Options
 */
export function isWithStringTransform(options: PropOptionsForString): string[] {
  return intersection(Object.keys(options), ['lowercase', 'uppercase', 'trim']);
}

/**
 * Return an array of options that are included
 * @param options The raw Options
 */
export function isWithNumberValidate(options: PropOptionsForNumber): string[] {
  return intersection(Object.keys(options), ['min', 'max']);
}

/**
 * Return an array of options that are included
 * @param options The raw Options
 */
export function isWithEnumValidate(options: PropOptionsForNumber | PropOptionsForString): string[] {
  return intersection(Object.keys(options), ['enum']);
}

const virtualOptions = ['localField', 'foreignField'];

/**
 * Check if Options include Virtual Populate Options
 * @param options RawOptions of the Prop
 */
export function isWithVirtualPOP(options: any): options is VirtualOptions {
  return Object.keys(options).some((v) => virtualOptions.includes(v));
}

export const allVirtualoptions = virtualOptions.slice(0); // copy "virtualOptions" array
allVirtualoptions.push('ref');

/**
 * Check if All the required Options are present
 * @param options RawOptions of the Prop
 */
export function includesAllVirtualPOP(options: VirtualOptions): options is VirtualOptions {
  return allVirtualoptions.every((v) => Object.keys(options).includes(v));
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
  assertion(typeof key === 'string', new TypeError(`"${key}"(key) is not a string! (mergeMetadata)`));
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
function customMerger(key: string | number, val: unknown): undefined | unknown {
  if (typeof key !== 'string') {
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
export function mergeSchemaOptions<U extends AnyParamConstructor<any>>(value: mongoose.SchemaOptions | undefined, cl: U) {
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
export function getName<U extends AnyParamConstructor<any>>(cl: U) {
  const ctor: any = getRightTarget(cl);
  const options: IModelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, ctor) ?? {};
  const baseName: string = ctor.name;

  if (options.options?.automaticName) {
    const suffix = options.options?.customName ?? options.schemaOptions?.collection;

    return !isNullOrUndefined(suffix) ? `${baseName}_${suffix}` : baseName;
  }

  if (typeof options.options?.customName === 'string') {
    if (options.options.customName.length <= 0) {
      throw new TypeError(`"customName" must be a string AND at least one character ("${baseName}") [E015]`);
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
  return (
    typeof cl === 'function'
    && !isPrimitive(cl)
    && cl !== Object
    && !schemas.has(getName(cl))
  );
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
 * @param loggerType Type to use for logging
 */
export function mapArrayOptions(
  rawOptions: any,
  Type: AnyParamConstructor<any> | mongoose.Schema,
  target: any,
  pkey: string,
  loggerType?: AnyParamConstructor<any>
): mongoose.SchemaTypeOpts<any> {
  logger.debug('mapArrayOptions called');
  loggerType = loggerType ?? Type as AnyParamConstructor<any>;

  if (!(Type instanceof mongoose.Schema)) {
    loggerType = Type;
  }

  const dim = rawOptions.dim; // needed, otherwise it will be included (and not removed) in the returnObject
  delete rawOptions.dim;

  const mapped = mapOptions(rawOptions, Type, target, pkey, loggerType);

  /** The Object that gets returned */
  const returnObject: KeyStringAny = {
    ...mapped.outer,
    type: [
      {
        type: Type,
        ...mapped.inner
      }
    ]
  };

  rawOptions.dim = dim; // re-add for "createArrayFromDimensions"

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
 * @param loggerType Type to use for logging
 */
export function mapOptions(
  rawOptions: any,
  Type: AnyParamConstructor<any> | (mongoose.Schema & IPrototype),
  target: any,
  pkey: string,
  loggerType?: AnyParamConstructor<any>
) {
  logger.debug('mapOptions called');
  loggerType = loggerType ?? Type as AnyParamConstructor<any>;

  /** The Object that gets returned */
  const ret = {
    inner: {} as KeyStringAny,
    outer: {} as KeyStringAny
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

  if (isNullOrUndefined(loggerType)) {
    logger.info('mapOptions loggerType is undefined!');
  }

  /** The OptionsConstructor to use */
  let OptionsCTOR: undefined | AnyParamConstructor<any> = Type?.prototype?.OptionsConstructor;

  // Fix because "Schema" is not a valid type and doesn't have a ".prototype.OptionsConstructor"
  if (Type instanceof mongoose.Schema) {
    // TODO: remove "as any" cast if "OptionsConstructor" is implemented in @types/mongoose
    OptionsCTOR = (mongoose as any).Schema.Types.Embedded.prototype.OptionsConstructor;
  }

  assertion(!isNullOrUndefined(OptionsCTOR), new TypeError(`Type does not have an valid "OptionsConstructor"! (${getName(loggerType)} on ${getName(target)}.${pkey}) [E016]`));

  const options = Object.assign({}, rawOptions); // for sanity
  delete options.items;

  // "mongoose as any" is because the types package does not yet have an entry for "SchemaTypeOptions"
  // TODO: remove "as any" cast if "OptionsConstructor" is implemented in @types/mongoose
  if (OptionsCTOR.prototype instanceof (mongoose as any).SchemaTypeOptions) {
    for (const [key, value] of Object.entries(options)) {
      if (Object.getOwnPropertyNames(OptionsCTOR.prototype).includes(key)) {
        ret.inner[key] = value;
      } else {
        ret.outer[key] = value;
      }
    }
  } else {
    if (loggerType) {
      logger.info('The Type "%s" has a property "OptionsConstructor" but it does not extend "SchemaTypeOptions"', getName(loggerType));
    }

    ret.outer = options;
  }

  if (typeof options?.innerOptions === 'object') {
    delete ret.outer.innerOptions;
    for (const [key, value] of Object.entries(options.innerOptions)) {
      ret.inner[key] = value;
    }
  }
  if (typeof options?.outerOptions === 'object') {
    delete ret.outer.outerOptions;
    for (const [key, value] of Object.entries(options.outerOptions)) {
      ret.outer[key] = value;
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
export function warnMixed(target: any, key: string): void | never {
  const name = getName(target);
  const modelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, getRightTarget(target)) ?? {};

  switch (modelOptions.options?.allowMixed) {
    default:
    case Severity.WARN:
      logger.warn('Setting "Mixed" for property "%s.%s"\nLook here for how to disable this message: https://typegoose.github.io/typegoose/docs/api/decorators/modelOptions/#allowmixed', name, key);

      break;
    case Severity.ALLOW:
      break;
    case Severity.ERROR:
      throw new TypeError(`Setting "Mixed" is not allowed! (${name}, ${key}) [E017]`);
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
    throw new RangeError(`"dim" needs to be higher than 0 (${name}.${key}) [E018]`);
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
    throw error ?? new Error('Assert failed - no custom error [E019]');
  }
}

/**
 * Assert if val is an function (constructor for classes)
 * @param val Value to test
 */
export function assertionIsClass(val: any): asserts val is Func {
  assertion(isConstructor(val), new NoValidClass(val));
}

/**
 * Get Type, if input is an arrow-function, execute it and return the result
 * @param typeOrFunc Function or Type
 * @param returnLastFoundArray Return the last found array (used for something like PropOptions.discriminators)
 */
export function getType(typeOrFunc: Func | any, returnLastFoundArray: boolean = false): GetTypeReturn {
  const returnObject: GetTypeReturn = {
    type: typeOrFunc,
    dim: 0
  };

  if (typeof returnObject.type === 'function' && !isConstructor(returnObject.type)) {
    returnObject.type = (returnObject.type as Func)();
  }

  function getDepth(): void {
    if (returnObject.dim > 100) { // this is arbitrary, but why would anyone have more than 10 nested arrays anyway?
      throw new Error('getDepth recursed too much (dim > 100)');
    }
    if (Array.isArray(returnObject.type)) {
      returnObject.dim++;
      if (returnLastFoundArray && !Array.isArray(returnObject.type[0])) {
        return;
      }
      returnObject.type = returnObject.type[0];
      getDepth();
    }
  }

  getDepth();

  logger.debug('Final getType: dim: %s, type:', returnObject.dim, returnObject.type);

  return returnObject;
}

/**
 * Is the provided input an class with an constructor?
 */
export function isConstructor(obj: any): obj is AnyParamConstructor<any> {
  return typeof obj === 'function' && !isNullOrUndefined(obj.prototype?.constructor?.name);
}

// Below are function to wrap NodeJS functions for client compatability (tsline ignore is needed)

/**
 * Execute util.deprecate or when !process console log
 * (if client, it dosnt cache which codes already got logged)
 */
/* tslint:disable-next-line:ban-types */
export function deprecate<T extends Function>(fn: T, message: string, code: string): T {
  if (!isNullOrUndefined(process)) {
    /* tslint:disable-next-line:no-require-imports */
    return require('util').deprecate(fn, message, code);
  }

  /* tslint:disable-next-line:no-console */
  console.log(`[${code}] DeprecationWarning: ${message}`);

  return fn;
}

/**
 * Logs an warning if "included > 0" that the options of not the current type are included
 * @param name Name of the Class
 * @param key Name of the Currently Processed key
 * @param type Name of the Expected Type
 * @param extra Extra string to be included
 * @param included Included Options to be listed
 */
export function warnNotCorrectTypeOptions(name: string, key: string, type: string, extra: string, included: string[]): void {
  // this "if" is in this function to de-duplicate code
  if (included.length > 0) {
    logger.warn(
      `Type of "${name}.${key}" is not ${type}, but includes the following ${extra} options [W001]:\n`
      + `  [${included.join(', ')}]`
    );
  }
}
