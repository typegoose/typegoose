import { methods } from './data';

type MethodType = 'instanceMethods' | 'staticMethods';

/**
 * Base Function for staticMethod & instanceMethod
 * @param target <no info>
 * @param key <no info>
 * @param descriptor <no info>
 * @param methodType What type it is
 */
function baseMethod(target: any, key: string, descriptor: TypedPropertyDescriptor<any>, methodType: MethodType) {
  if (descriptor === undefined) {
    descriptor = Object.getOwnPropertyDescriptor(target, key);
  }

  let name: any;
  if (methodType === 'instanceMethods') {
    name = target.constructor.name;
  }
  if (methodType === 'staticMethods') {
    name = target.name;
  }

  if (!methods[methodType][name]) {
    methods[methodType][name] = {};
  }

  const method = descriptor.value;
  methods[methodType][name] = {
    ...methods[methodType][name],
    [key]: method,
  };
}

/**
 * Set the function below as a Static Method
 * Note: you need to add static before the name
 * @example Example:
 * ```
 *  @staticMethod
 *  public static hello() {}
 * ```
 * @param target <no info>
 * @param key <no info>
 * @param descriptor <no info>
 */
export function staticMethod(target: any, key: string, descriptor: TypedPropertyDescriptor<any>) {
  return baseMethod(target, key, descriptor, 'staticMethods');
}

/**
 * Set the function below as an Instance Method
 * @example Example:
 * ```
 *  @instanceMethod
 *  public hello() {}
 * ```
 * @param target <no info>
 * @param key <no info>
 * @param descriptor <no info>
 */
export function instanceMethod(target: any, key: string, descriptor: TypedPropertyDescriptor<any>) {
  return baseMethod(target, key, descriptor, 'instanceMethods');
}
