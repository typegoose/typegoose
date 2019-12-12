---
title: "Migrate to 6.0.0"
classes: wide
---

<!--Note this is mostly just a copy of "migrate_to_6.md" on the root of the repo-->
These are the changes made for 6.0.0 that are breaking \| important to know

## Important, Read this first

To migrate "seamless" you should be on the latest Typegoose Version of 5.x (Currently 5.9.0) and then upgrade to 6.0.x (not 6.x)
because in version 6.1+ the deprecated functions will get removed!

## InstanceType changed

`InstanceType<T>` got renamed to `DocumentType<T>`

## `getModelForClass`, `setModelForClass`, `buildSchema`

they are not in the Typegoose class anymore, they are now outsourced, which means the new syntax is the following
(for "seamless" migration the Typegoose Class still exists and has the functions, but with deprecation)

```ts
import { getModelForClass } from 'typegoose';
class Name {}

const NameModel = getModelForClass(Name);
```

Note: Typegoose Class has still all the functions, but they are marked deprecated & are just passthroughs to the new functions

## ModelOptions

use the following decorator now

```ts
@modelOptions({ schemaOptions: {} })
class Name {}
```

otherwise the functions still override the settings made in `modelOptions`

## Hooks

Hooks got (in 6.0.0-13) a change for the types to comply with the latest mongoose (5.6.8)
-> no workarounds or typedefs required anymore

## Methods (staticMethod, instanceMethod, virtuals)

`@staticMethod` & `@instanceMethod` got deprecated in favor of `schema.loadClass()`
(means these decorators are no more needed, so they are auto-detected)

for virtual-populates use `@prop({ localField, foreignField })` and no more `overwrite` option is needed, it will auto detect if one of these values is included
for normal virtuals, just use `get somevalue() { return ''; }` and `set somevalue(val: string) { }` (no more `@prop` needed)

Update: `@staticMethod` & `@instanceMethod` got removed in 6.1.0-1

## setModelForClass got deprecated

`setModelForClass()` got deprecated, because mongoose would throw an OverwriteModelError if attempted to overwrite a model
-> use `getModelForClass()`

## ModelType got abstracted

The type `ModelType` got abstracted to `ReturnModelType<typeof Class>` with documentation, but if for any reason `ModelType` is needed, it needs to be imported from `@typegoose/typegoose/lib/types`

## (ic) data.ts collections are now Map<T, S>

data.ts's collections got refactored to use ES6 Maps

## Notes

* (ic) The internal handling of schema creation has changed a bit but tried to keep the inputs & outputs the same, means in some edge-cases it can happen to not work anymore

---

<sub>*`ic` means `internal change`*</sub>
