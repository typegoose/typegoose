# Typegoose

<sub>(These badges are from typegoose:master)</sub>  
[![Build Status](https://travis-ci.com/typegoose/typegoose.svg?branch=master)](https://travis-ci.com/typegoose/typegoose)
[![Coverage Status](https://coveralls.io/repos/github/typegoose/typegoose/badge.svg?branch=master#feb282019)](https://coveralls.io/github/typegoose/typegoose?branch=master)
[![npm](https://img.shields.io/npm/dt/@typegoose/typegoose.svg)](https://www.npmjs.com/package/@typegoose/typegoose)

Define Mongoose models using TypeScript classes

## Basic usage

```ts
import { prop, getModelForClass } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

class User {
  @prop()
  public name?: string;
}

const UserModel = getModelForClass(User); // UserModel is a regular Mongoose Model with correct types

(async () => {
  await mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "test" });

  const { _id: id } = await UserModel.create({ name: 'JohnDoe' } as User); // an "as" assertion, to have types for all properties
  const user = await UserModel.findById(id).exec();

  console.log(user); // prints { _id: 59218f686409d670a97e53e0, name: 'JohnDoe', __v: 0 }
})();
```

## Motivation

A common problem when using Mongoose with TypeScript is that you have to define both the Mongoose model and the TypeScript interface. If the model changes, you also have to keep the TypeScript interface file in sync or the TypeScript interface would not represent the real data structure of the model.

Typegoose aims to solve this problem by defining only a TypeScript interface (class), which needs to be enhanced with special Typegoose decorators (like `@prop`).

Under the hood it uses the Reflect & [reflect-metadata](https://github.com/rbuckton/reflect-metadata) API to retrieve the types of the properties, so redundancy can be significantly reduced.

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
  age: number;
  job?: Job;
  car: Car | string;
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
}
```

[Extra Examples](https://typegoose.github.io/typegoose/docs/guides/quick-start-guide#extra-examples)

---

## Requirements

* TypeScript 3.9+
* Node 10.15+
* mongoose ^5.9.22
* `experimentalDecorators` and `emitDecoratorMetadata` must be enabled in `tsconfig.json`
* tsconfig option `target` being `ES6`

Note: it is recommended to not use babel [see here why](https://typegoose.github.io/typegoose/docs/guides/known-issues/#babel)

## Install

```sh
npm i -s @typegoose/typegoose # install typegoose itself

npm i -s mongoose # install peer-dependencie mongoose
npm i -D @types/mongoose # install all types for mongoose - this is required for typegoose to work in typescript
```

## Testing

```sh
npm i -D
npm test
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
