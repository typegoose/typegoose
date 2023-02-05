---
id: get-discriminator-model-for-class
title: 'getDiscriminatorModelForClass'
---

### Overload 1

**Typings:**

```ts
function getDiscriminatorModelForClass<U extends AnyParamConstructor<any>, QueryHelpers = BeAnObject>(
  from: mongoose.Model<any, any>,
  cl: U,
  options?: IModelOptions
): ReturnModelType<U, QueryHelpers>;
```

**Parameters:**

| Name                                                        |       Type       | Description                                                                                     |
| :---------------------------------------------------------- | :--------------: | :---------------------------------------------------------------------------------------------- |
| `from` <span class="badge badge--secondary">Required</span> | `mongoose.Model` | The Model to register a discriminator on                                                        |
| `cl` <span class="badge badge--secondary">Required</span>   |       `U`        | The Class to build into a Model                                                                 |
| `options`                                                   | `IModelOptions`  | Overwrite some Model options, only property `schemaOptions` is merged with the existing options |

### Overload 2

**Typings:**

```ts
function getDiscriminatorModelForClass<U extends AnyParamConstructor<any>, QueryHelpers = BeAnObject>(
  from: mongoose.Model<any, any>,
  cl: U,
  value?: string
): ReturnModelType<U, QueryHelpers>;
```

**Parameters:**

| Name                                                        |       Type       | Description                                      |
| :---------------------------------------------------------- | :--------------: | :----------------------------------------------- |
| `from` <span class="badge badge--secondary">Required</span> | `mongoose.Model` | The Model to register a discriminator on         |
| `cl` <span class="badge badge--secondary">Required</span>   |       `U`        | The Class to build into a Model                  |
| `value`                                                     | `IModelOptions`  | Overwrite the discrimiantor value to register by |

### Overload 3

**Typings:**

```ts
function getDiscriminatorModelForClass<U extends AnyParamConstructor<any>, QueryHelpers = BeAnObject>(
  from: mongoose.Model<any, any>,
  cl: U,
  value?: string,
  options?: IModelOptions
): ReturnModelType<U, QueryHelpers>;
```

**Parameters:**

| Name                                                        |       Type       | Description                                                                                     |
| :---------------------------------------------------------- | :--------------: | :---------------------------------------------------------------------------------------------- |
| `from` <span class="badge badge--secondary">Required</span> | `mongoose.Model` | The Model to register a discriminator on                                                        |
| `cl` <span class="badge badge--secondary">Required</span>   |       `U`        | The Class to build into a Model                                                                 |
| `value`                                                     | `IModelOptions`  | Overwrite the discrimiantor value to register by                                                |
| `options`                                                   | `IModelOptions`  | Overwrite some Model options, only property `schemaOptions` is merged with the existing options |

### Description

`getDiscriminatorModelForClass` is used to compile a given Class (`cl`) into a Model and register it as a discriminator on a given Model (`from`).

Option `value` is to overwrite the key the class is registered on as a discriminator, by default it is the generated model name, but can be overwritten with any string, recommended is to use a [string-`enum`](https://www.typescriptlang.org/docs/handbook/enums.html#string-enums) to keep track of names.

:::note
Note that [`existingConnection`](../decorators/modelOptions.md#existingconnection) and [`existingMongoose`](../decorators/modelOptions.md#existingmongoose) will not be used and instead will be registered on the `from` model's settings.  
See [`Warning W002`](../../guides/error-warning-details.md#property-was-defined-differently-on-base-and-discriminator-w002).
:::

## Example

```ts
// The Base Class
class Event {
  @prop({ required: true })
  public name!: string;
}

// A Discriminator Class Variant
class ClickEvent extends Event {
  @prop({ required: true, default: 0 })
  public timesClicked!: number;
}

const EventModel = getModelForClass(Event);
const ClickEventModel = getDiscriminatorModelForClass(EventModel, ClickEvent);
```

## Notes

ModelOption [`disablePluginsOnDiscriminator`](../decorators/modelOptions.md#disablepluginsondiscriminator) many need to be set to not get duplicate plugins / plugin hooks.

This will not be neccessary for typegoose 9.13.0 and higher.

Example:

```ts
function pluginFn(schema) {
  schema.pre('save', function hookTestTimesNonGlobal() {});
}

@plugin(pluginFn)
@modelOptions({ options: { disablePluginsOnDiscriminator: true } })
class DisBase {
  @prop()
  public dummy?: string;
}

const DisBaseModel = getModelForClass(DisBase);

class Dis1 extends DisBase {
  @prop()
  public dummy2?: string;
}

const Dis1Model = getDiscriminatorModelForClass(DisBaseModel, Dis1);

// should only contain "hookTestTimesNonGlobal" once
// if "disablePluginsOnDiscriminator" is falsy, this will otherwise result in duplicates
console.log('Dis1Model save hooks', (Dis1Model.schema as any).s.hooks._pres.get('save'));
```
