import { DecoratorKeys } from './internal/constants';
import { getName } from './internal/utils';
import { logger } from './logSettings';
import type { SearchIndexDescription } from './types';

/**
 * Defines a search index for this Class which will then be added to the Schema.
 *
 * @param description - The description of the search index to add.
 * @example Example:
 * ```ts
 * @searchIndex({ name: 'descriptionIndex', definition: { mappings: { dynamic: true }}})
 * class ClassName {}
 * ```
 * @remarks Search indices are only supported when connected to MongoDB Atlas.
 */
export function searchIndex(description: SearchIndexDescription): ClassDecorator {
  return (target: any) => {
    logger.info('Adding "%o" Search Indexes to %s', description, getName(target));
    const searchIndices: SearchIndexDescription[] = Array.from(Reflect.getOwnMetadata(DecoratorKeys.SearchIndex, target) ?? []);
    searchIndices.push(description);
    Reflect.defineMetadata(DecoratorKeys.SearchIndex, searchIndices, target);
  };
}

// Export it PascalCased
export { searchIndex as SearchIndex };
