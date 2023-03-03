---
id: syntax-notes
title: 'Syntax Notes'
---

This Page will show different possibilities of how things can be written in typegoose, with their use-case and what differs between them

## `type` & `ref` with function or without

The options [`type`](../api/decorators/prop.md#type) and [`ref`](../api/decorators/prop.md#ref) can be written either `type: Type` or `type: () => Type`, both are valid options, but the second should always be preferred when not using Primitives, because the "deferred function" way works-around the issues of [Circular References](./advanced/reference-other-classes.md#circular-dependencies) (in some cases) and use-before-definition cases.

```ts
class Cat {
  @prop({ type: String })
  public name: string;

  // is the same as
  @prop({ type: () => String })
  public name: string;
}

class Cat {
  @prop({ type: Food }) // ERROR: Use before definition
  public food: Food;

  @prop({ type: () => Food }) // no error, thanks to the deferred function
  public food: Food;
}

class Food {
  @prop({ type: String })
  public vitamins: string;
}
```

## `type` with array or without

The options [`type`](../api/decorators/prop.md#type) for arrays can be written either with `type: Type` or `type: [Type]`, both are valid options and are just cosmetic, but using more than 1 dimensions is *not* cosmetic. Can be combined with [`type` & `ref` with function or without](#type--ref-with-function-or-without).

:::note
When used for `ref`, typegoose will [throw a error](./error-warning-details.md#the-option-does-not-support-a-option-value-e027) because only `ref: Type` is allowed (no array)
:::
:::note
Using dimensions while not setting the property to be a array, will **not** set the type to a array, use [the second parameter to `@prop`](../api/decorators/prop.md) for that (or automatically done as long as [`emitDecoratorMetadata`](./use-without-emitDecoratorMetadata.md) is in use and the type is set correctly)
:::

```ts
class Cat {
  @prop({ type: String }) // one dimensional array
  public nickNames: string[]; // array type automatically inferred because of "emitDecoratorMetadata" reflection
  // the above and below are equal
  @prop({ type: [String] }) // one dimensional array
  public nickNames: string[]; // array type automatically inferred because of "emitDecoratorMetadata" reflection

  // to use more dimensions
  @prop({ type: [[String]] }) // two-dimensional array
  public nickNames: string[][]; // array type automatically inferred because of "emitDecoratorMetadata" reflection

  @prop({ type: String }, PropType.ARRAY) // one dimensional array, explicitly set to be a array
  public explicitArray: string[];
}
```

## Multiple array types

There are multiple types a array property can have, all having their use-cases, but most of the time a simple `type[]` or `[type]` is enough.

```ts
class Cat {
  @prop({ type: String })
  public normalArray: string[]; // normal array, will still be a mongoose array at runtime, but not in types

  @prop({ type: String })
  public mongooseArray: mongoose.Types.Array<string>; // mongoose array, with mongoose functions provided (the "normalArray" would still be this type at runtime)

  // the "ArraySubDocumentType" type is provided by typegoose
  @prop({ type: () => Kitten })
  public subDocArray: ArraySubDocumentType<Kitten>; // mongoose subdocument array, with mongoose subdocument functions provided
}

class Kitten {
  @prop()
  public name: string;
}
```

## SubDocument types

There are special types for subdocuments, but can be omitted when not needing those extra functions.

```ts
class Cat {
  @prop({ type: () => Kitten })
  public normalSubDoc: Kitten; // normal subdocument, no extra functions in the types

  // the "SubDocumentType" type is provided by typegoose
  @prop({ type: () => Kitten })
  public typedSubDoc: SubDocumentType<Kitten>; // mongoose subdocument type, with mongoose subdocument functions

  // the "ArraySubDocumentType" type is provided by typegoose
  @prop({ type: () => Kitten })
  public subDocArray: ArraySubDocumentType<Kitten>; // mongoose subdocument array, with mongoose subdocument functions provided
}

class Kitten {
  @prop()
  public name: string;
}
```
