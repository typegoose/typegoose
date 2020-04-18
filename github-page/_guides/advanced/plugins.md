---
title: "Common Plugins"
---

Typegoose supports the use of plugins from mongoose, in this guide some common plugins are shown

## mongoose-autopopulate

Typegoose has the PropOption `autopopulate` implemented, but it only has an effect if `mongoose-autopopulate` is used too

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

Typegoose has a default class for `mongoose-findorcreate` that has all the types it needs, it is used like below

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

## @typegoose/auto-increment

The Typegoose project provides an [`auto-increment` plugin](https://github.com/typegoose/auto-increment) for mongoose, here is how to use it:

### AutoIncrementSimple

Always increments the field on each save

```ts
@plugin<AutoIncrementSimplePluginOptions>(AutoIncrementSimple, [{ field: "someIncrementedField" }])
class SomeClass {
  @prop() // does not need to be empty
  public someIncrementedField: number;
}

const SomeModel = getModelForClass(SomeClass);

const doc = await SomeModel.create({ someIncrementedField: 10 });

await doc.save(); // someIncrementedField will be 11
```

### AutoIncrementID

Only increases the field if the document is *new* and the counter is stored in an counter-collection
(default field: `_id`)

```ts
@plugin<AutoIncrementOptionsID>(AutoIncrementID, {})
class SomeClass {
  @prop()
  public _id: number;

  @prop() // does not need to be empty
  public someIncrementedField: number;
}

const SomeModel = getModelForClass(SomeClass);

const doc = await SomeModel.create({ someIncrementedField: 10 }); // _id will be 1
```

---

Please note that some or all of the listed plugins might not have an `@types` package, so you mostly have to declare it as a model
