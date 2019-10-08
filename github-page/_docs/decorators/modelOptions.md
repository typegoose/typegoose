---
title: "Model Options"
redirect_from:
  - /docs/decorators/modeloptions
---

`@modelOptions(options: object)` is used for setting options like schema options, an existing connect and an existing mongoose
  - `schemaOptions`: [Please look here for more](https://mongoosejs.com/docs/guide.html#options)
  - `existingConnection`: *Please add more infomation*
  - `existingMongoose`: *Please add more infomation*
  - `options`: Typegoose's custom options

## options

### customName

`customName` can be used to set custom model names

Example:

```ts
@modelOptions({ options: { customName: 'Something' } })
class MultiModel { }

const model = getModelForClass(MultiModel);
expect(model.modelName).to.be.equal('Something');
```

if `customName` is used with `automaticName`, it will be a suffix of the class name

Example:

```ts
@modelOptions({ options: { customName: 'Something', automaticName: true } })
class MultiModel { }

const model = getModelForClass(MultiModel);
expect(model.modelName).to.be.equal('MultiModel_Something');
```

### automaticName

`automaticName` can be used to automaticly generate custom model names based on `{ schemaOptions: { collection } }` or `{ options: { customName } }`
-> `customName` will be prioritzed over `collection`
-> only if `automaticName` is true, `customName` will be a *suffix* of the base class name

Example:

```ts
// yes this is the same example as the one above
@modelOptions({ options: { customName: 'Something', automaticName: true } })
class MultiModel { }

const model = getModelForClass(MultiModel);
expect(model.modelName).to.be.equal('MultiModel_Something');
```

Note: on request this was made "opt-in" instead of "opt-out"
