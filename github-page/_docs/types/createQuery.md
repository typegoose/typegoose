---
title: "Create Query"
redirect_from:
  - /docs/types/create
  - /docs/types/createquery
---

The Type `CreateQuery<T>` is the type used for defining the necessary key-value pairs for creation of a document.

It can be used in `Model.create(doc)` or `new Model(doc)`, where `doc` satisfies type `CreateQuery<ModelClass>`.

Note for 8.0.0 or later: there is no support for the type parameters `ExtraOmittedParameters` or `ExtraPartialParameters` in the `CreateQuery<T>`. 

For this reason, it is discouraged starting from 8.0.0 to create variables of type `CreateQuery<T>`. Instead, we recommend inlining the documents you create in the call to `Model.create(doc)` or `new Model(doc)` so you can use the type paramters on the methods themselves.

## Example

```ts
class Kitten {
  @prop()
  public name?: string;
  @prop()
  public age: number;
}

const kittenCreateQuery: CreateQuery<Kitten> = {
  name: 'Bologna',
  age: 12
};

const KittenModel = getModelForClass(Kitten);

const kitten = new KittenModel(kittenCreateQuery);
```
