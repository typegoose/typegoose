import * as mongoose from 'mongoose';

import type { TimeStamps } from './defaultClasses';
import type { Severity, WhatIsIt } from './internal/constants';

// tslint:disable:ban-types

type IfEquals<X, Y, A, B> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? A : B;
type ReadonlyKeysOf<T> = {
  [P in keyof T]: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P>
}[keyof T];

type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];

type RemoveConstructSignature<T> = Pick<T, keyof T>;

export type CreateQuery<
  T, Id = T extends { _id: infer TId } ? TId extends RefType ? { _id?: TId } :
  { _id: TId } : { _id?: RefType }> = Omit<
    { [k in keyof T]:
      T[k] extends Map<infer K, infer V> ? (Map<K, V> | [K, V][] | (K extends string | number | symbol ? Record<K, V> : never)) : T[k] },
    | ReadonlyKeysOf<T>
    | FunctionPropertyNames<T>
    | keyof mongoose.Document
    | keyof IObjectWithTypegooseFunction
    | (T extends TimeStamps ? keyof TimeStamps : never)>
  & Partial<Pick<mongoose.Document, '__v'>>
  & Id;

export interface TypegooseModel<
  SchemaType,
  T extends mongoose.Document = DocumentType<SchemaType>,
  QueryHelpers = {},
  D = CreateQuery<SchemaType>>
  extends RemoveConstructSignature<Omit<mongoose.Model<T, QueryHelpers>, 'create'>> {
  /**
   * Creates a document synchronously. The document is not automatically saved to the database.
   *
   * The first generic parameter, "ExtraOmittedKeys", are extra keys ignored in the type for the creation of this document.
   * It is useful for excluding getters/setters, which don't strictly need to be specified in the document.
   *
   * The second generic parameter, "ExtraPartialKeys", are extra keys that to be made optional in the type for the creation of this
   * document. It is useful for excluding required parameters that have defaults.
   *
   * @param doc The values with which to create the document
   */
  new <ExtraOmittedKeys extends keyof D = never, ExtraPartialKeys extends Exclude<keyof D, ExtraOmittedKeys> = never>
    (doc: Omit<Omit<D, ExtraPartialKeys> & Partial<Pick<D, ExtraPartialKeys>>, ExtraOmittedKeys>): T;

  /**
   * Creates and saves a document to the database. Shortcut for `new Model(doc).save()`.
   *
   * The first generic parameter, "ExtraOmittedKeys", are extra keys ignored in the type for the creation of this document.
   * It is useful for excluding getters/setters, which don't strictly need to be specified in the document.
   *
   * The second generic parameter, "ExtraPartialKeys", are extra keys that can optionally be specified in the type for the creation of this
   * document. It is useful for excluding required parameters that have defaults.
   *
   * @param doc The document that should get created
   * @param options Options for saving the documents
   * @returns A promise resolving with the created document
   */
  create<ExtraOmittedKeys extends keyof D = never, ExtraPartialKeys extends Exclude<keyof D, ExtraOmittedKeys> = never>
    (doc: Omit<Omit<D, ExtraPartialKeys> & Partial<Pick<D, ExtraPartialKeys>>, ExtraOmittedKeys>,
      options?: mongoose.SaveOptions): Promise<T>;

  /**
   * Creates and saves a document to the database. Shortcut for `new Model(doc).save()`.
   *
   * The first generic parameter, "ExtraOmittedKeys", are extra keys ignored in the type for the creation of this document.
   * It is useful for excluding getters/setters, which don't strictly need to be specified in the document.
   *
   * The second generic parameter, "ExtraPartialKeys", are extra keys that to be made optional in the type for the creation of this
   * document. It is useful for excluding required parameters that have defaults.
   *
   * @param doc The document that should get created
   * @param callback The callback called after the document is created and saved. Use is deprecated, prefer using the Promise-based API.
   *
   * @deprecated
   */
  create<ExtraOmittedKeys extends keyof D = never, ExtraPartialKeys extends Exclude<keyof D, ExtraOmittedKeys> = never>
    (doc: Omit<Omit<D, ExtraPartialKeys> & Partial<Pick<D, ExtraPartialKeys>>, ExtraOmittedKeys>,
      callback: (err: any, fullDoc: T) => unknown): Promise<T>;

  /**
   * Creates and saves a document to the database. Shortcut for `new Model(doc).save()`.
   *
   * The first generic parameter, "ExtraOmittedKeys", are extra keys ignored in the type for the creation of this document.
   * It is useful for excluding getters/setters, which don't strictly need to be specified in the document.
   *
   * The second generic parameter, "ExtraPartialKeys", are extra keys that to be made optional in the type for the creation of this
   * document. It is useful for excluding required parameters that have defaults.
   *
   * @param doc The document that should get created
   * @param options Options for saving the documents
   * @param callback The callback called after the document is created and saved. Use is deprecated, prefer using the Promise-based API.
   *
   * @deprecated
   */
  create<ExtraOmittedKeys extends keyof D = never, ExtraPartialKeys extends Exclude<keyof D, ExtraOmittedKeys> = never>
    (doc: Omit<Omit<D, ExtraPartialKeys> & Partial<Pick<D, ExtraPartialKeys>>, ExtraOmittedKeys>,
      options: mongoose.SaveOptions, callback: (err: any, fullDoc: T) => unknown): Promise<T>;

  /**
   * Creates and saves multiple documents to the database. Shortcut for `Promise.all(docs.map(doc => new Model(doc).save()))`.
   *
   * The first generic parameter, "ExtraOmittedKeys", are extra keys ignored in the type for the creation of these documents.
   * It is useful for excluding getters/setters, which don't strictly need to be specified in the document.
   *
   * The second generic parameter, "ExtraPartialKeys", are extra keys that to be made optional in the type for the creation of these
   * documents. It is useful for excluding required parameters that have defaults.
   *
   * @param docs The array of values with which to create each document to be saved to the database
   * @param options Options for saving the documents
   * @returns A promise resolving with the array of created documents (maybe not in the same order)
   */
  create<ExtraOmittedKeys extends keyof D = never, ExtraPartialKeys extends Exclude<keyof D, ExtraOmittedKeys> = never>
    (docs: Omit<Omit<D, ExtraPartialKeys> & Partial<Pick<D, ExtraPartialKeys>>, ExtraOmittedKeys>[],
      options?: mongoose.SaveOptions): Promise<T[]>;

  /**
   * Creates and saves multiple documents to the database. Shortcut for `Promise.all(docs.map(doc => new Model(doc).save()))`.
   *
   * The first generic parameter, "ExtraOmittedKeys", are extra keys ignored in the type for the creation of these documents.
   * It is useful for excluding getters/setters, which don't strictly need to be specified in the document.
   *
   * The second generic parameter, "ExtraPartialKeys", are extra keys that to be made optional in the type for the creation of these
   * documents. It is useful for excluding required parameters that have defaults.
   *
   * @param docs The array of values with which to create each document to be saved to the database
   * @param callback The callback called after the documents are created and saved. Use is deprecated, prefer using the Promise-based API.
   *
   * @deprecated
   */
  create<ExtraOmittedKeys extends keyof D = never, ExtraPartialKeys extends Exclude<keyof D, ExtraOmittedKeys> = never>
    (docs: Omit<Omit<D, ExtraPartialKeys> & Partial<Pick<D, ExtraPartialKeys>>, ExtraOmittedKeys>[],
      callback: (err: any, fullDocs: T[]) => unknown): Promise<T[]>;

  /**
   * Creates and saves multiple documents to the database. Shortcut for `Promise.all(docs.map(doc => new Model(doc).save()))`.
   *
   * The first generic parameter, "ExtraOmittedKeys", are extra keys ignored in the type for the creation of these documents.
   * It is useful for excluding getters/setters, which don't strictly need to be specified in the document.
   *
   * The second generic parameter, "ExtraPartialKeys", are extra keys that to be made optional in the type for the creation of these
   * documents. It is useful for excluding required parameters that have defaults.
   *
   * @param docs The array of values with which to create each document to be saved to the database
   * @param options Options for saving the documents
   * @param callback The callback called after the documents are created and saved. Use is deprecated, prefer using the Promise-based API.
   *
   * @deprecated
   */
  create<ExtraOmittedKeys extends keyof D = never, ExtraPartialKeys extends Exclude<keyof D, ExtraOmittedKeys> = never>
    (docs: Omit<Omit<D, ExtraPartialKeys> & Partial<Pick<D, ExtraPartialKeys>>, ExtraOmittedKeys>[],
      options: mongoose.SaveOptions, callback: (err: any, fullDocs: T[]) => unknown): Promise<T[]>;
}

