import * as mongoose from 'mongoose';

import { constructors, schemas } from './data';

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
  if (!schemas.get(name)) {
    schemas.set(name, {});
  }
  if (!schemas.get(name)[key]) {
    schemas.get(name)[key] = {};
  }
}

/**
 * Initialize as Array
 * @param name <no info>
 * @param key <no info>
 */
export function initAsArray(name: any, key: any): void {
  if (!schemas.get(name)) {
    schemas.set(name, {});
  }
  if (!schemas.get(name)[key]) {
    schemas.get(name)[key] = [{}];
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
