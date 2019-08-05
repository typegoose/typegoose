# How to migrate from ~5.9 to 6.0.x

## InstanceType changed

`InstanceType<T>` got renamed to `DocumentType<T>`

## (ic) data.ts collections are now Map<T, S>

data.ts's collections got refactored to use ES6 Maps

## ModelOptions

- `getModelForClass(class, options)`' options got removed
- `setModelForClass(class, options)`' options got removed
- `buildSchema(class, options)`' options got removed

use the following decorator now

```ts
@modelOptions({ schemaOptions: {} })
class Name extends Typegoose {}
```

---

*`ic` means `internal change`*
