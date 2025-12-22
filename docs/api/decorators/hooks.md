---
id: hooks
title: '@pre & @post'
---

## @pre

**Typings:**

```ts
interface PreHooks {
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
```

**Parameters:**

| Name                                                          |                                         Type                                          | Description                                           |
| :------------------------------------------------------------ | :-----------------------------------------------------------------------------------: | :---------------------------------------------------- |
| `method` <span class="badge badge--secondary">Required</span> |                            `string \| RegExp \| string[]`                             | The Method(s) to add the `fn` to                      |
| `fn` <span class="badge badge--secondary">Required</span>     |                                        `Func`                                         | The Function to run for the Method(s) set in `method` |
| `options`                                                     | [`mongoose.SchemaPreOptions`](https://mongoosejs.com/docs/api/schema.html#schema_Schema-pre) | Options to set when to run the hook                   |

`@pre` is used to set Document & Query pre hooks, works like `schema.pre` only difference is the switched `options` and `method`(`fn`) parameter positions.

For parameter `options`, look at the [mongoose for `schema.pre`](https://mongoosejs.com/docs/api/schema.html#schema_Schema-pre) or [mongoose Middleware section Naming Conflicts](https://mongoosejs.com/docs/middleware.html#naming).

:::note
Arrow Functions cannot be used here, because the binding of `this` is required to get & modify the Document / Query / Aggregate.
:::

## Example {#pre-example}

```ts
@pre<Car>('save', function () {
  if (this.model === 'Tesla') {
    this.isFast = true;
  }
})
class Car {
  @prop({ required: true })
  public model!: string;

  @prop()
  public isFast?: boolean;
}
```

## @post

**Typings:**

```ts
interface PostHooks {
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
}
```

**Parameters:**

| Name                                                          |                                          Type                                          | Description                                           |
| :------------------------------------------------------------ | :------------------------------------------------------------------------------------: | :---------------------------------------------------- |
| `method` <span class="badge badge--secondary">Required</span> |                             `string \| RegExp \| string[]`                             | The Method(s) to add the `fn` to                      |
| `fn` <span class="badge badge--secondary">Required</span>     |                                         `Func`                                         | The Function to run for the Method(s) set in `method` |
| `options`                                                     | [`mongoose.SchemaPreOptions`](https://mongoosejs.com/docs/api/schema.html#schema_Schema-post) | Options to set when to run the hook                   |

`@post` is used to set Document & Query pre hooks, works like `schema.post` only difference is the switched `options` and `method`(`fn`) parameter positions.

For parameter `options`, look at the [mongoose for `schema.post`](https://mongoosejs.com/docs/api/schema.html#schema_Schema-post) or [mongoose Middleware section Naming Conflicts](https://mongoosejs.com/docs/middleware.html#naming).

:::note
Arrow Functions cannot be used here, because the binding of `this` is required to get & modify the Document / Query / Aggregate.
:::

## Example {#post-example}

```ts
@post<Car>('save', function (car) {
  if (car.topSpeedInKmH > 300) {
    console.log(car.model, 'is fast!');
  }
})
class Car {
  @prop({ required: true })
  public model!: string;

  @prop({ required: true })
  public topSpeedInKmH!: number;
}
```
