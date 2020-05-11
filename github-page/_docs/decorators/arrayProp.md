---
title: "Array Prop"
redirect_from:
  - /docs/decorators/arrayprop
---

`@arrayProp(options: object)` is almost the same as `@prop`, here are just the differences listed

Please note that mongoose initializes arrayProp arrays with `[]` instead of `null` / `undefined`.

## Options

*All options from [`@prop`]({{ site.baseurl }}{% link _docs/decorators/prop.md%}#options) are valid, except the ones [listed at the bottom](#options-from-prop-that-do-not-work-on-arrayprop)*.

### items

Accepts Type: `any`

Tell Typegoose that this is an array which consists of primitives (if `String`, `Number`, or another primitive type is given) or of subdocuments, if a class is given.

```ts
// Array of Primitives
class Something {
  @arrayProp({ items: String })
  public languages?: string[];
}

// Array of subdocuments
class Link {
  @prop()
  url: string;

  @prop()
  text: string;
}

class Something {
  @arrayProp({ items: Link })
  public links?: Link[];
}
```

### innerOptions

`innerOptions` is used to overwrite here the options in this object go
-> Use this only when absolutely needed and please open a new issue about it - or for plugins

Example:

```ts
class Something {
  @arrayProp({ required: true })
  public propy: string[];
}

// This would be mapped to
{
  type: [{ type: String }],
  required: true
}

// when using the overwrite
class Something {
  @arrayProp({ innerOptions: { required: true } })
  public propy: string[];
}

// This would be mapped to
{
  type: [{ type: String, required: true }]
}
```

### outerOptions

`outerOptions` is used to overwrite here the options in this object go
-> Use this only when absolutely needed and please open a new issue about it - or for plugins

Example:

```ts
class Something {
  @arrayProp({ maxlength: 1 })
  public propy: string[];
}

// This would be mapped to
{
  type: [{ type: String, maxlength: 1 }]
}

// when using the overwrite
class Something {
  @arrayProp({ outerOptions: { maxlength: 1 } })
  public propy: string[];
}

// This would be mapped to
{
  type: [{ type: String }],
  maxlength: 1
}
```

### dim

`dim` is used to set the Dimensions this array should have (for something like an matrix)
-> needs to be higher than 0

Example:

```ts
class Something {
  @arrayProp({ dim: 3, items: String })
  public propy: string[][][];
}

// This would be mapped to
{
  type: [[[{ type: String }]]]
}
```
