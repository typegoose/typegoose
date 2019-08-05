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

or

```ts
import { getModelForClass } from 'typegoose';
class Name extends Typegoose {}

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
class Name extends Typegoose {}
```

---

*`ic` means `internal change`*
