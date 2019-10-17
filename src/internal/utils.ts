import * as mongoose from 'mongoose';

import { isNullOrUndefined } from 'util';
import { logger } from '../logSettings';
import {
  AnyParamConstructor,
  IModelOptions,
  PropOptionsWithNumberValidate,
  PropOptionsWithStringValidate,
  VirtualOptions
} from '../types';
import { DecoratorKeys } from './constants';
import { constructors, schemas } from './data';
import { NoValidClass } from './errors';

const primitives = ['String', 'Number', 'Boolean', 'Date', 'Decimal128', 'ObjectID', 'Array'];

/**
 * Returns true, if it includes the Type
 * @param Type The Type
 * @returns true, if it includes it
 */
export function isPrimitive(Type: any): boolean {
  return primitives.includes(Type.name);
}

/**
 * Returns true, if it is an Object
 * @param Type The Type
 * @returns true, if it is an Object
 */
export function isObject(Type: any): boolean {
  let prototype = Type.prototype;
  let name = Type.name;
  while (name) {
    if (name === 'Object') {
      return true;
    }
    prototype = Object.getPrototypeOf(prototype);
    name = prototype ? prototype.constructor.name : null;
  }

  return false; // can this even return false?
  // return !isNullOrUndefined(Type) && (typeof Type === 'object' || Type.name === 'Object') && !Array.isArray(Type);
}

/**
 * Returns true, if it is an Number
 * @param Type The Type
 * @returns true, if it is an Number
 */
export function isNumber(Type: any): Type is number {
  return Type.name === 'Number';
}

/**
 * Returns true, if it is an String
 * @param Type The Type
 * @returns true, if it is an String
 */
export function isString(Type: any): Type is string {
  return Type.name === 'String';
}

/**
 * Initialize as Object
 * @param name The Name of the Schema
 * @param key The Property key to set
 */
export function initAsObject(name: string, key: string): void {
  if (!schemas.get(name)) {
    schemas.set(name, {});
  }
  schemas.get(name)[key] = {};
}

/**
 * Initialize as Array
 * @param name The Name of the Schema
 * @param key The Property key to set
 */
export function initAsArray(name: string, key: string): void {
  if (!schemas.get(name)) {
    schemas.set(name, {});
  }
  schemas.get(name)[key] = [{}];
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
export function isWithStringTransform(
  options: PropOptionsWithStringValidate
): options is PropOptionsWithStringValidate {
  return !isNullOrUndefined(options.lowercase || options.uppercase || options.trim);
}

/**
 * Return true if there are Options
 * @param options The raw Options
 */
export function isWithNumberValidate(options: PropOptionsWithNumberValidate): options is PropOptionsWithNumberValidate {
  return !isNullOrUndefined(options.min || options.max);
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
 * Check if the given value has options of "IModelOptions"
 * @param value The Value to evaulate
 * @internal
 */
function isModelOptions(value: unknown): value is IModelOptions {
  return value && (
    typeof (value as IModelOptions).schemaOptions === 'object' ||
    typeof (value as IModelOptions).options === 'object'
  );
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
export function mergeMetadata(key: DecoratorKeys, value: unknown, cl: new () => {}): any {
  if (typeof key !== 'string') {
    throw new TypeError(`"${key}"(key) is not a string! (assignMetadata)`);
  }
  if (typeof cl !== 'function') {
    throw new NoValidClass(cl);
  }

  const current = Object.assign({}, Reflect.getMetadata(key, cl) || {});

  if (isNullOrUndefined(value)) {
    return current;
  }

  // the following checks are needed, so that the new value dosnt override the full options
  // "deepmerge" cannot be used because of the other options like "existingMongoose"
  if (isModelOptions(value) && !isNullOrUndefined(current.schemaOptions)) {
    value.schemaOptions = Object.assign(current.schemaOptions, value.schemaOptions);
  }
  if (isModelOptions(value) && !isNullOrUndefined(current.options)) {
    value.options = Object.assign(current.options, value.options);
  }

  return Object.assign(current, value);
}

/**
 * Merge only schemaOptions from ModelOptions of the class
 * @param value The value to use
 * @param cl The Class to get the values from
 */
export function mergeSchemaOptions<T, U extends AnyParamConstructor<T>>(value: mongoose.SchemaOptions, cl: U) {
  if (typeof cl !== 'function') {
    throw new NoValidClass(cl);
  }

  const current = Reflect.getMetadata(DecoratorKeys.ModelOptions, cl) || {};
  const evaluated = current && current.schemaOptions ? current.schemaOptions : {};

  if (isNullOrUndefined(value)) {
    return evaluated;
  }

  return Object.assign(evaluated, value || {});
}

/**
 * Get the correct name of the class's model
 * (with suffix)
 * @param cl The Class
 */
export function getName<T, U extends AnyParamConstructor<T>>(cl: U) {
  const options: IModelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, cl) || {};
  const baseName = cl.name;

  if (options.options && options.options.automaticName) {
    const suffix = (options.options ? options.options.customName : undefined) ||
      (options.schemaOptions ? options.schemaOptions.collection : undefined);

    return suffix ? `${baseName}_${suffix}` : baseName;
  }

  if (options.options && typeof options.options.customName === 'string') {
    if (options.options.customName.length <= 0) {
      throw new TypeError(`"customName" must be a string AND at least one character ("${cl.name}")`);
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
    isNullOrUndefined(schemas.get(getName(cl)));
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
 */
export function mapArrayOptions(rawOptions: any, Type: AnyParamConstructor<any>): mongoose.SchemaTypeOpts<any> {
  if (getName(Type) in mongoose.Schema.Types) {
    logger.info('Converting %s to mongoose Type', getName(Type));
    Type = mongoose.Schema.Types[getName(Type)];
  } else if (isNullOrUndefined(Type.prototype.OptionsConstructor)) {
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
      // logger.debug('HI', key, value);
      // logger.debug('Type is', Type.name);
      if (Object.getOwnPropertyNames(Type.prototype.OptionsConstructor.prototype).includes(key)) {
        // logger.debug('Value is in OC:', key);
        returnObject.type[0][key] = value;
      } else {
        // logger.debug('Value is not in OC:', key);
        returnObject[key] = value;
      }
    }

    // logger.debug('final obj', returnObject);
  } /* else {
    logger.debug('NOPE');
  } */

  logger.debug('Final mapped Options for Type "%s"', getName(Type), returnObject);

  return returnObject;
}
