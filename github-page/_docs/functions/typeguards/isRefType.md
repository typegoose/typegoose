---
title: "Is RefType"
redirect_from:
  - /docs/functions/typeguards/isdocument
---

## isRefType

`isRefType(doc: any)`: Check if the supplied value is not a document and is not undefined/null (mainly for `Ref<T>` fields).

Example:

```ts
class Cat {
  @prop({ ref: "Cat" })
  public partner: Ref<Cat>;

  public hasPartner(): boolean {
    if (isRefType(this.partner)) {
      // "this.partner" now has the type of "Cat._id"'s RefType (This case ObjectId)
      return true;
    } else {
      return false;
    }
  }
}
```

-> this could be minified, but for demonstration purposes this will stay the long version

## isRefTypeArray

`isRefTypeArray(doc: any[])` is the same as `isRefType`, only that it checks if it is an array **AND** all of the items are a not undefined/null and not an document

Example:

```ts
class Cat {
  @prop({ ref: "Cat" })
  public kittens: Ref<Cat>;

  public areAllKittensExisting(): boolean {
    if (isDocumentArray(this.kittens)) {
      // "this.kittens" now has the type of "Cat._id"'s RefType (This case ObjectId)
      return true;
    } else {
      return false;
    }
  }
}
```

-> this could be minified, but for demonstration purposes this will stay the long version
