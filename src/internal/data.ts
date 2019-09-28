import { Model, Schema, SchemaDefinition } from 'mongoose';

import { EmptyVoidFn, VirtualOptions, AnyParamConstructor } from '../types';

export interface HooksPrePost {
  pre: Map<string | RegExp, (error?: Error) => void>;
  post: Map<string | RegExp, EmptyVoidFn>;
}
export interface PluginMap {
  mongoosePlugin(schema: Schema<any>, options: object): void;
  options: object;
}

/** This Enum is meant for baseProp to decide for diffrent props (like if it is an arrayProp or prop or mapProp) */
export enum WhatIsIt {
  ARRAY,
  MAP,
  NONE
}

export interface DecoratedPropertyMetadata {
  rawOptions: any;
  Type: AnyParamConstructor<any>;
  target: any;
  key: string;
  whatis: WhatIsIt;
}
export type DecoratedPropertyMetadataMap = Map<string, DecoratedPropertyMetadata>;

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
