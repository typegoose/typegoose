---
title: "Changelog"
layout: single
classes: wide
toc: true
redirect_from:
  - /CHANGELOG
---

<!--Sorry but linking to the issue/pr can only be made so in jekyll without more clutter-->

## 6.0.0-x

*<sub>This Version is not released yet, but is considered stable</sub>*<br/>
[To Migrate, please look at the migration guide]({{ site.baseurl }}{% link _guides/migrate-to-6.md %})

- rename `InstanceType<T>` to `DocumentType<T>` [{% include gitissue repo="szokodiakos" num=366 %}]
- adding a migration guide from ~5.9 to 6.0.0
- adding missing "get" and "set" property options [{% include gitissue repo="szokodiakos" num=260 %}]
- adding `@modelOptions` and removing it from `getModelForClass` and `setModelForClass`
- `setModelForClass` is now deprecated [{% include gitissue repo="hasezoey" num=6 %}, {% include gitissue repo="szokodiakos" num=186 %}]
- setting the Typegoose Class to abstract
- deprecating the Typegoose Class because of making the functions outsourced [{% include gitissue repo="szokodiakos" num=356 %}]
- hook methods can now be arrays of methods [{% include gitissue repo="szokodiakos" num=313 %}]
- completely removed parallel from pre hook
- refactored the types of hooks
- adding support for any value in prop for plugins [{% include gitissue repo="szokodiakos" num=374 %}]
- `schema.loadClass` is now used instead of `@instanceMethod` and `@staticMethod` [{% include gitissue repo="szokodiakos" num=48 %}, {% include gitissue repo="szokodiakos" num=346 %}, {% include gitissue repo="szokodiakos" num=182 %}]
- method decorators are now deprecated
- schema generation got refactored (/reconstructed) multiple times
- adding `count` to VirtualOptions
- Updated Dependencies (^mongoose@5.6.9)
- adding discriminator support hasezoey#11
- adding default class for (schemaOptions) timestamps
- adding more docs to README & as tsdoc
- some changes that are probably forgot
- szokodiakos#363 got reverted in favor of mongoose@5.6.9
- Fixes Custom Options not passed through to mongoose & plugins when using ref [{% include gitissue repo="szokodiakos" num=379 %}]
- Adding "immutable" prop option [{% include gitissue repo="szokodiakos" num=320 %}]
- adding Types to Ref (to allow not just ObjectID) [{% include gitissue repo="szokodiakos" num=369 %}]
- szokodiakos#54 seems to work now in 6.0.0 (added test in 6.0.0-21)
- because of the changes in 6.0.0 #235 got fixed
- [IC] Remake data.ts to use Maps hasezoey#3
- [IC] adding many tests and bumping coverage
- [IC] moving many Types to types.ts
- [IC] removing unneeded dependencies
- [IC] changed how travis runs jobs multiple times
- [IC] many tslint rule changes

## 5.9.0

- This should not be a breaking release
- Hooks now support Regular Expression for names, like mongoose
- Tests are splitted into their own files
- Fixing `itemsRefPath` & adding tests
- `itemsRef` now supports to be used with a string as model
- `@prop({ alias })` is now supported
- Index weights are now supported
- `isDocument` & `isDocumentArray` typeguards are now implemented
- Updated Dependencies
  Note worthy are:
  - mongoose 5.6 is now required instead of 5.5
  - this project should be used with typescript 3.5+
- `@mapProp()` is now implemented
- Fix for `@prop({ select })`
- A public version of `buildSchema` is now available
- Added more Documentation to README
- Added TSDOC to many functions and properties
- build target is now ES6 instead of ES5
