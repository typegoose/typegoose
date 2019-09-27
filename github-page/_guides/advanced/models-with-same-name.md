---
title: 'Model with same name'
description: >
  Models with the same name OR Models with different collection
---

This Guide shows all the possibilitys for a model to use different names

## SchemaOptions collection

`{ schemaOptions: { collection } }` can be used to set a custom collection a model should use

Example:

```ts
@modelOptions({ schemaOptions: { collection: 'Something' } })
class MultiModel { }

const model = getModelForClass(MultiModel);
```

Please note that using `{ schemaOptions: { collection } }` automaticly adds a suffix of the collection to the model's name

```ts
@modelOptions({ schemaOptions: { collection: 'Something' } })
class MultiModel { }

const model = getModelForClass(MultiModel);
expect(model.modelName).to.be.equal('MultiModel_Something');
```

## Typegoose Custom Options "customName"

`{ options: { customName } }` can be used to apply a suffix to a model's name

Example:

```ts
@modelOptions({ options: { customName: 'CustomName' } })
class CustomNameOption { }

const model = getModelForClass(CustomNameOption);
expect(model.modelName).to.be.equal('CustomNameOption_CustomName');
```

## Typegoose Custom Options "automaticName" & "customName"

`{ options: { automaticName: false } }` can be used to disable the automatic name generation, option `customName` is required, otherwise it will use automatic names
-> it will **NOT** throw an error if `customName` is missing, it will only softly warn you

Example:

```ts
@modelOptions({ options: { automaticName: false, customName: 'CustomName' } })
class CustomNameOption { }

const model = getModelForClass(CustomNameOption);
expect(model.modelName).to.be.equal('CustomName');
```

---

For more a more detailed use, please look into the code at [the tests that are written for it](https://github.com/hasezoey/typegoose/blob/master/test/tests/options.test.ts)
