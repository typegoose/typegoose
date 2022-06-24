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
