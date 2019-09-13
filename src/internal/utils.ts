import * as mongoose from 'mongoose';

import { isNullOrUndefined } from 'util';
import {
  // IModelOptions,
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
 * Merges existing metadata with new value
 * @param key Metadata key
 * @param value Raw value
 * @param cl The constructor
 * @internal
 */
export function assignMetadata(key: DecoratorKeys, value: unknown, cl: new () => {}): void {
  if (typeof key !== 'string') {
    throw new TypeError(`"${key}"(key) is not a string! (assignMetadata)`);
  }
  if (typeof cl !== 'function') {
    throw new NoValidClass(cl);
  }
  if (isNullOrUndefined(value)) {
    return;
  }
  const current = Reflect.getMetadata(key, cl) || {};

  // the following checks are needed, so that the new value dosnt override the full options
  // "deepmerge" cannot be used because of the other options like "existingMongoose"
  if (isModelOptions(value) && !isNullOrUndefined(current.schemaOptions)) {
    value.schemaOptions = Object.assign(current.schemaOptions, value.schemaOptions);
  }
  if (isModelOptions(value) && !isNullOrUndefined(current.options)) {
    value.options = Object.assign(current.options, value.options);
  }

  const newValue = Object.assign(current, value);
  Reflect.defineMetadata(key, newValue, cl);
}

/**
 * Get the correct name of the class's model
 * (with suffix)
 * @param cl The Class
 */
export function getName<T, U extends AnyParamConstructor<T>>(cl: U) {
  // disabled until hasezoey#23 & hasezoey#24 gets fixed

  // const options: IModelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, cl) || {};

  // const baseName = cl.name;
  // const suffix = (options.options ? options.options.customName : undefined) ||
  //   (options.schemaOptions ? options.schemaOptions.collection : undefined);

  // return suffix ? `${baseName}_${suffix}` : baseName;
  return cl.name;
}
