---
title: 'Model with same name'
description: >
  Models with the same name OR Models with different collection
---

This Guide shows all the possibilitys for a model to use different names

Note: if you want classes with the same name, you need to do one of these, so that typegoose can differentiate them

## SchemaOptions collection

For this to work, `{ options: { automaticName } }` must be true

`{ schemaOptions: { collection } }` can be used to set a custom collection a model should use

Example:

```ts
@modelOptions({ schemaOptions: { collection: 'Something' } })
class MultiModel { }

const model = getModelForClass(MultiModel);
```

Please note that using `{ schemaOptions: { collection } }` automatically adds a suffix of the collection to the model's name

```ts
@modelOptions({ schemaOptions: { collection: 'Something' } })
class MultiModel { }

const model = getModelForClass(MultiModel);
expect(model.modelName).to.be.equal('MultiModel_Something');
```

## Typegoose Custom Options "customName"

`{ options: { customName } }` can be used to set a custom model name

Example:

```ts
@modelOptions({ options: { customName: 'CustomName' } })
class CustomNameOption { }

const model = getModelForClass(CustomNameOption);
expect(model.modelName).to.be.equal('CustomName');
```

if `{ options: { customName } }` is used with `{ options: { automaticName: true } }`, then it will be used as a *suffix* of the normal name

Example:

```ts
@modelOptions({ options: { customName: 'CustomName', automaticName: true } })
class CustomNameOption { }

const model = getModelForClass(CustomNameOption);
expect(model.modelName).to.be.equal('CustomNameOption_CustomName');
```

---

For more a more detailed use, please look into the code at [the tests that are written for it](https://github.com/typegoose/typegoose/blob/r6/master/test/tests/customName.test.ts)
