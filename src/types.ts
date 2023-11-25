import type * as mongoose from 'mongoose';
import type { Severity, PropType } from './internal/constants';

/**
 * Get the Type of an instance of a Document with Class properties
 * @example
 * ```ts
 * class ClassName {
 *   @prop()
 *   public someProperty: string;
 * }
 * const NameModel = getModelForClass(ClassName);
 *
 * const doc: DocumentType<ClassName> = await NameModel.create({});
 * ```
 */
export type DocumentType<T, QueryHelpers = BeAnObject> = mongoose.Document<unknown, QueryHelpers, T> &
  mongoose.Require_id<T> &
  IObjectWithTypegooseFunction;
/**
 * Get the Type of an instance of a SubDocument with Class properties
 */
export type SubDocumentType<T, QueryHelpers = BeAnObject> = DocumentType<T, QueryHelpers> & mongoose.Types.Subdocument;
/**
 * Get the Type of an instance of a SubDocument that exists within an array, with Class properties
 */
export type ArraySubDocumentType<T, QueryHelpers = BeAnObject> = DocumentType<T, QueryHelpers> & mongoose.Types.ArraySubdocument;
/**
 * Used Internally for ModelTypes
 */
export type ModelType<T, QueryHelpers = BeAnObject> = mongoose.Model<
  T, // raw doc type
  QueryHelpers, // query helpers
  IObjectWithTypegooseFunction, // instance methods
  BeAnyObject // virtuals
>;
/**
 * Any-param Constructor
 */
export type AnyParamConstructor<T> = new (...args: any) => T;
/**
 * The Type for Models used in typegoose, mostly returned by "getModelForClass" and "addModelToTypegoose"
 * @example
 * const Model: ReturnModelType<typeof YourClass, YourClassQueryHelper> = mongoose.model("YourClass", YourClassSchema);
 */
export type ReturnModelType<U extends AnyParamConstructor<any>, QueryHelpers = BeAnObject> = ModelType<InstanceType<U>, QueryHelpers> & U;

/** Generic "Function" type, because typescript does not like using "Function" directly in strict mode */
export type Func = (...args: any[]) => any;
/**
 * The Type of a function to generate a custom model name.
 */
export type CustomNameFunction = (options: IModelOptions) => string;
/**
 * Defer a reference with a function (or as other projects call it "Forward declaration")
 * @param type This is just to comply with the common pattern of `type => ActualType`
 */
export type DeferredFunc<T = any> = (...args: unknown[]) => T;
/**
 * Dynamic Functions, since mongoose 4.13
 * @param doc The Document current document
 */
export type DynamicStringFunc<T extends AnyParamConstructor<any>> = (doc: DocumentType<T>) => string;

/** Type to keep the "discriminators" options consistent in types */
export type NestedDiscriminatorsFunction = DeferredFunc<(AnyParamConstructor<any> | DiscriminatorObject)[]>;

/** Type for enum "values" */
export type EnumValues =
  | Array<string | number | null>
  | ReadonlyArray<string | number | null>
  | { [path: string | number]: string | number | null }; // unlike the mongoose type, "path" is a "string" or "number" here because of how typescript enums work

/** Type for the enum object with custom message*/
export interface EnumObj {
  values: EnumValues | DeferredFunc<EnumValues>; // unlike the mongoose type, this will have to use "DeferredFunc"
  message?: string;
}

/** Type for combines {@link EnumValues} and {@link @EnumObj} */
export type EnumCombinedType = EnumValues | EnumObj;

/**
 * This Interface for most properties uses "mongoose.SchemaTypeOptions<any>['']", but for some special (or typegoose custom) options, it is not used
 *
 * Example: `index` is directly from mongoose, where as `type` is from typegoose
 */
