---
title: "Quick Start Guide"
---

<sub>Please use [Dark-Reader](https://chrome.google.com/webstore/detail/dark-reader/eimadpbcbfnmbkopoojfekhnkhdbieeh) for a dark version of the site</sub>

## Quick Overview of Typegoose

Typegoose is an "wrapper" for mongoose models

Instead of:

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
}

mongoose.model('User', {
  name: String,
  age: { type: Number, required: true },
  job: {
    title: String;
    position: String;
  },
  car: { type: Schema.Types.ObjectId, ref: 'Car' }
});

mongoose.model('Car', {
  model: string,
});
```

You can just:

```ts
class Job {
  @prop()
  title?: string;

  @prop()
  position?: string;
}

class Car {
  @prop()
  model?: string;
}

class User {
  @prop()
  name?: string;

  @prop({ required: true })
  age!: number;

  @prop()
  job?: Job;

  @prop({ ref: Car })
  car?: Ref<Car>;
}
```

## How to Start using it

*Please note that this guide is for Typegoose 6.0.0*

### Requirements

- TypeScript 3.7+
- NodeJS 8.10.0+
- Mongoose 5.7.7+
- An IDE that supports TypeScript linting (VSCode is recommendet)
- This Guide expect you to know how mongoose (at least its models) work

### How to Use

Lets say you have an mongoose model like

```ts
const kittenSchema = new mongoose.Schema({
  name: String
});

const Kitten = mongoose.model('Kitten', kittenSchema);

let document = await Kitten.create({ name: 'Kitty' });
// "document" has no types
```

you can convert it into

```ts
class KittenClass {
  @prop()
  name: string
}

const Kitten = getModelForClass(KittenClass);

let document = await Kitten.create({ name: 'Kitty' });
// "document" has types of KittenClass
```

Please note that `new Kitten({})` & `await Kitten.create({})` has no types of KittenClass, because typegoose doesn't modify functions of mongoose

## Do's and Dont's of Typegoose

- Typegoose is a wrapper for mongoose's models
- Typegoose aims to not modify any functions of mongoose
- Typegoose aims to get mongoose's models to be stable through type-information
- Typegoose aims to make mongoose more usable by making the models more type-rich (thanks to TypeScript)
- Decorated schema configuration classes (like KittenClass above) must use explicit type declaration
instead of type inference for their types.  Otherwise, a property's type will become Mixed!  This is
because Typegoose uses emitDecoratorMetadata to determine types, and by design, emitDecorator emits the
explicit type instead of what's inferred (see [microsoft/TypeScript#18995](https://github.com/microsoft/TypeScript/issues/18995)).
