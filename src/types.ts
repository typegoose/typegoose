import type * as mongoose from 'mongoose';
import type { Severity, WhatIsIt } from './internal/constants';

/**
 * Get the Type of an instance of a Document with Class properties
 * @example
 * ```ts
 * class ClassName {}
 * const NameModel = getModelForClass(ClassName);
 *
 * const doc: DocumentType<ClassName> = await NameModel.create({});
 * ```
 */
export type DocumentType<T, QueryHelpers = BeAnObject> = (T extends { _id: unknown }
  ? mongoose.Document<T['_id'], QueryHelpers> & T
  : mongoose.Document<any, QueryHelpers> & T) &
  IObjectWithTypegooseFunction;
/**
 * Used Internally for ModelTypes
 */
export type ModelType<T, QueryHelpers = BeAnObject> = mongoose.Model<DocumentType<T, QueryHelpers>, QueryHelpers>;
/**
 * Any-param Constructor
 */
export type AnyParamConstructor<T> = new (...args: any) => T;
/**
 * The Type of a Model that gets returned by "getModelForClass" and "setModelForClass"
 */
export type ReturnModelType<U extends AnyParamConstructor<any>, QueryHelpers = BeAnObject> = ModelType<InstanceType<U>, QueryHelpers> & U;

export type Func = (...args: any[]) => any;

/**
 * The Type of a function to generate a custom model name.
 */
export type CustomNameFunction = (options: IModelOptions) => string;

export type RequiredType = boolean | [boolean, string] | string | Func | [Func, string];

export type ValidatorFunction = (value: any) => boolean | Promise<boolean>;
export interface ValidatorFunctionMessageParam {
  validator: ValidatorFunction;
  message(...args: any[]): string;
  type: string;
  path: string;
  value: any;
}
export interface ValidatorOptions {
  validator: ValidatorFunction;
  // the function for message is with "any" because i (hasezoey) am not sure if the type is always "ValidatorFunctionMessageParam"
  message?: string | ((props: ValidatorFunctionMessageParam) => string) | ((...args: any[]) => string);
}
export type Validator = ValidatorFunction | RegExp | ValidatorOptions | ValidatorOptions[];

/**
 * Defer an reference with an function (or as other projects call it "Forward declaration")
 * @param type This is just to comply with the common pattern of `type => ActualType`
 */
export type DeferredFunc<T = any> = (...args: unknown[]) => T;
/**
 * Dynamic Functions, since mongoose 4.13
 * @param doc The Document current document
 */
export type DynamicStringFunc<T extends AnyParamConstructor<any>> = (doc: DocumentType<T>) => string;

export interface BasePropOptions {
  [key: string]: any;
  /**
   * include this value?
   * @default true (Implicitly)
   */
  select?: boolean;
  /**
   * is this value required?
   * @default false (Implicitly)
   */
  required?: RequiredType;
  /** Only accept Values from the Enum(|Array) */
  enum?: string[] | BeAnObject;
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
   * Set a Setter (Non-Virtual) to pre-process your value
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
   * Set a Getter (Non-Virtual) to Post-process your value
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
  type?: DeferredFunc<AnyParamConstructor<any>> | DeferredFunc<unknown> | unknown;
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
  // eslint-disable-next-line @typescript-eslint/ban-types
  autopopulate?: boolean | Function | KeyStringAny;
  /** Reference an other Document (you should use Ref<T> as Prop type) */
  ref?: DeferredFunc<string | AnyParamConstructor<any> | DynamicStringFunc<any>> | string | AnyParamConstructor<any>;
  /** Take the Path and try to resolve it to a Model */
  refPath?: string;
  /**
   * Set the Nested Discriminators
   * Note: "_id: false" as an prop option dosnt work here
   */
  discriminators?: DeferredFunc<(AnyParamConstructor<any> | DiscriminatorObject)[]>;
}

export interface InnerOuterOptions {
  /**
   * Use this to define inner-options
   * Use this if the auto-mapping is not correct or for plugin options
   *
   * Please open a new issue if some option is mismatched or not existing / mapped
   */
  innerOptions?: KeyStringAny;
  /**
   * Use this to define outer-options
   * Use this if the auto-mapping is not correct or for plugin options
   *
   * Please open a new issue if some option is mismatched or not existing / mapped
   */
  outerOptions?: KeyStringAny;
}

export interface ArrayPropOptions extends BasePropOptions, InnerOuterOptions {
  /**
   * How many dimensions this Array should have
   * (needs to be higher than 0)
   * @default 1
   */
  dim?: number;
  /**
   * Set if Non-Array values will be cast to an array
   * https://mongoosejs.com/docs/api/schemaarray.html#schemaarray_SchemaArray.options
   * NOTE: This option currently only really affects "DocumentArray" and not normal arrays, https://github.com/Automattic/mongoose/issues/10398
   * @example
   * ```ts
   * new Model({ array: "string" });
   * // will be cast to equal
   * new Model({ array: ["string"] });
   * ```
   * @default true
   */
  castNonArrays?: boolean;
}

export interface MapPropOptions extends BasePropOptions, InnerOuterOptions {}

