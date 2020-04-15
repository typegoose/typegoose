---
title: "Common Plugins"
---

Typegoose supports mongoose plugins. Here's how to use some common plugins:

## mongoose-autopopulate

Typegoose has the PropOption `autopopulate` implemented, but it only has an effect if `mongoose-autopopulate` is used too.

```ts
import * as mongoose from "mongoose";
import * as autopopulate from "mongoose-autopopulate";
import { plugin, prop, Ref, getModelForClass } from "@typegoose/typegoose";

@plugin(autopopulate)
class SomeClass {
  @prop({ autopopulate: true, ref: "SomeReferencedClass" })
  public populateField: Ref<SomeReferencedClass>;
}

class SomeReferencedClass {}

const SomeClassModel = getModelForClass(SomeClass);
const SomeReferencedClassModel = getModelForClass(SomeReferencedClass);

(async () => {
  await mongoose.connect(`mongodb://localhost:27017/`, { useNewUrlParser: true, dbName: "guides" });

  const reference = await SomeReferencedClassModel.create({});
  const { _id: id } = await SomeClassModel.create({ populateField: reference } as SomeClass);

  console.log(await SomeClassModel.findById(id).exec()); // output will be populated

  await mongoose.disconnect();
})();

```

## mongoose-findorcreate

Typegoose has a default class for `mongoose-findorcreate` that has all the types it needs. Here's how to use it:

```ts
import { DocumentType, getModelForClass, plugin, prop, defaultClasses } from "@typegoose/typegoose";
import * as mongoose from "mongoose";
import * as findorcreate from "mongoose-findorcreate";

@plugin(findorcreate)
class SomeClass extends defaultClasses.FindOrCreate {
  @prop()
  public someField!: string;
}

const SomeClassModel = getModelForClass(SomeClass);

(async () => {
  await mongoose.connect(`mongodb://localhost:27017/`, { useNewUrlParser: true, dbName: "guides" });

  console.log(await SomeClassModel.findOrCreate({ someField: "Hello" }));
  console.log(await SomeClassModel.findOrCreate({ someField: "Hello" })); // both will give the same output

  await mongoose.disconnect();
})();
```

## mongoose-sequence

To use [mongoose-sequence](https://github.com/ramiel/mongoose-sequence), import the plugin and use it like this:
```ts
import AutoIncrementFactory from 'mongoose-sequence'; 

// AutoIncrement now is the instance
const AutoIncrement = AutoIncrementFactory(mongoose);

@plugin(AutoIncrement, { inc_field: 'id', start_seq: 200 })
class ... { ... }
```

For more details, see [this issue](https://github.com/ramiel/mongoose-sequence/issues/83).

---

Please note that some or all of the listed plugins might not have a `@types` package, so you mostly have to declare it as a model.
