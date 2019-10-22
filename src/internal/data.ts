import { Model, Schema, SchemaDefinition } from 'mongoose';

import { mongoose } from '../typegoose';
import { VirtualOptions } from '../types';

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

export interface IGlobalOptions {
  /** Typegoose Options */
  options?: IGlobalOptionsSub;
  /** Schema Options that should get applied to all models */
  globalSchemaOptions?: mongoose.SchemaOptions;
}
export interface IGlobalOptionsSub {
  /** Allow "mongoose.Schema.Types.Mixed"? */
  allowMixed: Severity;
}

export enum Severity {
  ALLOW,
  WARN,
  ERROR
}

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
/** Global Options */
export const globalOptions: IGlobalOptions = new Proxy({
  options: {
    allowMixed: Severity.WARN
  }
}, {});
