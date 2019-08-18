import { Model, Schema, SchemaDefinition } from 'mongoose';

import { EmptyVoidFn, VirtualOptions } from './types';

export interface HooksPrePost {
  pre: Map<string | RegExp, (error?: Error) => void>;
  post: Map<string | RegExp, EmptyVoidFn>;
}
export interface PluginMap {
  mongoosePlugin(schema: Schema<any>, options: object): void;
  options: object;
}

/** Schema Map */
export const schemas: Map<string, SchemaDefinition> = new Map();
/** Models Map */
export const models: Map<string, Model<any>> = new Map();
/** Virtuals Map */
export const virtuals: Map<string, Map<string, VirtualOptions>> = new Map();
/** Hooks Map */
export const hooks: Map<string, HooksPrePost> = new Map();
/** Plugins Map */
export const plugins: Map<string, PluginMap[]> = new Map();
/** Constructors Map */
export const constructors: Map<string, NewableFunction> = new Map();
/** Build Schemas */
export const buildSchemas: Map<string, Schema> = new Map();
