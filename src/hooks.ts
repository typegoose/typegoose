// disable "no-unused" for this file, to keep hooks consistent
// tslint:disable:no-unused
import type { Query } from 'mongoose';

import { DecoratorKeys } from './internal/constants';
import { assertion, getName } from './internal/utils';
import { logger } from './logSettings';
import type { DocumentType, EmptyVoidFn, IHooksArray } from './types';

type NDA<T> = number | DocumentType<T> | DocumentType<T>[];

// i know that some events cannot be async (like "init"), but because they are unified into bigger types, i cannot change it
type ReturnVoid = void | Promise<void>;

type HookNextErrorFn = (err?: Error) => ReturnVoid;

type PreFnWithDocumentType<T> = (this: DocumentType<T>, next: HookNextErrorFn) => ReturnVoid;
type PreFnWithQuery<T> = (this: Query<T>, next: (error?: Error) => ReturnVoid, done: EmptyVoidFn) => ReturnVoid;

type ModelPostFn<T> = (result: any, next: EmptyVoidFn) => ReturnVoid;

type PostNumberResponse<T> = (result: number, next: EmptyVoidFn) => ReturnVoid;
type PostSingleResponse<T> = (result: DocumentType<T>, next: EmptyVoidFn) => ReturnVoid;
type PostMultipleResponse<T> = (result: DocumentType<T>[], next: EmptyVoidFn) => ReturnVoid;
type PostRegExpResponse<T> = (result: NDA<T>, next: EmptyVoidFn) => ReturnVoid;
type PostArrayResponse<T> = (result: NDA<T>, next: EmptyVoidFn) => ReturnVoid;

type PostNumberWithError<T> = (error: Error, result: number, next: HookNextErrorFn) => ReturnVoid;
type PostSingleWithError<T> = (error: Error, result: DocumentType<T>, next: HookNextErrorFn) => ReturnVoid;
type PostMultipleWithError<T> = (error: Error, result: DocumentType<T>[], next: HookNextErrorFn) => ReturnVoid;
type PostRegExpWithError<T> = (error: Error, result: NDA<T>, next: HookNextErrorFn) => ReturnVoid;
type PostArrayWithError<T> = (error: Error, result: NDA<T>, next: EmptyVoidFn) => ReturnVoid;

type DocumentMethod = 'init' | 'validate' | 'save' | 'remove';
type NumberMethod = 'count';
type SingleMethod = 'findOne' | 'findOneAndRemove' | 'findOneAndUpdate' | 'findOneAndDelete' | 'deleteOne' | DocumentMethod;
type MultipleMethod = 'find' | 'update' | 'deleteMany';
type QueryMethod = 'count' | 'countDocuments' | 'estimatedDocumentCount' | 'find' | 'findOne' | 'findOneAndRemove' | 'findOneAndUpdate' | 'update' | 'updateOne' | 'updateMany' | 'findOneAndDelete' | 'deleteOne' | 'deleteMany';
type ModelMethod = 'insertMany';
type QMR = QueryMethod | ModelMethod | RegExp;
type QDM = QMR | DocumentMethod;
type DR = DocumentMethod | RegExp;

interface Hooks {
  pre<T>(method: DR | DR[], fn: PreFnWithDocumentType<T>): ClassDecorator;

  pre<T>(method: QMR | QMR[], fn: PreFnWithQuery<T>): ClassDecorator;

  post<T>(method: RegExp, fn: PostRegExpResponse<T>): ClassDecorator;
  post<T>(method: RegExp, fn: PostRegExpWithError<T>): ClassDecorator;

  post<T>(method: QDM[], fn: PostArrayResponse<T>): ClassDecorator;
  post<T>(method: QDM[], fn: PostArrayWithError<T>): ClassDecorator;

  post<T>(method: NumberMethod, fn: PostNumberResponse<T>): ClassDecorator;
  post<T>(method: NumberMethod, fn: PostNumberWithError<T>): ClassDecorator;

  post<T>(method: SingleMethod, fn: PostSingleResponse<T>): ClassDecorator;
  post<T>(method: SingleMethod, fn: PostSingleWithError<T>): ClassDecorator;

  post<T>(method: MultipleMethod, fn: PostMultipleResponse<T>): ClassDecorator;
  post<T>(method: MultipleMethod, fn: PostMultipleWithError<T>): ClassDecorator;

  post<T>(method: ModelMethod, fn: ModelPostFn<T> | PostMultipleResponse<T>): ClassDecorator;
}

// Note: TSDoc for the hooks can't be added without adding it to *every* overload
const hooks: Hooks = {
  pre(...args) {
    return (target: any) => addToHooks(target, 'pre', args);
  },
  post(...args) {
    return (target: any) => addToHooks(target, 'post', args);
  }
};

/**
 * Add a hook to the hooks Array
 * @param target Target Class
 * @param hookType What type is it
 * @param args All Arguments, that should be passed-throught
 */
function addToHooks(target: any, hookType: 'pre' | 'post', args: any[]): void {
  // Convert Method to array if only a string is provided
  const methods: QDM[] = Array.isArray(args[0]) ? args[0] : [args[0]];
  assertion(
    typeof args[1] === 'function',
    new TypeError(`"${getName(target)}.${hookType}.${methods.join(' ')}"'s function is not a function!`)
  );
  const func: EmptyVoidFn = args[1];

  logger.info('Adding hooks for "[%s]" to "%s" as type "%s"', methods.join(','), getName(target), hookType);

  for (const method of methods) {
    switch (hookType) {
      case 'post':
        const postHooks: IHooksArray[] = Array.from(Reflect.getMetadata(DecoratorKeys.HooksPost, target) ?? []);
        postHooks.push({ func, method });
        Reflect.defineMetadata(DecoratorKeys.HooksPost, postHooks, target);
        break;
      case 'pre':
        const preHooks: IHooksArray[] = Array.from(Reflect.getMetadata(DecoratorKeys.HooksPre, target) ?? []);
        preHooks.push({ func, method });
        Reflect.defineMetadata(DecoratorKeys.HooksPre, preHooks, target);
        break;
    }
  }
}

export const pre = hooks.pre;
export const post = hooks.post;

// Export it PascalCased
export const Pre = hooks.pre;
export const Post = hooks.post;
