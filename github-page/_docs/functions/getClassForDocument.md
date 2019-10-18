---
title: "Get Model For Class"
redirect_from:
  - /docs/functions/getmodelforclass
---

`getClassForDocument(doc: DocumentType<any>)` is used to get the Class used in the model creation

Note: only works if the class / model were created with typegoose OR added with [`addModelToTypegoose`]({{ site.baseurl }}{% link _docs/functions/addModelToTypegoose.md%})

## Example

```ts
class Kitten {
  @prop()
  public name?: string;
}

const model = getModelForClass(Kitten);

const doc = new model();

getClassForDocument(doc) === Kitten // should be "true"
```
