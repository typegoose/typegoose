import * as mongoose from 'mongoose';

import { isNullOrUndefined } from './internal/utils';
import type { DocumentType, Ref, RefType } from './types';

/**
 * Check if the given document is already populated
 * @param doc The Ref with uncertain type
 */
export function isDocument<T, S extends RefType>(doc: Ref<T, S>): doc is DocumentType<NonNullable<T>> {
  return doc instanceof mongoose.Model;
}

/**
 * Check if the given array is already populated
 * @param docs The Array of Refs with uncertain type
 */
export function isDocumentArray<T, S extends RefType>(
  docs: mongoose.Types.Array<Ref<T, S>> | undefined
): docs is mongoose.Types.Array<DocumentType<NonNullable<T>>>;
export function isDocumentArray<T, S extends RefType>(
  docs: Ref<T, S>[] | undefined
): docs is DocumentType<NonNullable<T>>[];
export function isDocumentArray(
  docs: Ref<any, any>[] | undefined
): unknown { // its "any" & "unkown" because this is not listed as an overload
  return Array.isArray(docs) && docs.every((v) => isDocument(v));
}

/**
 * Check if the document is not undefined/null and is not an document
 * @param doc The Ref with uncretain type
 */
export function isRefType<T, S extends RefType>(doc: Ref<T, S> | undefined): doc is NonNullable<S> {
  return !isNullOrUndefined(doc) && !isDocument(doc);
}

/**
 * Check if the document is not undefined/null and is not an document
 * @param docs The Ref with uncretain type
 */
export function isRefTypeArray<T, S extends RefType>(
  docs: mongoose.Types.Array<Ref<T, S>> | undefined
): docs is mongoose.Types.Array<NonNullable<S>>;
export function isRefTypeArray<T, S extends RefType>(
  docs: Ref<T, S>[] | undefined
): docs is NonNullable<S>[];
export function isRefTypeArray(
  docs: Ref<any, any>[] | undefined
): unknown { // its "any" & "unkown" because this is not listed as an overload
  return Array.isArray(docs) && docs.every((v) => isRefType(v));
}

/**
 * Check if the input is a mongoose.Model
 * @param model The Value to check
 */
export function isModel(model: any): model is mongoose.Model<any> {
  return model?.prototype instanceof mongoose.Model;
}
