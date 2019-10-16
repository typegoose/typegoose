import { Model, Schema, SchemaDefinition } from 'mongoose';

import { AnyParamConstructor, VirtualOptions } from '../types';

export interface IPreHook {
  method: string | RegExp;
  func(error?: Error): void;
}

export interface IPostHook {
  method: string | RegExp;
  func(): void;
}

export interface IHooks {
  pre: IPreHook[];
  post: IPostHook[];
}
export interface IPluginMap {
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
  /** Prop Options */
  origOptions: any;
  /** What the Property Type should be */
  Type: AnyParamConstructor<any>;
  /** Target Class */
  target: any;
  /** Property name */
  key: string;
  /** What is it for a prop type? */
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
export const hooks: Map<string, IHooks> = new Map();
/** Plugins Map */
export const plugins: Map<string, IPluginMap[]> = new Map();
/** Constructors Map */
export const constructors: Map<string, NewableFunction> = new Map();
