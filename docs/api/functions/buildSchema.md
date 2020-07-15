---
id: build-schema
title: "Build Schema"
---

`buildSchema(class)` gets the schema from a class to modify the schema before making the model.

A compiled model can be re-added with [`addModelToTypegoose`](api/functions/addModelToTypegoose.md).

## Example

```ts
class Kitten {
  @prop()
  public name?: string;
}

const kittenSchema = buildSchema(Kitten);

```
