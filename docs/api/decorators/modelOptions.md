---
id: model-options
title: '@modelOptions'
---

**Typings:**

```ts
function modelOptions(options: IModelOptions): ClassDecorator
```

**Parameters:**

| Name                                                      |           Type           | Description                                                   |
| :-------------------------------------------------------- | :----------------------: | :------------------------------------------------------------ |
| `options` <span class="badge badge--secondary">Required</span> |           [`IModelOptions`](#imodeloptions)            | The Options to add to the Class                              |

`@modelOptions` is used to set options on a Class.

## IModelOptions

### schemaOptions

Please check the [Mongoose docs](https://mongoosejs.com/docs/guide.html#options) for more info about these options.

Example:

```ts
@modelOptions({ schemaOptions: { collection: 'NotSomething' } })
class Something {}
```

### existingConnection

An existing Mongoose connection can also be passed down. If given, Typegoose uses this Mongoose instance's `model` methods.  

### existingMongoose

An existing Mongoose instance can also be passed down. If given, Typegoose uses this Mongoose instance's `model` methods.  

### options

Typegoose's custom options

#### customName

`customName` can be used to set custom model names.

See also [Typegoose's Name Generation](../../guides/advanced/name-generation.md)

Example:

```ts
@modelOptions({ options: { customName: 'Something' } })
class MultiModel {}

const model = getModelForClass(MultiModel);
expect(model.modelName).to.be.equal('Something');
```

You can generate more dynamic names, if `customName` is given a function. The parameter object of the `modelOptions` decorator is injected into the function for possible further use.  

Example:

```ts
@modelOptions({
  schemaOptions: { collection: 'SomethingDifferent' },
  options: {
    automaticName: false,
    customName: (options) => `${options.schemaOptions?.collection}_someSuffix`
  }
})
class MultiModel {}

const model = getModelForClass(MultiModel);
expect(model.modelName).to.be.equal('SomethingDifferent_someSuffix');
```

:::note
If a function is used, `automaticName` will be ignored. Also, if the function doesn't return a string, an error will be thrown.
:::

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
-> `customName` will be prioritized over `collection`  
-> if `automaticName` is true, `customName` will be a *suffix* of the base class name
-> if `automaticName` is false, it will behave as if unset

See also [Typegoose's Name Generation](../../guides/advanced/name-generation.md)

Example:

```ts
// yes this is the same example as the one above
@modelOptions({ options: { customName: 'Something', automaticName: true } })
class MultiModel {}

const model = getModelForClass(MultiModel);
expect(model.modelName).to.be.equal('MultiModel_Something');
```

:::note
On request, this was made "opt-in" instead of "opt-out".
:::

#### allowMixed

Set this to a Severity you want.

- `ALLOW`: allow the use and execution of `mongoose.Schema.Types.Mixed`, if the inferred type cannot be set otherwise
- `WARN`: [default] Warn for it in the logger, but still allow the use of it
- `ERROR`: Error out when it comes to it

#### runSyncIndexes

<span class="badge badge--warning">Deprecated</span>

Run `model.syncIndexes` when model is finished compiling?
:::caution
Only run this while in development. It could cause race-conditions because `getModelForClass` is not async.
:::

#### disablePluginsOnDiscriminator

<span class="badge badge--warning">Deprecated</span><span class="badge badge--warning">No Effect</span>

Default: `false`

This Option has been deprecated (and has no use) since typegoose 9.13.0

Disables adding plugins to a discriminator model.  
This may be necessary to be set to `true` to not have duplicate plugins or plugin hooks, see [Mongoose#12472](https://github.com/Automattic/mongoose/issues/12472).  
Only has a effect when [`$isDiscriminator`](#isdiscriminator) is `true`.

#### $isDiscriminator

<span class="badge badge--warning">Deprecated</span><span class="badge badge--warning">No Effect</span><span class="badge badge--warning">Internal</span>

This Option has been deprecated (and has no use) since typegoose 9.13.0

Internal function, is only set to `true` for [`buildSchema`](../functions/buildSchema.md) calls through [`getDiscriminatorModelForClass`](../functions/getDiscriminatorModelForClass.md).  

This should not be set manually

#### enableMergePlugins

Default: `false`

Enable Overwriting of the plugins on the "to-be" discriminator schema with the base schema's.

:::caution
This does not actually "merge plugins", it will overwrite the "to-be" discriminator's plugins with the base schema's!
:::

:::note
If [`enableMergePlugins`](#enablemergeplugins) and [`enableMergeHooks`](#enablemergehooks) are both `false`, then the global plugins will be automatically applied by typegoose, see [Mongoose Issue #12696](https://github.com/Automattic/mongoose/issues/12696).
:::

#### enableMergeHooks

Default: `false`

Enable Merging of Hooks.

Example of what can be deduplicated:

```ts
// this is a global function and can be de-duplicated, because they are the same reference
function hookTestTimesGlobal() {}

function pluginTestTimes(schema) {
  pluginCount += 1;
  // the following function cannot be de-duplicated, because they are a new reference each time the plugin gets called
  schema.pre('save', function hookTestTimesNonGlobal() {});
  schema.pre('save', hookTestTimesGlobal);
}

@plugin(pluginTestTimes)
@modelOptions({
  options: {
    enableMergeHooks: true, // needs to be set, because by default typegoose does not need de-duplication
  },
})
class MergeHooks {
  @prop()
  public dummy?: string;
}
```

:::caution
Only hooks that can be matched against each-other can be de-duplicated.
:::

:::note
If [`enableMergePlugins`](#enablemergeplugins) and [`enableMergeHooks`](#enablemergehooks) are both `false`, then the global plugins will be automatically applied by typegoose, see [Mongoose Issue #12696](https://github.com/Automattic/mongoose/issues/12696).
:::
