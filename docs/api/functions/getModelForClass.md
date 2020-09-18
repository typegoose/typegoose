---
id: get-model-for-class
title: 'Get Model For Class'
---

`getModelForClass(class, overwriteOptions)` gets a model for a given class. If no Mongoose Model exists for this class yet, one will be created automatically.

[All options that can be specified with `overwriteOptions`.](api/decorators/modelOptions.md#Options)

## Example

```ts
class Kitten {
  @prop()
  public name?: string;
}

const KittenModel = getModelForClass(Kitten);
```
