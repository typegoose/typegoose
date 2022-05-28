// disable "no-unused" for this file, to keep hooks consistent (it has to be an inline-comment, because of an problem with eslint)
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Aggregate, Query } from 'mongoose';
import { DecoratorKeys } from './internal/constants';
import { ExpectedTypeError } from './internal/errors';
import { assertion, getName, isNullOrUndefined } from './internal/utils';
import { logger } from './logSettings';
import { mongoose } from './typegoose';
import type { DocumentType, EmptyVoidFn, HookOptionsEither, IHooksArray } from './types';

type NumberOrDocumentOrDocumentArray<T> = number | DocumentType<T> | DocumentType<T>[];

// i know that some events cannot be async (like "init"), but because they are unified into bigger types, i cannot change it
type ReturnVoid = void | Promise<void>;

type HookNextErrorFn = (err?: Error) => ReturnVoid;

type PreFnWithAggregate<T> = (this: Aggregate<T>, next: (error?: Error) => ReturnVoid) => ReturnVoid;
type PreFnWithDocumentType<T> = (this: DocumentType<T>, next: HookNextErrorFn) => ReturnVoid;
type PreFnWithQuery<T> = (this: Query<any, DocumentType<T>>, next: (error?: Error) => ReturnVoid) => ReturnVoid;

type ModelPostFn<T> = (result: any, next: EmptyVoidFn) => ReturnVoid;

type PostNumberResponse<T> = (result: number, next: EmptyVoidFn) => ReturnVoid;
type PostSingleResponse<T> = (result: DocumentType<T>, next: EmptyVoidFn) => ReturnVoid;
type PostMultipleResponse<T> = (result: DocumentType<T>[], next: EmptyVoidFn) => ReturnVoid;
type PostRegExpResponse<T> = (result: NumberOrDocumentOrDocumentArray<T>, next: EmptyVoidFn) => ReturnVoid;
type PostArrayResponse<T> = (result: NumberOrDocumentOrDocumentArray<T>, next: EmptyVoidFn) => ReturnVoid;
type PostQueryArrayResponse<T> = (
  this: Query<any, DocumentType<T>>,
  result: NumberOrDocumentOrDocumentArray<T>,
  next: EmptyVoidFn
) => ReturnVoid;

type PostNumberWithError<T> = (error: Error, result: number, next: HookNextErrorFn) => ReturnVoid;
type PostSingleWithError<T> = (error: Error, result: DocumentType<T>, next: HookNextErrorFn) => ReturnVoid;
type PostMultipleWithError<T> = (error: Error, result: DocumentType<T>[], next: HookNextErrorFn) => ReturnVoid;
type PostRegExpWithError<T> = (error: Error, result: NumberOrDocumentOrDocumentArray<T>, next: HookNextErrorFn) => ReturnVoid;
type PostArrayWithError<T> = (error: Error, result: NumberOrDocumentOrDocumentArray<T>, next: EmptyVoidFn) => ReturnVoid;
type PostQueryArrayWithError<T> = (
  this: Query<any, DocumentType<T>>,
  error: Error,
  result: NumberOrDocumentOrDocumentArray<T>,
  next: EmptyVoidFn
) => ReturnVoid;

type AggregateMethod = 'aggregate';
type DocumentMethod = 'init' | 'validate' | 'save' | 'remove';
type NumberMethod = 'count';
type SingleMethod = 'findOne' | 'findOneAndRemove' | 'findOneAndUpdate' | 'findOneAndDelete' | 'deleteOne' | DocumentMethod;
type MultipleMethod = 'find' | 'update' | 'deleteMany' | 'aggregate';
type QueryMethod =
  | 'count'
  | 'countDocuments'
  | 'estimatedDocumentCount'
  | 'find'
  | 'findOne'
  | 'findOneAndRemove'
  | 'findOneAndUpdate'
  | 'update'
  | 'updateOne'
  | 'updateMany'
  | 'findOneAndDelete'
  | 'deleteOne'
  | 'deleteMany';
type ModelMethod = 'insertMany';
type QMR = QueryMethod | ModelMethod | RegExp;
type QDM = QMR | DocumentMethod;
type DR = DocumentMethod | RegExp;

interface Hooks {
  pre<T>(method: AggregateMethod, fn: PreFnWithAggregate<T>, options?: mongoose.SchemaPreOptions): ClassDecorator;

  pre<T>(method: DR | DR[], fn: PreFnWithDocumentType<T>, options?: mongoose.SchemaPreOptions): ClassDecorator;

  pre<T>(method: QMR | QMR[], fn: PreFnWithQuery<T>, options?: mongoose.SchemaPreOptions): ClassDecorator;

  post<T>(method: RegExp, fn: PostRegExpResponse<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;
  post<T>(method: RegExp, fn: PostRegExpWithError<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;

  post<T>(method: NumberMethod, fn: PostNumberResponse<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;
  post<T>(method: NumberMethod, fn: PostNumberWithError<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;

  post<T>(method: SingleMethod, fn: PostSingleResponse<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;
  post<T>(method: SingleMethod, fn: PostSingleWithError<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;

  post<T>(method: MultipleMethod, fn: PostMultipleResponse<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;
  post<T>(method: MultipleMethod, fn: PostMultipleWithError<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;

  post<T>(method: ModelMethod, fn: ModelPostFn<T> | PostMultipleResponse<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;

  post<T>(method: DocumentMethod | DocumentMethod[], fn: PostArrayResponse<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;
  post<T>(method: DocumentMethod | DocumentMethod[], fn: PostArrayWithError<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;

  post<T>(method: QMR | QMR[], fn: PostQueryArrayResponse<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;
  post<T>(method: QMR | QMR[], fn: PostQueryArrayWithError<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;
}

// TSDoc for the hooks can't be added without adding it to *every* overload
const hooks: Hooks = {
  pre(...args) {
    return (target: any) => addToHooks(target, 'pre', args);
  },
  post(...args) {
    return (target: any) => addToHooks(target, 'post', args);
  },
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
  const func: EmptyVoidFn = args[1];
  const hookOptions: HookOptionsEither = args[2] ?? {};

  assertion(typeof func === 'function', () => new ExpectedTypeError('fn', 'function', func));
  assertion(
    typeof hookOptions === 'object' && !isNullOrUndefined(hookOptions),
    () => new ExpectedTypeError('options', 'object / undefined', hookOptions)
  );

  if (args.length > 3) {
    logger.warn(`"addToHooks" parameter "args" has a length of over 3 (length: ${args.length})`);
  }

  logger.info('Adding hooks for "[%s]" to "%s" as type "%s"', methods.join(','), getName(target), hookType);

  for (const method of methods) {
    switch (hookType) {
      case 'post':
        const postHooks: IHooksArray[] = Array.from(Reflect.getMetadata(DecoratorKeys.HooksPost, target) ?? []);
        postHooks.push({ func, method, options: hookOptions });
        Reflect.defineMetadata(DecoratorKeys.HooksPost, postHooks, target);
        break;
      case 'pre':
        const preHooks: IHooksArray[] = Array.from(Reflect.getMetadata(DecoratorKeys.HooksPre, target) ?? []);
        preHooks.push({ func, method, options: hookOptions });
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