/**
 * Get the Type of an instance of a Document with Class properties
 * @example
 * ```ts
 * class Name {}
 * const NameModel = Name.getModelForClass(Name);
 *
 * const t: DocumentType<Name> = await NameModel.create({});
 * ```
 */
export type DocumentType<T> = mongoose.Document & T & IObjectWithTypegooseFunction;

/**
 * Any-param Constructor
 * @internal
 */
export type AnyParamConstructor<T> = new (...args: any[]) => T;
/**
 * The Type of a Model that gets returned by "getModelForClass" and "setModelForClass"
 */
export type ReturnModelType<U extends AnyParamConstructor<T>, T = any> = TypegooseModel<InstanceType<U>> & RemoveConstructSignature<U>;
/** @internal */
export type Func = (...args: any[]) => any;

export type RequiredType = boolean | [boolean, string] | string | Func | [Func, string];

export type ValidatorFunction = (value: any) => boolean | Promise<boolean>;
export interface ValidatorOptions {
  validator: ValidatorFunction;
  message?: string;
}
export type Validator =
  | ValidatorFunction
  | RegExp
  | ValidatorOptions
  | ValidatorOptions[];

export interface BasePropOptions {
  [key: string]: any;
  /** include this value?
   * @default true (Implicitly)
   */
  select?: boolean;
  /** is this value required?
   * @default false (Implicitly)
   */
  required?: RequiredType;
  /** Only accept Values from the Enum(|Array) */
  enum?: string[] | object;
  /** Add "null" to the enum array */
  addNullToEnum?: boolean;
  /** Give the Property a default Value */
  default?: any;
  /** Give an Validator RegExp or Function */
  validate?: Validator | Validator[];
  /**
   * Should this property have an "unique" index?
   * @link https://docs.mongodb.com/manual/indexes/#unique-indexes
   */
  unique?: boolean;
  /**
   * Should this property have an index?
   * Note: dont use this if you want to do an compound index
   * @link https://docs.mongodb.com/manual/indexes
   */
  index?: boolean;
  /**
   * Should this property have an "sparse" index?
   * @link https://docs.mongodb.com/manual/indexes/#sparse-indexes
   */
  sparse?: boolean;
  /**
   * Should this property have an "expires" index?
   * @link https://docs.mongodb.com/manual/tutorial/expire-data
   */
  expires?: string | number;
  /**
   * Should this property have an "text" index?
   * @link https://mongoosejs.com/docs/api.html#schematype_SchemaType-text
   */
  text?: boolean;
  /** Should subdocuments get their own id?
   * @default true (Implicitly)
   */
  _id?: boolean;
  /**
   * Set an Setter (Non-Virtual) to pre-process your value
   * (when using get/set both are required)
   * Please note that the option `type` is required, if get/set saves a different value than what is defined
   * @param value The Value that needs to get modified
   * @returns The Value, but modified OR anything
   * @example
   * ```ts
   * function setHello(val: string): string {
   *   return val.toLowerCase()
   * }
   * function getHello(val: string): string {
   *   return val.toUpperCase();
   * }
   * class Dummy {
   *   @prop({ set: setHello, get: getHello }) // many options can be used, like required
   *   public hello: string;
   * }
   * ```
   */
  set?(val: any): any;
  /**
   * Set an Getter (Non-Virtual) to Post-process your value
   * (when using get/set both are required)
   * Please note that the option `type` is required, if get/set saves a different value than what is defined
   * @param value The Value that needs to get modified
   * @returns The Value, but modified OR anything
   * @example
   * ```ts
   * function setHello(val: string): string {
   *   return val.toLowerCase()
   * }
   * function getHello(val: string): string {
   *   return val.toUpperCase();
   * }
   * class Dummy {
   *   @prop({ set: setHello, get: getHello }) // many options can be used, like required
   *   public hello: string;
   * }
   * ```
   */
  get?(val: any): any;
  /**
   * This may be needed if get/set is used
   * (this sets the type how it is saved to the DB)
   */
  type?: any;
  /**
   * Make a property read-only
   * @example
   * ```ts
   * class SomeClass {
   *  @prop({ immutable: true })
   *  public someprop: Readonly<string>;
   * }
   * ```
   */
  immutable?: boolean;
  /**
   * Give the Property an alias in the output
   * Note: you should include the alias as a variable in the class, but not with a prop decorator
   * @example
   * ```ts
   * class Dummy {
   *   @prop({ alias: "helloWorld" })
   *   public hello: string; // normal, with @prop
   *   public helloWorld: string; // is just for type Completion, will not be included in the DB
   * }
   * ```
   */
  alias?: string;
  /**
   * This option as only an effect when the plugin `mongoose-autopopulate` is used
   */
  // tslint:disable-next-line:ban-types
  autopopulate?: boolean | Function | { [key: string]: any; };
  /** Reference an other Document (you should use Ref<T> as Prop type) */
  ref?: any;
  /** Take the Path and try to resolve it to a Model */
  refPath?: string;
  /**
   * Override the ref's type
   * {@link BasePropOptions.type} can be used too
   * @default ObjectId
   */
  refType?: RefSchemaType;
}

