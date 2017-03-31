import { baseMethod } from './baseMethod';

export const staticMethod = (target: any, key: string, descriptor: TypedPropertyDescriptor<any>) =>
  baseMethod(target, key, descriptor, 'staticMethods');