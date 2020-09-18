import type { DocumentQuery } from 'mongoose';
import { DecoratorKeys } from './internal/constants';
import { getName } from './internal/utils';
import { logger } from './logSettings';
import type { AnyParamConstructor, QueryMethodMap, ReturnModelType } from './types';

/**
 * Adds a query method to schema.
 *
 * @param func Query function
 * @example
 * ```ts
 * interface FindHelpers {
 *   findByTitle: QueryMethod<typeof findByTitle>;
 * }
 *
 * function findByTitle(this: ReturnModelType<typeof Event, FindHelpers>, title: string) {
 *  return this.find({ title });
 * }
 *
 * @queryMethod(findByTitle)
 * class Event {
 *  @prop()
 *  public title: string;
 * }
 *
 * const EventModel = getModelForClass<typeof Event, FindHelpers>(Event);
 * ```
 */
export function queryMethod<QueryHelpers, U extends AnyParamConstructor<any>>(
  func: (this: ReturnModelType<U, QueryHelpers>, ...params: any[]) => DocumentQuery<any, any>
): ClassDecorator {
  return (target: any) => {
    logger.info('Adding query method "%s" to %s', func.name, getName(target));
    const queryMethods: QueryMethodMap = new Map(Reflect.getMetadata(DecoratorKeys.QueryMethod, target) ?? []);
    queryMethods.set(func.name, func);
    Reflect.defineMetadata(DecoratorKeys.QueryMethod, queryMethods, target);
  };
}

// Export it PascalCased
export { queryMethod as QueryMethod };
