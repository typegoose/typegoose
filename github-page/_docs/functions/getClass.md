---
title: "Get Class"
redirect_from:
  - /docs/functions/getclass
---

`getClass(input: any)` gets the class from a variety of things  
Overloads:
- `getClass(input: mongoose.Document)`: get the class like in [`getClassForDocument`]({{ site.baseurl }}{% link _docs/functions/getClassForDocument.md%})
- `getClass(input: mongoose.Schema.Types.Embedded`: get the class for a nested document
- `getClass(input: string)`: get the class by the name directly
- `getClass(input: { typegooseName: string })`: get the class by using some object with the key `typegooseName` of type `string`

Note: `Embedded` & `Document` only work if the class / schema / model was created with typegoose

## Example

```ts
// Nested-GetClass & Document-GetClass
class Food {
  @prop()
  public name: string;
}

class Kitten {
  @prop()
  public currentFood: Food;
}

const KittenModel = getModelForClass(Kitten);

const input = new KittenModel();

// Nested
getClass(input.currentFood) === Food; // should be "true"
// Document
getClass(input) === Kitten; // should be "true"
```

```ts
// String-GetClass
class Kitten {
  @prop()
  public name: string;
}

buildSchema(Kitten);

getClass("Kitten") === Kitten; // should be "true"
```
