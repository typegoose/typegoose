import { isNullOrUndefined } from 'util';
import { DecoratorKeys } from './internal/constants';
import { globalOptions } from './internal/data';
import { assignMetadata, getName } from './internal/utils';
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
    if (isNullOrUndefined(Reflect.getMetadata(DecoratorKeys.ModelOptions, target))
      && typeof globalOptions.globalSchemaOptions === 'object'
    ) {
      logger.info('Assigning global Schema Options to "%s"', getName(target));
      Object.assign(options.schemaOptions, globalOptions.globalSchemaOptions);
    }
    assignMetadata(DecoratorKeys.ModelOptions, options, target);
  };
}
