---
title: "Array Prop"
redirect_from:
  - /docs/decorators/arrayprop
---

`@arrayProp(options: object)` is almost the same as `@prop`, here are just the differences listed

Please note that arrayProp (by mongoose default) initializes the array with `[]` instead of an `null`

## Options

### items

Accepts Type: `any`

Specify what the array consists of (the type cannot be infered)

### itemsRef

Accepts Type: `Ref<any>[]`

Same as [`@prop`'s `ref`]({{ site.baseurl }}{% link _docs/decorators/prop.md %}#ref)

### itemsRefPath

Accepts Type: `string`

Same as [`@prop`'s `refpath`]({{ site.baseurl }}{% link _docs/decorators/prop.md %}#refPath)

## Options from @prop that do **NOT** work on @arrayProp

- `ref` does not work, instead use `itemsRef` (please let us know if you are interested in combining them into one)
- `refPath` does not work, instead use `itemsRefPath` (please let us know if you are interested in combining them into one)

<!--Logical Seperator-->

## Options that currently **NOT** work

- All String-Validate & Transfrom options [look here why](https://github.com/Automattic/mongoose/issues/8012)
- All Number-Validate options [look here why](https://github.com/Automattic/mongoose/issues/8012)
