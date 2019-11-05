import { DecoratorKeys } from './internal/constants';
import { globalOptions } from './internal/data';
import { assignMetadata, getName, isNullOrUndefined } from './internal/utils';
import { logger } from './logSettings';
import { IModelOptions } from './types';

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
    if (isNullOrUndefined(Reflect.getMetadata(DecoratorKeys.ModelOptions, target))) {
      logger.info('Assigning global Schema Options to "%s"', getName(target));
      for (const key of Object.keys(globalOptions)) {
        options[key] = Object.assign({}, globalOptions[key], options[key]);
      }
    }
    assignMetadata(DecoratorKeys.ModelOptions, options, target);
  };
}
