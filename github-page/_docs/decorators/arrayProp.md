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

### itemsRef

Accepts Type: `Class | String` (String of the modelName)

Same as [`@prop`'s `ref`]({{ site.baseurl }}{% link _docs/decorators/prop.md %}#ref)

```ts
class Car extends Typegoose {}

// in another class
class Something {
  @arrayProp({ itemsRef: Car })
  public previousCars?: Ref<Car>[];
}
```

### itemsRefPath

Accepts Type: `string`

Same as [`@prop`'s `refpath`]({{ site.baseurl }}{% link _docs/decorators/prop.md %}#refPath)

```ts
class Car extends Typegoose {}
class Shop extends Typegoose {}

// in another class
class Another extends Typegoose {
  @prop({ required: true, enum: 'Car' | 'Shop' })
  public which!: string;

  @arrayProp({ itemsRefPath: 'which' })
  public items?: Ref<Car | Shop>[];
}
```

### innerOptions

`innerOptions` is used to overwrite here the options in this object go
-> Use this only when absolutly needed and please open a new issue about it - or for plugins

Example:

```ts
class Something {
  @arrayProp({ required: true })
  public propy: string;
}

// This would be mapped to
{
  type: [{ type: String }],
  required: true
}

// when using the overwrite
class Something {
  @arrayProp({ innerOptions: { required: true } })
  public propy: string;
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
  public propy: string;
}

// This would be mapped to
{
  type: [{ type: String, maxlength: 1 }]
}

// when using the overwrite
class Something {
  @arrayProp({ outerOptions: { maxlength: 1 } })
  public propy: string;
}

// This would be mapped to
{
  type: [{ type: String }],
  maxlength: 1
}
```

## Options from @prop that do **NOT** work on @arrayProp

- `ref` does not work, instead use `itemsRef` (please let us know if you are interested in combining them into one)
- `refPath` does not work, instead use `itemsRefPath` (please let us know if you are interested in combining them into one)

<!--Logical Seperator-->

## Options that currently **NOT** work

- All String-Validate & Transfrom options [look here why](https://github.com/Automattic/mongoose/issues/8012)
- All Number-Validate options [look here why](https://github.com/Automattic/mongoose/issues/8012)
