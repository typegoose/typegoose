---
title: "Document Type"
redirect_from:
  - /docs/types/document
  - /docs/types/documenttype
---

*also known as `InstanceType<T>`*  

The Type `DocumentType<T>` is the type used for Documents

-> It is the logical 'AND' of the `mongoose.Document` and `T`

Note: when `typeof Class` is used, it might not work

## Example

```ts
class Kitten {
  @prop()
  public name?: string;

  public getName(this: DocumentType<Kitten>) { // this is an Instance Method
    return this.name; // thanks to "DocumentType" "this" has type information
  }
}
```
