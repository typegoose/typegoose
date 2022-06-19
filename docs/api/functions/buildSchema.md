---
id: build-schema
title: 'buildSchema'
---

`buildSchema(cl, options, overwriteOptions)` gets the schema from a class to modify the schema before making the model.

- `cl` is the Class to be compiled
- `options` is to overwrite the schema options (merged with existing)
- `overwriteOptions` is used to overwrite name generation options

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
