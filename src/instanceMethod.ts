import { baseMethod } from './baseMethod';

export const instanceMethod = (target: any, key: string, descriptor: TypedPropertyDescriptor<any>) =>
  baseMethod(target, key, descriptor, 'instanceMethods');