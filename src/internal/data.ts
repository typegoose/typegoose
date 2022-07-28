import type { Model, SchemaDefinition } from 'mongoose';
import type { IGlobalOptions } from '../types.js';
import { Severity } from './constants.js';

/** Schema Map */
export const schemas: Map<string, SchemaDefinition> = new Map();
/** Models Map */
export const models: Map<string, Model<any>> = new Map();
/** Constructors Map */
export const constructors: Map<string, NewableFunction> = new Map();
/** Global Options */
export const globalOptions: IGlobalOptions = {
  options: {
    allowMixed: Severity.WARN,
  },
};
