---
title: "Get Model With String"
redirect_from:
  - /docs/functions/getmodelwithstring
---

`getModelWithString(key)` retrieves a model with the given key.
If no Mongoose model exists in typegoose's internal cache, it will return `undefined`.

## Example

```ts
class Kitten {
  @prop()
  public name?: string;
}

const KittenModel = getModelForClass(Kitten);

const KittenModelNew = getModelWithString(KittenModel.modelName);
// OR with the internal utils.getName(class)
const KittenModelNew = getModelWithString(utils.getName(Kitten));
// BUT when you have the class at your disposal, you should use "getModelForClass" - it will return the already compiled model
```
