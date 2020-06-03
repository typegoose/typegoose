---
title: "Migrate to 7.0.0"
classes: wide
---

These are the changes made for 7.0.0 that are breaking or just important to know

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

In 6.0.0 it was announced that the `Typegoose` class was useless and will be removed in an future version, now in 7.0.0 it got completely removed

## [IC] all remaining cache-maps got moved to reflection

All possible cache-maps that were in `data.ts` now got refactored to be in the reflection of the class

## [IC] almost all "if-throw" blocks got replaced with "assertion" functions

Typescript 3.7 brought an new type-keyword [`asserts`](https://devblogs.microsoft.com/typescript/announcing-typescript-3-7/#assertion-functions) and now almost every occurence got replaced with an custom assertion function

---

<sub>*`IC` means `Internal Change`*</sub>
