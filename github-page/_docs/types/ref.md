---
title: 'Ref'
---

The Type `Ref<T>` is the type used for [References](https://mongoosejs.com/docs/populate.html).

There are [typeguards]({{ site.baseurl }}{% link _docs/functions/typeguards/isDocument.md %}) to check if an Reference is populated

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
  @arrayProp({ ref: 'Kitten' })
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
