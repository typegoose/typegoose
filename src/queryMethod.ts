import { DecoratorKeys } from './internal/constants';
import { getName } from './internal/utils';
import { logger } from './logSettings';
import type { Func, QueryMethodMap } from './types';

/**
 * Define Options for the Class
 * @param options Options
 * @example Example:
 * ```
 *  @modelOptions({ schemaOptions: { timestamps: true } })
 *  class Name {}
 *
 *  // Note: The default Class "TimeStamps" can be used for type information and options already set
 * ```
 */
export function queryMethod(func: Func) {
  return (target: any) => {
    logger.info('Adding query method "%s" to %s', func.name, getName(target));
    const queryMethods: QueryMethodMap = new Map(Reflect.getMetadata(DecoratorKeys.QueryMethod, target) ?? []);
    queryMethods.set(func.name, func);
    Reflect.defineMetadata(DecoratorKeys.QueryMethod, queryMethods, target);
  };
}
