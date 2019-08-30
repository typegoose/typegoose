---
title: "Return Model Type"
redirect_from:
  - /docs/types/returnmodeltype
---

The Type `ReturnModelType<T>` is the type used to have type infomation for a model with Class functions

## Example

```ts
class Kitten {
  @prop()
  public name?: string;

  public static findByName(this: ReturnModelType<Kitten>, name: string) { // this is an Instance Method
    return this.find({ name }).exec(); // thanks to "ReturnModelType" "this" has type infomation
  }
}
```
