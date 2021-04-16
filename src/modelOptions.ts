import { DecoratorKeys } from './internal/constants';
import { assignGlobalModelOptions, assignMetadata } from './internal/utils';
import type { IModelOptions } from './types';

/**
 * Define Options for the Class
 * @param options Options
 * @example Example:
 * ```ts
 * @modelOptions({ schemaOptions: { timestamps: true } })
 * class ClassName {}
 *
 * // The default Class "TimeStamps" can be used for type information and options already set
 * ```
 */
export function modelOptions(options: IModelOptions): ClassDecorator {
  return (target: any) => {
    assignGlobalModelOptions(target);
    assignMetadata(DecoratorKeys.ModelOptions, options, target);
  };
}

// Export it PascalCased
export { modelOptions as ModelOptions };
