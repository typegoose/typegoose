import { DecoratorKeys } from './internal/constants';
import { IIndexArray, IndexOptions } from './types';

/**
 * Defines an index (most likely compound) for this schema.
 * @param fields Wich fields to give the Options
 * @param options Options to pass to MongoDB driver's createIndex() function
 * @example Example:
 * ```
 *  @index({ article: 1, user: 1 }, { unique: true })
 *  class Name {}
 * ```
 */
export function index<T = {}>(fields: T, options?: IndexOptions<T>) {
  return (target: any) => {
    const indices: IIndexArray<any>[] = Reflect.getMetadata(DecoratorKeys.Index, target) ?? [];
    indices.push({ fields, options });
    Reflect.defineMetadata(DecoratorKeys.Index, indices, target);
  };
}
