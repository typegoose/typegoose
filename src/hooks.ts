import { MongooseDocument } from 'mongoose';

import { hooks as hooksData, HooksPrePost } from './data';

type DocumentMethod = 'init' | 'validate' | 'save' | 'remove';
type QueryMethod =
  | 'count'
  | 'find'
  | 'findOne'
  | 'findOneAndRemove'
  | 'findOneAndUpdate'
  | 'update'
  | 'updateOne'
  | 'updateMany';
type ModelMethod = 'insertMany';

type ClassDecorator = (constructor: any) => void;
type HookNextFn = (err?: Error) => void;

type PreDoneFn = () => void;

type TypegooseDoc<T> = T & MongooseDocument;

type DocumentPreSerialFn<T> = (this: TypegooseDoc<T>, next: HookNextFn) => void;
type DocumentPreParallelFn<T> = (this: TypegooseDoc<T>, next: HookNextFn, done: PreDoneFn) => void;

type SimplePreSerialFn<T> = (next: HookNextFn, docs?: any[]) => void;
type SimplePreParallelFn<T> = (next: HookNextFn, done: PreDoneFn) => void;

type ModelPostFn<T> = (result: any, next?: HookNextFn) => void;

type PostNumberResponse<T> = (result: number, next?: HookNextFn) => void;
type PostSingleResponse<T> = (result: TypegooseDoc<T>, next?: HookNextFn) => void;
type PostMultipleResponse<T> = (result: TypegooseDoc<T>[], next?: HookNextFn) => void;

type PostNumberWithError<T> = (error: Error, result: number, next: HookNextFn) => void;
type PostSingleWithError<T> = (error: Error, result: TypegooseDoc<T>, next: HookNextFn) => void;
type PostMultipleWithError<T> = (error: Error, result: TypegooseDoc<T>[], next: HookNextFn) => void;

type NumberMethod = 'count';
type SingleMethod = 'findOne' | 'findOneAndRemove' | 'findOneAndUpdate' | DocumentMethod;
type MultipleMethod = 'find' | 'update';

interface Hooks {
  pre<T>(method: DocumentMethod | RegExp, fn: DocumentPreSerialFn<T>): ClassDecorator;
  pre<T>(method: DocumentMethod | RegExp, parallel: boolean, fn: DocumentPreParallelFn<T>): ClassDecorator;

  pre<T>(method: QueryMethod | ModelMethod | RegExp, fn: SimplePreSerialFn<T>): ClassDecorator;
  pre<T>(method: QueryMethod | ModelMethod | RegExp, parallel: boolean, fn: SimplePreParallelFn<T>): ClassDecorator;

  // I had to disable linter to allow this. I only got proper code completion separating the functions
  post<T>(method: NumberMethod | RegExp, fn: PostNumberResponse<T>): ClassDecorator;
  // tslint:disable-next-line:unified-signatures
  post<T>(method: NumberMethod | RegExp, fn: PostNumberWithError<T>): ClassDecorator;

  post<T>(method: SingleMethod | RegExp, fn: PostSingleResponse<T>): ClassDecorator;
  // tslint:disable-next-line:unified-signatures
  post<T>(method: SingleMethod | RegExp, fn: PostSingleWithError<T>): ClassDecorator;

  post<T>(method: MultipleMethod | RegExp, fn: PostMultipleResponse<T>): ClassDecorator;
  // tslint:disable-next-line:unified-signatures
  post<T>(method: MultipleMethod | RegExp, fn: PostMultipleWithError<T>): ClassDecorator;

  post<T>(method: ModelMethod | RegExp, fn: ModelPostFn<T> | PostMultipleResponse<T>): ClassDecorator;
}

// Note: Documentation for the hooks cant be added without adding it to *every* overload
const hooks: Hooks = {
  pre(...args) {
    return (constructor: any) => {
      addToHooks(constructor.name, 'pre', args);
    };
  },
  post(...args) {
    return (constructor: any) => {
      addToHooks(constructor.name, 'post', args);
    };
  },
};

/**
 * Add a hook to the hooks Array
 * @param name With wich name should they be registered
 * @param hookType What type is it
 * @param args All Arguments, that should be passed-throught
 */
function addToHooks(name: string, hookType: 'pre' | 'post', args: any[]) {
  const method: string | RegExp = args[0];
  const paralell: boolean | undefined = typeof args[1] === 'boolean' ? args[1] : undefined;
  const func: () => void = typeof args[1] === 'boolean' ? args[2] : args[1];

  if (!hooksData.get(name)) {
    hooksData.set(name, {
      post: new Map(),
      pre: new Map()
    } as HooksPrePost);
  }

  switch (hookType) {
    case 'post':
      hooksData.get(name).post.set(method, { func });
      break;
    case 'pre':
      hooksData.get(name).pre.set(method, { func, parallel: paralell });
      break;
  }
}

export const pre = hooks.pre;
export const post = hooks.post;
