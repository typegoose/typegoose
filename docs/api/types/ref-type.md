---
id: ref-type
title: 'Ref'
---

The Type `Ref<Class, IDType>` is the type used for [References](https://mongoosejs.com/docs/populate.html).  
The `Class` generic-parameter is used to set the class that is being referenced.  
The `IDType` generic-parameter is used to set the `_id` type of the referenced class (Default: `mongoose.Types.ObjectId`).  

There are [typeguards](../functions/typeguards/isDocument.md) to check if a Reference is populated.

For an more written out guide, there is the [Reference Other Classes](../../guides/advanced/reference-other-classes.md) Guide.

## Example

Referenced Class in the examples:

```ts
class Kitten {
  @prop()
  public name: string;
}
```

Reference Array:

```ts
class Cat {
  @prop()
  public name: string;

  @prop({ ref: 'Kitten' })
  public babies?: Ref<Kitten>[];
}
```

Single Reference:

```ts
class Person {
  @prop()
  public name: string;

  @prop({ ref: 'Cat' })
  public pet?: Ref<Cat>;
}
```

Reference with different `_id` type:

```ts
class Cat {
  @prop()
  public _id: string;
}

class Person {
  @prop()
  public name: string;

  // The "type" (_id type) needs to be manually set, otherwise mongoose will default to "ObjectId"
  // which is not compatible with other types (ObjectId !== String)
  @prop({ ref: () => Cat, type: () => String })
  public pet?: Ref<Cat, string>;
}
```
