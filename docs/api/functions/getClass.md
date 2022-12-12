---
id: get-class
title: 'getClass'
---

**Typings:**

```ts
function getClass(
  input:
    | mongoose.Document
    | { typegooseName: () => string }
    | { typegooseName: string }
    | string
    | any
): NewableFunction | undefined
```

**Parameters:**

| Name                                                         | Type  | Description                |
| :----------------------------------------------------------- | :---: | :------------------------- |
| `input` <span class="badge badge--secondary">Required</span> | `any` | A Input to get a name from |

`getClass` is used to get a Class from a variety of inputs, which include:

- `mongoose.Document`; Get the name to look-up from `doc.constructor.modelName`, only applies if no `typegooseName` function or property is present
- `{ typegooseName: () => string }`: Get the name to look-up from the `typegooseName` function (currently automatically added by typegoose)
- `{ typegooseName: string }`: Get the name to look-up from the `typegooseName` getter / property.
- `string`: Directly specify the name to look-up.
- `any`: Try to get a Class from any of the above, without having proper types.

:::caution
This look-up only works if the class has been correctly registered with [`addModelToTypegoose`](./addModelToTypegoose.md) (automatically done when calling [`getModelForClass`](./getModelForClass.md) or [`getDiscriminatorModelForClass`](./getDiscriminatorModelForClass.md), but **not** for [`buildSchema`](./buildSchema.md)).
:::
:::tip
Any class that got compiled with [`buildSchema`](./buildSchema.md) (transparently used by [`getModelForClass`](./getModelForClass.md) or [`getDiscriminatorModelForClass`](./getDiscriminatorModelForClass.md)) a `typegooseName` function gets automatically added.
This even makes it possible to get the class from sub-documents / sub-classes.
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
