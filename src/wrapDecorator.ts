/* eslint-disable @typescript-eslint/ban-types */
import { getName, isNullOrUndefined } from './internal/utils';

// we have to declare the function as available, because no reflection types are imported anymore
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Reflect {
    function defineMetadata(metadataKey: any, metadataValue: any, target: Object): void;
    function getMetadata(metadataKey: any, target: Object): any;
    function getOwnMetadata(metadataKey: any, target: Object): any;
  }
}

const isESDecorator = isESDecoratorFn();

console.log('IS ES DECO', isESDecorator);

/**
 * Helper function to make it easier to look at and callable
 */
function isESDecoratorFn(): boolean {
  if ('defineMetadata' in Reflect) {
    return false;
  }

  if (!Symbol.metadata) {
    throw new Error(
      'Could not find "Reflect.defineMetadata" or "Symbol.metadata".\n' +
        'Make sure either "experimentalDecorators" is on and a reflection library is installed, or use typescript 5.2'
    );
  }

  return true;
}

/** ES Class Field Decorator Function type, because typescript does not have it natively */
export type ESClassFieldDecorator = (value: undefined, context: ClassFieldDecoratorContext) => void;

/** ES Class Decorator function type, because typescript does not have it natively */
// eslint-disable-next-line @typescript-eslint/ban-types
export type ESClassDecorator = (value: Function, context: ClassDecoratorContext) => void;

/** Options passed to the `cb` for {@link wrapClassDecorator} and {@link wrapPropertyDecorator} */
export interface CustomTypes {
  /** The Metadata Processing class in use */
  metadata: AccessMetadataES | AccessMetadataReflect;
  /** The Name of the Class in {@link wrapClassDecorator} or the name of the property in {@link wrapPropertyDecorator} */
  name: string | symbol | undefined;
  /** Always the name of the class the decorator is on */
  className: string | undefined;
}

export interface PropertyCustomTypes extends CustomTypes {
  name: NonNullable<CustomTypes['name']>;
}

/**
 * Wrap a class-decorator callback so that it is properly processed for both ES and Reflect
 */
export function wrapClassDecorator(cb: (c: CustomTypes) => void): ClassDecorator | ESClassDecorator {
  if (isESDecorator) {
    return ((value, context) =>
      cb({
        metadata: new AccessMetadataES(context.metadata),
        name: context.name,
        className: context.name,
      })) as ESClassDecorator;
  }

  return ((target, context) => {
    if (!isNullOrUndefined(context)) {
      throw new Error('Expected experimental decorators, got ES decorator');
    }

    cb({
      metadata: new AccessMetadataReflect(target),
      name: getName(target as any),
      className: getName(target as any),
    });
  }) as ClassDecorator;
}

/**
 * Wrap a property-decorator callback so that it is properly processed for both ES and Reflect
 */
export function wrapPropertyDecorator(cb: (c: PropertyCustomTypes) => void): PropertyDecorator | ESClassFieldDecorator {
  if (isESDecorator) {
    return ((value, context) =>
      cb({
        metadata: new AccessMetadataES(context.metadata),
        name: context.name,
        className: 'UNSUPPORTED', // HACK: currently there is no way to get the class name or full class in a ES Property decorator, see https://github.com/tc39/proposal-decorators/issues/466
      })) as ESClassFieldDecorator;
  }

  return ((target, name) => {
    if (typeof name === 'object') {
      throw new Error('Expected experimental decorators, got ES decorator');
    }

    cb({
      metadata: new AccessMetadataReflect(target),
      name: name,
      className: getName(target.constructor as any),
    });
  }) as PropertyDecorator;
}

export interface IAccessMetadata {
  /** Get the value from the own metadata object, not via inheritance */
  getOwnMetadata(key: string): unknown;
  /** Get the value from the object, regardless of if it is inherited */
  getMetadata(key: string): unknown;
  /** Define metadata at the key on the own metadata object */
  defineMetadata(key: string, value: unknown): unknown;
}

/**
 * Class for the Reflection (experimentalDecorators) metadata implementation
 */
export class AccessMetadataReflect implements IAccessMetadata {
  // eslint-disable-next-line @typescript-eslint/ban-types
  protected target: Object;

  public getOwnMetadata(key: string): unknown {
    return Reflect.getOwnMetadata(key, this.target);
  }

  public getMetadata(key: string): unknown {
    return Reflect.getMetadata(key, this.target);
  }

  public defineMetadata(key: string, value: unknown): void {
    return Reflect.defineMetadata(key, value, this.target);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(target: Object) {
    this.target = target;
  }
}

/**
 * Class for the ES decorator metadata implementation
 */
export class AccessMetadataES implements IAccessMetadata {
  protected metadata: DecoratorMetadata;

  public getOwnMetadata(key: string): unknown {
    return Object.getOwnPropertyDescriptor(this.metadata, key)?.value;
  }

  public getMetadata(key: string): unknown {
    return this.metadata[key];
  }

  public defineMetadata(key: string, value: unknown): void {
    this.metadata[key] = value;
  }

  constructor(metadata: DecoratorMetadata) {
    this.metadata = metadata;
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function getAccessMetadata(target: Object): AccessMetadataES | AccessMetadataReflect {
  if (isESDecorator) {
    return new AccessMetadataES(target[Symbol.metadata]);
  }

  return new AccessMetadataReflect(target);
}
