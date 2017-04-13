# Typegoose

[![Build Status](https://travis-ci.org/szokodiakos/typegoose.svg?branch=master)](https://travis-ci.org/szokodiakos/typegoose)

Define Mongoose models using TypeScript classes.

## Motivation

A common problem when using Mongoose with TypeScript is that you have to define
both the Mongoose model and the TypeScript interface. If the model changes, you
also have to keep the TypeScript interface file in sync or the TypeScript interface
would not represent the real data structure of the model.

Typegoose aims to solve this problem by defining only a TypeScript interface (class)
which need to be enhanced with special Typegoose decorators.

Under the hood it uses the [reflect-metadata](https://github.com/rbuckton/reflect-metadata) API to retrieve the types
of the properties.

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

## Testing

`yarn test`

## API Documentation

### Typegoose class

This is the class which your schema defining classes must extend.

#### Methods:

`getModelForClass<T>(t: T)`

This method assembles the Mongoose Schema from the decorated schema defining class, creates the Mongoose Model and returns it. For typing reasons the schema defining class must be passed down to it.

### Decorators

Typegoose comes with TypeScript decorators, which responsibility is to connect the Mongoose schema behind the TypeScript class.

#### prop(options)

The `prop` decorator adds the target class property to the Mongoose schema as a property. Typegoose checks the
decorated property's type and sets the schema property accordingly. If another Typegoose extending class is
given as the type, Typegoose will recognize this property as a sub document.
The `options` object accepts multiple config properties:
  - required: Just like the [Mongoose required](http://mongoosejs.com/docs/api.html#schematype_SchemaType-required)
    it accepts a handful of parameters. Please note that it's the developer's responsibility to make sure that
    if `required` is set to `false` then the class property should be [optional](https://www.typescriptlang.org/docs/handbook/interfaces.html#optional-properties).

```typescript
// this is now required in the schema
@prop({ required: true })
firstName: string;

// by default, a property is not required
@prop()
lastName?: string; // using the ? optional property
```

  - enum: The enum option accepts a string array. The class property which gets this decorator should have an
    enum-like type which values are from the provided string array. The way how the enum is created is delegated
    to the developer, Typegoose needs a string array which hold the enum values, and a TypeScript type which
    tells the possible values of the enum.

```typescript
// Enum-like type and definition example.
type Gender = 'male' | 'female';
const Genders = {
  MALE: 'male' as Gender,
  FEMALE: 'female' as Gender,
};

@prop({ enum: Object.values(Genders) })
gender?: Gender;
```

  - default: The provided value will be the default for that Mongoose property.

```typescript
@prop({ default: 'Nick' })
nickName?: string;
```

  - ref: By adding the `ref` option with another Typegoose class as value, a Mongoose reference property will be
    created. The type of the property on the Typegoose extending class should be Ref<T> (see Types section).

```typescript
class Car extends Typegoose {}

@prop({ ref: Car })
car?: Ref<Car>;
```

  - min/max (numeric validators): Same as [Mongoose numberic validators](http://mongoosejs.com/docs/api.html#schema_number_SchemaNumber-max).

```typescript
@prop({ min: 10, max: 21 })
age?: number;
```

  - minlength / maxlength / match (string validators): Same as [Mongoose string validators](http://mongoosejs.com/docs/api.html#schema_string_SchemaString-match).

```typescript
@prop({ minlength: 5, maxlength: 10, match: /[0-9a-f]*/ })
favouriteHexNumber: string;
```

Mongoose gives developers the option to create [virtual properties](http://mongoosejs.com/docs/api.html#schema_Schema-virtual). This means that actual database read/write will not occur
these are just 'calculated properties'. A virtual property can have a setter and a getter. TypeScript also has
a similar feature which Typegoose uses for virtual property definitions (using the `prop` decorator).

```typescript
@prop()
firstName?: string;

@prop()
lastName?: string;

@prop() // this will create a virtual property called 'fullName'
get fullName() {
  return `${this.firstName} ${this.lastName}`;
}
set fullName(full) {
  const [firstName, lastName] = full.split(' ');
  this.firstName = firstName;
  this.lastName = lastName;
}
```

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