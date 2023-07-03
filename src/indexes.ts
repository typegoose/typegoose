import mongoose from 'mongoose';
import { DecoratorKeys } from './internal/constants';
import { logger } from './logSettings';
import type { IIndexArray, IndexOptions } from './types';
import { wrapClassDecorator } from './wrapDecorator';

/**
 * Defines a index for this Class which will then be added to the Schema.
 * @param fields Which fields to index (if multiple fields are set, it will be a compound index)
 * @param options Options to pass to MongoDB driver's createIndex() function
 * @example Example:
 * ```ts
 * @index({ article: 1, user: 1 }, { unique: true })
 * class ClassName {}
 * ```
 */
export function index(fields: mongoose.IndexDefinition, options?: IndexOptions): /* ReturnType<typeof wrapClassDecorator> */ any {
  return wrapClassDecorator(({ metadata, className }) => {
    logger.info('Adding "%o" Indexes to %s', { fields, options }, className);
    const indices: IIndexArray[] = Array.from((metadata.getOwnMetadata(DecoratorKeys.Index) as IIndexArray[] | undefined) ?? []);
    indices.push({ fields, options });
    metadata.defineMetadata(DecoratorKeys.Index, indices);
  });
}

// Export it PascalCased
export { index as Index };
