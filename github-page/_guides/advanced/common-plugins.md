---
title: "Common Plugins"
---

Typegoose supports mongoose plugins. Here's how to use some common plugins:

## mongoose-autopopulate

Typegoose has the PropOption `autopopulate` implemented, but it only has an effect if [`mongoose-autopopulate`](https://github.com/mongodb-js/mongoose-autopopulate) is used too.

```ts
import * as mongoose from "mongoose";
import * as autopopulate from "mongoose-autopopulate";
import { plugin, prop, Ref, getModelForClass } from "@typegoose/typegoose";

@plugin(autopopulate as any) // this is an dirty fix, because the types of this plugin dont work
class SomeClass {
  @prop({ autopopulate: true, ref: "SomeReferencedClass" })
  public populateField: Ref<SomeReferencedClass>;
}

class SomeReferencedClass {}

const SomeClassModel = getModelForClass(SomeClass);
const SomeReferencedClassModel = getModelForClass(SomeReferencedClass);

(async () => {
  await mongoose.connect(`mongodb://localhost:27017/`, { useNewUrlParser: true, dbName: "guides", useUnifiedTopology: true });

  const reference = await SomeReferencedClassModel.create({});
  const { _id: id } = await SomeClassModel.create({ populateField: reference } as SomeClass);

  console.log(await SomeClassModel.findById(id).exec()); // output will be populated

  await mongoose.disconnect();
})();

```

**PLEASE NOTE:** If you have a 'ref' which refers back to its own class/ model, like having a User class with a `createdBy` field referring back to User, then you'll need to set the `maxDepth` prop of `autocomplete` to 1. If you don't do this, Mongoose will do recursive call to the user collection 10 times, extremely delaying the output of the query. Below is an example of how to set `maxDepth`.

```ts
@plugin(autopopulate as any) // this is an dirty fix, because the types of this plugin dont work
class SomeClass {
  @prop({ autopopulate: { maxDepth: 1 }, ref: "SomeReferencedClass" })
  public populateField: Ref<SomeReferencedClass>;
}
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

@plugin(AutoIncrement, { inc_field: '_id', start_seq: 200 })
class SomeClass extends defaultClasses.Base<number> {
  @prop()
  public _id: number;
}

// The Plugin options can be applied too

@plugin<mongoose.SequenceOptions>(AutoIncrement, { inc_field: '_id' }) // Note: "start_seq" is not in the "SequenceOptions" type
class SomeClass extends defaultClasses.Base<number> {
  @prop()
  public _id!: number;
}
```

For more details, see [this issue](https://github.com/ramiel/mongoose-sequence/issues/83).

## @typegoose/auto-increment

The Typegoose project provides an [`auto-increment` plugin](https://github.com/typegoose/auto-increment) for mongoose, here is how to use it:

### AutoIncrementSimple

Always increments the field on each save

```ts
@plugin(AutoIncrementSimple, [{ field: "someIncrementedField" }])
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
@plugin(AutoIncrementID, {})
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

Please note that some or all of the listed plugins might not have a `@types` package, so you mostly have to declare it as a model.
