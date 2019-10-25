import { Model, Schema, SchemaDefinition } from 'mongoose';

import { mongoose } from '../typegoose';
import { ICustomOptions, Severity, VirtualOptions } from '../types';

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
  options?: ICustomOptions;
  /** Schema Options that should get applied to all models */
  schemaOptions?: mongoose.SchemaOptions;
  /**
   * Global Options for general Typegoose
   * (There are currently none)
   */
  globalOptions?: {};
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
export const globalOptions: IGlobalOptions = {
  options: {
    allowMixed: Severity.WARN
  }
};
