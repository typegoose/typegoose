import { Model, Schema, SchemaDefinition } from 'mongoose';

// types
/* Methods */
interface Methods {
  staticMethods: Map<string, Map<string, CallableFunction>>;
  instanceMethods: Map<string, Map<string, CallableFunction>>;
}
/* end Methods */
/* Hooks */
interface Hook {
  func(): void;
}
interface PreHook extends Hook {
  parallel: boolean;
}
export interface HooksPrePost {
  pre: Map<string | RegExp, PreHook>;
  post: Map<string | RegExp, Hook>;
}
/* end Hooks */
/* Virtuals */
interface BaseVirtual {
  options?: {
    [key: string]: any;
    overwrite: boolean;
  };
  get?(): any;
  set?(toSet: any): any;
}
/* end Virtuals */
/* Plugins */
interface PluginMap {
  mongoosePlugin(schema: Schema<any>, options: object): void;
  options: object;
}
/* end Plugins */
// end types

/** Methods Map */
export const methods: Methods = { staticMethods: new Map(), instanceMethods: new Map() };
/** Schema Map */
export const schemas: Map<string, SchemaDefinition> = new Map();
/** Models Map */
export const models: Map<string, Model<any>> = new Map();
/** Virtuals Map */
export const virtuals: Map<string, Map<string, BaseVirtual>> = new Map();
/** Hooks Map */
export const hooks: Map<string, HooksPrePost> = new Map();
/** Plugins Map */
export const plugins: Map<string, PluginMap[]> = new Map();
/** Constructors Map */
export const constructors: Map<string, NewableFunction> = new Map();
