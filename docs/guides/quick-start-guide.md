---
id: quick-start-guide
title: 'Quick Start Guide'
---

## Quick Overview of Typegoose

:::note
This Guide is for Typegoose version ~7.4
:::

Typegoose is a "wrapper" for easily writing Mongoose models with TypeScript.

Instead of writing this:

```ts
// This is an representation of how typegoose's compile output would look like
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
  preferences?: string[];
  mainJob?: Job;
  jobs?: Job[];
  mainCar?: Car | string;
  cars?: (Car | string)[];
}

const JobSchema = new mongoose.Schema({
  title: String;
  position: String;
});

const CarModel = mongoose.model('Car', {
  model: string,
});

const UserModel = mongoose.model('User', {
  name: { type: String },
  age: { type: Number, required: true },
  preferences: [{ type: String }],
  mainJob: { type: JobSchema },
  jobs: [{ type: JobSchema }],
  mainCar: { type: Schema.Types.ObjectId, ref: 'Car' },
  cars: [{ type: Schema.Types.ObjectId, ref: 'Car' }],
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
  public age!: number; // This is an single Primitive

  @prop({ type: () => [String] })
  public preferences?: string[]; // This is an Primitive Array

  @prop()
  public mainJob?: Job; // This is an single SubDocument

  @prop({ type: () => Job })
  public jobs?: Job[]; // This is an SubDocument Array

  @prop({ ref: () => Car })
  public mainCar?: Ref<Car>; // This is an single Reference

  @prop({ ref: () => Car })
  public cars?: Ref<Car>[]; // This is an Reference Array
}
```

## How to Start using it

### Requirements

- TypeScript `^3.9` (since 7.1)
- NodeJS `^10.15.0`
- Mongoose `5.10.18` ([look here for why this version](./faq.md#why-is-74x-constrained-to-mongoose-51018))
- An IDE that supports TypeScript linting (VSCode is recommended)
- This Guide expects you to know how Mongoose (or at least its models) works
- `experimentalDecorators` and `emitDecoratorMetadata` must be enabled in `tsconfig.json`
- tsconfig option `target` being `ES6`

### Install

```sh
npm i -s @typegoose/typegoose # install typegoose itself

npm i -s mongoose # install peer-dependency mongoose
npm i -D @types/mongoose # install all types for mongoose - this is required for typegoose to work in TypeScript
```

### How to use Typegoose

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

:::note
`new Kitten({})` has no types of KittenClass, because Typegoose doesn't modify functions of Mongoose, [read more here](./faq.md#why-does-new-model-not-have-types)
:::

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

:::note
pre-6.0 static functions needed `@staticMethod`, but this is not needed anymore
:::

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

:::note
pre-6.0 static functions needed `@instanceMethod`, but this is not needed anymore
:::

### Hooks

Typegoose also supports hooks, they can be used like this:

```ts
@pre<KittenClass>('save', function() {
  this.isKitten = this.age < 1
})
@post<KittenClass>('save', (kitten) => {
  console.log(kitten.isKitten ? "We have a kitten here." : "We have a big kitty here.")
})
class KittenClass {
  @prop()
  public name?: string;

  @prop()
  public species?: string;
  
  @prop()
  public age?: number
  
  @prop({ default: false })
  public isKitten?: boolean

  public async setSpeciesAndSave(this: DocumentType<KittenClass>, species: string) {
    this.species = species;
    return await this.save();
  }
}
```

For detailed explanation of Hooks, please see [Hooks](api/decorators/hooks.md).

Note:
- Do not use Arrow Functions, because it will break the binding of `this`
- For ESLint users: Make sure that rule `eslint-no-use-before-defining` is disabled, otherwise you might get ESLint errors / warnings
