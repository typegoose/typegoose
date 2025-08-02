---
id: quick-start-guide
title: 'Quick Start Guide'
---

## Quick Overview of Typegoose

:::note
This Guide is for Typegoose version ~12.0
:::

Typegoose is a "wrapper" for easily writing Mongoose models with TypeScript.

Instead of writing this:

```ts
// This is a representation of how typegoose's compile output would look
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
  model: String,
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
  public age!: number; // This is a single Primitive

  @prop({ type: () => [String] })
  public preferences?: string[]; // This is a Primitive Array

  @prop()
  public mainJob?: Job; // This is a single SubDocument

  @prop({ type: () => [Job] })
  public jobs?: Job[]; // This is a SubDocument Array

  @prop({ ref: () => Car })
  public mainCar?: Ref<Car>; // This is a single Reference

  @prop({ ref: () => Car })
  public cars?: Ref<Car>[]; // This is a Reference Array
}
```

:::warning
`type` has to be defined when working with Arrays, because Reflection only returns basic information. [Look here for why](https://github.com/microsoft/TypeScript/issues/7169)  
Like `public: string[]` is in reflection only `Array`.  
:::

[Look here for what `!` means on a property](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-)  
[Look here for what `?` means on a property](https://www.typescriptlang.org/docs/handbook/2/functions.html#optional-parameters)  

## How to Start using typegoose

### Requirements

- TypeScript version `^5.3` is recommended, though older ones may also work
- NodeJS `>=16.20.1` (and `@types/node@16`)
- Mongoose `~8.17.0`
- A IDE that supports TypeScript linting is recommended to be used (VSCode is recommended)
- This Guide expects you to know how Mongoose (or at least its models) works
- `experimentalDecorators` and `emitDecoratorMetadata` must be enabled in `tsconfig.json`
- tsconfig option `target` being at least `es6`, recommended is `es2021`

:::info
tsconfig option `emitDecoratorMetadata` is not strictly required, look [here](./use-without-emitDecoratorMetadata.md) for more
:::

### Install

```bash npm2yarn
npm install --save @typegoose/typegoose # install typegoose itself

npm install --save mongoose # install peer-dependency mongoose
```

### How to use Typegoose

Let's say you have a Mongoose model like this one:

```ts
const kittenSchema = new mongoose.Schema({
  name: String
});

const KittenModel = mongoose.model('Kitten', kittenSchema);

let document = await KittenModel.create({ name: 'Kitty' });
// "document" has basic mongoose inferred types
```

With Typegoose, it can be converted to something like:

```ts
class KittenClass {
  @prop()
  public name?: string;
}

const KittenModel = getModelForClass(KittenClass);

let document = await KittenModel.create({ name: 'Kitty' });
// "document" has proper (manual) typescript types of KittenClass
```

:::note
`new KittenModel({} /*<-- this here*/)` will have type suggestions, but they are *not enforced*, [read more here](./faq.md#why-does-new-model-not-have-types).
:::
:::note
Since around mongoose 6.0, mongoose can infer types mostly from the schema definition, but it is still not perfect and arguably less overview-able than typegoose's style of classes.  
Also tsdoc comments are not transferred when using mongoose's inferred types.
:::

## Do's and Don'ts of Typegoose

- Typegoose is a wrapper for Mongoose's models & schemas
- Typegoose does not modify any functions of Mongoose
- Typegoose aims to get Mongoose's models to be stable through type-information from classes (without defining extra interfaces)
- Typegoose aims to make Mongoose more usable by making the models more type-rich with TypeScript
- Decorated schema configuration classes (like `KittenClass` above) must use explicit type declarations

## Extra Examples

### Static Methods

Sometimes extra functions for model creation or pre-written queries are needed, they can be done as follows:

```ts
class KittenClass {
  @prop()
  public name?: string;

  @prop()
  public species?: string;

  // the "this" definition is required to have the correct types
  public static async findBySpecies(this: ReturnModelType<typeof KittenClass>, species: string) {
    return this.find({ species }).exec();
  }
}
const KittenModel = getModelForClass(KittenClass);

const docs = await KittenModel.findBySpecies('SomeSpecies');
```

:::note
pre-6.0 static functions needed `@staticMethod`, but this is not needed anymore.
:::

### Instance Methods

Sometimes extra functions for manipulating data on an instance are needed, they can be done as follows:

```ts
class KittenClass {
  @prop()
  public name?: string;

  @prop()
  public species?: string;

  // the "this" definition is required to have the correct types
  public async setSpeciesAndSave(this: DocumentType<KittenClass>, species: string) {
    this.species = species;
    await this.save();
  }
}
const KittenModel = getModelForClass(KittenClass);

const doc = new KittenModel({ name: 'SomeCat', species: 'SomeSpecies' });
await doc.setSpeciesAndSave('SomeOtherSpecies');
```

:::note
Pre-6.0 static functions needed `@instanceMethod`, but this is not needed anymore.
:::

### Hooks

Typegoose also supports hooks. They can be used like this:

```ts
@pre<KittenClass>('save', function() {
  this.isKitten = this.age < 1
})
@post<KittenClass>('save', function(kitten) {
  console.log(kitten.isKitten ? 'We have a kitten here.' : 'We have a big kitty here.')
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
}

const KittenModel = getModelForClass(KittenClass);

const doc = new KittenModel({ name: 'SomeCat', species: 'SomeSpecies', age: 0 });
await doc.save(); // this should output "We have a kitten here."
const doc = new KittenModel({ name: 'SomeCat', species: 'SomeSpecies', age: 2 });
await doc.save(); // this should output "We have a big kitty here."
```

For detailed explanation of Hooks, please see [Hooks](../api/decorators/hooks.md).

Note:
- Do not use Arrow Functions, because it will break the binding of `this`
- For ESLint users: Make sure that rule `eslint-no-use-before-defining` is disabled, otherwise you might get ESLint errors / warnings inside the hooks
