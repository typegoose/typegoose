import type {
  Aggregate,
  AggregateExtract,
  CallbackError,
  Document,
  ErrorHandlingMiddlewareFunction,
  HydratedDocument,
  Model,
  MongooseDocumentMiddleware,
  MongooseQueryMiddleware,
  PostMiddlewareFunction,
  PreMiddlewareFunction,
  PreSaveMiddlewareFunction,
  Query,
  SchemaPostOptions,
  SchemaPreOptions,
} from 'mongoose';
import { DecoratorKeys } from './internal/constants';
import { ExpectedTypeError } from './internal/errors';
import { assertion, getName } from './internal/utils';
import { logger } from './logSettings';
import type { AnyParamConstructor, DocumentType, HookOptionsEither, IHooksArray, ReturnModelType } from './types';

/** Type copied from mongoose, because it is not exported but used in hooks */
type QueryResultType<T> = T extends Query<infer ResultType, any> ? ResultType : never;

// Type below is to replace a "@post<typeof Class>" to just be "@post<Class>" regardless of what is used
// see https://github.com/microsoft/TypeScript/issues/51647
// current workaround is to use "extends object" instead of something like "AnyParamConstructor" to just allow classes
// type TypeofClass<T extends { prototype: AnyParamConstructor<any> }> = T extends { prototype: infer S } ? S : never;

/**
 * Definitions for "pre" and "post" function overloads
 * basically a copy of https://github.com/Automattic/mongoose/blob/82943da92ba6db7fc27846a63a5a46cd7df049a9/types/index.d.ts#L283-L317
 * only modifications done are:
 * - moved options from second argument to be the last argument
 * - de-duplicate function that were duplicated because of options being the second argument
 * - changing the generics in use to support the classes or overwriting whatever is used
 * VERSION COPY OF 6.8.0
 */
interface Hooks {
  // post hooks with errorhandling option
  post<S extends object | Query<any, any>, T = S extends Query<any, any> ? S : Query<DocumentType<S>, DocumentType<S>>>(
    method: MongooseQueryMiddleware | MongooseQueryMiddleware[] | RegExp,
    fn: ErrorHandlingMiddlewareFunction<T>,
    options: SchemaPostOptions & { errorHandler: true }
  ): ClassDecorator;
  post<S extends object | HydratedDocument<any, any>, T = S extends Document ? S : HydratedDocument<DocumentType<S>, any>>(
    method: MongooseDocumentMiddleware | MongooseDocumentMiddleware[] | RegExp,
    fn: ErrorHandlingMiddlewareFunction<T>,
    options: SchemaPostOptions & { errorHandler: true }
  ): ClassDecorator;
  post<T extends Aggregate<any>>(
    method: 'aggregate' | RegExp,
    fn: ErrorHandlingMiddlewareFunction<T, Array<any>>,
    options: SchemaPostOptions & { errorHandler: true }
  ): ClassDecorator;
  post<S extends AnyParamConstructor<any> | Model<any>, T = S extends Model<any> ? S : ReturnModelType<S>>(
    method: 'insertMany' | RegExp,
    fn: ErrorHandlingMiddlewareFunction<T>,
    options: SchemaPostOptions & { errorHandler: true }
  ): ClassDecorator;

  // normal post hooks
  post<S extends object | Query<any, any>, T = S extends Query<any, any> ? S : Query<DocumentType<S>, DocumentType<S>>>(
    method: MongooseQueryMiddleware | MongooseQueryMiddleware[] | RegExp,
    fn: PostMiddlewareFunction<T, QueryResultType<T>>,
    options?: SchemaPostOptions
  ): ClassDecorator;
  post<S extends object | HydratedDocument<any, any>, T = S extends Document ? S : HydratedDocument<DocumentType<S>, any>>(
    method: MongooseDocumentMiddleware | MongooseDocumentMiddleware[] | RegExp,
    fn: PostMiddlewareFunction<T, T>,
    options?: SchemaPostOptions
  ): ClassDecorator;
  post<T extends Aggregate<any>>(
    method: 'aggregate' | RegExp,
    fn: PostMiddlewareFunction<T, Array<AggregateExtract<T>>>,
    options?: SchemaPostOptions
  ): ClassDecorator;
  post<S extends AnyParamConstructor<any> | Model<any>, T = S extends Model<any> ? S : ReturnModelType<S>>(
    method: 'insertMany' | RegExp,
    fn: PostMiddlewareFunction<T, T>,
    options?: SchemaPostOptions
  ): ClassDecorator;

