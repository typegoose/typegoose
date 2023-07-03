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
} from 'mongoose';
import { DecoratorKeys } from './internal/constants';
import { ExpectedTypeError } from './internal/errors';
import { assertion } from './internal/utils';
import { logger } from './logSettings';
import type { AnyParamConstructor, DocumentType, HookOptionsEither, IHooksArray, ReturnModelType } from './types';
import { CustomTypes, wrapClassDecorator } from './wrapDecorator';

/** Type copied from mongoose, because it is not exported but used in hooks */
type QueryResultType<T> = T extends Query<infer ResultType, any> ? ResultType : never;

// Type below is to replace a "@post<typeof Class>" to just be "@post<Class>" regardless of what is used
// see https://github.com/microsoft/TypeScript/issues/51647
// current workaround is to use "extends object" instead of something like "AnyParamConstructor" to just allow classes
// type TypeofClass<T extends { prototype: AnyParamConstructor<any> }> = T extends { prototype: infer S } ? S : never;

/**
 * Definitions for "pre" and "post" function overloads
 * basically a copy of https://github.com/Automattic/mongoose/blob/260261d3c2a3593b34f1e3358f4a8c000575f082/types/index.d.ts#L302-L346
 * only modifications done are:
 * - moved options from second argument to be the last argument
 * - de-duplicate function that were duplicated because of options being the second argument
 * - changing the generics in use to support the classes or overwriting whatever is used
 * VERSION COPY OF 7.0.0
 */
interface Hooks {
  // post hooks with errorhandling option
  post<S extends object | Query<any, any>, T = S extends Query<any, any> ? S : Query<DocumentType<S>, DocumentType<S>>>(
    method: MongooseQueryMiddleware | MongooseQueryMiddleware[] | RegExp,
    fn: ErrorHandlingMiddlewareFunction<T>,
    options: SchemaPostOptions & { errorHandler: true }
  ): /* ReturnType<typeof wrapClassDecorator> */ any;
  post<S extends object | HydratedDocument<any, any>, T = S extends Document ? S : HydratedDocument<DocumentType<S>, any>>(
    method: MongooseDocumentMiddleware | MongooseDocumentMiddleware[] | RegExp,
    fn: ErrorHandlingMiddlewareFunction<T>,
    options: SchemaPostOptions & { errorHandler: true }
  ): /* ReturnType<typeof wrapClassDecorator> */ any;
  post<T extends Aggregate<any>>(
    method: 'aggregate' | RegExp,
    fn: ErrorHandlingMiddlewareFunction<T, Array<any>>,
    options: SchemaPostOptions & { errorHandler: true }
  ): /* ReturnType<typeof wrapClassDecorator> */ any;
  post<S extends AnyParamConstructor<any> | Model<any>, T = S extends Model<any> ? S : ReturnModelType<S>>(
    method: 'insertMany' | RegExp,
    fn: ErrorHandlingMiddlewareFunction<T>,
    options: SchemaPostOptions & { errorHandler: true }
  ): /* ReturnType<typeof wrapClassDecorator> */ any;

  // normal post hooks
  post<S extends object | Query<any, any>, T = S extends Query<any, any> ? S : Query<DocumentType<S>, DocumentType<S>>>(
    method: MongooseQueryMiddleware | MongooseQueryMiddleware[] | RegExp,
    fn: PostMiddlewareFunction<T, QueryResultType<T>>,
    options?: SchemaPostOptions
  ): /* ReturnType<typeof wrapClassDecorator> */ any;
  post<S extends object | HydratedDocument<any, any>, T = S extends Document ? S : HydratedDocument<DocumentType<S>, any>>(
    method: MongooseDocumentMiddleware | MongooseDocumentMiddleware[] | RegExp,
    fn: PostMiddlewareFunction<T, T>,
    options?: SchemaPostOptions
  ): /* ReturnType<typeof wrapClassDecorator> */ any;
  post<T extends Aggregate<any>>(
    method: 'aggregate' | RegExp,
    fn: PostMiddlewareFunction<T, Array<AggregateExtract<T>>>,
    options?: SchemaPostOptions
  ): /* ReturnType<typeof wrapClassDecorator> */ any;
  post<S extends AnyParamConstructor<any> | Model<any>, T = S extends Model<any> ? S : ReturnModelType<S>>(
    method: 'insertMany' | RegExp,
    fn: PostMiddlewareFunction<T, T>,
    options?: SchemaPostOptions
  ): /* ReturnType<typeof wrapClassDecorator> */ any;

  // error handling post hooks
  post<S extends object | Query<any, any>, T = S extends Query<any, any> ? S : Query<DocumentType<S>, DocumentType<S>>>(
    method: MongooseQueryMiddleware | MongooseQueryMiddleware[] | RegExp,
    fn: ErrorHandlingMiddlewareFunction<T>,
    options?: SchemaPostOptions
  ): /* ReturnType<typeof wrapClassDecorator> */ any;
  post<S extends object | HydratedDocument<any, any>, T = S extends Document ? S : HydratedDocument<DocumentType<S>, any>>(
    method: MongooseDocumentMiddleware | MongooseDocumentMiddleware[] | RegExp,
    fn: ErrorHandlingMiddlewareFunction<T>,
    options?: SchemaPostOptions
  ): /* ReturnType<typeof wrapClassDecorator> */ any;
  post<T extends Aggregate<any>>(
    method: 'aggregate' | RegExp,
    fn: ErrorHandlingMiddlewareFunction<T, Array<any>>,
    options?: SchemaPostOptions
  ): /* ReturnType<typeof wrapClassDecorator> */ any;
  post<S extends AnyParamConstructor<any> | Model<any>, T = S extends Model<any> ? S : ReturnModelType<S>>(
    method: 'insertMany' | RegExp,
    fn: ErrorHandlingMiddlewareFunction<T>,
    options?: SchemaPostOptions
  ): /* ReturnType<typeof wrapClassDecorator> */ any;

