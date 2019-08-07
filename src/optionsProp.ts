import { GridFSBucketOptions } from 'mongodb';
import * as mongoose from 'mongoose';

export interface IModelOptions {
  /** An Existing Mongoose Connection */
  existingMongoose?: mongoose.Mongoose;
  /** Supports all Mongoose's Schema Options */
  schemaOptions?: mongoose.SchemaOptions;
  /** An Existing Connection */
  existingConnection?: mongoose.Connection;
  /** gridFS Options (needs to extend the GridFS class) */
  gridFS?: GridFSBucketOptions;
}

/**
 * Define Options for the Class
 * @param options Options
 * @example Example:
 * ```
 *  @modelOptions({ schemaOptions: { timestamps: true } })
 *  class Name {}
 * ```
 */
export function modelOptions(options: IModelOptions) {
  return (constructor: any) => {
    const rfoptions: IModelOptions = Reflect.getMetadata('typegoose:options', constructor) || {};
    Reflect.defineMetadata('typegoose:options', Object.assign(rfoptions, options), constructor);
  };
}
