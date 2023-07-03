import type { Query } from 'mongoose';
import { DecoratorKeys } from './internal/constants';
import { logger } from './logSettings';
import type { AnyParamConstructor, QueryHelperThis, QueryMethodMap } from './types';
import { wrapClassDecorator } from './wrapDecorator';

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
): /* ReturnType<typeof wrapClassDecorator> */ any {
  return wrapClassDecorator(({ metadata, className }) => {
    logger.info('Adding query method "%s" to %s', func.name, className);
    const queryMethods: QueryMethodMap = new Map((metadata.getMetadata(DecoratorKeys.QueryMethod) as QueryMethodMap | undefined) ?? []);
    queryMethods.set(func.name, func);
    metadata.defineMetadata(DecoratorKeys.QueryMethod, queryMethods);
  });
}

// Export it PascalCased
export { queryMethod as QueryMethod };
