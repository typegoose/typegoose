---
id: ref-type
title: 'Ref'
---

The Type `Ref<Class, IDType>` is the type used for [References](https://mongoosejs.com/docs/populate.html).  
The `Class` generic-parameter is used to set the class that is being referenced.  
The `IDType` generic-parameter is used to set the `_id` type of the referenced class (Default: `mongoose.Types.ObjectId`).  

There are [typeguards](api/functions/typeguards/isDocument.md) to check if a Reference is populated.

For an more written out guide, there is the [Reference Other Classes](../../guides/advanced/reference-other-classes.md) Guide.

## Example

```ts
class Kitten {
  @prop()
  public name: string;
}
```

```ts
class Cat {
  @prop()
  public name: string;

  // Use `ref` for arrays too
  @prop({ ref: 'Kitten' })
  public babies?: Ref<Kitten>[];
}
```

```ts
class Person {
  @prop()
  public name: string;

  // Use `ref` for single items
  @prop({ ref: 'Cat' })
  public pet?: Ref<Cat>;
}
```
