---
title: "Migrate to 6.0.0"
classes: wide
---

These are the changes made for 6.0.0 that are breaking or just important to know

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

`@staticMethod` & `@instanceMethod` were deprecated in favor of `schema.loadClass()`. These decorators are no longer needed, because the methods are auto-detected.

For [virtuals](https://mongoosejs.com/docs/tutorials/virtuals.html), simply use `get somevalue() { return ''; }` and `set somevalue(val: string) { }` (`@prop` is no longer needed). [[New Documentation]({{ site.baseurl }}{% link _docs/virtuals.md %}#get--set)]

For [populating virtuals](https://mongoosejs.com/docs/tutorials/virtuals.html#populate), use `@prop({ localField, foreignField })`. The `overwrite` option is no longer needed. [[New Documentation]({{ site.baseurl }}{% link _docs/virtuals.md %}#virtual-populate)]

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
