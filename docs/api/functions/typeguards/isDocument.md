---
id: is-document
title: 'Is Document'
---

## isDocument

`isDocument(doc: any)`: Checks if the supplied value is a valid Model(/Document) (mainly for `Ref<T>` fields).

Example:

```ts
class Cat {
  @prop({ ref: 'Cat' })
  public partner: Ref<Cat>;

  public hasPartner(): boolean {
    if (isDocument(this.partner)) {
      // "this.partner" now has the type of "Cat"
      return true;
    } else {
      return false;
    }
  }
}
```

-> this could be minified, but for demonstration purposes this will stay the long version

## isDocumentArray

`isDocumentArray(doc: any[])` is the same as `isDocument`, only that it checks if it is an array **AND** all of the items are Documents.

Example:

```ts
class Cat {
  @prop({ ref: 'Cat' })
  public kittens: Ref<Cat>;

  public areAllKittensExisting(): boolean {
    if (isDocumentArray(this.kittens)) {
      // "this.kittens" now has the type of "Cat"
      return true;
    } else {
      return false;
    }
  }
}
```

-> this could be minified, but for demonstration purposes this will stay the long version
