import { DecoratorKeys } from './internal/constants';
import { getName } from './internal/utils';
import { logger } from './logSettings';
import type { BeAnObject, IIndexArray, IndexOptions } from './types';

/**
 * Defines an index (most likely compound) for this schema.
 * @param fields Which fields to give the Options
 * @param options Options to pass to MongoDB driver's createIndex() function
 * @example Example:
 * ```ts
 * @index({ article: 1, user: 1 }, { unique: true })
 * class ClassName {}
 * ```
 */
export function index<T extends BeAnObject = BeAnObject>(
  fields: Partial<Record<keyof T, string | -1 | 1>>,
  options?: IndexOptions<T>
): ClassDecorator {
  return (target: any) => {
    logger.info('Adding "%o" Indexes to %s', { fields, options }, getName(target));
    const indices: IIndexArray<any>[] = Array.from(Reflect.getMetadata(DecoratorKeys.Index, target) ?? []);
    indices.push({ fields, options });
    Reflect.defineMetadata(DecoratorKeys.Index, indices, target);
  };
}

// Export it PascalCased
export { index as Index };
