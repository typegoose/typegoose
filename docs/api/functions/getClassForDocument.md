---
id: get-class-for-document
title: 'Get Class for Document'
---

`getClassForDocument(doc: DocumentType<any>)` gets the Class used in the model creation.

Note: this only works if the class / model was created with Typegoose OR added with [`addModelToTypegoose`](api/functions/addModelToTypegoose.md).

## Example

```ts
class Kitten {
  @prop()
  public name?: string;
}

const model = getModelForClass(Kitten);

const doc = new model();

getClassForDocument(doc) === Kitten; // should be "true"
```