export interface BasePropOptions {
  /**
   * include this value?
   * @default true (Implicitly)
   */
  select?: mongoose.SchemaTypeOptions<any>['select'];
  /**
   * is this value required?
   * @default false (Implicitly)
   */
  required?: mongoose.SchemaTypeOptions<any>['required'];
  /** Only accept Values from the Enum(|Array) */
  enum?: EnumCombinedType | DeferredFunc<EnumCombinedType> | { values: DeferredFunc<EnumValues>; message?: string };
  /**
   * Add "null" to the enum array
   * Note: Custom Typegoose Option
   */
  addNullToEnum?: boolean;
  /**
   * Set Custom "warnMixed" Severity for a specific property
   * Overwrites Severity set in "modelOptions" for a specific property
   * Note: Custom Typegoose Option
   */
  allowMixed?: Severity;
  /** Give the Property a default Value */
  default?: mongoose.SchemaTypeOptions<any>['default']; // I know this one does not have much of an effect, because of "any"
  /** Give a Validator RegExp or Function */
  validate?: mongoose.SchemaTypeOptions<any>['validate'];
  /**
   * Should this property have a "unique" index?
   * @link https://docs.mongodb.com/manual/indexes/#unique-indexes
   */
  unique?: mongoose.SchemaTypeOptions<any>['unique'];
  /**
   * Should this property have an index?
   * Note: don't use this if you want to do a compound index
   * @link https://docs.mongodb.com/manual/indexes
   */
  index?: mongoose.SchemaTypeOptions<any>['index'];
  /**
   * Should this property have a "sparse" index?
   * @link https://docs.mongodb.com/manual/indexes/#sparse-indexes
   */
  sparse?: mongoose.SchemaTypeOptions<any>['sparse'];
  /**
   * Should this property have an "expires" index?
   * @link https://docs.mongodb.com/manual/tutorial/expire-data
   */
  expires?: mongoose.SchemaTypeOptions<any>['expires'];
  /**
   * Should this property have a "text" index?
   * @link https://mongoosejs.com/docs/api/schematype.html#schematype_SchemaType-text
   */
  text?: mongoose.SchemaTypeOptions<any>['text'];
  /** Should subdocuments get their own id?
   * @default true (Implicitly)
   */
  _id?: mongoose.SchemaTypeOptions<any>['_id'];
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
  set?: mongoose.SchemaTypeOptions<any>['set'];
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
  get?: mongoose.SchemaTypeOptions<any>['get'];
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
  immutable?: mongoose.SchemaTypeOptions<any>['immutable'];
  /**
   * Give the Property an alias in the output
   *
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
  alias?: mongoose.SchemaTypeOptions<any>['alias'];
  /**
   * This option as only an effect when the plugin `mongoose-autopopulate` is used
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  autopopulate?: boolean | Function | KeyStringAny;
  /** Reference another Document (you should use Ref<T> as Prop type) */
  ref?: DeferredFunc<string | AnyParamConstructor<any> | DynamicStringFunc<any>> | string | AnyParamConstructor<any>;
  /** Take the Path and try to resolve it to a Model */
  refPath?: string;
  /**
   * Set the Nested Discriminators
   *
   * Note: "_id: false" as a prop option doesn't work here
   *
   * Note: Custom Typegoose Option
   */
  discriminators?: NestedDiscriminatorsFunction;
  /**
   * Use option {@link BasePropOptions.type}
   * @see https://typegoose.github.io/typegoose/docs/api/decorators/prop#map-options
   * @see https://typegoose.github.io/typegoose/docs/api/decorators/prop#proptype
   */
  of?: never;
  /**
   * If true, uses Mongoose's default `_id` settings. Only allowed for ObjectIds
   *
   * Note: Copied from mongoose's "index.d.ts"#SchemaTypeOptions
   */
  auto?: mongoose.SchemaTypeOptions<any>['auto'];
  /**
   * The default [subtype](http://bsonspec.org/spec.html) associated with this buffer when it is stored in MongoDB. Only allowed for buffer paths
   *
   * Note: Copied from mongoose's "index.d.ts"#SchemaTypeOptions
   */
  subtype?: mongoose.SchemaTypeOptions<any>['subtype'];
  /**
   * If `true`, Mongoose will skip gathering indexes on subpaths. Only allowed for subdocuments and subdocument arrays.
   *
   * Note: Copied from mongoose's "index.d.ts"#SchemaTypeOptions
   */
  excludeIndexes?: mongoose.SchemaTypeOptions<any>['excludeIndexes'];
  /**
   * Define a transform function for this individual schema type.
   * Only called when calling `toJSON()` or `toObject()`.
   *
   * Note: Copied from mongoose's "index.d.ts"#SchemaTypeOptions
   */
  transform?: mongoose.SchemaTypeOptions<any>['transform'];

