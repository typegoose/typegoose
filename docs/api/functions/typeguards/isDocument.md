---
id: is-document
title: 'isDocument & isDocumentArray'
---

## isDocument

**Typings:**

```ts
function isDocument<T, S extends RefType>(doc: Ref<T, S> | null | undefined): doc is DocumentType<T>
```

**Parameters:**

| Name                                                       |    Type     | Description                      |
| :--------------------------------------------------------- | :---------: | :------------------------------- |
| `doc` <span class="badge badge--secondary">Required</span> | `Ref<T, S>` | The Document / Property to check |

`isDocument` checks if the Input (`doc`) is a instance of `mongoose.Model` which makes it a Document.

### Example {#isdocument-example}

```ts
class Cat {
  @prop({ ref: 'Cat' })
  public partner: Ref<Cat>;

  // this example could be smaller, but for demonstation purposes this is a longer version
  public hasPartner(): boolean {
    if (isDocument(this.partner)) {
      // "this.partner" now has the type of "DocumentType<Cat>"
      return true;
    } else {
      return false;
    }
  }
}
```

:::tip
Alternatively, since mongoose 6.4.0, [`$assertPopulated`](https://mongoosejs.com/docs/api/document.html#document_Document-$assertPopulated) can also be used, but that function does not act as a type-guard only at runtime to actually check if a full path is populated.
:::

## isDocumentArray

### Overload 1 {#isdocumentarray-overload1}

**Typings:**

```ts
function isDocumentArray<T, S extends RefType>(
  docs: mongoose.Types.Array<Ref<T, S>> | undefined
): docs is mongoose.Types.Array<DocumentType<NonNullable<T>>>;
```

**Parameters:**

| Name                                                        |               Type                | Description                         |
| :---------------------------------------------------------- | :-------------------------------: | :---------------------------------- |
| `docs` <span class="badge badge--secondary">Required</span> | `mongoose.Types.Array<Ref<T, S>>` | The Array to check all documents in |

### Overload 2 {#isdocumentarray-overload2}

**Typings:**

```ts
function isDocumentArray<T, S extends RefType>(docs: Ref<T, S>[] | undefined): docs is DocumentType<NonNullable<T>>[];
```

**Parameters:**

| Name                                                        |     Type      | Description                         |
| :---------------------------------------------------------- | :-----------: | :---------------------------------- |
| `docs` <span class="badge badge--secondary">Required</span> | `Ref<T, S>[]` | The Array to check all documents in |

### Description {#isdocumentarray-description}

`isDocumentArray` checks if **all** the items in the given Array (`docs`) are a instance of `mongoose.Model`.  
This function calls [`isDocument`](#isdocument) for each item in the array.  
Only returns `true` if **all** items in the array return `true`.

### Example {#isdocumentarray-example}

```ts
class Cat {
  @prop({ ref: 'Cat' })
  public kittens: Ref<Cat>;

  // this example could be smaller, but for demonstation purposes this is a longer version
  public areAllKittensExisting(): boolean {
    if (isDocumentArray(this.kittens)) {
      // "this.kittens" now has the type of "DocumentType<Cat>[]"
      return true;
    } else {
      return false;
    }
  }
}
```
