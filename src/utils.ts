import * as _ from 'lodash';

import { schema } from './data';

export const isPrimitive = (Type) => _.includes(['String', 'Number', 'Boolean'], Type.name);

export const isArray = (Type) => Type.name === 'Array';

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