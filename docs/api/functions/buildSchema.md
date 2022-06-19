---
id: build-schema
title: 'buildSchema'
---

`buildSchema(class)` gets the schema from a class to modify the schema before making the model.

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
