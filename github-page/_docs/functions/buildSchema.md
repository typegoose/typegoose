---
title: "Build Schema"
redirect_from:
  - /docs/functions/buildschema
---

`buildSchema(class)` gets the schema from a class to modify the schema before making the model.

A compiled model can be re-added with [`addModelToTypegoose`]({{ site.baseurl }}{% link _docs/functions/addModelToTypegoose.md %}).

## Example

```ts
class Kitten {
  @prop()
  public name?: string;
}

const kittenSchema = buildSchema(Kitten);

```
