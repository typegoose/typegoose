---
id: ref-type
title: 'Ref<PopulatedType, RawId>'
---

**Typings:**

```ts
type Ref<
  PopulatedType,
  RawId extends mongoose.RefType = PopulatedType extends { _id?: mongoose.RefType }
    ? NonNullable<PopulatedType['_id']>
    : mongoose.Types.ObjectId
>
```

**Parameters:**

| Name                                                                 |        Type        | Description                                                         |
| :------------------------------------------------------------------- | :----------------: | :------------------------------------------------------------------ |
| `PopulatedType` <span class="badge badge--secondary">Required</span> |      `object`      | The Type of the what is expected when it is populated               |
| `RawId`                                                              | `mongoose.RefType` | Overwrite the Reference type (the type of `_id` of `PopulatedType`) |

The Type `Ref<PopulatedType, RawId>` is the type used for [References](https://mongoosejs.com/docs/populate.html).

- `PopulatedType`: This is the Class being referenced.
- `RawId`: This should be the `_id` Type of the referenced Class, by default its `mongoose.Types.ObjectId` and should get automatically inferred if a `_id` property is present on the target class.

There are typeguards to check if a reference is populated or of the reference type:

- [`isDocument`](../functions/typeguards/isDocument.md)
- [`isRefType`](../functions/typeguards/isRefType.md)

:::tip
For more and better explained examples, look at the [Reference Other Classes](../../guides/advanced/reference-other-classes.md) Guide.
:::

## Example

Class to-be-referenced:

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
