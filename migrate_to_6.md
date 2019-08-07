# How to migrate from ~5.9 to 6.0.x

## InstanceType changed

`InstanceType<T>` got renamed to `DocumentType<T>`

## `getModelForClass`, `setModelForClass`, `buildSchema`

they are not in the Typegoose class anymore, they are now outsourced, which means the new syntax is the following

```ts
import { getModelForClass } from 'typegoose';
class Name {}

const NameModel = getModelForClass(Name);
```

Note: Typegoose is an empty class now, it is kept for future use, and "style"

## (ic) data.ts collections are now Map<T, S>

data.ts's collections got refactored to use ES6 Maps

## ModelOptions

- `getModelForClass(class, options)`' options got removed
- `setModelForClass(class, options)`' options got removed
- `buildSchema(class, options)`' options got removed

use the following decorator now

```ts
@modelOptions({ schemaOptions: {} })
class Name {}
```

## Hooks

Hooks got (in 6.0.0-13) a change for the types to comply with the latest mongoose (5.6.8)
-> no workarounds or typedefs required anymore

## Methods (staticMethod, instanceMethod, virtuals)

`@staticMethod` & `@instanceMethod` got deprecated in favor of `schema.loadClass()`
(means these decorators are no more needed, so they are auto-detected)

for virtual-populates use `@prop({ localField, foreignField })` and no more `overwrite` option is needed, it will auto detect if one of these values is included
for normal virtuals, just use `get somevalue() { return ''; }` and `set somevalue(val: string) { }` (no more `@prop` needed)

## setModelForClass got deprecated

`setModelForClass()` got deprecated, because mongoose would throw an OverwriteModelError if attempted to overwrite a model
-> use `getModelForClass()`

## Notes

* (ic) The internal handling of schema creation has changed a bit but tried to keep the inputs & outputs the same, means in some edge-cases it can happen to not work anymore
* all deprecated functions and options in this version, will get removed in future versions (6.5.0 | 7.0.0, whatever comes first)

---

*`ic` means `internal change`*
