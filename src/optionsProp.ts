import * as mongoose from 'mongoose';
import { DecoratorKeys } from './internal/constants';

export interface IModelOptions {
  /** An Existing Mongoose Connection */
  existingMongoose?: mongoose.Mongoose;
  /** Supports all Mongoose's Schema Options */
  schemaOptions?: mongoose.SchemaOptions;
  /** An Existing Connection */
  existingConnection?: mongoose.Connection;
  /** Typegoose Custom Options */
  options?: {
    /**
     * Set a custom suffix for the model
     * @default schemaOptions.collection
     */
    customName?: string;
  };
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
  return (target: any) => {
    const rfoptions: IModelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, target) || {};
    Reflect.defineMetadata(DecoratorKeys.ModelOptions, Object.assign(rfoptions, options), target);
  };
}