  // for plugins / undocumented types
  [extra: string]: any;
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

/**
 * Internal type for `utils.mapOptions`
 * @internal
 */
export interface MappedInnerOuterOptions {
  /**
   * Mapped options for the inner of the Type
   */
  inner: NonNullable<KeyStringAny>;
  /**
   * Mapped options for the outer of the type
   */
  outer: NonNullable<KeyStringAny>;
}

/** Options for Array's */
export interface ArrayPropOptions extends BasePropOptions, InnerOuterOptions {
  /**
   * How many dimensions this Array should have
   * (needs to be higher than 0)
   *
   * Note: Custom Typegoose Option
   * @default 1
   */
  dim?: number;
  /**
   * Set if Non-Array values will be cast to an array
   *
   * NOTE: This option currently only really affects "DocumentArray" and not normal arrays, https://github.com/Automattic/mongoose/issues/10398
   * @see https://mongoosejs.com/docs/api/schemaarray.html#schemaarray_SchemaArray.options
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

/** Options For Map's */
export interface MapPropOptions extends BasePropOptions, InnerOuterOptions {}

export interface ValidateNumberOptions {
  /** Only allow numbers that are higher than this */
  min?: mongoose.SchemaTypeOptions<any>['min'];
  /** Only allow numbers lower than this */
  max?: mongoose.SchemaTypeOptions<any>['max'];
  /** Only allow Values from the enum */
  enum?: number[];
}

export interface ValidateStringOptions {
  /** Only allow values that match this RegExp */
  match?: mongoose.SchemaTypeOptions<any>['match'];
  /** Only allow Values from the enum */
  enum?: string[];
  /** Only allow values that have at least this length */
  minlength?: mongoose.SchemaTypeOptions<any>['minlength'];
  /** Only allow values that have at max this length */
  maxlength?: mongoose.SchemaTypeOptions<any>['maxlength'];
}

export interface TransformStringOptions {
  /** Should it be lowercased before save? */
  lowercase?: mongoose.SchemaTypeOptions<any>['lowercase'];
  /** Should it be uppercased before save? */
  uppercase?: mongoose.SchemaTypeOptions<any>['uppercase'];
  /** Should it be trimmed before save? */
  trim?: mongoose.SchemaTypeOptions<any>['trim'];
}

export interface VirtualOptions {
  /** Reference another Document (Ref<T> should be used as property type) */
  ref: NonNullable<BasePropOptions['ref']>;
  /** Which property(on the current-Class) to match `foreignField` against */
  localField: mongoose.VirtualTypeOptions['localField'];
  /** Which property(on the ref-Class) to match `localField` against */
  foreignField: mongoose.VirtualTypeOptions['foreignField'];
  /** Return as One Document(true) or as Array(false) */
  justOne?: mongoose.VirtualTypeOptions['justOne'];
  /** Return the number of Documents found instead of the actual Documents */
  count?: mongoose.VirtualTypeOptions['count'];
  /** Extra Query Options */
  options?: mongoose.VirtualTypeOptions['options'];
  /** Match Options */
  match?: mongoose.VirtualTypeOptions['match'];
  /**
   * If you set this to `true`, Mongoose will call any custom getters you defined on this virtual.
   *
   * Note: Copied from mongoose's "index.d.ts"#VirtualTypeOptions
   */
  getters?: mongoose.VirtualTypeOptions['getters'];
  /**
   * Add a default `limit` to the `populate()` query.
   *
   * Note: Copied from mongoose's "index.d.ts"#VirtualTypeOptions
   */
  limit?: mongoose.VirtualTypeOptions['limit'];
  /**
   * Add a default `skip` to the `populate()` query.
   *
   * Note: Copied from mongoose's "index.d.ts"#VirtualTypeOptions
   */
  skip?: mongoose.VirtualTypeOptions['skip'];
  /**
   * For legacy reasons, `limit` with `populate()` may give incorrect results because it only
   * executes a single query for every document being populated. If you set `perDocumentLimit`,
   * Mongoose will ensure correct `limit` per document by executing a separate query for each
   * document to `populate()`. For example, `.find().populate({ path: 'test', perDocumentLimit: 2 })`
   * will execute 2 additional queries if `.find()` returns 2 documents.
   *
   * Note: Copied from mongoose's "index.d.ts"#VirtualTypeOptions
   */
  perDocumentLimit?: mongoose.VirtualTypeOptions['perDocumentLimit'];

