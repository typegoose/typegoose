import { DecoratorKeys } from './internal/constants';
import { getName } from './internal/utils';
import { logger } from './logSettings';
import { mongoose } from './typegoose';
import type { AnyParamConstructor, QueryMethodMap, ReturnModelType } from './types';

/**
 * Adds a query method to schema.
 *
 * @param func Query function
 * @example
 * ```ts
 * function findByTitle(this: ReturnModelType<typeof Event>, title: string) {
 *  return this.find({ title });
 * }
 *
 * @queryMethod(findByTitle)
 * class Event {
 *  @prop()
 *  public title: string;
 * }
 * ```
 */
export function queryMethod<QueryHelpers, T, U extends AnyParamConstructor<T>>(
  func: (this: ReturnModelType<U, T, QueryHelpers>, ...params: any[]) => mongoose.DocumentQuery<any, any>
) {
  return (target: any) => {
    logger.info('Adding query method "%s" to %s', func.name, getName(target));
    const queryMethods: QueryMethodMap = new Map(Reflect.getMetadata(DecoratorKeys.QueryMethod, target) ?? []);
    queryMethods.set(func.name, func);
    Reflect.defineMetadata(DecoratorKeys.QueryMethod, queryMethods, target);
  };
}

// Export it PascalCased
export const QueryMethod = queryMethod;