// tslint:disable-next-line:no-empty-interface
export interface PropOptions extends BasePropOptions { }

export interface ArrayPropOptions extends BasePropOptions {
  /** What array is it?
   * {@link BasePropOptions.type} can be used too
   * Note: this is only needed because Reflect & refelact Metadata can't give an accurate Response for an array
   */
  items?: any;
  /**
   * Use this to define inner-options
   * Use this if the auto-mapping is not correct or for plugin options
   *
   * Please open a new issue if some option is mismatched or not existing / mapped
   */
  innerOptions?: {
    [key: string]: any;
  };
  /**
   * Use this to define outer-options
   * Use this if the auto-mapping is not correct or for plugin options
   *
   * Please open a new issue if some option is mismatched or not existing / mapped
   */
  outerOptions?: {
    [key: string]: any;
  };
  /**
   * How many dimensions this Array should have
   * (needs to be higher than 0)
   * @default 1
   */
  dim?: number;
}

export interface ValidateNumberOptions {
  /** The Number must be at least this high */
  min?: number | [number, string];
  /** The Number can only be lower than this */
  max?: number | [number, string];
}

export interface ValidateStringOptions {
  /** Only Allowes if the value matches an RegExp */
  match?: RegExp | [RegExp, string];
  /** Only Allowes if the value is in the Enum */
  enum?: string[];
  /** Only Allowes if the value is at least the lenght */
  minlength?: number | [number, string];
  /** Only Allowes if the value is not longer than the maxlenght */
  maxlength?: number | [number, string];
}

