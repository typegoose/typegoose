---
title: "Get Model For Class"
redirect_from:
  - /docs/functions/getmodelforclass
---

`getModelForClass(class, overwriteOptions)` gets a model for a given class. If no Mongoose model exists for this class yet, one will be created automatically  .

[overwriteOptions's Options]({{ site.baseurl }}{% link _docs/decorators/modelOptions.md%}#Options)

## Example

```ts
class Kitten {
  @prop()
  public name?: string;
}

const KittenModel = getModelForClass(Kitten);
```
