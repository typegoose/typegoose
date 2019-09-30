---
title: "Add Model To Typegoose"
redirect_from:
  - /docs/functions/addmodeltotypegoose
---

`addModelToTypegoose(model: mongoose.model<any>, class)` is used to get a model with typescript type infomation & to have `getClassForDocument` working
this functions is mainly used after `buildSchema` to add a modified model to typegoose and still get type infomation from the typegoose class

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
