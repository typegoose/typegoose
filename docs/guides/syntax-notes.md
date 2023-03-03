---
id: syntax-notes
title: 'Syntax Notes'
---

This Page shows different possibilities of how code can be written in Typegoose, along with their use-cases and what differs between them.

## `type` & `ref` with function or without

The options [`type`](../api/decorators/prop.md#type) and [`ref`](../api/decorators/prop.md#ref) can be written either as `type: Type` or as `type: () => Type`. Both syntax variations are valid options, but the second should always be preferred when not using primitives, because this "deferred function" syntax can  workaround the issues of [Circular References](./advanced/reference-other-classes.md#circular-dependencies) (in some cases) and also correct situations, where you might run into `use-before-define` errors.

```ts
class Cat {
  @prop({ type: String })
  public name: string;

  // is the same as
  @prop({ type: () => String })
  public name: string;
}

class Cat {
  @prop({ type: Food }) // ERROR: Used before definition
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

When defining the [`type` in the `prop options`](../api/decorators/prop.md) for an array, the type can be written either as `type: Type` or as `type: [Type]`. Both are valid options and the differences are only cosmetic. However, if you're using more than 1 dimensions, it is *no longer* cosmetic and the type has to indicate the [number of dimensions](../api/decorators/prop#dim). This rule is valid for both [`type` & `ref` with function or without](#type--ref-with-function-or-without).

:::note
If dimension syntax is used in the `ref` option, Typegoose will [throw an error](./error-warning-details.md#the-option-does-not-support-a-option-value-e027) because only `ref: Type` is allowed (no array).
:::
:::note
Using dimensions, while not setting the property to be an array, will **not** set the type to an array. Use [the `@prop` decorator's second parameter](../api/decorators/prop.md) for that. Or alternatively, when [`emitDecoratorMetadata`](./use-without-emitDecoratorMetadata.md) is in use and the type is set correctly, then the array type will be set automatically too.)
:::

```ts
class Cat {
  @prop({ type: String }) // one dimensional array
  public nickNames: string[]; // array type automatically inferred because of "emitDecoratorMetadata" reflection
  // the above and below examples are the same
  @prop({ type: [String] }) // one dimensional array
  public nickNames: string[]; // array type automatically inferred because of "emitDecoratorMetadata" reflection

  // to use more dimensions
  @prop({ type: [[String]] }) // two-dimensional array
  public nickNames: string[][]; // array type automatically inferred because of "emitDecoratorMetadata" reflection

  @prop({ type: String }, PropType.ARRAY) // one dimensional array, explicitly set to be an array
  public explicitArray: string[];
}
```

## Multiple array types

There are multiple types an array property can have, all having their use-cases, but most of the time, a simple `type[]` or `[type]` is enough.

```ts
class Cat {
  @prop({ type: String })
  public normalArray: string[]; // normal array, will still be a Mongoose array at runtime, but not in types

  @prop({ type: String })
  public mongooseArray: mongoose.Types.Array<string>; // Mongoose array, with Mongoose functions provided (the "normalArray" would still be this type at runtime)

  // the "ArraySubDocumentType" type is provided by Typegoose
  @prop({ type: () => Kitten })
  public subDocArray: ArraySubDocumentType<Kitten>; // Mongoose subdocument array, with Mongoose subdocument functions provided
}

class Kitten {
  @prop()
  public name: string;
}
```

## SubDocument types

There are special types to provide the specific Mongoose functions for subdocuments, but they can be omitted when those extra functions aren't needed.

```ts
class Cat {
  @prop({ type: () => Kitten })
  public normalSubDoc: Kitten; // normal subdocument, no extra Mongoose functions in the types

  // the "SubDocumentType" type is provided by Typegoose
  @prop({ type: () => Kitten })
  public typedSubDoc: SubDocumentType<Kitten>; // Mongoose subdocument type, with Mongoose subdocument functions

  // the "ArraySubDocumentType" type is provided by Typegoose
  @prop({ type: () => Kitten })
  public subDocArray: ArraySubDocumentType<Kitten>; // Mongoose subdocument array, with Mongoose subdocument functions provided
}

class Kitten {
  @prop()
  public name: string;
}
```
