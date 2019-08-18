import * as mongoose from 'mongoose';

import { isNullOrUndefined } from 'util';
import { constructors, schemas } from './data';
import { PropOptionsWithNumberValidate, PropOptionsWithStringValidate, VirtualOptions } from './types';

/**
 * Returns true, if it includes the Type
 * @param Type The Type
 * @returns true, if it includes it
 */
export function isPrimitive(Type: any): boolean {
  return ['String', 'Number', 'Boolean', 'Date', 'Decimal128', 'ObjectID'].includes(Type.name);
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
