---
title: "Return Model Type"
redirect_from:
  - /docs/types/returnmodeltype
---

The Type `ReturnModelType<T, QueryHelpers>` is the type used to have type information for a class converted to an mongoose Model
- `T` is the logical `AND` of `mongoose.Model<DocumentType<T>>` and `T`
- `QueryHelpers` is for an Query-Helpers interface, [more here]({{ site.baseurl }}{% link _docs/decorators/queryMethod.md%})

Notes:
- It has to be always with `typeof Class`, otherwise it will not work
- This type should always be used over (the now internal) `ModelType`

## Example

```ts
class Kitten {
  @prop()
  public name?: string;

  public static findByName(this: ReturnModelType<typeof Kitten>, name: string) { // this is an Instance Method
    return this.find({ name }).exec(); // thanks to "ReturnModelType" "this" has type information
  }
}
```

## Difference to ModelType

`ModelType` is the logical `AND` of `mongoose.Model<DocumentType<T>>` and `T` whereas `ReturnModelType` is an extension to `ModelType`: `ModelType<InstanceType<U>> & U`
<!--I (hasezoey) don't know how the types worked there, and because ModelType was lacking some types i tried some things and came to this, but dont know what exactly it does-->
