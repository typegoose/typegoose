# Typegoose

[![Build Status](https://travis-ci.org/szokodiakos/typegoose.svg?branch=master)](https://travis-ci.org/szokodiakos/typegoose)
[![Coverage Status](https://coveralls.io/repos/github/szokodiakos/typegoose/badge.svg?branch=master)](https://coveralls.io/github/szokodiakos/typegoose?branch=master)
[![npm](https://img.shields.io/npm/dt/typegoose.svg)]()

Define Mongoose models using TypeScript classes.

## Basic usage

```typescript
import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';
import * as mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/test');

class User extends Typegoose {
  @prop()
  name?: string;
}

const UserModel = new User().getModelForClass(User);

// UserModel is a regular Mongoose Model with correct types
(async () => {
  const u = new UserModel({ name: 'JohnDoe' });
  await u.save();
  const user = await UserModel.findOne();

  // prints { _id: 59218f686409d670a97e53e0, name: 'JohnDoe', __v: 0 }
  console.log(user);
})();
```

## Motivation

A common problem when using Mongoose with TypeScript is that you have to define both the Mongoose model and the TypeScript interface. If the model changes, you also have to keep the TypeScript interface file in sync or the TypeScript interface would not represent the real data structure of the model.

Typegoose aims to solve this problem by defining only a TypeScript interface (class) which need to be enhanced with special Typegoose decorators.

Under the hood it uses the [reflect-metadata](https://github.com/rbuckton/reflect-metadata) API to retrieve the types of the properties, so redundancy can be significantly reduced.

Instead of:
```typescript
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
```typescript
class Job {
  @prop()
  title?: string;

  @prop()
  position?: string;
}

class Car extends Typegoose {
  @prop()
  model?: string;
}

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
```
Please note that sub documents doesn't have to extend Typegoose. You can still give them default value in `prop` decorator, but you can't create static or instance methods on them.

## Requirements

* TypeScript 2.1+
* `emitDecoratorMetadata` and `experimentalDecorators` must be enabled in `tsconfig.json`

## Install

`npm install typegoose -S`

## Testing

`npm test`

## API Documentation

### Typegoose class

This is the class which your schema defining classes must extend.

#### Methods:

`getModelForClass<T>(t: T, options?: GetModelForClassOptions)`

This method returns the corresponding Mongoose Model for the class (`T`). If no Mongoose model exists for this class yet, one will be created automatically (by calling the method `setModelForClass`).


`setModelForClass<T>(t: T, options?: GetModelForClassOptions)`

This method assembles the Mongoose Schema from the decorated schema defining class, creates the Mongoose Model and returns it. For typing reasons, the schema defining class must be passed down to it.

Hint: If a Mongoose Model already exists for this class, it will be overwritten.


The `GetModelForClassOptions` provides multiple optional configurations:
 * `existingMongoose: mongoose`: An existing Mongoose instance can also be passed down. If given, Typegoose uses this Mongoose instance's `model` methods.
 * `schemaOptions: mongoose.SchemaOptions`: Additional [schema options](http://mongoosejs.com/docs/guide.html#options) can be passed down to the schema-to-be-created.
 * `existingConnection: mongoose.Connection`: An existing Mongoose connection can also be passed down. If given, Typegoose uses this Mongoose instance's `model` methods.

### Property decorators

Typegoose comes with TypeScript decorators, which responsibility is to connect the Mongoose schema behind the TypeScript class.

#### prop(options)

The `prop` decorator adds the target class property to the Mongoose schema as a property. Typegoose checks the decorated property's type and sets the schema property accordingly. If another Typegoose extending class is given as the type, Typegoose will recognize this property as a sub document.

The `options` object accepts multiple config properties:
  - `required`: Just like the [Mongoose required](http://mongoosejs.com/docs/api.html#schematype_SchemaType-required)
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

  - `index`: Tells Mongoose whether to define an index for the property.

```typescript
@prop({ index: true })
indexedField?: string;
```

  - `unique`: Just like the [Mongoose unique](http://mongoosejs.com/docs/api.html#schematype_SchemaType-unique), tells Mongoose to ensure a unique index is created for this path.

```typescript
// this field is now unique across the collection
@prop({ unique: true })
uniqueId?: string;
```

```typescript
// this field is now unique across the collection
@prop({ unique: true })
uniqueId?: string;
```

  - `enum`: The enum option accepts a string array. The class property which gets this decorator should have an enum-like type which values are from the provided string array. The way how the enum is created is delegated to the developer, Typegoose needs a string array which hold the enum values, and a TypeScript type which tells the possible values of the enum.
  However, if you use TS 2.4+, you can use string enum as well.

```typescript
// Enum-like type and definition example.
type Gender = 'male' | 'female';
const Genders = {
  MALE: 'male' as Gender,
  FEMALE: 'female' as Gender,
};

@prop({ enum: Object.values(Genders) })
gender?: Gender;


// TS 2.4+ string enum example
enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

@prop({ enum: Gender })
gender?: Gender;
```

  - `default`: The provided value will be the default for that Mongoose property.

```typescript
@prop({ default: 'Nick' })
nickName?: string;
```

  - `ref`: By adding the `ref` option with another Typegoose class as value, a Mongoose reference property will be created. The type of the property on the Typegoose extending class should be `Ref<T>` (see Types section).

```typescript
class Car extends Typegoose {}

@prop({ ref: Car })
car?: Ref<Car>;
```

  - `min` / `max` (numeric validators): Same as [Mongoose numberic validators](http://mongoosejs.com/docs/api.html#schema_number_SchemaNumber-max).

```typescript
@prop({ min: 10, max: 21 })
age?: number;
```

  - `minlength` / `maxlength` / `match` (string validators): Same as [Mongoose string validators](http://mongoosejs.com/docs/api.html#schema_string_SchemaString-match).

```typescript
@prop({ minlength: 5, maxlength: 10, match: /[0-9a-f]*/ })
favouriteHexNumber: string;
```

Mongoose gives developers the option to create [virtual properties](http://mongoosejs.com/docs/api.html#schema_Schema-virtual). This means that actual database read/write will not occur these are just 'calculated properties'. A virtual property can have a setter and a getter. TypeScript also has a similar feature which Typegoose uses for virtual property definitions (using the `prop` decorator).

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

The `arrayProp` is a `prop` decorator which makes it possible to create array schema properties.

The `options` object accepts `required`, `enum` and `default`, just like the `prop` decorator. In addition to these the following properties exactly one should be given:

  - `items`: This will tell Typegoose that this is an array which consists of primitives (if `String`, `Number`, or other primitive type is given) or this is an array which consists of subdocuments (if it's extending the `Typegoose` class).

```typescript
@arrayProp({ items: String })
languages?: string[];
```

Note that unfortunately the [reflect-metadata](https://github.com/rbuckton/reflect-metadata) API does not let us determine the type of the array, it only returns `Array` when the type of the property is queried. This is why redundancy is required here.

  - `itemsRef`: In mutual exclusion with `items`, this tells Typegoose that instead of a subdocument array, this is an array with references in it. On the Mongoose side this means that an array of Object IDs will be stored under this property. Just like with `ref` in the `prop` decorator, the type of this property should be `Ref<T>[]`.

```typescript
class Car extends Typegoose {}

@arrayProp({ itemsRef: Car })
previousCars?: Ref<Car>[];
```

### Method decorators

In Mongoose we can attach two types of methods for our schemas: static (model) methods and instance methods. Both of them are supported by Typegoose.

#### staticMethod

Static Mongoose methods must be declared with `static` keyword on the Typegoose extending class. This will ensure, that these methods are callable on the Mongoose model (TypeScript won't throw development-time error for unexisting method on model object).

If we want to use another static method of the model (built-in or created by us) we have to override the `this` in the method using the [type specifying of `this` for functions](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#specifying-the-type-of-this-for-functions). If we don't do this, TypeScript will throw development-time error on missing methods.

```typescript
@staticMethod
static findByAge(this: ModelType<User> & typeof User, age: number) {
  return this.findOne({ age });
}
```

Note that the `& typeof T` is only mandatory if we want to use the developer defined static methods inside this static method. If not then the `ModelType<T>` is sufficient, which will be explained in the Types section.

#### instanceMethod

Instance methods are on the Mongoose document instances, thus they must be defined as non-static methods. Again if we want to call other instance methods the type of `this` must be redefined to `InstanceType<T>` (see Types).

```typescript
@instanceMethod
incrementAge(this: InstanceType<User>) {
  const age = this.age || 1;
  this.age = age + 1;
  return this.save();
}
```

### Class decorators

Mongoose allows the developer to add pre and post [hooks / middlewares](http://mongoosejs.com/docs/middleware.html) to the schema. With this it is possible to add document transformations and observations before or after validation, save and more.

Typegoose provides this functionality through TypeScript's class decorators.

### pre

We can simply attach a `@pre` decorator to the Typegoose class and define the hook function like you normally would in Mongoose.

```typescript
@pre<Car>('save', function(next) { // or @pre(this: Car, 'save', ...
  if (this.model === 'Tesla') {
    this.isFast = true;
  }
  next();
})
class Car extends Typegoose {
  @prop({ required: true })
  model: string;

  @prop()
  isFast: boolean;
}
```

This will execute the pre-save hook each time a `Car` document is saved. Inside the pre-hook Mongoose binds the actual document to `this`.

Note that additional typing information is required either by passing the class itself as a type parameter `<Car>` or explicity telling TypeScript that `this` is a `Car` (`this: Car`). This will grant typing informations inside the hook function.

#### post

Same as `pre`, the `post` hook is also implemented as a class decorator. Usage is equivalent with the one Mongoose provides.

```typescript
@post<Car>('save', (car) => { // or @post('save', (car: Car) => { ...
  if (car.topSpeedInKmH > 300) {
    console.log(car.model, 'is fast!');
  }
})
class Car extends Typegoose {
  @prop({ required: true })
  model: string;

  @prop({ required: true })
  topSpeedInKmH: number;
}
```

Of course `this` is not the document in a post hook (see Mongoose docs). Again typing information is required either by explicit parameter typing or by providing a template type.

#### plugin

Using the `plugin` decorator enables the developer to attach various Mongoose plugins to the schema. Just like the regular `schema.plugin()` call, the decorator accepts 1 or 2 parameters: the plugin itself, and an optional configuration object. Multiple `plugin` decorator can be used for a single Typegoose class.

If the plugin enhances the schema with additional properties or instance / static methods this typing information should be added manually to the Typegoose class as well.

```typescript
import * as findOrCreate from 'mongoose-findorcreate';

@plugin(findOrCreate)
class User extends Typegoose {
  // this isn't the complete method signature, just an example
  static findOrCreate(condition: InstanceType<User>):
    Promise<{ doc: InstanceType<User>, created: boolean }>;
}

const UserModel = new User().getModelForClass(User);
UserModel.findOrCreate({ ... }).then(findOrCreateResult => {
  ...
});
```

### Types

Some additional types were added to make Typegoose more user friendly.

#### InstanceType<T>

This is basically the logical 'and' of the `T` and the `mongoose.Document`, so that both the Mongoose instance properties/functions and the user defined properties/instance methods are available on the instance.

#### ModelType<T>

This is the logical 'and' of `mongoose.Model<InstanceType<T>>` and `T`, so that the Mongoose model creates `InstanceType<T>` typed instances and all user defined static methods are available on the model.

#### Ref<T>

`Ref<T>` means `T` logical 'or' `string`, so that both populated and unpopulated scenarios are handled for the reference property.

## Improvements

* Add frequently used (currently not present) features if needed
* Create moar tests (break down current huge one into multiple unit tests)
