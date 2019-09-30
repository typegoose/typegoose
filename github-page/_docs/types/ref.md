---
title: "Ref"
---

The Type `Ref<T>` is the type used for References

## Example

```ts
class Kitten {
  @arrayProp({ items: Kitten })
  public babies!: Ref<Kitten>[];
}
```
