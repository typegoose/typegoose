---
id: is-document
title: 'isDocument & isDocumentArray'
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

:::tip
Alternatively, since mongoose 6.4.0, [`$assertPopulated`](https://mongoosejs.com/docs/api/document.html#document_Document-undefined) can also be used.  
Note: the documentation link is currently broken and may change, see [mongoose #11957](https://github.com/Automattic/mongoose/issues/11957).
:::

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
