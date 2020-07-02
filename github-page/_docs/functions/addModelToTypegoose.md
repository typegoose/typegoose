---
title: 'Add Model To Typegoose'
redirect_from:
  - /docs/functions/addmodeltotypegoose
---

`addModelToTypegoose(model: mongoose.model<any>, class)` is used to get a model with TypeScript type information & to allow
`getClassForDocument` to work. This function is mainly used after `buildSchema` to add a modified model to Typegoose and still be able to
get type information from the Typegoose class.

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
