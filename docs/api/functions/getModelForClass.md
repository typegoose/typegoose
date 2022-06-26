---
id: get-model-for-class
title: 'getModelForClass'
---

**Typings:**

```ts
function getModelForClass<U extends AnyParamConstructor<any>, QueryHelpers = BeAnObject>(cl: U, options?: IModelOptions)
```

**Parameters:**

| Name                                                      |      Type       | Description                                                                                     |
| :-------------------------------------------------------- | :-------------: | :---------------------------------------------------------------------------------------------- |
| `cl` <span class="badge badge--secondary">Required</span> |       `U`       | The Class to build a Model from                                                                 |
| `options`                                                 | `IModelOptions` | Overwrite some Model options, only property `schemaOptions` is merged with the existing options |

`getModelForClass` compiled a given Class (`cl`) into a `mongoose.Model`, this function will return the existing model if a model of the same name has already been created and cached with [`addModelToTypegoose`](./addModelToTypegoose.md).

[All options for `options`,](../decorators/modelOptions.md#imodeloptions)

## Example

```ts
class Kitten {
  @prop()
  public name?: string;
}

const KittenModel = getModelForClass(Kitten);
```
