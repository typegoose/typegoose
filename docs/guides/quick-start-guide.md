---
id: quick-start-guide
title: 'Quick Start Guide'
---

## Quick Overview of Typegoose

Typegoose is a "wrapper" for easily writing Mongoose models with TypeScript.

Instead of writing this:

```ts
interface Car {
  model?: string;
}

interface Job {
  title?: string;
  position?: string;
}

interface User {
  name?: string;
  age!: number;
  job?: Job;
  car?: Car | string;
  preferences?: string[];
}

const CarModel = mongoose.model('Car', {
  model: string,
});

const UserModel = mongoose.model('User', {
  name: String,
  age: { type: Number, required: true },
  job: {
    title: String;
    position: String;
  },
  car: { type: Schema.Types.ObjectId, ref: 'Car' },
  preferences: [{ type: String }]
});
```

You can just write this:

```ts
class Job {
  @prop()
  public title?: string;

  @prop()
  public position?: string;
}

class Car {
  @prop()
  public model?: string;
}

class User {
  @prop()
  public name?: string;

  @prop({ required: true })
  public age!: number;

  @prop()
  public job?: Job;

  @prop({ ref: Car })
  public car?: Ref<Car>;

  @prop({ type: String })
  public preferences?: string[];
}
```

## How to Start using it

*Please note that this guide is for Typegoose 7.0+*

### Requirements

- TypeScript ^3.9 (since 7.1)
- NodeJS ^10.15.0
- Mongoose ^5.9.22
- An IDE that supports TypeScript linting (VSCode is recommended)
- This Guide expects you to know how Mongoose (or at least its models) works

## Install

```sh
npm i -s @typegoose/typegoose # install typegoose itself

npm i -s mongoose # install peer-dependency mongoose
npm i -D @types/mongoose # install all types for mongoose - this is required for typegoose to work in TypeScript
```

### How to Use

Let's say you have a Mongoose model like this one:

```ts
const kittenSchema = new mongoose.Schema({
  name: String
});

const Kitten = mongoose.model('Kitten', kittenSchema);

let document = await Kitten.create({ name: 'Kitty' });
// "document" has no types
```

With Typegoose, it can be converted to something like:

```ts
class KittenClass {
  @prop()
  public name?: string;
}

const Kitten = getModelForClass(KittenClass);

let document = await Kitten.create({ name: 'Kitty' });
// "document" has proper types of KittenClass
```

Please note that `new Kitten({})` & `Kitten.create({})` has no types of KittenClass, because Typegoose doesn't modify functions of Mongoose.

## Do's and Don'ts of Typegoose

- Typegoose is a wrapper for Mongoose's models
- Typegoose aims to not modify any functions of Mongoose
- Typegoose aims to get Mongoose's models to be stable through type-information
- Typegoose aims to make Mongoose more usable by making the models more type-rich with TypeScript
- Decorated schema configuration classes (like KittenClass above) must use explicit type declarations

## Extra Examples

### Static Methods

Sometimes extra functions for model creation or pre-written querys are needed, they can be done as follows:

```ts
class KittenClass {
  @prop()
  public name?: string;

  @prop()
  public species?: string;

  public static async findBySpecies(this: ReturnModelType<typeof KittenClass>, species: string) {
    return this.find({ species }).exec();
  }
}
const KittenModel = getModelForClass(KittenClass);

const docs = await KittenModel.findBySpecies("SomeSpecies");
```

Note: pre-6.0 static functions needed `@staticMethod`, but this is not needed anymore

### Instance Methods

Sometimes extra functions for manipulating data on an instance is needed, they can be done as follows:

```ts
class KittenClass {
  @prop()
  public name?: string;

  @prop()
  public species?: string;

  public async setSpeciesAndSave(this: DocumentType<KittenClass>, species: string) {
    this.species = species;
    return await this.save();
  }
}
const KittenModel = getModelForClass(KittenClass);

const doc = new KittenModel({ name: "SomeCat", species: "SomeSpecies" });
await doc.setSpeciesAndSave("SomeOtherSpecies");
```

Note: pre-6.0 instance functions needed `@instanceMethod`, but this is not needed anymore
