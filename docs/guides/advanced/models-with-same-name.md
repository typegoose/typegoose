---
id: models-with-same-name
title: 'Models with same name'
---

This Guide shows all the possibilities for a model to use different names.

:::note
If Classes with the same name are wanted, these methods need to be used so that Typegooes can differentiate between them
:::

:::info
Since `7.6.0` the name can also be changed in `getModelForClass` or `buildSchema` calls.
:::

## SchemaOptions collection

For this to work, `{ options: { automaticName } }` must be true.

`{ schemaOptions: { collection } }` can be used to set a custom collection a model should use.
Using `{ schemaOptions: { collection } }` with `automaticName` automatically adds a suffix of the collection to the model's name.

Example without `automaticName`:

```ts
@modelOptions({ schemaOptions: { collection: 'Something' } })
class MultiModel {}

const model = getModelForClass(MultiModel);
expect(model.modelName).to.be.equal('MultiModel');
```

Example with `automaticName`:

```ts
@modelOptions({ schemaOptions: { collection: 'Something' }, options: { automaticName: true } })
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

If `{ options: { customName } }` is used with `{ options: { automaticName: true } }`, then it will be used as a *suffix* of the normal name.

Example:

```ts
@modelOptions({ options: { customName: 'CustomName', automaticName: true } })
class CustomNameOption {}

const model = getModelForClass(CustomNameOption);
expect(model.modelName).to.be.equal('CustomNameOption_CustomName');
```

## Notes

For more details on the usage of these naming features, please look into [the tests that are written for them.](https://github.com/typegoose/typegoose/blob/r6/master/test/tests/customName.test.ts)

See also [Typegoose's Name Generation](./name-generation.md) for a complete (and hopefully simple) way to understand name generation.
