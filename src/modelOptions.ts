import { DecoratorKeys } from './internal/constants.js';
import { assignGlobalModelOptions, assignMetadata } from './internal/utils.js';
import type { IModelOptions } from './types.js';

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
export function modelOptions(options: IModelOptions): ClassDecorator {
  return (target: any) => {
    assignGlobalModelOptions(target);
    assignMetadata(DecoratorKeys.ModelOptions, options, target);
  };
}

// Export it PascalCased
export { modelOptions as ModelOptions };
