---
id: hooks
title: '@pre & @post'
---

## @pre

**Typings:**

```ts
type AggregateMethod = 'aggregate';
type QueryMethod =
  | 'count'
  | 'countDocuments'
  | 'estimatedDocumentCount'
  | 'find'
  | 'findOne'
  | 'findOneAndRemove'
  | 'findOneAndUpdate'
  | 'update'
  | 'updateOne'
  | 'updateMany'
  | 'findOneAndDelete'
  | 'deleteOne'
  | 'deleteMany';
type ModelMethod = 'insertMany';
type DocumentMethod = 'init' | 'validate' | 'save' | 'remove';
type QMR = QueryMethod | ModelMethod | RegExp;
type DR = DocumentMethod | RegExp;

pre<T>(method: AggregateMethod, fn: PreFnWithAggregate<T>, options?: mongoose.SchemaPreOptions): ClassDecorator;
pre<T>(method: DR | DR[], fn: PreFnWithDocumentType<T>, options?: mongoose.SchemaPreOptions): ClassDecorator;
pre<T>(method: QMR | QMR[], fn: PreFnWithQuery<T>, options?: mongoose.SchemaPreOptions): ClassDecorator;
```

**Parameters:**

| Name                                                          |                                         Type                                          | Description                                           |
| :------------------------------------------------------------ | :-----------------------------------------------------------------------------------: | :---------------------------------------------------- |
| `method` <span class="badge badge--secondary">Required</span> |                      `string \| RegExp \| (string \| RegExp)[]`                       | The Method(s) to add the `fn` to                      |
| `fn` <span class="badge badge--secondary">Required</span>     |                                        `Func`                                         | The Function to run for the Method(s) set in `method` |
| `options`                                                     | [`mongoose.SchemaPreOptions`](https://mongoosejs.com/docs/api.html#schema_Schema-pre) | Options to set when to run the hook                   |

`@pre` is used to set Pre-Hooks for many function, works like `schema.pre` calls.  
`@pre` currently supports `method` arrays that mongoose does not natively supports, may change in the future.

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
type NumberMethod = 'count';
type SingleMethod = 'findOne' | 'findOneAndRemove' | 'findOneAndUpdate' | 'findOneAndDelete' | 'deleteOne' | DocumentMethod;
type MultipleMethod = 'find' | 'update' | 'deleteMany' | 'aggregate';
type ModelMethod = 'insertMany';
type DocumentMethod = 'init' | 'validate' | 'save' | 'remove';
type QueryMethod =
  | 'count'
  | 'countDocuments'
  | 'estimatedDocumentCount'
  | 'find'
  | 'findOne'
  | 'findOneAndRemove'
  | 'findOneAndUpdate'
  | 'update'
  | 'updateOne'
  | 'updateMany'
  | 'findOneAndDelete'
  | 'deleteOne'
  | 'deleteMany';
type QMR = QueryMethod | ModelMethod | RegExp;

post<T>(method: RegExp, fn: PostRegExpResponse<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;
post<T>(method: RegExp, fn: PostRegExpWithError<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;

post<T>(method: NumberMethod, fn: PostNumberResponse<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;
post<T>(method: NumberMethod, fn: PostNumberWithError<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;

post<T>(method: SingleMethod, fn: PostSingleResponse<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;
post<T>(method: SingleMethod, fn: PostSingleWithError<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;

post<T>(method: MultipleMethod, fn: PostMultipleResponse<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;
post<T>(method: MultipleMethod, fn: PostMultipleWithError<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;

post<T>(method: ModelMethod, fn: ModelPostFn<T> | PostMultipleResponse<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;

post<T>(method: DocumentMethod | DocumentMethod[], fn: PostArrayResponse<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;
post<T>(method: DocumentMethod | DocumentMethod[], fn: PostArrayWithError<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;

post<T>(method: QMR | QMR[], fn: PostQueryArrayResponse<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;
post<T>(method: QMR | QMR[], fn: PostQueryArrayWithError<T>, options?: mongoose.SchemaPostOptions): ClassDecorator;
```

**Parameters:**

| Name                                                          |                                          Type                                          | Description                                           |
| :------------------------------------------------------------ | :------------------------------------------------------------------------------------: | :---------------------------------------------------- |
| `method` <span class="badge badge--secondary">Required</span> |                       `string \| RegExp \| (string \| RegExp)[]`                       | The Method(s) to add the `fn` to                      |
| `fn` <span class="badge badge--secondary">Required</span>     |                                         `Func`                                         | The Function to run for the Method(s) set in `method` |
| `options`                                                     | [`mongoose.SchemaPreOptions`](https://mongoosejs.com/docs/api.html#schema_Schema-post) | Options to set when to run the hook                   |

`@post` is used to set Post-Hooks for many function, works like `schema.post` calls.  
`@post` currently supports `method` arrays that mongoose does not natively supports, may change in the future.

For parameter `options`, look at the [mongoose for `schema.post`](https://mongoosejs.com/docs/api/schema.html#schema_Schema-post) or [mongoose Middleware section Naming Conflicts](https://mongoosejs.com/docs/middleware.html#naming).

:::note
Arrow Functions cannot be used here, because the binding of `this` is required to get & modify the Document / Query / Aggregate.
:::

## Example {#post-example}

```ts
@post<Car>('save', (car) => {
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
