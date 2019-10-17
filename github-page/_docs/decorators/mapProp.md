---
title: "Map Prop"
redirect_from:
  - /docs/decorators/mapprop
---

`@mapProp(options: object)` is a decorator which makes it possible to create map schema properties, here are just the differences listed

## Options

*All options from [`@prop`]({{ site.baseurl }}{% link _docs/decorators/prop.md%}#options) are valid*

### of

Accepts Type: `any`

This will tell Typegoose that the Map value consists of primitives (If `String`, `Number`, or other primitive type is given) or this is an array which consists of subdocuments (if it's extending the `Typegoose` class).

```ts
class Car extends Typegoose {
  @mapProp({ of: Car })
  public keys?: Map<string, Car>;
}
```

## Options from @prop that do **NOT** work on @mapProp

*Currently All are working*