  // error handling post hooks
  post<S extends object | Query<any, any>, T = S extends Query<any, any> ? S : Query<DocumentType<S>, DocumentType<S>>>(
    method: MongooseQueryMiddleware | MongooseQueryMiddleware[] | RegExp,
    fn: ErrorHandlingMiddlewareFunction<T>,
    options?: SchemaPostOptions
  ): ClassDecorator;
  post<S extends object | HydratedDocument<any, any>, T = S extends Document ? S : HydratedDocument<DocumentType<S>, any>>(
    method: MongooseDocumentMiddleware | MongooseDocumentMiddleware[] | RegExp,
    fn: ErrorHandlingMiddlewareFunction<T>,
    options?: SchemaPostOptions
  ): ClassDecorator;
  post<T extends Aggregate<any>>(
    method: 'aggregate' | RegExp,
    fn: ErrorHandlingMiddlewareFunction<T, Array<any>>,
    options?: SchemaPostOptions
  ): ClassDecorator;
  post<S extends AnyParamConstructor<any> | Model<any>, T = S extends Model<any> ? S : ReturnModelType<S>>(
    method: 'insertMany' | RegExp,
    fn: ErrorHandlingMiddlewareFunction<T>,
    options?: SchemaPostOptions
  ): ClassDecorator;

  // normal pre hooks
  pre<S extends object | HydratedDocument<any, any>, T = S extends Document ? S : HydratedDocument<DocumentType<S>, any>>(
    method: 'save',
    fn: PreSaveMiddlewareFunction<T>,
    options?: SchemaPreOptions
  ): ClassDecorator;
  pre<S extends object | Query<any, any>, T = S extends Query<any, any> ? S : Query<DocumentType<S>, DocumentType<S>>>(
    method: MongooseQueryMiddleware | MongooseQueryMiddleware[] | RegExp,
    fn: PreMiddlewareFunction<T>,
    options?: SchemaPreOptions
  ): ClassDecorator;
  pre<S extends object | HydratedDocument<any, any>, T = S extends Document ? S : HydratedDocument<DocumentType<S>, any>>(
    method: MongooseDocumentMiddleware | MongooseDocumentMiddleware[] | RegExp,
    fn: PreMiddlewareFunction<T>,
    options?: SchemaPreOptions
  ): ClassDecorator;
  pre<T extends Aggregate<any>>(method: 'aggregate' | RegExp, fn: PreMiddlewareFunction<T>, options?: SchemaPreOptions): ClassDecorator;
  pre<S extends AnyParamConstructor<any> | Model<any>, T = S extends Model<any> ? S : ReturnModelType<S>>(
    method: 'insertMany' | RegExp,
    fn: (this: T, next: (err?: CallbackError) => void, docs: any | Array<any>) => void | Promise<void>,
    options?: SchemaPreOptions
  ): ClassDecorator;
}

// TSDoc for the hooks can't be added without adding it to *every* overload
const hooks: Hooks = {
  pre(...args) {
    return (target: any) => addToHooks(target, 'pre', args);
  },
  post(...args) {
    return (target: any) => addToHooks(target, 'post', args);
  },
};

/**
 * Add a hook to the hooks Array
 * @param target Target Class
 * @param hookType What type is it
 * @param args All Arguments, that should be passed-through
 */
function addToHooks(target: any, hookType: 'pre' | 'post', args: any[]): void {
  // Convert Method to array if only a string is provided
  const methods: IHooksArray['methods'] = Array.isArray(args[0]) ? args[0] : [args[0]];
  const func: (...args: any[]) => void = args[1];
  const hookOptions: HookOptionsEither | undefined = args[2];

  assertion(typeof func === 'function', () => new ExpectedTypeError('fn', 'function', func));

  if (args.length > 3) {
    logger.warn(`"addToHooks" parameter "args" has a length of over 3 (length: ${args.length})`);
  }

  logger.info('Adding hooks for "[%s]" to "%s" as type "%s"', methods.join(','), getName(target), hookType);

  switch (hookType) {
    case 'post':
      const postHooks: IHooksArray[] = Array.from(Reflect.getMetadata(DecoratorKeys.HooksPost, target) ?? []);
      postHooks.push({ func, methods, options: hookOptions });
      Reflect.defineMetadata(DecoratorKeys.HooksPost, postHooks, target);
      break;
    case 'pre':
      const preHooks: IHooksArray[] = Array.from(Reflect.getMetadata(DecoratorKeys.HooksPre, target) ?? []);
      preHooks.push({ func, methods, options: hookOptions });
      Reflect.defineMetadata(DecoratorKeys.HooksPre, preHooks, target);
      break;
  }
}

export const pre = hooks.pre;
export const post = hooks.post;

// Export it PascalCased
export const Pre = hooks.pre;
export const Post = hooks.post;
