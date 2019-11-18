import { cloneDeepWith, mergeWith } from 'lodash';
import * as mongoose from 'mongoose';
import { format } from 'util';

import { logger } from '../logSettings';
import {
  AnyParamConstructor,
  IModelOptions,
  PropOptionsWithNumberValidate,
  PropOptionsWithStringValidate,
  Severity,
  VirtualOptions,
  WhatIsIt
} from '../types';
import { DecoratorKeys } from './constants';
import { constructors, globalOptions, schemas } from './data';
import { NoValidClass } from './errors';

/**
 * Returns true, if the type is included in mongoose.Schema.Types
 * @param Type The Type
 * @returns true, if it includes it
 */
export function isPrimitive(Type: any): boolean {
  if (Type && typeof Type.name === 'string') {
    // try to match "Type.name" with all the Property Names of "mongoose.Schema.Types"
    // (like "String" with "mongoose.Schema.Types.String")
    return Object.getOwnPropertyNames(mongoose.Schema.Types).includes(Type.name)
      // try to match "Type.name" with all "mongoose.Schema.Types.*.name"
      // (like "SchemaString" with "mongoose.Schema.Types.String.name")
      || Object.values(mongoose.Schema.Types).findIndex((v) => v.name === Type.name) >= 0;
  }

  return false;
}

/**
 * Returns true, if it is an Object
 * @param Type The Type
 * @returns true, if it is an Object
 */
export function isObject(Type: any): boolean {
  if (typeof Type?.name === 'string') {
    let prototype = Type.prototype;
    let name = Type.name;
    while (name) {
      if (name === 'Object') {
        return true;
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
  return Type?.name === 'Number';
}

/**
 * Returns true, if it is an String
 * @param Type The Type
 * @returns true, if it is an String
 */
export function isString(Type: any): Type is string {
  return Type?.name === 'String';
}

/**
 * Initialize the property in the schemas Map
 * @param name Name of the current Model/Class
 * @param key Key of the property
 * @param whatis What should it be for a type?
 */
export function initProperty(name: string, key: string, whatis: WhatIsIt) {
  if (!schemas.has(name)) {
    schemas.set(name, {});
  }

  switch (whatis) {
    case WhatIsIt.ARRAY:
      schemas.get(name)[key] = [{}];
      break;
    case WhatIsIt.MAP:
    case WhatIsIt.NONE:
      schemas.get(name)[key] = {};
      break;
    default:
      throw new TypeError('"whatis" is not supplied OR dosnt have a case yet!');
  }
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
 * Return true if there are Options
 * @param options The raw Options
 */
export function isWithStringValidate(
  options: PropOptionsWithStringValidate
): options is PropOptionsWithStringValidate {
  return !isNullOrUndefined(
    options?.match
    ?? options?.enum
    ?? options?.minlength
    ?? options?.maxlength
  );
}

/**
 * Return true if there are Options
 * @param options The raw Options
 */
export function isWithStringTransform(
  options: PropOptionsWithStringValidate
): options is PropOptionsWithStringValidate {
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
  return Object.keys(options).some((v) => virtualOptions.includes(v));
}

export const allVirtualoptions = virtualOptions.slice(0);
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
  if (typeof key !== 'string') {
    throw new TypeError(`"${key}"(key) is not a string! (assignMetadata)`);
  }
  if (typeof cl !== 'function') {
    throw new NoValidClass(cl);
  }

  // Please dont remove the other values from the function, even when unused - it is made to be clear what is what
  const current = cloneDeepWith(Reflect.getMetadata(key, cl) ?? {}, (val, ckey, obj, stack) => customMerger(key, val));

  return mergeWith({}, current, value,
    (objValue, srcValue, ckey, object, source, stack) => customMerger(key, srcValue));
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
export function mergeSchemaOptions<T, U extends AnyParamConstructor<T>>(value: mongoose.SchemaOptions, cl: U) {
  return mergeMetadata<IModelOptions>(DecoratorKeys.ModelOptions, { schemaOptions: value }, cl).schemaOptions;
}

/**
 * Get the correct name of the class's model
 * (with suffix)
 * @param cl The Class
 */
export function getName<T, U extends AnyParamConstructor<T>>(cl: U) {
  const options: IModelOptions =
    Reflect.getMetadata(DecoratorKeys.ModelOptions, cl) ??
    Reflect.getMetadata(DecoratorKeys.ModelOptions, cl.constructor) ??
    {};
  const baseName = cl.name ?? cl.constructor.name;

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
  return typeof cl === 'function' &&
    !isPrimitive(cl) &&
    cl !== Object &&
    cl !== mongoose.Schema.Types.Buffer &&
    !schemas.has(getName(cl));
}

/**
 * Assign "__uniqueID" to a class
 * @param cl
 * @returns boolean, true if uniqueID is created, false if already existing
 */
export function createUniqueID(cl: any) {
  if (isNullOrUndefined(cl.__uniqueID)) {
    cl.__uniqueID = Date.now();

    return true;
  }

  return false;
}

/**
 * Map Options to "inner" & "outer"
 * -> inner: means inner of "type: [{here})"
 * -> outer: means outer of "type: [{}], here"
 * @param rawOptions The raw options
 * @param Type The Type of the array
 * @param target The Target class
 * @param pkey Key of the Property
 */
export function mapArrayOptions(
  rawOptions: any,
  Type: AnyParamConstructor<any>,
  target: any,
  pkey: string
): mongoose.SchemaTypeOpts<any> {
  if (getName(Type) in mongoose.Schema.Types) {
    logger.info('Converting "%s" to mongoose Type', getName(Type));
    Type = mongoose.Schema.Types[getName(Type)];

    /* istanbul ignore next */
    if (Type === mongoose.Schema.Types.Mixed) {
      warnMixed(target, pkey);
    }
  }

  if (isNullOrUndefined(Type.prototype.OptionsConstructor)) {
    throw new TypeError('Type does not have an valid "OptionsConstructor"!');
  }

  const options = Object.assign({}, rawOptions); // for sanity

  delete options.items;

  const returnObject = {
    type: [{
      type: Type
    }]
  };

  // "mongoose as any" is because the types package does not yet have an entry for "SchemaTypeOptions"
  if (Type.prototype.OptionsConstructor.prototype instanceof (mongoose as any).SchemaTypeOptions) {
    for (const [key, value] of Object.entries(options)) {
      if (Object.getOwnPropertyNames(Type.prototype.OptionsConstructor.prototype).includes(key)) {
        returnObject.type[0][key] = value;
      } else {
        returnObject[key] = value;
      }
    }
  } else {
    logger.info('The Type "%s" does not have an OptionsConstructor', getName(Type));
  }

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

  logger.debug('Final mapped Options for Type "%s"', getName(Type), returnObject);

  return returnObject;
}

/**
 * Warn, Error or Allow if an mixed type is set
 * -> this function exists for de-duplication
 * @param target Target Class
 * @param key Property key
 */
export function warnMixed(target: any, key: string | symbol): void | never {
  const name = getName(target);
  const modelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, target) ?? {};

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
    assignMetadata(DecoratorKeys.ModelOptions, { options: globalOptions.options, schemaOptions: globalOptions.schemaOptions }, target);
  }
}