export interface ValidateNumberOptions {
  /** Only allow numbers that are higher than this */
  min?: number | [number, string];
  /** Only allow numbers lower than this */
  max?: number | [number, string];
  /** Only allow Values from the enum */
  enum?: number[];
}

export interface ValidateStringOptions {
  /** Only allow values that match this RegExp */
  match?: RegExp | [RegExp, string];
  /** Only allow Values from the enum */
  enum?: string[];
  /** Only allow values that have at least this length */
  minlength?: number | [number, string];
  /** Only allow values that have at max this length */
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
  /** Reference another Document (Ref<T> should be used as property type) */
  ref: NonNullable<BasePropOptions['ref']>;
  /** Which property(on the current-Class) to match `foreignField` against */
  localField: string | DynamicStringFunc<any>;
  /** Which property(on the ref-Class) to match `localField` against */
  foreignField: string | DeferredFunc<string>;
  /** Return as One Document(true) or as Array(false) */
  justOne?: boolean;
  /** Return the number of Documents found instead of the actual Documents */
  count?: boolean;
  /** Extra Query Options */
  options?: KeyStringAny;
  /** Match Options */
  match?: KeyStringAny | ((doc) => KeyStringAny);
}

export type PropOptionsForNumber = BasePropOptions & ValidateNumberOptions;
export type PropOptionsForString = BasePropOptions & TransformStringOptions & ValidateStringOptions;

export type RefType = mongoose.RefType;

/**
 * Reference another Model
 */
export type Ref<
  PopulatedType,
  RawId extends mongoose.RefType =
    | (PopulatedType extends { _id?: mongoose.RefType } ? NonNullable<PopulatedType['_id']> : mongoose.Types.ObjectId)
    | undefined
> = mongoose.PopulatedDoc<PopulatedType, RawId>;

/**
 * An Function type for a function that doesn't have any arguments and doesn't return anything
 */
export type EmptyVoidFn = () => void;

export interface DiscriminatorObject {
  /** The Class to use */
  type: AnyParamConstructor<any>;
  /**
   * The Name to differentiate between other classes
   * Mongoose JSDOC: [value] the string stored in the `discriminatorKey` property. If not specified, Mongoose uses the `name` parameter.
   * @default {string} The output of "getName"
   */
  value?: string;
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
   * Set the modelName of the class.
   * If it is a function, the function will be executed. The function will override
   * "automaticName". If "automaticName" is true and "customName" is a string, it
   * sets a *suffix* instead of the whole name.
   * @default schemaOptions.collection
   */
  customName?: string | CustomNameFunction;
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
  options: any;
  /** Target Class */
  target: AnyParamConstructor<any>;
  /** Property name */
  key: string | symbol;
  /** What is it for a prop type? */
  whatis?: WhatIsIt;
}
export type DecoratedPropertyMetadataMap = Map<string | symbol, DecoratedPropertyMetadata>;

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
  collation?: BeAnObject;
  default_language?: string;
  language_override?: string;

  lowercase?: boolean; // whether to always call .toLowerCase() on the value
  uppercase?: boolean; // whether to always call .toUpperCase() on the value
  trim?: boolean; // whether to always call .trim() on the value

  weights?: Partial<Record<keyof T, number>>;
}

/**
 * Used for the Reflection of Indexes
 * @example
 * ```ts
 * const indices: IIndexArray[] = Reflect.getMetadata(DecoratorKeys.Index, target) || []);
 * ```
 */
export interface IIndexArray<T> {
  fields: KeyStringAny;
  options?: IndexOptions<T>;
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
 * Gets the signature (parameters with their types, and the return type) of a function type.
 *
 * @description Should be used when defining an interface for a class that uses query methods.
 *
 * @example
 * ```ts
 * function sendMessage(recipient: string, sender: string, priority: number, retryIfFails: boolean) {
 *  // some logic...
 *  return true;
 * }
 *
 * // Both of the following types will be identical.
 * type SendMessageType = AsQueryMethod<typeof sendMessage>;
 * type SendMessageManualType = (recipient: string, sender: string, priority: number, retryIfFails: boolean) => boolean;
 * ```
 */
export type AsQueryMethod<T extends (...args: any) => any> = (...args: Parameters<T>) => ReturnType<T>;

/**
 * Used for the Reflection of Query Methods
 * @example
 * ```ts
 * const queryMethods: QueryMethodMap = new Map(Reflect.getMetadata(DecoratorKeys.QueryMethod, target) ?? []);
 * ```
 */
export type QueryMethodMap = Map<string, Func>;

/**
 * Used for the Reflection of Nested Discriminators
 * @example
 * ```ts
 * const disMap: NestedDiscriminatorsMap = new Map(Reflect.getMetadata(DecoratorKeys.NestedDiscriminators, target) ?? []);
 * ```
 */
export type NestedDiscriminatorsMap = Map<string, DiscriminatorObject[]>;

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
  globalOptions?: BeAnObject;
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

/** An Helper Interface for key: any: string */
export interface KeyStringAny {
  [key: string]: any;
}

/**
 * The Return Type of "utils.getType"
 */
export interface GetTypeReturn {
  type: unknown;
  dim: number;
}

/**
 * This type is for lint error "ban-types"
 */
export type BeAnObject = Record<string, any>;
