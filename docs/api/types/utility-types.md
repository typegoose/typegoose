---
id: utility-types
title: 'Utility Types'
---

This document documents various smaller utility types

## `FilterOutFunctionKeys<T>`

**Typings:**

```ts
type FilterOutFunctionKeys<T extends object> = Omit<T, GetFunctionKeys<T>>
```

**Parameters:**

| Name                                                     |                      Type                      | Description                                |
| :------------------------------------------------------- | :--------------------------------------------: | :----------------------------------------- |
| `T` <span class="badge badge--secondary">Required</span> |           `object`           | The type to filter functions out of |

The type `FilterOutFunctionKeys<T>` can be used where function types need to be filtered-out, for example for `AnyBulkWriteOperation`.

Example:

```ts
class Kitten {
  @prop()
  public name?: string;

  public getName() {
    return this.name;
  }
}

type Normal = Pick<Kitten, typeof Kitten>;
// type:
// {
//  name: string | undefined,
//  getName: () => string
// }

type Filtered = FilterOutFunctionKeys<Kitten>;
// type:
// {
//   name: string | undefined
// }
```

This type *may* be used in the future for `DocumentType`.
