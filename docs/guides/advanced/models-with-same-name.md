---
id: models-with-same-name
title: 'Models with same name'
---

This Guide shows all the possibilities for a model to use different names.

**Note**: if you want classes with the same name, you need to use one of these methods, so Typegoose can differentiate between them.

## SchemaOptions collection

For this to work, `{ options: { automaticName } }` must be true.

`{ schemaOptions: { collection } }` can be used to set a custom collection a model should use.

Example:

```ts
@modelOptions({ schemaOptions: { collection: 'Something' } })
class MultiModel {}

const model = getModelForClass(MultiModel);
```

Please note that using `{ schemaOptions: { collection } }` automatically adds a suffix of the collection to the model's name.

```ts
@modelOptions({ schemaOptions: { collection: 'Something' } })
class MultiModel {}

const model = getModelForClass(MultiModel);
expect(model.modelName).to.be.equal('MultiModel_Something');
```

## Typegoose Custom Options "customName"

`{ options: { customName } }` can be used to set a custom model name.

Example:

```ts
@modelOptions({ options: { customName: 'CustomName' } })
class CustomNameOption {}

const model = getModelForClass(CustomNameOption);
expect(model.modelName).to.be.equal('CustomName');
```

If `{ options: { customName } }` is used with `{ options: { automaticName: true } }`, then it will be used as a _suffix_ of the normal name.

Example:

```ts
@modelOptions({ options: { customName: 'CustomName', automaticName: true } })
class CustomNameOption {}

const model = getModelForClass(CustomNameOption);
expect(model.modelName).to.be.equal('CustomNameOption_CustomName');
```

---

For more details on the usage of these naming features, please look into [the tests that are written for them.](https://github.com/typegoose/typegoose/blob/r6/master/test/tests/customName.test.ts)
