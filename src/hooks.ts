import { hooks as hooksData } from './data';

type PreFnNext = (err?: Error) => void;
type PreFnDone = () => void;
type PreFn<T> = (this: T, next: PreFnNext, done: PreFnDone) => void;
type PreErrorCb = (err: Error) => void;

interface Hooks {
  pre<T>(method: string, parallel: boolean, fn: PreFn<T>, errorCb?: PreErrorCb): (constructor: any) => void;
  pre<T>(method: string, fn: PreFn<T>, errorCb?: PreErrorCb): (constructor: any) => void;
}

const hooks: Hooks = {
  pre(...args) {
    return (constructor: any) => {
      const name = constructor.name;
      if (!hooksData[name]) {
        hooksData[name] = { pre: [], post: [] };
      }
      hooksData[name].pre.push(args);
    };
  },
};

export const pre = hooks.pre;
