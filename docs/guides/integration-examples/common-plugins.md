---
id: common-plugins
title: 'Common Plugins'
---

Typegoose supports mongoose plugins. Here's how to use some common plugins:

## mongoose-autopopulate

Last updated for:

```txt
@typegoose/typegoose@9.0.0
mongoose-autopopulate@0.14.0
```

```bash npm2yarn
npm install --save mongoose-autopopulate
```

Typegoose has the prop option `autopopulate` implemented, but it only has an effect, if [`mongoose-autopopulate`](https://github.com/mongodb-js/mongoose-autopopulate) is installed and used too.

```ts
import * as mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import { plugin, prop, Ref, getModelForClass } from '@typegoose/typegoose';

@plugin(autopopulate)
class SomeClass {
  @prop({ autopopulate: true, ref: 'SomeReferencedClass' })
  public populateField: Ref<SomeReferencedClass>;
}

class SomeReferencedClass {
  // a dummy property is required, otherwise the class will equal to others
  @prop()
  public dummy?: string;
}

const SomeClassModel = getModelForClass(SomeClass);
const SomeReferencedClassModel = getModelForClass(SomeReferencedClass);

(async () => {
  await mongoose.connect(`mongodb://localhost:27017/`, { useNewUrlParser: true, dbName: 'guides', useUnifiedTopology: true });

  const reference = await SomeReferencedClassModel.create({ dummy: 'hello' });
  const { _id: id } = await SomeClassModel.create({ populateField: reference } as SomeClass);

  console.log(await SomeClassModel.findById(id).exec()); // output will be populated

  await mongoose.disconnect();
})();
```

:::caution
If you have a `ref` which refers back to its own class/model, like having a User class with a `createdBy` field referring back to User, then you'll need to set the `maxDepth` prop of `autocomplete` to 1. If you don't do this, Mongoose will do recursive calls to
the user collection 10 times, extremely delaying the output of the query. Below is an example of how to set `maxDepth`.
:::

```ts
// the types of "autopopulate" may change depending on the tsconfig option "esModuleInterop"
@plugin(autopopulate as any) // this is a dirty fix, because the types of this plugin dont work
class SomeClass {
  @prop({ autopopulate: { maxDepth: 1 }, ref: 'SomeReferencedClass' })
  public populateField: Ref<SomeReferencedClass>;
}
```

## mongoose-findorcreate

Last updated for:

```txt
@typegoose/typegoose@9.0.0
mongoose-findorcreate@3.0.0
```

```bash npm2yarn
npm install --save mongoose-findorcreate
```

Typegoose has a default class for `mongoose-findorcreate` that has all the types it needs. Here's how to use it:

```ts
import { DocumentType, getModelForClass, plugin, prop, defaultClasses } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';
import * as findorcreate from 'mongoose-findorcreate';

@plugin(findorcreate)
class SomeClass extends defaultClasses.FindOrCreate {
  @prop()
  public someField!: string;
}

const SomeClassModel = getModelForClass(SomeClass);

(async () => {
  await mongoose.connect(`mongodb://localhost:27017/`, { useNewUrlParser: true, dbName: 'guides' });

  console.log(await SomeClassModel.findOrCreate({ someField: 'Hello' }));
  console.log(await SomeClassModel.findOrCreate({ someField: 'Hello' })); // both will give the same output

  await mongoose.disconnect();
})();
```

## mongoose-sequence

Last updated for:

```txt
@typegoose/typegoose@7.1.0
mongoose-sequence@5.0.0
```

```bash npm2yarn
npm install --save mongoose-sequence
```

To use [`mongoose-sequence`](https://github.com/ramiel/mongoose-sequence), import the plugin and use it like this:

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

Last updated for:

```txt
@typegoose/typegoose@8.3.0
@typegoose/auto-increment@0.9.0
```

```bash npm2yarn
npm install --save @typegoose/auto-increment
```

The Typegoose project provides an [`auto-increment` plugin](https://github.com/typegoose/auto-increment) for Mongoose. Here is how to use it:

### AutoIncrementSimple

Always increments the field on each save

```ts
@plugin(AutoIncrementSimple, [{ field: 'someIncrementedField' }])
class SomeClass {
  @prop() // does not need to be empty
  public someIncrementedField: number;
}

const SomeModel = getModelForClass(SomeClass);

const doc = await SomeModel.create({ someIncrementedField: 10 });

await doc.save(); // someIncrementedField will be 11
```

### AutoIncrementID

Only increases the field if the document is *new* and the counter is stored in a counter-collection (default field: `_id`).

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

:::note
Some or all of the listed plugins might not have a `@types` package, so types have to be mostly manually declared.
:::
