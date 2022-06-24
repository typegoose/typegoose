---
id: is-ref-type
title: 'isRefType & isRefTypeArray'
---

## isRefType

**Typings:**

```ts
function isRefType<T, S extends RefType>(doc: Ref<T, S> | undefined, refType: AllowedRefTypes): doc is NonNullable<S>
```

**Parameters:**

| Name                                                           |                 Type                  | Description                             |
| :------------------------------------------------------------- | :-----------------------------------: | :-------------------------------------- |
| `doc` <span class="badge badge--secondary">Required</span>     |              `Ref<T, S>`              | The Document to check                   |
| `refType` <span class="badge badge--secondary">Required</span> | [`AllowedRefTypes`](#allowedreftypes) | The Expected Reference Type to test for |

`isRefType` checks if the given Input (`doc`) is of the given Type (`refType`).  
Option `refType` is required because the known Reference Type only exists at compile time, not at runtime so it needs to be explicitly defined (to have accurate checks).

## Example {#isreftype-example}

```ts
class Cat {
  @prop({ ref: 'Cat' })
  public partner: Ref<Cat>;

  // this example could be smaller, but for demonstation purposes this is a longer version
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

### Overload 1 {#isreftypearray-overload1}

**Typings:**

```ts
function isRefTypeArray<T, S extends RefType>(
  docs: mongoose.Types.Array<Ref<T, S>> | undefined,
  refType: AllowedRefTypes
): docs is mongoose.Types.Array<NonNullable<S>>;
```

**Parameters:**

| Name                                                           |                 Type                  | Description                             |
| :------------------------------------------------------------- | :-----------------------------------: | :-------------------------------------- |
| `docs` <span class="badge badge--secondary">Required</span>    |   `mongoose.Types.Array<Ref<T, S>>`   | The Array of Documents to check         |
| `refType` <span class="badge badge--secondary">Required</span> | [`AllowedRefTypes`](#allowedreftypes) | The Expected Reference Type to test for |

### Overload 2 {#isreftypearray-overload2}

**Typings:**

```ts
function isRefTypeArray<T, S extends RefType>(docs: Ref<T, S>[] | undefined, refType: AllowedRefTypes): docs is NonNullable<S>[];
```

**Parameters:**

| Name                                                           |                 Type                  | Description                             |
| :------------------------------------------------------------- | :-----------------------------------: | :-------------------------------------- |
| `docs` <span class="badge badge--secondary">Required</span>    |             `Ref<T, S>[]`             | The Array of Documents to check         |
| `refType` <span class="badge badge--secondary">Required</span> | [`AllowedRefTypes`](#allowedreftypes) | The Expected Reference Type to test for |

### Description {#isreftypearray-description}

`isRefTypeArray` checks if **all** the items in the given Array (`docs`) are matching the given Reference type (`refType`).  
This function calls [`isRefType`](#isreftype) for each item in the array.  
Only returns `true` if **all** items in the array return `true`.

### Example {#isreftypearray-example}

```ts
class Cat {
  @prop({ ref: 'Cat' })
  public kittens: Ref<Cat>;

  // this example could be smaller, but for demonstation purposes this is a longer version
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

## `AllowedRefTypes`

The Allowed Reference Types for `isRefType` and `isRefTypeArray` are:

- `String`
- `Number`
- `Buffer`
- `mongoose.Types.Buffer`
- `mongoose.Types.ObjectId`
