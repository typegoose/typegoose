import type { Query } from 'mongoose';
import { DecoratorKeys } from './internal/constants';
import { getName } from './internal/utils';
import { logger } from './logSettings';
import type { AnyParamConstructor, QueryHelperThis, QueryMethodMap } from './types';

/**
 * Adds a query method to the Class which will then be added to the Schema.
 * @param func The Query Method to add
 * @example
 * ```ts
 * interface FindHelpers {
 *   findByTitle: AsQueryMethod<typeof findByTitle>;
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
  func: (this: QueryHelperThis<U, QueryHelpers>, ...params: any[]) => Query<any, any>
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
