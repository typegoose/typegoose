---
id: build-schema
title: 'buildSchema'
---

**Typings:**

```ts
function buildSchema<U extends AnyParamConstructor<any>>(cl: U, options?: mongoose.SchemaOptions, overwriteOptions?: IModelOptions): mongoose.Schema<DocumentType<InstanceType<U>>>
```

**Parameters:**

| Name                                                      |      Type       | Description                                                                              |
| :-------------------------------------------------------- | :-------------: | :--------------------------------------------------------------------------------------- |
| `cl` <span class="badge badge--secondary">Required</span> |       `U`       | The Class to build a Schema from                                                         |
| `options`                                                 | `IModelOptions` | Overwrite Options, like for naming or general SchemaOptions the class gets compiled with |

`buildSchema` compiles the input class `cl` to a mongoose schema with all options applied.

A compiled model can be re-added with [`addModelToTypegoose`](./addModelToTypegoose.md).

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
```
