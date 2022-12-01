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

#### disableLowerIndexes

Default: `false`

Disable inheriting lower indexes (still include self), similar to native mongoose `schema.clone().clearIndexes()`.

Example:

```ts
@index({ dummy1: 1 })
class IndexInherit5 {
  @prop()
  public dummy1?: string;
}

@index({ dummy2: 1 })
@modelOptions({ options: { disableLowerIndexes: true } }) // does not inherit index "{ dummy1: 1 }", but will still include "{ dummy2: 1 }"
class IndexInherit6 extends IndexInherit5 {
  @prop()
  public dummy2?: string;
}

@index({ dummy3: 1 })
class IndexInherit7 extends IndexInherit6 {
  @prop()
  public dummy3?: string;
}

const sch = buildSchema(IndexInherit7);

const indexes = sch.indexes();
assert(indexes.length === 2);
```

#### discriminators

Accepts Type: `() => [DiscriminatorObject | Class]`

Define Nested Discriminators on the base Class directly instead of having to re-define the `discriminators` option everywhere it is used.

:::caution
A Error is thrown when both this option and the prop-option [`discriminators`](./prop.md#discriminators) are defined.  
See [Duplicate Option Definition [E032]](../../guides/error-warning-details.md#duplicate-option-definition-e032).
:::

Example:

```ts
@modelOptions({
  schemaOptions: {
    discriminatorKey: 'type'
  },
  options: {
    discriminators: () => [Garage, SummerHouse] // here instead of as a "prop-option"
  }
})
class Building {
  @prop({ default: 100 })
  public width: number;

  @prop({ required: true })
  public type: string;
}

class Garage extends Building {
  @prop({ default: 10 })
  public slotsForCars: number;
}

class SummerHouse extends Building {
  @prop({ default: 100 })
  public distanceToLake: number;
}

class Area {
  @prop({ type: Building }) // instead of having to define it here
  public buildings: Building[];
}

const AreaModel = getModelForClass(Area);

// then somewhere in an async function
const area = await AreaModel.create({});
area.buildings.push({ type: getName(SummerHouse), distanceToLake: 100 } as SummerHouse);
area.buildings.push({ type: getName(Garage), slotsForCars: 20 } as Garage);
await area.save();
```

See [Nested Discriminators](../../guides/advanced/nested-discriminators.mdx) for a guide on how to use nested Discriminators.
