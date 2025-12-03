---
id: migrate-13
title: 'Migrate to 13.0.0'
---

These are the changes made for 13.0.0 that are breaking or just important to know

:::warning Important, Read this first
This Guide is written for migration from version `12.15.0` to `13.0.0`, for versions `>13.0.0 <14.0.0`, please consult the [CHANGELOG](https://github.com/typegoose/typegoose/blob/master/CHANGELOG.md)
:::

## Requirements changed

- Mongoose `9.0.0` or higher is now required
- Typescript `5.9` or higher is now required to be used
- NodeJS 20.19 is now the lowest supported nodejs version

## TSConfig Target is now `es2023`

The `tsconfig` target has been changed to `es2023`, which also makes the ouput incompatible with anything before NodeJS 16.  
This was changed because it outputs less polyfills and makes debugging easier (also bundle size is *slightly* lower)
