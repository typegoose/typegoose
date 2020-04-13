---
title: "Delete Models"
---

## deleteModel

`deleteModel(name: string)`: Delete models from the typegoose cache & call `mongoose.connection.deleteModel`.

```ts
class SomeUser {}

const SomeUserModel = getModelForClass(SomeUser);
deleteModel("SomeUser");
```

## deleteModelWithClass

`deleteModelWithClass(cl: NewableFunction)`: Find the name of the model and call [`deleteModel`](#deletemodel)

```ts
class SomeUser {}

const SomeUserModel = getModelForClass(SomeUser);
deleteModelWithClass(SomeUser);
```