export interface TransformStringOptions {
  /** Should it be lowercased before save? */
  lowercase?: boolean;
  /** Should it be uppercased before save? */
  uppercase?: boolean;
  /** Should it be trimmed before save? */
  trim?: boolean;
}

export interface VirtualOptions {
  /** Reference an other Document (you should use Ref<T> as Prop type) */
  ref: any;
  /** Which property(on the current-Class) to match `foreignField` against */
  localField: string;
  /** Which property(on the ref-Class) to match `localField` against */
  foreignField: string;
  /** Return as One Document(true) or as Array(false) */
  justOne?: boolean;
  /** Return the number of Documents found instead of the actual Documents */
  count?: boolean;
}

export type PropOptionsWithNumberValidate = PropOptions & ValidateNumberOptions;
export type PropOptionsWithStringValidate = PropOptions & TransformStringOptions & ValidateStringOptions;
export type PropOptionsWithValidate = PropOptionsWithNumberValidate | PropOptionsWithStringValidate | VirtualOptions;

export type RefType = number | string | mongoose.Types.ObjectId | Buffer | undefined;
export type RefSchemaType = typeof mongoose.Schema.Types.Number |
  typeof mongoose.Schema.Types.String |
  typeof mongoose.Schema.Types.Buffer |
  typeof mongoose.Schema.Types.ObjectId;

/**
 * Reference another Model
 */
// export type Ref<R, T extends RefType = mongoose.Types.ObjectId> = R | T; // old type, kept for easy revert
export type Ref<R, T extends RefType = R extends { _id?: RefType } ? NonNullable<R['_id']> : mongoose.Types.ObjectId> = R | T;

/**
 * An Function type for a function that doesn't have any arguments and doesn't return anything
 */
export type EmptyVoidFn = () => void;

export interface MapPropOptions extends BasePropOptions {
  /**
   * The type of the Map (Map<string, THIS>)
   */
  of?: any;
}

export interface IModelOptions {
  /** An Existing Mongoose Connection */
  existingMongoose?: mongoose.Mongoose;
  /** Supports all Mongoose's Schema Options */
  schemaOptions?: mongoose.SchemaOptions;
  /** An Existing Connection */
  existingConnection?: mongoose.Connection;
  /** Typegoose Custom Options */
  options?: ICustomOptions;
}

