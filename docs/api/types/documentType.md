---
id: document-type
title: 'DocumentType<T>'
---

## Type `DocumentType`

*previously known as `InstanceType<T>`*

The Type `DocumentType<T>` is the type used for Documents.

-> It is the logical 'AND' of the `mongoose.Document` and `T`

:::note
When `typeof Class` is used, it might not work.
:::

:::caution
If the current project's tsconfig also includes `compilerOptions.lib` with `dom`, then the types from Typegoose and Typescript will conflict.  
Solution is to remove `dom` from the `lib` array.
:::

Example:

```ts
class Kitten {
  @prop()
  public name?: string;

  // this is an Instance Method
  public getName(this: DocumentType<Kitten>) {
    return this.name; // thanks to "DocumentType" "this" has type information
  }
}
```

## Helper Type `SubDocumentType`

Typings: `SubDocumentType<T, QueryHelpers = BeAnObject>`

- `T` is the Class
- `QueryHelpers` is for [QueryHelpers](../decorators/queryMethod.md)

The Type to use for subdocuments, when extra functions like `.parent` or document functions are necessary.  
This type is a logical AND of `DocumentType` and `mongoose.Types.SubDocument`

Example:

```ts
class Place {
  @prop()
  public name?: string;
}

class Cat {
  @prop({ type: () => Place })
  public favoritePlace!: SubDocumentType<Place>;
}

const CatModel = getModelForClass(Cat);

const catdoc = new CatModel({ favoritePlace: { name: "countertop" }})

catdoc.favoritePlace.parent() === catdoc;
```

## Helper Type `ArraySubDocumentType`

Typings: `ArraySubDocumentType<T, QueryHelpers = BeAnObject>`

- `T` is the Class
- `QueryHelpers` is for [QueryHelpers](../decorators/queryMethod.md)

The Type to use for subdocuments in arrays, when extra functions like `.parent` / `.parentArray` or document functions are necessary.  
This type is a logical AND of `DocumentType` and `mongoose.Types.ArraySubdocument`

Example:

```ts
class Place {
  @prop()
  public name?: string;
}

class Cat {
  @prop({ type: () => Place })
  public favoritePlaces!: ArraySubDocumentType<Place>[];
}

const CatModel = getModelForClass(Cat);

const catdoc = new CatModel({ favoritePlaces: [{ name: "countertop" }, { name: "printer" }]})

catdoc.favoritePlaces[0].parent() === catdoc;
catdoc.favoritePlaces[0].parentArray() === catdoc.favoritePlaces;
```
