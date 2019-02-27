/** @format */

import * as mongoose from 'mongoose';

import { schema, constructors } from './data';

export const isPrimitive = (Type: any) =>
  ['String', 'Number', 'Boolean', 'Date'].includes(Type.name);

export const isObject = (Type: any) => {
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
};

export const isNumber = (Type: any) => Type.name === 'Number';

export const isString = (Type: any) => Type.name === 'String';

export const initAsObject = (name, key) => {
  if (!schema[name]) {
    schema[name] = {};
  }
  if (!schema[name][key]) {
    schema[name][key] = {};
  }
};

export const initAsArray = (name: any, key: any) => {
  if (!schema[name]) {
    schema[name] = {};
  }
  if (!schema[name][key]) {
    schema[name][key] = [{}];
  }
};

export const getClassForDocument = (document: mongoose.Document): any => {
  const modelName = (document.constructor as mongoose.Model<typeof document>)
    .modelName;
  return constructors[modelName];
};
