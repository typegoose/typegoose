---
id: hooks
title: '@pre & @post'
---

Don't forget to import these hooks with:

```ts
import { pre, post } from '@typegoose/typegoose';
```

---

## @pre

`@pre<T>(name: string | string[] | regexp | regexp[], method: () => void, options?: mongoose.SchemaPreOptions)` is used to set Pre-Hooks
- `@pre` supports the use of an array of method names for comfort (this is not mongoose-native)

For parameter `options`, look at the [mongoose for `schema.pre`](https://mongoosejs.com/docs/api/schema.html#schema_Schema-pre) or [mongoose Middleware section Naming Conflicts](https://mongoosejs.com/docs/middleware.html#naming).

:::note
Arrow Functions cannot be used here, because the binding of `this` is required to get & modify the document.
:::

Example:

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

`@post<T>(name: string | string[] | regexp | regexp[], method: () => void, options?: mongoose.SchemaPostOptions)` is used to set Post-Hooks
- `@post` supports the use of an array of method names for comfort (this is not mongoose-native)

For parameter `options`, look at the [mongoose for `schema.post`](https://mongoosejs.com/docs/api/schema.html#schema_Schema-post) or [mongoose Middleware section Naming Conflicts](https://mongoosejs.com/docs/middleware.html#naming).

:::note
Arrow Functions cannot be used here, because the binding of `this` is required to get & modify the document.
:::

Example:

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
