import { MongooseDocument } from 'mongoose';

import { hooks as hooksData } from './data';

type Method = 'init' | 'validate' | 'save' | 'remove' |
'count' | 'find' | 'findOne' | 'findOneAndRemove' | 'findOneAndUpdate' | 'update'|
'insertMany';
type ClassDecorator = (constructor: any) => void;
type HookNextFn = (err?: Error) => void;

type PreDoneFn = () => void;
type PreFn<T> = (this: T & MongooseDocument, next: HookNextFn, done: PreDoneFn) => void;
type PreErrorCb = (err: Error) => void;

type PostFn<T> = (doc: T & MongooseDocument, next: HookNextFn) => void;
type PostFnWithError<T> = (error: Error, doc: T & MongooseDocument, next: HookNextFn) => void;

interface Hooks {
  pre<T>(method: Method, parallel: boolean, fn: PreFn<T>, errorCb?: PreErrorCb): ClassDecorator;
  pre<T>(method: Method, fn: PreFn<T>, errorCb?: PreErrorCb): ClassDecorator;
  post<T>(method: Method, fn: PostFn<T> | PostFnWithError<T>): ClassDecorator;
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
