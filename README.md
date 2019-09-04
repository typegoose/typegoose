# This Repository got moved

Please use [hasezoey's fork](https://github.com/hasezoey/typegoose) to be up-to-date
Please dont create new issues & pull request anymore, thanks

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

# Typegoose

[![Build Status](https://travis-ci.org/szokodiakos/typegoose.svg?branch=master)](https://travis-ci.org/szokodiakos/typegoose)
[![Coverage Status](https://coveralls.io/repos/github/szokodiakos/typegoose/badge.svg?branch=master#feb282019)](https://coveralls.io/github/szokodiakos/typegoose?branch=master)
[![npm](https://img.shields.io/npm/dt/typegoose.svg)]()

Define Mongoose models using TypeScript classes.

## Basic usage

```ts
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
  const u = await UserModel.create({ name: 'JohnDoe' });
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
  age!: number;

  @prop()
  job?: Job;

  @prop({ ref: Car })
  car?: Ref<Car>;
}
```

Please note that sub documents do not have to extend Typegoose. You can still give them default value in `prop` decorator, but you can't create static or instance methods on them.

## Requirements

* TypeScript 3.2+
* Node 8+
* mongoose 5+
* `emitDecoratorMetadata` and `experimentalDecorators` must be enabled in `tsconfig.json`
* `reflect-metadata` must be installed

## Install

`npm install typegoose -S`

You also need to install `mongoose` and `reflect-metadata`, in versions < 5.0, these packages were listed as dependencies in `package.json`, starting with version 5.0 these packages are listed as peer dependencies.

`npm install mongoose reflect-metadata -S`

## Testing

`npm test`

## Versioning

`Major.Minor.Fix` (or how npm expresses it `Major.Minor.Patch`)

* `0.0.x` is for minor fixes, like hot-fixes
* `0.x.0` is for Minor things like adding features, that are non-breaking (or at least should not be breaking anything)
* `x.0.0` is for Major things like adding features that are breaking or refactoring which is a breaking change
* `0.0.0-x` is for a Pre-Release, that are not yet ready to be published

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

    Note: for coding style (and type completion) you should use `!` when it is marked as required

    ```ts
    // this is now required in the schema
    @prop({ required: true })
    firstName!: string;

    // by default, a property is not required
    @prop()
    lastName?: string; // using the ? optional property
    ```

  - `index`: Tells Mongoose whether to define an index for the property.

    ```ts
    @prop({ index: true })
    indexedField?: string;
    ```

  - `unique`: Just like the [Mongoose unique](http://mongoosejs.com/docs/api.html#schematype_SchemaType-unique), tells Mongoose to ensure a unique index is created for this path.

    ```ts
    // this field is now unique across the collection
    @prop({ unique: true })
    uniqueId?: string;
    ```

  - `enum`: The enum option accepts a string array. The class property which gets this decorator should have an enum-like type which values are from the provided string array. The way how the enum is created is delegated to the developer, Typegoose needs a string array which hold the enum values, and a TypeScript type which tells the possible values of the enum.
  However, if you use TS 2.4+, you can use string enum as well.

    ```ts
    enum Gender {
      MALE = 'male',
      FEMALE = 'female',
    }

    @prop({ enum: Gender })
    gender?: Gender;
    ```

  - `lowercase`: for strings only; whether to always call .toLowerCase() on the value.

    ```ts
    @prop({ lowercase: true })
    nickName?: string;
    ```

  - `uppercase`: for strings only; whether to always call .toUpperCase() on the value.

    ```ts
    @prop({ uppercase: true })
    nickName?: string;
    ```

  - `trim`: for strings only; whether to always call .trim() on the value.

    ```ts
    @prop({ trim: true })
    nickName?: string;
    ```

  - `default`: The provided value will be the default for that Mongoose property.

    ```ts
    @prop({ default: 'Nick' })
    nickName?: string;
    ```
    
  - `_id`: When false, no \_id is added to the subdocument

    ```ts
    class Car extends Typegoose {}
    
    @prop({ _id: false })
    car?: Car;
    ```

  - `ref`: By adding the `ref` option with another Typegoose class as value, a Mongoose reference property will be created. The type of the property on the Typegoose extending class should be `Ref<T>` (see Types section).

    ```ts
    class Car extends Typegoose {}

    @prop({ ref: Car })
    car?: Ref<Car>;
    ```

  - `refPath`: Is the same as `ref`, only that it looks at the path specified, and this path decides which model to use

    ```ts
    class Car extends Typegoose {}
    class Shop extends Typegoose {}

    // in another class
    class Another extends Typegoose {
      @prop({ required: true, enum: 'Car' | 'Shop' })
      which!: string;

      @prop({ refPath: 'which' })
      kind?: Ref<Car | Shop>;
    }
    ```

  - `min` / `max` (numeric validators): Same as [Mongoose numberic validators](http://mongoosejs.com/docs/api.html#schema_number_SchemaNumber-max).

    ```ts
    @prop({ min: 10, max: 21 })
    age?: number;
    ```

  - `minlength` / `maxlength` / `match` (string validators): Same as [Mongoose string validators](http://mongoosejs.com/docs/api.html#schema_string_SchemaString-match).

    ```ts
    @prop({ minlength: 5, maxlength: 10, match: /[0-9a-f]*/ })
    favouriteHexNumber?: string;
    ```


  - `validate` (custom validators): You can define your own validator function/regex using this. The function has to return a `boolean` or a Promise (async validation).

    ```ts
    // you have to get your own `isEmail` function, this is a placeholder

    @prop({ validate: (value) => isEmail(value)})
    email?: string;

    // or

    @prop({ validate: (value) => { return new Promise(res => { res(isEmail(value)) }) })
    email?: string;

    // or

    @prop({ validate: {
        validator: val => isEmail(val),
        message: `{VALUE} is not a valid email`
    }})
    email?: string;

    // or

    @prop({ validate: /\S+@\S+\.\S+/ })
    email?: string;

    // you can also use multiple validators in an array.

    @prop({ validate:
      [
        {
            validator: val => isEmail(val),
            message: `{VALUE} is not a valid email`
        },
        {
            validator: val => isBlacklisted(val),
            message: `{VALUE} is blacklisted`
        }
      ]
    })
    email?: string;
    ```

  - `alias` (alias): Same as [Mongoose Alias](https://mongoosejs.com/docs/guide.html#aliases), only difference is the extra property for type completion
    ```ts
    class Dummy extends Typegoose {
      @prop({ alias: "helloWorld" })
      public hello: string; // will be included in the DB
      public helloWorld: string; // will NOT be included in the DB, just for type completion (gets passed as hello in the DB)
    }
    ```

Mongoose gives developers the option to create [virtual properties](http://mongoosejs.com/docs/api.html#schema_Schema-virtual). This means that actual database read/write will not occur these are just 'calculated properties'. A virtual property can have a setter and a getter. TypeScript also has a similar feature which Typegoose uses for virtual property definitions (using the `prop` decorator).

```ts
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

TODO: add documentation for virtual population

#### arrayProp(options)

The `arrayProp` is a `prop` decorator which makes it possible to create array schema properties.

The `options` object accepts `required`, `enum` and `default`, just like the `prop` decorator. In addition to these the following properties exactly one should be given:

  - `items`: This will tell Typegoose that this is an array which consists of primitives (if `String`, `Number`, or other primitive type is given) or this is an array which consists of subdocuments (if it's extending the `Typegoose` class).

    ```ts
    @arrayProp({ items: String })
    languages?: string[];
    ```

Note that unfortunately the [reflect-metadata](https://github.com/rbuckton/reflect-metadata) API does not let us determine the type of the array, it only returns `Array` when the type of the property is queried. This is why redundancy is required here.

  - `itemsRef`: In mutual exclusion with `items`, this tells Typegoose that instead of a subdocument array, this is an array with references in it. On the Mongoose side this means that an array of Object IDs will be stored under this property. Just like with `ref` in the `prop` decorator, the type of this property should be `Ref<T>[]`.

    ```ts
    class Car extends Typegoose {}

    // in another class
    @arrayProp({ itemsRef: Car })
    previousCars?: Ref<Car>[];
    ```

  - `itemsRefPath`(IRP): Is the same as `itemsRef` only that it looks at the specified path of the class which specifies which model to use

    ```ts
    class Car extends Typegoose {}
    class Shop extends Typegoose {}

    // in another class
    class Another extends Typegoose {
      @prop({ required: true, enum: 'Car' | 'Shop' })
      which!: string;

      @arrayProp({ itemsRefPath: 'which' })
      items?: Ref<Car | Shop>[];
    }
    ```

#### mapProp(options)

The `mapProp` is a `prop` decorator which makes it possible to create map schema properties.

The options object accepts `enum` and `default`, just like `prop`  decorator. In addition to these the following properties are accepted:

  - `of`  : This will tell Typegoose that the Map value consists of primitives (if `String`, `Number`, or other primitive type is given) or this is an array which consists of subdocuments (if it's extending the `Typegoose` class).

    ```ts
    class Car extends Typegoose {
      @mapProp({ of: Car })
      public keys?: Map<string, Car>;
    }
    ```

  - `mapDefault` : This will set the default value for the map.

    ```ts
    enum ProjectState {
        WORKING = 'working',
        BROKEN = 'broken',
        MAINTAINANCE = 'maintainance',
    }

    class Car extends Typegoose {
      @mapProp({ of: String, enum: ProjectState,mapDefault: { 'MainProject' : ProjectState.WORKING }})
      public projects?: Map<string, ProjectState>;
    }
    ```

### Method decorators

In Mongoose we can attach two types of methods for our schemas: static (model) methods and instance methods. Both of them are supported by Typegoose.

#### staticMethod

Static Mongoose methods must be declared with `static` keyword on the Typegoose extending class. This will ensure, that these methods are callable on the Mongoose model (TypeScript won't throw development-time error for unexisting method on model object).

If we want to use another static method of the model (built-in or created by us) we have to override the `this` in the method using the [type specifying of `this` for functions](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#specifying-the-type-of-this-for-functions). If we don't do this, TypeScript will throw development-time error on missing methods.

```ts
@staticMethod
static findByAge(this: ModelType<User> & typeof User, age: number) {
  return this.findOne({ age });
}
```

Note that the `& typeof T` is only mandatory if we want to use the developer defined static methods inside this static method. If not then the `ModelType<T>` is sufficient, which will be explained in the Types section.

#### instanceMethod

Instance methods are on the Mongoose document instances, thus they must be defined as non-static methods. Again if we want to call other instance methods the type of `this` must be redefined to `InstanceType<T>` (see Types).

```ts
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

#### pre

We can simply attach a `@pre` decorator to the Typegoose class and define the hook function like you normally would in Mongoose.
(Method supports REGEXP)

```ts
@pre<Car>('save', function(next) { // or @pre(this: Car, 'save', ...
  if (this.model === 'Tesla') {
    this.isFast = true;
  }
  next();
})
class Car extends Typegoose {
  @prop({ required: true })
  model!: string;

  @prop()
  isFast?: boolean;
}
```

This will execute the pre-save hook each time a `Car` document is saved. Inside the pre-hook Mongoose binds the actual document to `this`.

Note that additional typing information is required either by passing the class itself as a type parameter `<Car>` or explicity telling TypeScript that `this` is a `Car` (`this: Car`). This will grant typing informations inside the hook function.

#### post

Same as `pre`, the `post` hook is also implemented as a class decorator. Usage is equivalent with the one Mongoose provides.
(Method supports REGEXP)

```ts
@post<Car>('save', (car) => {
  if (car.topSpeedInKmH > 300) {
    console.log(car.model, 'is fast!');
  }
})
class Car extends Typegoose {
  @prop({ required: true })
  model!: string;

  @prop({ required: true })
  topSpeedInKmH!: number;
}
```

Of course `this` is not the document in a post hook (see Mongoose docs). Again typing information is required either by explicit parameter typing or by providing a template type.

#### plugin

Using the `plugin` decorator enables the developer to attach various Mongoose plugins to the schema. Just like the regular `schema.plugin()` call, the decorator accepts 1 or 2 parameters: the plugin itself, and an optional configuration object. Multiple `plugin` decorator can be used for a single Typegoose class.

If the plugin enhances the schema with additional properties or instance / static methods this typing information should be added manually to the Typegoose class as well.

```ts
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

#### index

The `@index` decorator can be used to define advanced index types and index options not available via the
`index` option of the `@prop` property decorator, such as compound indices, GeoJSON index types,
partial indices, expiring documents, etc. Any values supported by
[MongoDB's createIndex()](https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/#db.collection.createIndex)
are also valid for `@index`. For more info refer to interface `IndexOptions`

 ```ts
@index({ article: 1, user: 1 }, { unique: true })
@index({ location: '2dsphere' })
@index({ article: 1 }, { partialFilterExpression: { stars: { $gte: 4.5 } } })
export class Location extends Typegoose {
  @prop()
  article?: number;

  @prop()
  user?: number;

  @prop()
  stars?: number;

  @arrayProp({ items: Array })
  location?: [[Number]]
}
```

### Types

Some additional types were added to make Typegoose more user friendly.

#### InstanceType<T>

This is basically the logical 'and' of the `T` and the `mongoose.Document`, so that both the Mongoose instance properties/functions and the user defined properties/instance methods are available on the instance.

Note: TypeScript has its own InstanceType, you should import it from Typegoose

#### ModelType<T>

This is the logical 'and' of `mongoose.Model<InstanceType<T>>` and `T`, so that the Mongoose model creates `InstanceType<T>` typed instances and all user defined static methods are available on the model.

#### Ref<T>

For reference properties:
`Ref<T>` - `T` if populated and `ObjectID` if unpopulated.

## Improvements

* Add frequently used (currently not present) features if needed
* Create more tests (break down current huge one into multiple unit tests)
* Add Tests for:
  - Hooks: add hook test for pre & post with error
  - test for the errors (if invalid arguments are given)
  - improve baseProp `required` handeling ()

### Notes

* `mongoose` is a peer-dependency, and a dev dependency to install it for dev purposes
* Please dont add comments with `+1` or something like that, use the Reactions
* Typegoose **cannot** be used with classes of the same name, it will always return the first build class with that name
* All Models in Typegoose are set to strict by default, and **cant** be changed!
