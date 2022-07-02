---
id: add-model-to-typegoose
title: 'addModelToTypegoose'
---

**Typings:**

```ts
function addModelToTypegoose<U extends AnyParamConstructor<any>, QueryHelpers = BeAnObject>(
  model: mongoose.Model<any>,
  cl: U,
  options?: { existingMongoose?: mongoose.Mongoose; existingConnection?: any }
)
```

**Parameters:**

| Name                                                      |       Type       | Description                                                                               |
| :-------------------------------------------------------- | :--------------: | :---------------------------------------------------------------------------------------- |
| `model`                                                   | `mongoose.Model` | The Model to add to the Class mapping                                                     |
| `cl` <span class="badge badge--secondary">Required</span> |       `U`        | The Class to add to the mapping                                                           |
| `options`                                                 | `IModelOptions`  | Overwrite which `existingMongoose` and `existingConnection` the Class-Model mapping is on |

`addModelToTypegoose` is used to add a the Class (`cl`) and Model (`model`) to the typegoose cache.  
This function also returns the input Model (`model`) with the typegoose typings.

This cache is used for functions like [`getClass`](./getClass.md] to find a class by the name mapping.  
This function gets automatically called by functions like [`getModelForClass`](./getModelForClass.md) and [`getDiscriminatorModelForClass`](./getDiscriminatorModelForClass.md).

:::tip
For a full example with `buildSchema` and `addModelToTypegoose` see [Manual Schema Modification](../../guides/advanced/manual-schema-modification.md).
:::

## Example

```ts
class Kitten {
  @prop()
  public name?: string;
}

const kittenSchema = buildSchema(Kitten);
const KittenModel = addModelToTypegoose(mongoose.model('Kitten', kittenSchema), Kitten);
// "KittenModel" is now a valid Typegoose model
```
