import { methods } from './data';

type MethodType = 'instanceMethods' | 'staticMethods';

/**
 * Base Function for staticMethod & instanceMethod
 * @param target <no info>
 * @param key Method Name
 * @param descriptor <no info>
 * @param methodType What type it is
 */
function baseMethod(target: any, key: string, descriptor: TypedPropertyDescriptor<any>, methodType: MethodType) {
  if (descriptor === undefined) {
    descriptor = Object.getOwnPropertyDescriptor(target, key);
  }

  const method = descriptor.value;
  if (methodType === 'instanceMethods') {
    const name = target.constructor.name;
    methods.instanceMethods.get(name).set(key, method);
  } else if (methodType === 'staticMethods') {
    const name = target.name;
    methods.staticMethods.get(name).set(key, method);
  }
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
 * @param key Method Name
 * @param descriptor <no info>
 */
export function staticMethod(target: any, key: string, descriptor: TypedPropertyDescriptor<any>) {
  const name = target.name;
  if (!methods.staticMethods.get(name)) {
    methods.staticMethods.set(name, new Map());
  }

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
 * @param key Method Name
 * @param descriptor <no info>
 */
export function instanceMethod(target: any, key: string, descriptor: TypedPropertyDescriptor<any>) {
  const name = target.constructor.name;
  if (!methods.instanceMethods.get(name)) {
    methods.instanceMethods.set(name, new Map());
  }

  return baseMethod(target, key, descriptor, 'instanceMethods');
}
