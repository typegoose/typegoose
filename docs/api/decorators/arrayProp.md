---
id: array-prop
title: 'Array Prop'
---

`@arrayProp(options: object)` is almost the same as `@prop`. Here are the differences.

Please note that Mongoose initializes arrayProp arrays with `[]` instead of `null` / `undefined`.

:::info
Deprecated since 7.1.1, replaced with [`@prop`](./prop.md)  
:::
:::caution
This decorator will get removed in 8.0
:::

## Options

*All options from [`@prop`](./prop.md#options) are valid.*

### items

Accepts Type: `any`  
(alias for [`type`](./prop.md#type) from `@prop`)

:::info
Deprecated since `7.2.0`, use [`@prop`'s `type`](./prop.md#type)
:::

(see [`type`](./prop.md#type) for Examples)

### innerOptions

`innerOptions` is used to overwrite options to be at the "Type" level  
-> Use this only when absolutely necessary and please open a new
issue about it

[see `innerOptions` in prop](./prop.md#innerOptions)

### outerOptions

`outerOptions` is used to overwrite options to be at the "Array" level  
-> Use this only when absolutely necessary and please open a new
issue about it

[see `outerOptions` in prop](./prop.md#outerOptions)

### dim

`dim` is used to set the Dimensions this array should have (for something like a matrix)  
-> needs to be higher than 0

[see `dim` in prop](./prop.md#dim)
