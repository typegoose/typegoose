import { MongooseDocument, Query } from 'mongoose';

import { hooks as hooksData } from './data';

type DocumentMethod = 'init' | 'validate' | 'save' | 'remove';
type QueryMethod = 'count' | 'find' | 'findOne' | 'findOneAndRemove' | 'findOneAndUpdate' | 'update';
type ModelMethod = 'insertMany';

type ClassDecorator = (constructor: any) => void;
type HookNextFn = (err?: Error) => void;

type PreDoneFn = () => void;
type PreErrorCb = (err: Error) => void;

type TypegooseDoc<T> = T & MongooseDocument;

type DocumentPreSerialFn<T> = (this: TypegooseDoc<T>, next: HookNextFn) => void;
type DocumentPreParallelFn<T> = (this: TypegooseDoc<T>, next: HookNextFn, done: PreDoneFn) => void;

type QueryPreSerialFn<T> = (this: Query<T>, next: HookNextFn) => void;
type QueryPreParallelFn<T> = (this: Query<T>, next: HookNextFn, done: PreDoneFn) => void;

// TODO the this refers to the Model, I need help with this
type ModelPreSerialFn<T> = (this: any, next: HookNextFn) => void;
type ModelPreParallelFn<T> = (this: any, next: HookNextFn, done: PreDoneFn) => void;

// this depends on the hook method
type PostResult<T> = TypegooseDoc<T> | TypegooseDoc<T>[] | number;

type DocumentPostFn<T> = (this: TypegooseDoc<T>, doc: TypegooseDoc<T>, next?: HookNextFn) => void;
type QueryPostFn<T> = (this: Query<T>, result: PostResult<T>, next?: HookNextFn) => void;
type ModelPostFn<T> = (this: any, result: any, next?: HookNextFn) => void;

type PostNumberResponse<T> = (this: Query<T>, result: number, next?: HookNextFn) => void;
type PostSingleResponse<T> = (this: Query<T>, result: TypegooseDoc<T>, next?: HookNextFn) => void;
type PostMultipleResponse<T> = (this: Query<T>, result: TypegooseDoc<T>[], next?: HookNextFn) => void;

type PostNumberWithError<T> = (error: Error, result: number, next: HookNextFn) => void;
type PostSingleWithError<T> = (error: Error, result: TypegooseDoc<T>, next: HookNextFn) => void;
type PostMultipleWithError<T> = (error: Error, result: TypegooseDoc<T>[], net: HookNextFn) => void;

type NumberMethod = 'count';
type SingleMethod = 'findOne' | 'findOneAndRemove' | 'findOneAndUpdate';
type MultipleMethod = 'find' | 'update';

interface Hooks {
  pre<T>(method: DocumentMethod, fn: DocumentPreSerialFn<T>, errorCb?: PreErrorCb): ClassDecorator;
  pre<T>(method: DocumentMethod, parallel: boolean, fn: DocumentPreParallelFn<T>, errorCb?: PreErrorCb): ClassDecorator;

  pre<T>(method: QueryMethod, fn: QueryPreSerialFn<T>, errorCb?: PreErrorCb): ClassDecorator;
  pre<T>(method: QueryMethod, parallel: boolean, fn: QueryPreParallelFn<T>, errorCb?: PreErrorCb): ClassDecorator;

  pre<T>(method: ModelMethod, fn: ModelPreSerialFn<T>, errorCb?: PreErrorCb): ClassDecorator;
  pre<T>(method: ModelMethod, parallel: boolean, fn: ModelPreParallelFn<T>, errorCb?: PreErrorCb): ClassDecorator;

  post<T>(method: DocumentMethod, fn: DocumentPostFn<T> | PostSingleWithError<T>): ClassDecorator;

  // I had to disable linter to allow this. I only got proper code completion separating the functions
  post<T>(method: NumberMethod, fn: PostNumberResponse<T>): ClassDecorator;
  // tslint:disable-next-line:unified-signatures
  post<T>(method: NumberMethod, fn: PostNumberWithError<T>): ClassDecorator;

  post<T>(method: SingleMethod, fn: PostSingleResponse<T>): ClassDecorator;
  // tslint:disable-next-line:unified-signatures
  post<T>(method: SingleMethod, fn: PostSingleWithError<T>): ClassDecorator;

  post<T>(method: MultipleMethod, fn: PostMultipleResponse<T>): ClassDecorator;
  // tslint:disable-next-line:unified-signatures
  post<T>(method: MultipleMethod, fn: PostMultipleWithError<T>): ClassDecorator;

  post<T>(method: ModelMethod, fn: ModelPostFn<T> | PostMultipleResponse<T>): ClassDecorator;
}

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

const addToHooks = (name, hookType: 'pre' | 'post', args) => {
  if (!hooksData[name]) {
    hooksData[name] = { pre: [], post: [] };
  }
  hooksData[name][hookType].push(args);
};

export const pre = hooks.pre;
export const post = hooks.post;
