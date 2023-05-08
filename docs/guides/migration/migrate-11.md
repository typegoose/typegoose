---
id: migrate-11
title: 'Migrate to 11.0.0'
---

These are the changes made for 11.0.0 that are breaking or just important to know

:::caution Important, Read this first
This Guide is written for migration from version `10.3.3` to `11.0.0`, for versions `>10.0.0 <11.0.0`, please consult the [CHANGELOG](https://github.com/typegoose/typegoose/blob/master/CHANGELOG.md)
:::

## Requirements changed

- Mongoose `7.1.0` or higher is now required

## Default class `FindOrCreate` has been removed

The default class `FindOrCreate` (and by extension the type `FindOrCreateResult`) have been removed, because originally the plugin `mongoose-findorcreate` was incompatible with mongoose 7 (removal of callbacks).

Since the release of typegoose 11, `mongoose-findorcreate` got updated to `4.0.0` with support for mongoose 7, but typegoose will not be re-adding the default class.

See [`typegoose-examples` `examples/plugin-findorcreate`](https://github.com/typegoose/typegoose-examples/tree/master/examples/plugin-findorcreate) for how to use it with typegoose 11 (or higher).

## Notes

### Mongoose 7 removed LeanDocument type

Mongoose 7 removed the `LeanDocument` type, meaning any usage of that type (for example in type tests) has to be converted.

Also note that the type returned is not fully correct, because it returns the type as `Class`(instance) instead of a POJO type, the reason being that typegoose passes in the full class as the interface and mongoose not doing any special operations on the type.
