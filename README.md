# Typegoose

<sub>(These badges are from typegoose:master)</sub>  
[![Node.js Tests](https://github.com/typegoose/typegoose/workflows/Node.js%20Tests/badge.svg?branch=master)](https://github.com/typegoose/typegoose/actions?query=workflow%3A"Node.js+Tests")
[![codecov.io](https://codecov.io/github/typegoose/typegoose/coverage.svg?branch=master)](https://codecov.io/github/typegoose/typegoose?branch=master)
[![npm](https://img.shields.io/npm/dt/@typegoose/typegoose.svg)](https://www.npmjs.com/package/@typegoose/typegoose)

Define Mongoose models using TypeScript classes

## Migration

Migration Guides:  
(Date format: `dd-mm-yyyy`)

- [8 to 9](https://typegoose.github.io/typegoose/docs/guides/migration/migrate-9) (released on `22-09-2021`)
- [7 to 8](https://typegoose.github.io/typegoose/docs/guides/migration/migrate-8) (released on `28-07-2021`)
- [6 to 7](https://typegoose.github.io/typegoose/docs/guides/migration/migrate-7) (released on `01-04-2020`)
- [5 to 6](https://typegoose.github.io/typegoose/docs/guides/migration/migrate-6) (released on `30-09-2019`)

## Basic usage

```ts
import { prop, getModelForClass } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

class User {
  @prop()
  public name?: string;

  @prop({ type: () => [String] })
  public jobs?: string[];
}

const UserModel = getModelForClass(User); // UserModel is a regular Mongoose Model with correct types

(async () => {
  await mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'test' });

  const { _id: id } = await UserModel.create({ name: 'JohnDoe', jobs: ['Cleaner'] } as User); // an "as" assertion, to have types for all properties
  const user = await UserModel.findById(id).exec();

  console.log(user); // prints { _id: 59218f686409d670a97e53e0, name: 'JohnDoe', __v: 0 }
})();
```

## Motivation

A common problem when using Mongoose with TypeScript is that you have to define both the Mongoose model and the TypeScript interface. If the model changes, you also have to keep the TypeScript interface file in sync or the TypeScript interface would not represent the real data structure of the model.

Typegoose aims to solve this problem by defining only a TypeScript interface (class), which needs to be enhanced with special Typegoose decorators (like `@prop`).

Under the hood it uses the Reflect & [reflect-metadata](https://github.com/rbuckton/reflect-metadata) API to retrieve the types of the properties, so redundancy can be significantly reduced.

Instead of writing this:

```ts
// This is a representation of how typegoose's compile output would look like
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
  public age!: number; // This is a single Primitive

  @prop({ type: () => [String] })
  public preferences?: string[]; // This is a Primitive Array

  @prop()
  public mainJob?: Job; // This is a single SubDocument

  @prop({ type: () => Job })
  public jobs?: Job[]; // This is a SubDocument Array

  @prop({ ref: () => Car })
  public mainCar?: Ref<Car>; // This is a single Reference

  @prop({ ref: () => Car })
  public cars?: Ref<Car>[]; // This is a Reference Array
}
```

[Extra Examples](https://typegoose.github.io/typegoose/docs/guides/quick-start-guide#extra-examples)

---

## Requirements & Install

[Typegoose's Quick Start Guide](https://typegoose.github.io/typegoose/docs/guides/quick-start-guide)

## Testing

```sh
yarn install
yarn run test
```

## Versioning

This Project should comply with [Semver](https://semver.org). It uses the `Major.Minor.Fix` standard (or in NPM terms, `Major.Minor.Patch`).

## Join Our Discord Server

To ask questions or just talk with us, [join our Discord Server](https://discord.gg/BpGjTTD).

## Documentation

* [Typegoose Documentation](https://typegoose.github.io/typegoose/docs/api/index-api)
* [Quick start guide](https://typegoose.github.io/typegoose/docs/guides/quick-start-guide/)

## Known Issues

[Here are the known-issues](https://typegoose.github.io/typegoose/docs/guides/known-issues/)

## FAQ

[Here is the FAQ](https://typegoose.github.io/typegoose/docs/guides/faq/)

## Notes

* Please don't add `+1` or similar comments to issues. Use the reactions instead.
