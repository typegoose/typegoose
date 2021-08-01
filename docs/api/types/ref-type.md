---
id: ref-type
title: 'Ref (Type)'
---

The Type `Ref<PopulatedType, RawId>` is the type used for [References](https://mongoosejs.com/docs/populate.html).

- `PopulatedType`: This is the Class being referenced.
- `RawId`: This should be the `_id` Type of the referenced Class, by default its `mongoose.Types.ObjectId`

There are typeguards to check if a reference if populated or an reference type:

- [`isDocument`](../functions/typeguards/isDocument.md)
- [`isRefType`](../functions/typeguards/isRefType.md)

:::tip
For more and better explained examples, look at the [Reference Other Classes](../../guides/advanced/reference-other-classes.md) Guide.
:::

## Example

Referenced Class in the examples:

```ts
class Kitten {
  @prop()
  public name?: string;
}
```

Single Reference:

```ts
class Person {
  @prop({ ref: () => Kitten })
  public pet?: Ref<Kitten>;
}
```

Reference Array:

```ts
class Cat {
  @prop({ ref: () => Kitten })
  public babies?: Ref<Kitten>[];
}
```

Reference with different `_id` type:

```ts
class Kitten {
  @prop()
  public _id?: string;

  @prop()
  public name?: string;
}

// For Single References
class Person {
  // The "type" options in this case refers to the "_id" type of the referenced class, by default it will be "ObjectId"
  @prop({ ref: () => Kitten, type: () => String })
  public pet?: Ref<Kitten, string>;
}

// For a Array of References
class Person {
  // The "type" options in this case refers to the "_id" type of the referenced class, by default it will be "ObjectId"
  @prop({ ref: () => Kitten, type: () => String })
  public pet?: Ref<Kitten, string>[];
}
```