  // for plugins / undocumented types
  [extra: string]: any;
}

export type PropOptionsForNumber = BasePropOptions & ValidateNumberOptions;
export type PropOptionsForString = BasePropOptions & TransformStringOptions & ValidateStringOptions;

export type RefType = mongoose.RefType;

/**
 * Reference another Model
 */
export type Ref<
  PopulatedType,
  RawId extends mongoose.RefType = PopulatedType extends { _id?: mongoose.RefType }
    ? NonNullable<PopulatedType['_id']>
    : mongoose.Types.ObjectId,
> = mongoose.PopulatedDoc<DocumentType<PopulatedType>, RawId>;

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

/** Interface for just all naming options */
export interface INamingOptions {
  /** Same as in {@link ICustomOptions} */
  customName?: ICustomOptions['customName'];
  /** Same as in {@link ICustomOptions} */
  automaticName?: ICustomOptions['automaticName'];
  /** Same as in {@link mongoose.SchemaOptions} */
  schemaCollection?: mongoose.SchemaOptions['collection'];
}

/** Typegoose options, mostly for "modelOptions({ options: ICustomOptions })" */
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
  /**
   * Enable Overwriting of the plugins on the "to-be" discriminator schema with the base schema's
   * Note: this does not actually "merge plugins", it will overwrite the "to-be" discriminator's plugins with the base schema's
   * If {@link ICustomOptions.enableMergePlugins} and {@link ICustomOptions.enableMergeHooks} are both "false", then the global plugins will be automatically applied by typegoose, see https://github.com/Automattic/mongoose/issues/12696
   * @default false
   */
  enableMergePlugins?: boolean;
  /**
   * Enable Merging of Hooks
   * Note: only hooks that can be matched against each-other can be de-duplicated
   * If {@link ICustomOptions.enableMergePlugins} and {@link ICustomOptions.enableMergeHooks} are both "false", then the global plugins will be automatically applied by typegoose, see https://github.com/Automattic/mongoose/issues/12696
   * @default false
   */
  enableMergeHooks?: boolean;
  /**
   * Disable all lower indexes than this class (works like `sch.clone().clearIndexes()`)
   *
   * This option DOES NOT get inherited
   * @default false
   */
  disableLowerIndexes?: boolean;
  /**
   * Set the Nested Discriminators on the *base* of the Discriminators
   *
   * This option can be used over the prop-option to not have to re-define discriminators if used in multiple classes
   */
  discriminators?: NestedDiscriminatorsFunction;
  /**
   * Disable Caching for this Class if defined via `@modelOptions`, or disable caching for the `getModelForClass` / `buildSchema` / `getDiscriminatorModelForClass`
   * Does NOT overwrite global disabled caching
   * "undefined" and "false" have the same meaning
   * @default false
   */
  disableCaching?: boolean;
}

/** Extra options for "_buildSchema" in "schema.ts" */
export interface IBuildSchemaOptions {
  /**
   * Add indexes from this class?
   * will be "false" when "ICustomOptions.disableLowerIndexes" is "true" for some upper class
   * @default true
   */
  buildIndexes?: boolean;
}

/** Type for the Values stored in the Reflection for Properties */
export interface DecoratedPropertyMetadata {
  /** Prop Options */
  options: KeyStringAny;
  /** The Target Reflection target for getting metadata from keys */
  target: AnyParamConstructor<any>;
  /** Property name */
  key: string | symbol;
  /** What is it for a prop type? */
  propType?: PropType;
}
export type DecoratedPropertyMetadataMap = Map<string | symbol, DecoratedPropertyMetadata>;

/**
 * Alias of "mongoose.IndexOptions" for convenience
 */
export type IndexOptions = mongoose.IndexOptions;

/**
 * Type for the Values stored in the Reflection for Indexes
 * @example
 * ```ts
 * const indices: IIndexArray[] = Reflect.getMetadata(DecoratorKeys.Index, target) || []);
 * ```
 */
export interface IIndexArray {
  fields: KeyStringAny;
  options?: IndexOptions;
}

/**
 * Type for the Values stored in the Reflection for Plugins
 * @example
 * ```ts
 * const plugins: IPluginsArray[] = Array.from(Reflect.getMetadata(DecoratorKeys.Plugins, target) ?? []);
 * ```
 */
export interface IPluginsArray {
  /** The Plugin Function to add */
  mongoosePlugin: Func;
  /** The Plugin's options, which could be anything because mongoose does not enforce it to be a object */
  options: any | undefined;
}

/**
 * Type for the Values stored in the Reflection for Virtual Populates
 * @example
 * ```ts
 * const virtuals: VirtualPopulateMap = new Map(Reflect.getMetadata(DecoratorKeys.VirtualPopulate, target.constructor) ?? []);
 * ```
 */
export type VirtualPopulateMap = Map<string, VirtualOptions & Record<string, unknown>>;

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
 * Helper type to easily set the `this` type in a QueryHelper function
 *
 * @example
 * function findById(this: QueryHelperThis<typeof YourClass, YourClassQueryHelpers>, id: string) {
 *   return this.findOne({ _id: id });
 * }
 */
export type QueryHelperThis<
  T extends AnyParamConstructor<any>,
  QueryHelpers,
  S = DocumentType<InstanceType<T>, QueryHelpers>,
> = mongoose.QueryWithHelpers<S | null, S, QueryHelpers, InstanceType<T>>;

/**
 * Type for the Values stored in the Reflection for Query Methods
 * @example
 * ```ts
 * const queryMethods: QueryMethodMap = new Map(Reflect.getMetadata(DecoratorKeys.QueryMethod, target) ?? []);
 * ```
 */
export type QueryMethodMap = Map<string, Func>;

/**
 * Type for the Values stored in the Reflection for Nested Discriminators
 * @example
 * ```ts
 * const disMap: NestedDiscriminatorsMap = new Map(Reflect.getMetadata(DecoratorKeys.NestedDiscriminators, target) ?? []);
 * ```
 */
export type NestedDiscriminatorsMap = Map<string, DiscriminatorObject[]>;

/** A Helper type to combine both mongoose Hook Option types */
export type HookOptionsEither = mongoose.SchemaPreOptions | mongoose.SchemaPostOptions;

/**
 * Type for the Values stored in the Reflection for Hooks
 * @example
 * ```ts
 * const postHooks: IHooksArray[] = Array.from(Reflect.getMetadata(DecoratorKeys.HooksPost, target) ?? []);
 * ```
 */
export interface IHooksArray {
  /** The Function to add as a hooks */
  func: Func;
  /** The Method to where this hook gets triggered */
  methods: (string | RegExp)[];
  /**
   * Options for Hooks
   * @see https://mongoosejs.com/docs/middleware.html#naming
   */
  options?: HookOptionsEither;
}

export interface IGlobalOptions {
  /** Typegoose Options */
  options?: ICustomOptions;
  /** Schema Options that should get applied to all models */
  schemaOptions?: mongoose.SchemaOptions;
  /**
   * Global Options for general Typegoose
   */
  globalOptions?: ITypegooseOptions;
}

export interface ITypegooseOptions {
  /**
   * Option to disable caching globally
   * completely disables the "constructors" and "models" maps
   * "false" and "undefined" have the same result of enabling caching
   * @default false
   */
  disableGlobalCaching?: boolean;
}

/** Interface describing a Object that has a "typegooseName" Function */
export interface IObjectWithTypegooseFunction {
  typegooseName(): string;
}

/** For the types that error that seemingly don't have a prototype */
export interface IPrototype {
  prototype?: any;
}

/** A Helper Interface for defining a "key" index of "string" and "value" of "any" */
export type KeyStringAny = Record<string, any>;

/**
 * The Return Type of "utils.getType"
 */
export interface GetTypeReturn {
  type: unknown;
  dim: number;
}

/**
 * This type is for lint error "ban-types" where "{}" would be used
 * This type is separate from "{@link KeyStringAny}" because it has a different meaning
 */
export type BeAnObject = Record<string, any>;
/**
 * This type is for mongoose-specific things where {@link BeAnObject} does not work
 * see https://github.com/Automattic/mongoose/issues/13094
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type BeAnyObject = {};

/** Options used for "processProp" */
export interface ProcessPropOptions extends DecoratedPropertyMetadata {
  /** The target Class's static version */
  cl: AnyParamConstructor<any>;
}

/**
 * Get all keys from "T" that are a function
 * does NOT filter out getters / setters
 */
export type GetFunctionKeys<T extends object> = {
  [K in keyof T]: T[K] extends (...args: any) => any ? K : never;
}[keyof T];

/**
 * Remove all properties from "T" that are a function
 * does NOT filter out getters / setters
 */
export type FilterOutFunctionKeys<T extends object> = Omit<T, GetFunctionKeys<T>>;
