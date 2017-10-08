import * as _ from 'lodash';
import * as mongoose from 'mongoose';

import { schema, constructors } from './data';

export const isPrimitive = (Type) => _.includes(['String', 'Number', 'Boolean', 'Date'], Type.name);

export const isNumber = (Type) => Type.name === 'Number';

export const isString = (Type) => Type.name === 'String';

export const initAsObject = (name, key) => {
  if (!schema[name]) {
    schema[name] = {};
  }
  if (!schema[name][key]) {
    schema[name][key] = {};
  }
};

export const initAsArray = (name, key) => {
  if (!schema[name]) {
    schema[name] = {};
  }
  if (!schema[name][key]) {
    schema[name][key] = [{}];
  }
};

export const getClassForDocument = (document: mongoose.Document): any => {
  const modelName = (document.constructor as mongoose.Model<typeof document>).modelName;
  return constructors[modelName];
};
