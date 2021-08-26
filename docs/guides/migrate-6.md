---
id: migrate-6
title: 'Migrate to 6.0.0'
---

These are the changes made for 6.0.0 that are breaking or just important to know.

:::caution Important, Read this first
This Guide is written for migration from version `5.9.2` to `6.0.0`, for versions `>6.0.0 <7.0.0`, please consult the [CHANGELOG](https://github.com/typegoose/typegoose/blob/master/CHANGELOG.md)
:::

## Requirements changed

- Typescript `3.5` is now required / recommended
- Mongoose `5.7.1` or higher is now required

## InstanceType changed

`InstanceType<T>` was renamed to `DocumentType<T>`

## `getModelForClass`, `setModelForClass`, `buildSchema`

They are not in the Typegoose class anymore. They are now outsourced, which means the new syntax is the following (for a "seamless" migration the Typegoose Class still exists and has the functions, but the will be deprecated):

```ts
import { getModelForClass } from 'typegoose';
class Name {}

const NameModel = getModelForClass(Name);
```

Note: Typegoose Class still has all the functions, but they are marked deprecated & are just passthroughs to the new functions.

## ModelOptions

Use the following decorator now.

```ts
@modelOptions({ schemaOptions: {} })
class Name {}
```

Otherwise, the functions still override the settings made in `modelOptions`

## Hooks

Hooks recieved a change (in 6.0.0-13) for the types to comply with the latest mongoose (5.6.8)  
-> no workarounds or typedefs required anymore.

## Methods (staticMethod, instanceMethod, virtuals)

`@staticMethod` & `@instanceMethod` were deprecated in favor of `schema.loadClass()`. These decorators are no longer needed, because the methods are auto-detected.

For [virtuals](https://mongoosejs.com/docs/tutorials/virtuals.html), simply use `get somevalue() { return ''; }` and `set somevalue(val: string) { }` (`@prop` is no longer needed). [[New Documentation](api/virtuals.md#get--set)]

For [populating virtuals](https://mongoosejs.com/docs/tutorials/virtuals.html#populate), use `@prop({ localField, foreignField })`. The `overwrite` option is no longer needed. [[New Documentation](api/virtuals.md#virtual-populate)]

Update: `@staticMethod` & `@instanceMethod` were removed in 6.1.0-1

## setModelForClass is deprecated

`setModelForClass()` has been deprecated, because Mongoose would throw an OverwriteModelError if it was attempted to overwrite a model.  
-> use `getModelForClass()`

## ModelType is abstracted

The type `ModelType` has been abstracted to `ReturnModelType<typeof Class>` with documentation. But, if for any reason `ModelType` is needed, it needs to be imported from `@typegoose/typegoose/lib/types`.

## [IC] data.ts collections are now Map<T, S>

data.ts's collections got refactored to use ES6 Maps

## Notes

- [IC] The internal handling of schema creation has changed a bit, however we tried to keep the inputs & outputs the same, meaning in some edge-cases schema creation might not work as expected.

---

<sub>*`IC` means `internal change`*</sub>
