import { Query } from 'mongoose';
import { isArray } from 'util';
import { hooks as hooksData, HooksPrePost } from './internal/data';
import { getName } from './internal/utils';
import { DocumentType } from './typegoose';
import { EmptyVoidFn } from './types';

type NDA<T> = number | DocumentType<T> | DocumentType<T>[];

type ClassDecorator = (constructor: any) => void;
type HookNextErrorFn = (err?: Error) => void;

type PreFnWithDT<T> = (this: DocumentType<T>, next?: EmptyVoidFn) => void;
type PreFnWithQuery<T> = (
  this: Query<T>,
  next?: (error?: Error) => void,
  done?: EmptyVoidFn) => void;

type ModelPostFn<T> = (result: any, next?: EmptyVoidFn) => void;

type PostNumberResponse<T> = (result: number, next?: EmptyVoidFn) => void;
type PostSingleResponse<T> = (result: DocumentType<T>, next?: EmptyVoidFn) => void;
type PostMultipleResponse<T> = (result: DocumentType<T>[], next?: EmptyVoidFn) => void;
type PostRegExpResponse<T> = (result: NDA<T>, next?: EmptyVoidFn) => void;
type PostArrayResponse<T> = (result: NDA<T>, next?: EmptyVoidFn) => void;

type PostNumberWithError<T> = (error: Error, result: number, next: HookNextErrorFn) => void;
type PostSingleWithError<T> = (error: Error, result: DocumentType<T>, next: HookNextErrorFn) => void;
type PostMultipleWithError<T> = (error: Error, result: DocumentType<T>[], next: HookNextErrorFn) => void;
type PostRegExpWithError<T> = (error: Error, result: NDA<T>, next: HookNextErrorFn) => void;
type PostArrayWithError<T> = (error: Error, result: NDA<T>, next: EmptyVoidFn) => void;

type DocumentMethod = 'init' | 'validate' | 'save' | 'remove';
type NumberMethod = 'count';
type SingleMethod = 'findOne' | 'findOneAndRemove' | 'findOneAndUpdate' | DocumentMethod;
type MultipleMethod = 'find' | 'update';
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
type QMR = QueryMethod | ModelMethod | RegExp;
type QDM = QMR | DocumentMethod;
type DR = DocumentMethod | RegExp;

interface Hooks {
  pre<T>(method: DR | DR[], fn: PreFnWithDT<T>): ClassDecorator;

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

// Note: Documentation for the hooks cant be added without adding it to *every* overload
const hooks: Hooks = {
  pre(...args) {
    return (target: any) => addToHooks(getName(target), 'pre', args);
  },
  post(...args) {
    return (target: any) => addToHooks(getName(target), 'post', args);
  }
};

/**
 * Add a hook to the hooks Array
 * @param name With wich name should they be registered
 * @param hookType What type is it
 * @param args All Arguments, that should be passed-throught
 */
function addToHooks(name: string, hookType: 'pre' | 'post', args: any[]) {
  if (!hooksData.get(name)) {
    hooksData.set(name, {
      post: new Map(),
      pre: new Map()
    } as HooksPrePost);
  }

  // Convert Method to array if only a string is provided
  const methods: QDM[] = isArray(args[0]) ? args[0] : [args[0]];
  if (typeof args[1] !== 'function') {
    throw new TypeError(`"${name}.${hookType}.${methods.join(' ')}"'s function is not a function!`);
  }
  const func: EmptyVoidFn = args[1];

  for (const method of methods) {
    switch (hookType) {
      case 'post':
        hooksData.get(name).post.set(method, func);
        break;
      case 'pre':
        hooksData.get(name).pre.set(method, func);
        break;
    }
  }
}

export const pre = hooks.pre;
export const post = hooks.post;
