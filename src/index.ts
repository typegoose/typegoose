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

  lowercase?: boolean; // whether to always call .toLowerCase() on the value
  uppercase?: boolean; // whether to always call .toUpperCase() on the value
  trim?: boolean; // whether to always call .trim() on the value

  weights?: {
    [P in keyof Partial<T>]: number;
  };
}

/**
 * Defines an index (most likely compound) for this schema.
 * @param fields Wich fields to give the Options
 * @param options Options to pass to MongoDB driver's createIndex() function
 * @example Example:
 * ```
 *  @index({ article: 1, user: 1 }, { unique: true })
 *  class Name extends Typegoose {}
 * ```
 */
export function index<T>(fields: T, options?: IndexOptions<T>) {
  return (constructor: any) => {
    const indices = Reflect.getMetadata('typegoose:indices', constructor) || [];
    indices.push({ fields, options });
    Reflect.defineMetadata('typegoose:indices', indices, constructor);
  };
}
