---
id: migrate-6
title: 'Migrate to 6.0.0'
---

These are the changes made for 6.0.0 that are breaking or just important to know.

## Important, Read this first

To migrate "seamlessly", you should be on the latest Typegoose Version of 5.x (Currently 5.9.0) and then upgrade to 6.0.x (not 6.x), because in version 6.1+ the deprecated functions will be removed!

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
