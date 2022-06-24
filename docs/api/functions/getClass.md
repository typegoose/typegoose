---
id: get-class
title: 'getClass'
---

**Typings:**

```ts
function getClass(
  input:
    | (mongoose.Document & IObjectWithTypegooseFunction)
    | (mongoose.Schema.Types.Subdocument & IObjectWithTypegooseFunction)
    | string
    | IObjectWithTypegooseName
    | any
): NewableFunction | undefined
```

**Parameters:**

| Name                                                         | Type  | Description                |
| :----------------------------------------------------------- | :---: | :------------------------- |
| `input` <span class="badge badge--secondary">Required</span> | `any` | A Input to get a name from |

`getClass` is used to get a Class from a variety of inputs, which include:

- `mongoose.Document & IObjectWithTypegooseFunction`: get a Class from a document which has a `.typegooseName` function
- `mongoose.Schema.Types.Subdocument & IObjectWithTypegooseFunction`: get a Class from a subdocument which has a `.typegooseName` function
- `string`: get a Class from a name directly (directly passed to [`getName`](./getName.md))
- `IObjectWithTypegooseName`: get a Class from any object that has a `.typegooseName` property
- `any`: try to get a Class from any of the above, without having proper types

:::note
`Embedded` & `Document` only work if the class / schema / model was created with Typegoose (through [`buildSchema`](./buildSchema.md)).
:::

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
// by string
getClass('Kitten') == Kitten; // should be "true"
```
