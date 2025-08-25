import { DecoratorKeys } from './internal/constants';
import { assignGlobalModelOptions, assignMetadata } from './internal/utils';
import type { AnyParamConstructor, BeAnObject, IModelOptions } from './types';

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
export function modelOptions<U extends AnyParamConstructor<any> = any, QueryHelpers = BeAnObject>(
  options: IModelOptions<U, QueryHelpers>
): ClassDecorator {
  return (target: any) => {
    assignGlobalModelOptions(target);
    assignMetadata(DecoratorKeys.ModelOptions, options, target);
  };
}

// Export it PascalCased
export { modelOptions as ModelOptions };
