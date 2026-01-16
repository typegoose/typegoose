import type {
  Aggregate,
  AggregateExtract,
  CallbackError,
  Document,
  MongooseQueryOrDocumentMiddleware,
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
  MongooseDistinctDocumentMiddleware,
  MongooseDefaultQueryMiddleware,
  MongooseDistinctQueryMiddleware,
  MongooseQueryAndDocumentMiddleware,
  InsertManyOptions,
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
 * basically a copy of https://github.com/Automattic/mongoose/blob/8cbb224634e0a2d0981ceafce32dd34d4b73c242/types/index.d.ts#L321-L427
 * only modifications done are:
 * - moved options from second argument to be the last argument
 * - de-duplicate function that were duplicated because of options being the second argument
 * - changing the generics in use to support the classes or overwriting whatever is used
 * VERSION COPY OF 7.6.2
 */
interface Hooks {
  /** Defines a post hook for the model. */

  // PostMiddlewareFunction
  // with errorHandler set to true
  post<S extends object | Query<any, any>, T = S extends Query<any, any> ? S : Query<DocumentType<S>, DocumentType<S>>>(
    method: MongooseQueryMiddleware | MongooseQueryMiddleware[] | RegExp,
    fn: ErrorHandlingMiddlewareFunction<T>,
    options: SchemaPostOptions & { errorHandler: true }
  ): ClassDecorator;
  post<S extends object | HydratedDocument<any, any>, T = S extends Document ? S : HydratedDocument<DocumentType<S>>>(
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

  // this = never since it never happens
  post<S extends never, T = S>(
    method: MongooseQueryOrDocumentMiddleware | MongooseQueryOrDocumentMiddleware[] | RegExp,
    fn: PostMiddlewareFunction<T, T>,
    options?: SchemaPostOptions & { document: false; query: false }
  ): ClassDecorator;
  post<S extends never, T = S>(
    method: MongooseDistinctQueryMiddleware | MongooseDistinctQueryMiddleware[],
    fn: PostMiddlewareFunction<T, T>,
    options?: SchemaPostOptions & { document: boolean; query: false }
  ): ClassDecorator;
  post<S extends never, T = S>(
    method: MongooseDistinctDocumentMiddleware | MongooseDistinctDocumentMiddleware[],
    fn: PostMiddlewareFunction<T, T>,
    options?: SchemaPostOptions & { document: false; query: true }
  ): ClassDecorator;

  // this = Document
  post<S extends object | HydratedDocument<any, any>, T = S extends Document ? S : HydratedDocument<DocumentType<S>>>(
    method: MongooseDistinctDocumentMiddleware | MongooseDistinctDocumentMiddleware[],
    fn: PostMiddlewareFunction<T, T>,
    options?: SchemaPostOptions
  ): ClassDecorator;
  post<S extends object | HydratedDocument<any, any>, T = S extends Document ? S : HydratedDocument<DocumentType<S>>>(
    method: MongooseQueryOrDocumentMiddleware | MongooseQueryOrDocumentMiddleware[] | RegExp,
    fn: PostMiddlewareFunction<T, T>,
    options?: SchemaPostOptions & { document: true; query: false }
  ): ClassDecorator;
  post<S extends object | HydratedDocument<any, any>, T = S extends Document ? S : HydratedDocument<DocumentType<S>>>(
    method: 'init',
    fn: PostMiddlewareFunction<T, T>
  ): ClassDecorator;

  // this = Query
  post<S extends object | Query<any, any>, T = S extends Query<any, any> ? S : Query<DocumentType<S>, DocumentType<S>>>(
    method: MongooseDefaultQueryMiddleware | MongooseDefaultQueryMiddleware[],
    fn: PostMiddlewareFunction<T, QueryResultType<T>>
    // options?: SchemaPostOptions // no options for this???
  ): ClassDecorator;
  post<S extends object | Query<any, any>, T = S extends Query<any, any> ? S : Query<DocumentType<S>, DocumentType<S>>>(
    method: MongooseDistinctQueryMiddleware | MongooseDistinctQueryMiddleware[],
    fn: PostMiddlewareFunction<T, QueryResultType<T>>,
    options?: SchemaPostOptions
  ): ClassDecorator;
  post<S extends object | Query<any, any>, T = S extends Query<any, any> ? S : Query<DocumentType<S>, DocumentType<S>>>(
    method: MongooseQueryOrDocumentMiddleware | MongooseQueryOrDocumentMiddleware[] | RegExp,
    fn: PostMiddlewareFunction<T, QueryResultType<T>>,
    options?: SchemaPostOptions & { document: false; query: true }
  ): ClassDecorator;

  // this = Union of Document and Query, could be called with any of them
  post<
    S extends object | Query<any, any> | HydratedDocument<any, any>,
    T = S extends Query<any, any> ? S : S extends Document ? S : HydratedDocument<DocumentType<S>>,
  >(
    method: MongooseQueryOrDocumentMiddleware | MongooseQueryOrDocumentMiddleware[] | RegExp,
    fn: ErrorHandlingMiddlewareFunction<T>,
    options?: SchemaPostOptions & { document: true; query: true }
  ): ClassDecorator;

  // method aggregate and insertMany with PostMiddlewareFunction
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

  /** Defines a pre hook for the model. */

  // this = never since it never happens
  pre<S extends never, T = S>(
    method: 'save',
    fn: PreSaveMiddlewareFunction<T>,
    options?: SchemaPreOptions & { document: false; query: boolean }
  ): ClassDecorator;
  pre<S extends never, T = S>(
    method: MongooseQueryOrDocumentMiddleware | MongooseQueryOrDocumentMiddleware[] | RegExp,
    fn: PreMiddlewareFunction<T>,
    options?: SchemaPreOptions & { document: false; query: false }
  ): ClassDecorator;
  pre<S extends never, T = S>(
    method: MongooseDistinctQueryMiddleware | MongooseDistinctQueryMiddleware[],
    fn: PreMiddlewareFunction<T>,
    options?: SchemaPreOptions & { document: boolean; query: false }
  ): ClassDecorator;
  pre<S extends never, T = S>(
    method: MongooseDistinctDocumentMiddleware | MongooseDistinctDocumentMiddleware[] | RegExp,
    fn: PreMiddlewareFunction<T>,
    options?: SchemaPreOptions & { document: false; query: boolean }
  ): ClassDecorator;

  // this = Union of Document and Query, could be called with any of them
  pre<
    S extends object | Query<any, any> | HydratedDocument<any, any>,
    T = S extends Query<any, any> ? S : S extends Document ? S : HydratedDocument<DocumentType<S>>,
  >(
    method: MongooseQueryAndDocumentMiddleware | MongooseQueryAndDocumentMiddleware[] | RegExp,
    fn: PreMiddlewareFunction<T>,
    options?: SchemaPreOptions & { document: true; query: true }
  ): ClassDecorator;

  // this = Document
  pre<S extends object | HydratedDocument<any, any>, T = S extends Document ? S : HydratedDocument<DocumentType<S>>>(
    method: 'save',
    fn: PreSaveMiddlewareFunction<T>,
    options?: SchemaPreOptions
  ): ClassDecorator;
  pre<S extends object | HydratedDocument<any, any>, RawDocType = unknown>(
    method: 'init',
    fn: (this: S, doc: RawDocType) => void
  ): ClassDecorator;
  pre<S extends object | HydratedDocument<any, any>, T = S extends Document ? S : HydratedDocument<DocumentType<S>>>(
    method: MongooseDistinctDocumentMiddleware | MongooseDistinctDocumentMiddleware[],
    fn: PreMiddlewareFunction<T>,
    options?: SchemaPreOptions
  ): ClassDecorator;
  pre<S extends object | HydratedDocument<any, any>, T = S extends Document ? S : HydratedDocument<DocumentType<S>>>(
    method: MongooseQueryAndDocumentMiddleware | MongooseQueryAndDocumentMiddleware[] | RegExp,
    fn: PreMiddlewareFunction<T>,
    options?: SchemaPreOptions & { document: true }
  ): ClassDecorator;
  pre<S extends object | HydratedDocument<any, any>, T = S extends Document ? S : HydratedDocument<DocumentType<S>>>(
    method: MongooseQueryOrDocumentMiddleware | MongooseQueryOrDocumentMiddleware[] | RegExp,
    fn: PreMiddlewareFunction<T>,
    options?: SchemaPreOptions & { document: true; query: false }
  ): ClassDecorator;

  // this = Query
  pre<S extends object | Query<any, any>, T = S extends Query<any, any> ? S : Query<DocumentType<S>, DocumentType<S>>>(
    method: MongooseDefaultQueryMiddleware | MongooseDefaultQueryMiddleware[],
    fn: PreMiddlewareFunction<T>
    // options?: SchemaPreOptions // no options for this???
  ): ClassDecorator;
  pre<S extends object | Query<any, any>, T = S extends Query<any, any> ? S : Query<DocumentType<S>, DocumentType<S>>>(
    method: MongooseDistinctQueryMiddleware | MongooseDistinctQueryMiddleware[],
    fn: PreMiddlewareFunction<T>,
    options?: SchemaPreOptions
  ): ClassDecorator;
  pre<S extends object | Query<any, any>, T = S extends Query<any, any> ? S : Query<DocumentType<S>, DocumentType<S>>>(
    method: MongooseQueryOrDocumentMiddleware | MongooseQueryOrDocumentMiddleware[] | RegExp,
    fn: PreMiddlewareFunction<T>,
    options?: SchemaPreOptions & { document: false; query: true }
  ): ClassDecorator;

  // this = Union of Document and Query, could be called with any of them
  pre<
    S extends object | Query<any, any> | HydratedDocument<any, any>,
    T = S extends Query<any, any> ? S : S extends Document ? S : HydratedDocument<DocumentType<S>>,
  >(
    method: MongooseQueryOrDocumentMiddleware | MongooseQueryOrDocumentMiddleware[] | RegExp,
    fn: PreMiddlewareFunction<T>,
    options?: SchemaPreOptions & { document: true; query: true }
  ): ClassDecorator;

  // method aggregate
  pre<T extends Aggregate<any>>(method: 'aggregate' | RegExp, fn: PreMiddlewareFunction<T>, options?: SchemaPreOptions): ClassDecorator;

  /* method insertMany */
  pre<S extends AnyParamConstructor<any> | Model<any>, T = S extends Model<any> ? S : ReturnModelType<S>>(
    method: 'insertMany' | RegExp,
    fn: (
      this: T,
      next: (err?: CallbackError) => void,
      docs: any | Array<any>,
      options?: InsertManyOptions & { lean?: boolean }
    ) => void | Promise<void>,
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
    case 'post': {
      const postHooks: IHooksArray[] = Array.from(Reflect.getMetadata(DecoratorKeys.HooksPost, target) ?? []);
      postHooks.push({ func, methods, options: hookOptions });
      Reflect.defineMetadata(DecoratorKeys.HooksPost, postHooks, target);
      break;
    }
    case 'pre': {
      const preHooks: IHooksArray[] = Array.from(Reflect.getMetadata(DecoratorKeys.HooksPre, target) ?? []);
      preHooks.push({ func, methods, options: hookOptions });
      Reflect.defineMetadata(DecoratorKeys.HooksPre, preHooks, target);
      break;
    }
  }
}

export const pre = hooks.pre;
export const post = hooks.post;

// Export it PascalCased
export const Pre = hooks.pre;
export const Post = hooks.post;
