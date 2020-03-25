---
title: "Array Prop"
redirect_from:
  - /docs/decorators/arrayprop
---

`@arrayProp(options: object)` is almost the same as `@prop`, here are just the differences listed

Please note that arrayProp (by mongoose default) initializes the array with `[]` instead of an `null` / `undefined`

## Options

*All options from [`@prop`]({{ site.baseurl }}{% link _docs/decorators/prop.md%}#options) are valid, except the ones [listed on the bottom](#options-from-prop-that-do-not-work-on-arrayprop)*

### items

Accepts Type: `any`

This will tell Typegoose that this is an array which consists of primitives (if `String`, `Number`, or other primitive type is given) or this is an array which consists of subdocuments (if it's extending the `Typegoose` class).

```ts
class Something {
  @arrayProp({ items: String })
  public languages?: string[];
}
```

### innerOptions

`innerOptions` is used to overwrite here the options in this object go
-> Use this only when absolutly needed and please open a new issue about it - or for plugins

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
-> Use this only when absolutly needed and please open a new issue about it - or for plugins

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
  @arrayProp({ dim: 3 })
  public propy: string[][][];
}

// This would be mapped to
{
  type: [[[{ type: String }]]]
}
```
