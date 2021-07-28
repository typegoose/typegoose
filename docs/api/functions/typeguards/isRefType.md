---
id: is-ref-type
title: 'Is Ref-Type'
---

## isRefType

`isRefType<T, S extends RefType>(doc: Ref<T, S> | undefined, reftype: AllowedRefTypes)`: Checks if the supplied value is not a document and is not undefined/null (mainly for `Ref<T>` fields).

- `doc`: the document / value to test
- `reftype`: the expected reference type, [AllowedRefTypes](#allowedreftypes)

Example:

```ts
class Cat {
  @prop({ ref: 'Cat' })
  public partner: Ref<Cat>;

  public hasPartner(): boolean {
    if (isRefType(this.partner, mongoose.Types.ObjectId)) {
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

`isRefTypeArray(docs: Ref<any, any>[] | undefined, reftype: AllowedRefTypes)` is the same as `isRefType`, only that it checks if it is an array **AND** all of the items are not `undefined`/`null` and not a document.

- `doc`: the document / value to test
- `reftype`: the expected reference type, [AllowedRefTypes](#allowedreftypes)

Example:

```ts
class Cat {
  @prop({ ref: 'Cat' })
  public kittens: Ref<Cat>;

  public areAllKittensExisting(): boolean {
    if (isRefTypeArray(this.kittens, mongoose.Types.ObjectId)) {
      // "this.kittens" now has the type of "Cat._id"'s RefType (This case ObjectId)
      return true;
    } else {
      return false;
    }
  }
}
```

-> this could be minified, but for demonstration purposes this will stay the long version

## AllowedRefTypes

The Allowed Reference Types for `isRefType` and `isRefTypeArray` are:

- `String`
- `Number`
- `Buffer`
- `mongoose.Types.Buffer`
- `mongoose.Types.ObjectId`
