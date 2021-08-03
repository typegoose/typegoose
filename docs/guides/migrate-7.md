---
id: migrate-7
title: 'Migrate to 7.0.0'
---

These are the changes made for 7.0.0 that are breaking or just important to know

:::caution Important, Read this first
This Guide is written for migration from version `6.5.0` to `7.0.0`, for versions `>7.0.0 <8.0.0`, please consult the [CHANGELOG](https://github.com/typegoose/typegoose/blob/master/CHANGELOG.md)
:::

## Requirements changed

- Nodejs 8 & 9 are now unsupported, lowest supported version is now `10.15`
- Typescript 3.8 is now required

## Deprecation removals

### arrayProp options removed

The following options got removed:

- `itemsRef` got replaced with just `ref`
- `itemsRefPath` got replaced with just `refPath`
- `itemsRefType` got replaced with just `refType`

### Typegoose class got removed

In 6.0.0 it was announced that the `Typegoose` class was useless and will be removed in a future version. Now, in 7.0.0, it was completely removed.

## [IC] all remaining cache-maps got moved to reflection

All possible cache-maps that were in `data.ts` were refactored to be in the reflection of the class.

## [IC] almost all "if-throw" blocks got replaced with "assertion" functions

Typescript 3.7 introduced a new type-keyword [`asserts`](https://devblogs.microsoft.com/typescript/announcing-typescript-3-7/#assertion-functions) and now almost every occurence has been replaced with a custom assertion function.

## [IC] The Testing Framework for Typegoose changed to Jest

For Typegoose 7.0.0, the Testing Framework change from `mocha + chai` to `jest`

---

<sub>*`IC` means `Internal Change`*</sub>