export interface ICustomOptions {
  /**
   * Set the modelName of the class
   *
   * if "automaticName" is true it sets a *suffix* instead of the whole name
   * @default schemaOptions.collection
   */
  customName?: string;
  /**
   * Enable Automatic Name generation of a model
   * Example:
   * class with name of "SomeClass"
   * and option "collection" of "SC"
   *
   * will generate the name of "SomeClass_SC"
   * @default false
   */
  automaticName?: boolean;
  /** Allow "mongoose.Schema.Types.Mixed"? */
  allowMixed?: Severity;
  /** Run "model.syncIndexes" when model is finished compiling? */
  runSyncIndexes?: boolean;
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

/*
 copy-paste from mongodb package (should be same as IndexOptions from 'mongodb')
 */

export interface IndexOptions<T> {
  /**
   * Mongoose-specific syntactic sugar, uses ms to convert
   * expires option into seconds for the expireAfterSeconds in the above link.
   */
  expires?: string;
  /**
   * Creates an unique index.
   */
  unique?: boolean;
  /**
   * Creates a sparse index.
   */
  sparse?: boolean;
  /**
   * Creates the index in the background, yielding whenever possible.
   */
  background?: boolean;
  /**
   * A unique index cannot be created on a key that has pre-existing duplicate values.
   * If you would like to create the index anyway, keeping the first document the database indexes and
   * deleting all subsequent documents that have duplicate value
   */
  dropDups?: boolean;
  /**
   * For geo spatial indexes set the lower bound for the co-ordinates.
   */
  min?: number;
  /**
   * For geo spatial indexes set the high bound for the co-ordinates.
   */
  max?: number;
  /**
   * Specify the format version of the indexes.
   */
  v?: number;
  /**
   * Allows you to expire data on indexes applied to a data (MongoDB 2.2 or higher)
   */
  expireAfterSeconds?: number;
  /**
   * Override the auto generated index name (useful if the resulting name is larger than 128 bytes)
   */
  name?: string;
  /**
   * Creates a partial index based on the given filter object (MongoDB 3.2 or higher)
   */
  partialFilterExpression?: any;
  collation?: object;
  default_language?: string;
  language_override?: string;

  lowercase?: boolean; // whether to always call .toLowerCase() on the value
  uppercase?: boolean; // whether to always call .toUpperCase() on the value
  trim?: boolean; // whether to always call .trim() on the value

  weights?: {
    [P in keyof Partial<T>]: number;
  };
}

/**
 * Used for the Reflection of Indexes
 * @example
 * ```ts
 * const indices: IIndexArray[] = Reflect.getMetadata(DecoratorKeys.Index, target) || []);
 * ```
 */
export interface IIndexArray<T> {
  fields: {
    [key: string]: any;
  };
  options: IndexOptions<T>;
}

/**
 * Used for the Reflection of Plugins
 * @example
 * ```ts
 * const plugins: IPluginsArray<any>[] = Array.from(Reflect.getMetadata(DecoratorKeys.Plugins, target) ?? []);
 * ```
 */
export interface IPluginsArray<T> {
  mongoosePlugin: Func;
  options: T;
}

/**
 * Used for the Reflection of Virtual Populates
 * @example
 * ```ts
 * const virtuals: VirtualPopulateMap = new Map(Reflect.getMetadata(DecoratorKeys.VirtualPopulate, target.constructor) ?? []);
 * ```
 */
export type VirtualPopulateMap = Map<string, any & VirtualOptions>;

/**
 * Used for the Reflection of Query Methods
 * @example
 * ```ts
 * const queryMethods: QueryMethodMap = new Map(Reflect.getMetadata(DecoratorKeys.QueryMethod, target.constructor) ?? []);
 * ```
 */
export type QueryMethodMap = Map<string, Func>;

/**
 * Used for the Reflection of Hooks
 * @example
 * ```ts
 * const postHooks: IHooksArray[] = Array.from(Reflect.getMetadata(DecoratorKeys.HooksPost, target) ?? []);
 * ```
 */
export interface IHooksArray {
  func: Func;
  method: string | RegExp;
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

export interface IObjectWithTypegooseFunction {
  typegooseName(): string;
}

export interface IObjectWithTypegooseName {
  typegooseName: string;
}

/** For the types that error that seemingly dont have a prototype */
export interface IPrototype {
  prototype?: any;
}
