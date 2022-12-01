---
id: migrate-10
title: 'Migrate to 10.0.0'
---

These are the changes made for 9.0.0 that are breaking or just important to know

:::caution Important, Read this first
This Guide is written for migration from version `9.13.1` to `10.0.0`, for versions `>10.0.0 <11.0.0`, please consult the [CHANGELOG](https://github.com/typegoose/typegoose/blob/master/CHANGELOG.md)
:::

## Requirements changed

- Mongoose `6.7.3` or higher is now required
- Typescript `4.9` or higher is now required to be used
- NodeJS 14 is now the lowest supported nodejs version

## TSConfig Target is now `es2020`

The `tsconfig` target has been changed to `es2020`, which also makes the ouput incompatible with anything before NodeJS 14.  
This was changed because it outputs less polyfills and makes debugging easier (also bundle size is *slightly* lower)

## `data@schemas` got refactored to be metadata

The `schemas` map from `src/internal/data` got refactored to be a map on the classes themself, called `SchemaCache`, see [`src/internal/constants.ts@DecoratorKeys::CachedSchema`](https://github.com/typegoose/typegoose/blob/74bfa7f357f135987389b33b2678f89117b80e9a/src/internal/constants.ts#L56).

This means there is now 1 less interference with classes of the same name, currently there still exists:
- `data@models`: Stores the model with the key being the model name
- `data@constructors`: Stored the classes with the key being the model name

## Hooks got refactored

Hook types got refactored to be more closely matching mongoose's definition, with slight QOL updates.  
Hook internals also got refactored to use less code from what mongoose already supports.

## `Ref` now transparently uses `DocumentType`

Type `Ref` got updated to transparently use `DocumentType`, which made the type checks for `isDocument` easier, which made it possible to changed the types for [`isDocument` now has types working with typescript 4.9](#isdocument-now-has-types-working-with-typescript-49).

## `isDocument` now has types working with typescript 4.9

When typescript 4.9 first released, it didnt work with typegoose and version 9.x still does not work with typescript 4.9, but 10.0 now works with typescript 4.9

As a side-effect, the type-narrowing also works with the `else` case and excludes the `true` case.

## Indexes can now be set to not be inherited

In Typegoose 10.0 a new ModelOption has been introduced named [`disableLowerIndexes`](../../api/decorators/modelOptions.md#disablelowerindexes) to choose to not inherit any of the lower indexes.

## Option `runSyncIndexes` has been removed

The Model Option `runSyncIndexes` has been removed. If wanting to continue to use it, manually call `model.syncIndexes()`.

## Function `getClassForDocument` has been removed

Function `getClassForDocument` has been removed and merged into [`getClass`](../../api/functions/getClass.md) directly.

## Deprecated options got removed

### `disablePluginsOnDiscriminator` and `$isDiscriminator`

`disablePluginsOnDiscriminator` and `$isDiscriminator` were temporary options to work-around some discriminator problems, and got deprecated in typegoose `9.13.0` and now they are removed again in `10.0`.

### `IndexOptions` and `@index` now dont have a generic anymore

Type `IndexOptions` and decorator `@index` now have no generic anymore and will result in a typescript error noting this, simply remove the generic.  
This Generic was unused since `9.10.0`.

## Alias for `WhatIsIt` to `PropType` have been removed

The Enum (and some internal options) had been renamed from `WhatIsIt` to `PropType` in typegoose `9.5.0`, and for backwards-compatability had been aliased, but now in `10.0.0` these aliases (and final remaining property names) have been removed or renamed.

## Some Unused types have been removed

Some unused types that had been meant for internal use have been removed:

- `EmptyVoidFn`
- `IObjectWithTypegooseName`
