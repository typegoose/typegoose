# Typegoose

<sub>(These badges are from typegoose:master)</sub>  
[![Build Status](https://travis-ci.com/typegoose/typegoose.svg?branch=master)](https://travis-ci.com/typegoose/typegoose)
[![Coverage Status](https://coveralls.io/repos/github/typegoose/typegoose/badge.svg?branch=master#feb282019)](https://coveralls.io/github/typegoose/typegoose?branch=master)
[![npm](https://img.shields.io/npm/dt/@typegoose/typegoose.svg)](https://www.npmjs.com/package/@typegoose/typegoose)

Define Mongoose models using TypeScript classes.

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

Typegoose aims to solve this problem by defining only a TypeScript interface (class) which need to be enhanced with special Typegoose decorators.

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

---

## Requirements

* TypeScript 3.7+
* Node 8.10+
* mongoose ^5.9.2
* `emitDecoratorMetadata` and `experimentalDecorators` must be enabled in `tsconfig.json`

## Install

`npm i -s @typegoose/typegoose`

You also need to install `mongoose`, since version 5 it is listed as a peer-dependency

`npm i -s mongoose`

## Testing

`npm run test`
Run our tests after running `npm i -D`

## Versioning

`Major.Minor.Fix` (or how npm expresses it `Major.Minor.Patch`)  
(This Project should comply with [Semver](https://semver.org))

## Join Our Discord Server

To ask questions or just talk with us [join our Discord Server](https://discord.gg/BpGjTTD)

## Documentation

[Here is the Documentation](https://typegoose.github.io/typegoose/docs)  
[Here are the Guides](https://typegoose.github.io/typegoose/guides/quick-start-guide/)  

## Migrate to 6.0.0

[Migrate to 6.0.0](https://typegoose.github.io/typegoose/guides/migrate-to-6/)

## Known Issues

[Here are the known-issues](https://typegoose.github.io/typegoose/guides/known-issues/)

## FAQ

[Here is the FAQ](https://typegoose.github.io/typegoose/guides/faq/)

## Notes

* Please dont add comments with `+1` or something like that, use the Reactions
* `npm run doc` generates all documentation for all files that can be used as modules (is used for github-pages)
* `npm run doc:all` generates documentation even for internal modules
