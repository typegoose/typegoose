---
id: migrate-12
title: 'Migrate to 12.0.0'
---

These are the changes made for 12.0.0 that are breaking or just important to know

:::warning Important, Read this first
This Guide is written for migration from version `11.7.1` to `12.0.0`, for versions `>12.0.0 <13.0.0`, please consult the [CHANGELOG](https://github.com/typegoose/typegoose/blob/master/CHANGELOG.md)
:::

## Requirements changed

- Mongoose `8.0.1` or higher is now required
- Typescript `5.2` or higher is now required to be used
- NodeJS 16 is now the lowest supported nodejs version

## TSConfig Target is now `es2021`

The `tsconfig` target has been changed to `es2021`, which also makes the ouput incompatible with anything before NodeJS 16.  
This was changed because it outputs less polyfills and makes debugging easier (also bundle size is *slightly* lower)

## Important typescript decorator note

This section is just a important note, not a change.

Now that typescript 5.2 is the minimal and typescript 5.0 added ES Decorators (and is enabled by default), users may get confusing errors about decorators if `experimentalDecorators` is not enabled, because typegoose still uses the old "legacy" system and only works with that.

See [#861](https://github.com/typegoose/typegoose/issues/861) for progress regarding ES Decorator usage.

## Notes
