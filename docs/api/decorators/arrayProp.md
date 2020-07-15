---
id: array-prop
title: 'Array Prop'
---

`@arrayProp(options: object)` is almost the same as `@prop`, here are just the differences listed.

Please note that Mongoose initializes arrayProp arrays with `[]` instead of `null` / `undefined`.

**Note**: Deprecated since 7.1.1, replaced with [`@prop`](api/decorators/prop.md)  
**Note**: This decorator will get removed in 8.0

## Options

*All options from [`@prop`](api/decorators/prop.md#options) are valid.*

### items

Accepts Type: `any`  
(alias for [`type`](api/decorators/prop.md#type) from `@prop`)

Deprecated since `7.2.0`, use [`@prop`'s `type`](api/decorators/prop.md#type)

(see [`type`](api/decorators/prop.md#type) for Examples)

### innerOptions

`innerOptions` is used to overwrite options to be at the "Type" level  
-> Use this only when absolutely necessary and please open a new
issue about it

[see `innerOptions` in prop](api/decorators/prop.md#innerOptions)

### outerOptions

`outerOptions` is used to overwrite options to be at the "Array" level  
-> Use this only when absolutely necessary and please open a new
issue about it

[see `outerOptions` in prop](api/decorators/prop.md#outerOptions)

### dim

`dim` is used to set the Dimensions this array should have (for something like an matrix)  
-> needs to be higher than 0

[see `dim` in prop](api/decorators/prop.md#dim)
