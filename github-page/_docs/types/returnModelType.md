---
title: "Return Model Type"
redirect_from:
  - /docs/types/returnmodeltype
---

The Type `ReturnModelType<T>` is the type used to have type infomation for a model with Class functions

-> It is the logical 'AND' of `mongoose.Model<DocumentType<T>>` and `T`

Note: It has to be always with `typeof Class`, otherwise it will not work

## Example

```ts
class Kitten {
  @prop()
  public name?: string;

  public static findByName(this: ReturnModelType<typeof Kitten>, name: string) { // this is an Instance Method
    return this.find({ name }).exec(); // thanks to "ReturnModelType" "this" has type infomation
  }
}
```
