import * as mongoose from 'mongoose';

import { DocumentType, Ref } from './typegoose';
import { AnyParamConstructor, RefType } from './types';

/**
 * Check if the given document is already populated
 * @param doc The Ref with uncertain type
 */
export function isDocument<T extends AnyParamConstructor, S extends RefType>
  (doc: Ref<T, S>): doc is DocumentType<T> {
  return doc instanceof mongoose.Model;
}

/**
 * Check if the given array is already populated
 * @param docs The Array of Refs with uncertain type
 */
export function isDocumentArray<T extends AnyParamConstructor, S extends RefType>
  (docs: Ref<T, S>[]): docs is DocumentType<T>[] {
  return Array.isArray(docs) && docs.every((v) => isDocument(v));
}
