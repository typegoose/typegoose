---
id: migrate-8
title: 'Migrate to 8.0.0'
---

These are the changes made for 8.0.0 that are breaking or just important to know

:::warning Important, Read this first
This Guide is written for migration from version `7.6.3` to `8.0.0`, for versions `>8.0.0 <9.0.0`, please consult the [CHANGELOG](https://github.com/typegoose/typegoose/blob/master/CHANGELOG.md)
:::

## Requirements changed

- Nodejs `10` & `11` are now unsupported, lowest supported version is now `12.22`
- Typescript `4.3` is now suggested to be used
- Mongoose `5.13.3` or [higher is now required](#mongoose-version-above-513-is-now-supported)

## Deprecation removals

### Deprecated Options removed

The following options removed:

- `items` replaced with just `type`
- `of` replaced with just `type`
- `refType` replaced with just `type`

### Deprecated Decorators removed

The following decorator functions got removed, and replaced with an second parameter to `prop`:

- `mapProp`
- `arrayProp`

:::info
`@prop` can since 7.x be forced into an specific mode with an second parameter: `@prop({}, PropType.ARRAY)` [Look here for an example for `PropType`](../../api/decorators/prop.md#proptype)
:::

## Mongoose Version above 5.13 is now supported

Since mongoose version `5.10.19` (yes an patch version), mongoose has official typescript types, but often broke from `5.10.19` to `5.12.9`

:::danger
Because mongoose now provides its own official typescript types, this means that `@types/mongoose` is incompatible now (and plugins which still use it cannot be used)
:::

## Default Class "Base" is now an interface instead of an class

For 8.0.0 the default Class `Base` got converted into an interface instead of an class (to have typings even when extending another class)

## "ref" and "refPath" now use "mapArrayOptions"

For `ref` and `refPath` the options should now be mapped when using reference arrays
