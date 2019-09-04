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

`customName` can be used to set custom suffixes to a model

Example:

```ts
@modelOptions({ options: { customName: 'Something' } })
class MultiModel { }

const model = getModelForClass(MultiModel);
expect(model.modelName).to.be.equal('MultiModel_Something');
```
