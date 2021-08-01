---
id: array-types
title: 'Array Types & Fields'
---

## Array types & Fields

It is much easier to declare the array field's type as `type[]` instead of `Array<type>`.

But in some cases, Typescript could give you a warning, when you would like to use [any mongoose array methods](https://mongoosejs.com/docs/api/array.html) on the array field.
To avoid such behavior, you could always declare the array field via `mongoose.Types.Array<type>` or `mongoose.Schema.Types.Array<type>`

Example:

```ts
class ModelClass {
  // required field, with empty array by default.
  @prop({ required: true, default: [] })
  public field!: mongoose.Types.Array<string>;
}
```

## Why is the long type needed?

Mainly, because mongoose documents and their arrays fields have their pre-build methods, which slightly differ from `Array.method.prototype`. But at runtime, these methods already exist (because an array is always an mongoose array). So, using `type[]` is just more convenient way to write a shorter type instead of the `mongoose.Types` if the functions are not used.

For more information you could look at [GitHub issue #509](https://github.com/typegoose/typegoose/issues/509).