  // special pre hooks for each "document: true, query: false" and "document: false, query: true"
  pre<S extends object | HydratedDocument<any, any>, T = S extends Document ? S : HydratedDocument<DocumentType<S>, any>>(
    method: MongooseQueryOrDocumentMiddleware | MongooseQueryOrDocumentMiddleware[],
    fn: PreMiddlewareFunction<T>,
    options: SchemaPreOptions & { document: true; query: false }
  ): /* ReturnType<typeof wrapClassDecorator> */ any;
  pre<S extends object | Query<any, any>, T = S extends Query<any, any> ? S : Query<DocumentType<S>, DocumentType<S>>>(
    method: MongooseQueryOrDocumentMiddleware | MongooseQueryOrDocumentMiddleware[],
    fn: PreMiddlewareFunction<T>,
    options: SchemaPreOptions & { document: false; query: true }
  ): /* ReturnType<typeof wrapClassDecorator> */ any;

  // normal pre hooks
  pre<S extends object | HydratedDocument<any, any>, T = S extends Document ? S : HydratedDocument<DocumentType<S>, any>>(
    method: 'save',
    fn: PreSaveMiddlewareFunction<T>,
    options?: SchemaPreOptions
  ): /* ReturnType<typeof wrapClassDecorator> */ any;
  pre<S extends object | Query<any, any>, T = S extends Query<any, any> ? S : Query<DocumentType<S>, DocumentType<S>>>(
    method: MongooseQueryMiddleware | MongooseQueryMiddleware[] | RegExp,
    fn: PreMiddlewareFunction<T>,
    options?: SchemaPreOptions
  ): /* ReturnType<typeof wrapClassDecorator> */ any;
  pre<S extends object | HydratedDocument<any, any>, T = S extends Document ? S : HydratedDocument<DocumentType<S>, any>>(
    method: MongooseDocumentMiddleware | MongooseDocumentMiddleware[] | RegExp,
    fn: PreMiddlewareFunction<T>,
    options?: SchemaPreOptions
  ): /* ReturnType<typeof wrapClassDecorator> */ any;
  pre<T extends Aggregate<any>>(
    method: 'aggregate' | RegExp,
    fn: PreMiddlewareFunction<T>,
    options?: SchemaPreOptions
  ): /* ReturnType<typeof wrapClassDecorator> */ any;
  pre<S extends AnyParamConstructor<any> | Model<any>, T = S extends Model<any> ? S : ReturnModelType<S>>(
    method: 'insertMany' | RegExp,
    fn: (this: T, next: (err?: CallbackError) => void, docs: any | Array<any>) => void | Promise<void>,
    options?: SchemaPreOptions
  ): /* ReturnType<typeof wrapClassDecorator> */ any;
}

// TSDoc for the hooks can't be added without adding it to *every* overload
const hooks: Hooks = {
  pre(...args) {
    return wrapClassDecorator((dargs) => addToHooks(dargs, 'pre', args));
  },
  post(...args) {
    return wrapClassDecorator((dargs) => addToHooks(dargs, 'post', args));
  },
};

/**
 * Add a hook to the hooks Array
 * @param target Target Class
 * @param hookType What type is it
 * @param args All Arguments, that should be passed-through
 */
function addToHooks({ metadata, className }: CustomTypes, hookType: 'pre' | 'post', args: any[]): void {
  // Convert Method to array if only a string is provided
  const methods: IHooksArray['methods'] = Array.isArray(args[0]) ? args[0] : [args[0]];
  const func: (...args: any[]) => void = args[1];
  const hookOptions: HookOptionsEither | undefined = args[2];

  assertion(typeof func === 'function', () => new ExpectedTypeError('fn', 'function', func));

  if (args.length > 3) {
    logger.warn(`"addToHooks" parameter "args" has a length of over 3 (length: ${args.length})`);
  }

  logger.info('Adding hooks for "[%s]" to "%s" as type "%s"', methods.join(','), className, hookType);

  switch (hookType) {
    case 'post':
      const postHooks: IHooksArray[] = Array.from((metadata.getMetadata(DecoratorKeys.HooksPost) as IHooksArray[] | undefined) ?? []);
      postHooks.push({ func, methods, options: hookOptions });
      metadata.defineMetadata(DecoratorKeys.HooksPost, postHooks);
      break;
    case 'pre':
      const preHooks: IHooksArray[] = Array.from((metadata.getMetadata(DecoratorKeys.HooksPre) as IHooksArray[] | undefined) ?? []);
      preHooks.push({ func, methods, options: hookOptions });
      metadata.defineMetadata(DecoratorKeys.HooksPre, preHooks);
      break;
  }
}

export const pre = hooks.pre;
export const post = hooks.post;

// Export it PascalCased
export const Pre = hooks.pre;
export const Post = hooks.post;
