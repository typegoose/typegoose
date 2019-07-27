import * as mongoose from 'mongoose';

import { constructors, schema } from './data';
import { Ref } from './prop';
import { InstanceType } from './typegoose';

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

  return false;
}

/**
 * Returns true, if it is an Number
 * @param Type The Type
 * @returns true, if it is an Number
 */
export function isNumber(Type: any): boolean {
  return Type.name === 'Number';
}

/**
 * Returns true, if it is an String
 * @param Type The Type
 * @returns true, if it is an String
 */
export function isString(Type: any): boolean {
  return Type.name === 'String';
}

/**
 * Initialize as Object
 * @param name <no info>
 * @param key <no info>
 */
export function initAsObject(name, key): void {
  if (!schema[name]) {
    schema[name] = {};
  }
  if (!schema[name][key]) {
    schema[name][key] = {};
  }
}

/**
 * Initialize as Array
 * @param name <no info>
 * @param key <no info>
 */
export function initAsArray(name: any, key: any): void {
  if (!schema[name]) {
    schema[name] = {};
  }
  if (!schema[name][key]) {
    schema[name][key] = [{}];
  }
}

/**
 * Get the Class for a given Document
 * @param document The Document
 */
export function getClassForDocument(document: mongoose.Document): any {
  const modelName = (document.constructor as mongoose.Model<typeof document>).modelName;
  return constructors[modelName];
}

/**
 * Check if the given document is already populated
 * @param doc The Ref with uncertain type
 */
export function isDocument<T>(doc: Ref<T>): doc is InstanceType<T> {
  return doc instanceof mongoose.Model;
}

/**
 * Check if the given array is already populated
 * @param docs The Array of Refs with uncertain type
 */
export function isDocumentArray<T>(docs: Ref<T>[]): docs is InstanceType<T>[] {
  return Array.isArray(docs) && docs.every(v => isDocument(v));
}
