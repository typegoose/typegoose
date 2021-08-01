import * as mongoose from 'mongoose';
import { isNullOrUndefined } from './internal/utils';
import { logger } from './logSettings';
import type { DocumentType, Ref, RefType } from './types';

/**
 * Check if the given document is already populated
 * @param doc The Ref with uncertain type
 */
export function isDocument<T, S extends RefType>(doc: Ref<T, S>): doc is DocumentType<T> {
  return doc instanceof mongoose.Model;
}

/**
 * Check if the given array is already populated
 * @param docs The Array of Refs with uncertain type
 */
export function isDocumentArray<T, S extends RefType>(
  docs: mongoose.Types.Array<Ref<T, S>> | undefined
): docs is mongoose.Types.Array<DocumentType<NonNullable<T>>>;
export function isDocumentArray<T, S extends RefType>(docs: Ref<T, S>[] | undefined): docs is DocumentType<NonNullable<T>>[];
export function isDocumentArray(docs: Ref<any, any>[] | undefined): unknown {
  // its "any" & "unkown" because this is not listed as an overload
  return Array.isArray(docs) && docs.every((v) => isDocument(v));
}

type AllowedRefTypes = typeof String | typeof Number | typeof Buffer | typeof mongoose.Types.ObjectId | typeof mongoose.Types.Buffer;

/**
 * Check if the document is not undefined/null and is not an document
 * @param doc The Ref with uncretain type
 */
export function isRefType<T, S extends RefType>(doc: Ref<T, S> | undefined, reftype: AllowedRefTypes): doc is NonNullable<S> {
  logger.info('isRefType:', reftype);

  if (isNullOrUndefined(doc) || isDocument(doc)) {
    return false;
  }

  // this "ObjectId" test is in the front, because its the most common - to lower resource use
  if (reftype === mongoose.Types.ObjectId) {
    return doc instanceof mongoose.Types.ObjectId;
  }
  if (reftype === String) {
    return typeof doc === 'string';
  }
  if (reftype === Number) {
    return typeof doc === 'number';
  }
  if (reftype === Buffer || reftype === mongoose.Types.Buffer) {
    return doc instanceof Buffer;
  }

  return false;
}

/**
 * Check if the document is not undefined/null and is not an document
 * @param docs The Ref with uncretain type
 */
export function isRefTypeArray<T, S extends RefType>(
  docs: mongoose.Types.Array<Ref<T, S>> | undefined,
  reftype: AllowedRefTypes
): docs is mongoose.Types.Array<NonNullable<S>>;
export function isRefTypeArray<T, S extends RefType>(docs: Ref<T, S>[] | undefined, reftype: AllowedRefTypes): docs is NonNullable<S>[];
export function isRefTypeArray(docs: Ref<any, any>[] | undefined, reftype: AllowedRefTypes): unknown {
  // its "any" & "unkown" because this is not listed as an overload
  return Array.isArray(docs) && docs.every((v) => isRefType(v, reftype));
}

/**
 * Check if the input is a mongoose.Model
 * @param model The Value to check
 */
export function isModel(model: any): model is mongoose.Model<any> {
  return model?.prototype instanceof mongoose.Model;
}
