# Typegoose

[![Build Status](https://travis-ci.org/szokodiakos/typegoose.svg?branch=master)](https://travis-ci.org/szokodiakos/typegoose)

Define Mongoose models using TypeScript classes.

A common problem when using Mongoose with TypeScript is that you have to define
both the Mongoose model and the TypeScript interface. If the model changes, you also have to keep the TypeScript interface file in sync
or the TypeScript interface would not represent the real data structure of the
model.

Typegoose aims to solve this problem by defining only a TypeScript interface (class)
which need to be enhanced with special Typegoose decorators.

Instead of:
```typescript
interface User {
  name?: string;
  age: number;
  job?: Job;
  car: Car | string;
}

interface Job {
  title?: string;
  position?: string;
}

interface Car {
  model?: string;
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
```typescript
class User extends Typegoose {
  @prop()
  name?: string;

  @prop({ required: true })
  age: number;

  @prop()
  job?: Job;

  @prop({ ref: Car, required: true })
  car: Ref<Car>;
}

class Job extends Typegoose {
  @prop()
  title?: string;

  @prop()
  position?: string;
}

class Car extends Typegoose {
  @prop()
  model?: string;
}
```

## Requirements

* TypeScript 2.1+
* Yarn

## Install

`yarn add typegoose`

## API Documentation

### Classes

#### Typegoose

This is the class which your schema defining classes must extend.

##### Methods:

`getModelForClass<T>(t: T)`

This method assembles the Mongoose Schema from the decorated schema defining class, creates the Mongoose Model and returns it. For typing reasons the schema defining class must be passed down to it.

### Decorators

#### prop(options)

TODO About simple props, ref props, enums, validators, virtuals

#### arrayProp(options)

TODO

#### staticMethod

TODO About this typing, method must be static

#### instanceMethod

TODO About this typing, method mustnt be static

### Types

#### InstanceType<T>

TODO

#### ModelType<T>

TODO

#### Ref<T>

TODO

## Improvements

* Add frequently used (currently not present) features if needed
* Create moar tests (break down current huge one into multiple unit tests)
* Add coverage & linting