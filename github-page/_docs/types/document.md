---
title: "Document Type"
---

The Type `DocumentType<T>` (formally known as `InstanceType<T>`) is the type used for Documents

## Example

```ts
class Kitten {
  @prop()
  public name?: string;

  public getName(this: DocumentType<Kitten>) { // this is an Instance Method
    return this.name; // thanks to "DocumentType" "this" has type infomation
  }
}
```
