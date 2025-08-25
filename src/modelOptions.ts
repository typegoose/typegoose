import type * as mongoose from 'mongoose';
import { DecoratorKeys } from './internal/constants';
import { assignGlobalModelOptions, assignMetadata } from './internal/utils';
import type { IModelOptions } from './types';

// Disable ban-types because we want the same defaults as mongoose
/* eslint-disable @typescript-eslint/ban-types */
/**
 * Define Options for the Class
 * @param options The Options to set
 * @example Example:
 * ```ts
 * @modelOptions({ schemaOptions: { timestamps: true } })
 * class ClassName {}
 *
 * // The default Class "TimeStamps" can be used for type information and options already set
 * ```
 */
export function modelOptions<
  DocType = unknown,
  TInstanceMethods = {},
  QueryHelpers = {},
  TStaticMethods = {},
  TVirtuals = {},
  THydratedDocumentType = mongoose.HydratedDocument<DocType, TInstanceMethods, QueryHelpers>,
  TModelType = mongoose.Model<DocType, QueryHelpers, TInstanceMethods, TVirtuals, THydratedDocumentType>,
>(
  /* eslint-enable @typescript-eslint/ban-types */
  options: IModelOptions<DocType, TInstanceMethods, QueryHelpers, TStaticMethods, TVirtuals, THydratedDocumentType, TModelType>
): ClassDecorator {
  return (target: any) => {
    assignGlobalModelOptions(target);
    assignMetadata(DecoratorKeys.ModelOptions, options, target);
  };
}

// Export it PascalCased
export { modelOptions as ModelOptions };
