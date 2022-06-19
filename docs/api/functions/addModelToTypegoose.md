---
id: add-model-to-typegoose
title: 'addModelToTypegoose'
---

`addModelToTypegoose(model: mongoose.model<any>, class)` is used to get a model with TypeScript type information and to allow `getClassForDocument` to work.
This function is mainly used after `buildSchema` to add a modified model to Typegoose and still be able to get type information from the Typegoose class.

:::tip
For a full example with `buildSchema` and `addModelToTypegoose` see [Manual Schema Modification](../../guides/advanced/manual-schema-modification.md).
:::

## Example

```ts
class Kitten {
  @prop()
  public name?: string;
}

const kittenSchema = buildSchema(Kitten);
const KittenModel = addModelToTypegoose(mongoose.model('Kitten', kittenSchema), Kitten);
// "KittenModel" is now a valid Typegoose model
```
