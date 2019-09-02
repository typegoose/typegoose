import * as mongoose from 'mongoose';
import { DecoratorKeys } from './constants';

export interface IModelOptions {
  /** An Existing Mongoose Connection */
  existingMongoose?: mongoose.Mongoose;
  /** Supports all Mongoose's Schema Options */
  schemaOptions?: mongoose.SchemaOptions;
  /** An Existing Connection */
  existingConnection?: mongoose.Connection;
}

/**
 * Define Options for the Class
 * @param options Options
 * @example Example:
 * ```
 *  @modelOptions({ schemaOptions: { timestamps: true } })
 *  class Name {}
 *
 *  // Note: The default Class "TimeStamps" can be used for type infomation and options already set
 * ```
 */
export function modelOptions(options: IModelOptions) {
  return (constructor: any) => {
    const rfoptions: IModelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, constructor) || {};
    Reflect.defineMetadata(DecoratorKeys.ModelOptions, Object.assign(rfoptions, options), constructor);
  };
}
