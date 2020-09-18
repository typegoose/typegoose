---
id: model-options
title: 'Model Options'
---

`@modelOptions(options: object)` is used for setting options like schema options, an existing connect and/or an existing Mongoose.

## Options

### schemaOptions

[Please look here for more info](https://mongoosejs.com/docs/guide.html#options)

Example:

```ts
@modelOptions({ schemaOptions: { collection: 'NotSomething' } })
class Something {}
```

### existingConnection

An existing Mongoose connection can also be passed down. If given, Typegoose uses this Mongoose instance's `model` methods.  
[UNTESTED]

### existingMongoose

An existing Mongoose instance can also be passed down. If given, Typegoose uses this Mongoose instance's `model` methods.  
[UNTESTED]

### options

Typegoose's custom options

#### customName

`customName` can be used to set custom model names.

Example:

```ts
@modelOptions({ options: { customName: 'Something' } })
class MultiModel {}

const model = getModelForClass(MultiModel);
expect(model.modelName).to.be.equal('Something');
```

If `customName` is used with `automaticName`, it will be a suffix of the class name.

Example:

```ts
@modelOptions({ options: { customName: 'Something', automaticName: true } })
class MultiModel {}

const model = getModelForClass(MultiModel);
expect(model.modelName).to.be.equal('MultiModel_Something');
```

#### automaticName

`automaticName` can be used to automatically generate custom model names based on `{ schemaOptions: { collection } }` or `{ options: { customName } }`  
-> `customName` will be prioritzed over `collection`  
-> if `automaticName` is true, `customName` will be a *suffix* of the base class name

Example:

```ts
// yes this is the same example as the one above
@modelOptions({ options: { customName: 'Something', automaticName: true } })
class MultiModel {}

const model = getModelForClass(MultiModel);
expect(model.modelName).to.be.equal('MultiModel_Something');
```

Note: on request, this was made "opt-in" instead of "opt-out".

#### allowMixed

Set this to a Severity you want.

- `ALLOW`: allow the use and execution of "mongoose.Schema.Types.Mixed", if the inferred type cannot be set otherwise
- `WARN`: [default] Warn for it in the logger, but still allow the use of it
- `ERROR`: Error out when it comes to it

#### runSyncIndexes

Run "model.syncIndexes" when model is finished compiling?  
-> only run this while development, could cause race-conditions, because `getModelForClass` is not async
