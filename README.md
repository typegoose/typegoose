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
  name?: string;
}

const UserModel = getModelForClass(User);

// UserModel is a regular Mongoose Model with correct types
(async () => {
  await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

  const { _id: id } = await UserModel.create({ name: 'JohnDoe' });
  const user = await UserModel.findById(id).exec();

  console.log(user);
  // prints { _id: 59218f686409d670a97e53e0, name: 'JohnDoe', __v: 0 }
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

Please note that sub documents do not have to extend Typegoose. You can still give them default value in `prop` decorator, but you can't create static or instance methods on them.

---

## Requirements

* TypeScript 3.2+
* Node 8+
* mongoose ^5.7.1
* `emitDecoratorMetadata` and `experimentalDecorators` must be enabled in `tsconfig.json`

## Install

`npm i -s @typegoose/typegoose`

You also need to install `mongoose`, since version 5 it is listed as a peer-dependency

`npm i -s mongoose`

## [Migrate to 6.0.0](https://typegoose.github.io/typegoose/guides/migrate-to-6/)

## Testing

`npm run test`
Run our tests after running `npm i -D`

## Versioning

`Major.Minor.Fix` (or how npm expresses it `Major.Minor.Patch`)  
(This Project should comply with [Semver](https://semver.org))

## Join Our Discord Server

To ask questions or just talk with us [join our Discord Server](https://discord.gg/BpGjTTD)

---

## API Documentation

Please use [the new guides](https://typegoose.github.io/typegoose/guides/quick-start-guide/) and [the new docs](https://typegoose.github.io/typegoose/docs) this here is just for "legacy reasons" and might be deleted later

## Property decorators

Typegoose comes with TypeScript decorators, which responsibility is to connect the Mongoose schema behind the TypeScript class.

### prop(options)

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
    class Car {}

    @prop({ _id: false })
    car?: Car;
    ```

  - `ref`: By adding the `ref` option with another Typegoose class as value, a Mongoose reference property will be created. The type of the property on the Typegoose extending class should be `Ref<T>` (see Types section).

    ```ts
    class Car {}

    @prop({ ref: Car })
    car?: Ref<Car>;
    ```

  - `refPath`: Is the same as `ref`, only that it looks at the path specified, and this path decides which model to use

    ```ts
    class Car {}
    class Shop {}

    // in another class
    class Another {
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

    @prop({ validate: async (value) => { await isEmail(value) })
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
    class Dummy {
      @prop({ alias: "helloWorld" })
      public hello: string; // will be included in the DB
      public helloWorld: string; // will NOT be included in the DB, just for type completion (gets passed as hello in the DB)
    }
    ```

#### Virtuals

- Mongoose gives developers the option to create [virtual properties](http://mongoosejs.com/docs/api.html#schema_Schema-virtual). This means that actual database read/write will not occur these are just 'calculated properties'. A virtual property can have a setter and a getter. TypeScript also has a similar feature which Typegoose uses for virtual property definitions (using the `prop` decorator).

  example:

  ```ts
  class Name {
    @prop()
    firstName?: string;

    @prop()
    lastName?: string;

    // this will create a virtual property called 'fullName'
    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
    set fullName(full) {
      const [firstName, lastName] = full.split(' ');
      this.firstName = firstName;
      this.lastName = lastName;
    }
  }
  ```

  DB Document:

  ```js
  {
    _id: ObjectId("<some long id>"),
    firstName: "Will",
    lastName: "Smith"
  }
  ```

- Non-Virtuals are supported too:  
  example:

  ```ts
  function setFullName(val: string[]): string {
    return val.join(' ');
  }

  function getFullname(val: string): string[] {
    return val.split(' ');
  }

  class Name {
    @prop({ set: setFullName, get: getFullname })
    fullname: string[]; // this is just for type completion & getting the type for the schema
  }

  ...
  await NameModel.create({ fullname: ['Will', 'Smith'] });
  const [first, last]: string[] = (await NameModel.findOne({}).exec()).fullname;
  ```

  DB Document:

  ```js
  {
    _id: ObjectId("<some long id>"),
    fullname: "Will Smith"
  }
  ```

- Virtual-Populate is also supported by doing

  ```ts
  class RefClass {
    @prop({ required: true, ref: Virtual })
    public refToName: Ref<Virtual>;
  }
  class Name {
    @prop({ ref: RefClass, foreignField: 'refToName', localField: '_id', justOne: false })
    public somevalue: Ref<RefClass>;
  }
  ```

  Options ([look here for more details](https://mongoosejs.com/docs/api/schema.html#schema_Schema-virtual)):
    - `ref`: This is like a normal ref [Required]
    - `foreignField`: Which property(on the ref-Class) to match `localField` against [Required]
    - `localField`: Which property(on the current-Class) to match `foreignField` against [Required]
    - `justOne`: Return as One Document(true) or as Array(false) [Optional]
    - `count`: Return the number of Documents found instead of the actual Documents [Optional]

### arrayProp(options)

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
    class Car {}

    // in another class
    @arrayProp({ itemsRef: Car })
    previousCars?: Ref<Car>[];
    ```

  - `itemsRefPath`(IRP): Is the same as `itemsRef` only that it looks at the specified path of the class which specifies which model to use

    ```ts
    class Car {}
    class Shop {}

    // in another class
    class Another {
      @prop({ required: true, enum: ['Car', 'Shop'] })
      which!: string;

      @arrayProp({ itemsRefPath: 'which' })
      items?: Ref<Car | Shop>[];
    }
    ```

### Class decorators

Mongoose allows the developer to add pre and post [hooks / middlewares](http://mongoosejs.com/docs/middleware.html) to the schema. With this it is possible to add document transformations and observations before or after validation, save and more.

Typegoose provides this functionality through TypeScript's class decorators.

#### plugin

Using the `plugin` decorator enables the developer to attach various Mongoose plugins to the schema. Just like the regular `schema.plugin()` call, the decorator accepts 1 or 2 parameters: the plugin itself, and an optional configuration object. Multiple `plugin` decorator can be used for a single Typegoose class.

If the plugin enhances the schema with additional properties or instance / static methods this typing information should be added manually to the Typegoose class as well.

```ts
import * as findOrCreate from 'mongoose-findorcreate';

@plugin(findOrCreate)
class User {
  // this isn't the complete method signature, just an example
  static findOrCreate(condition: DocumentType<User>):
    Promise<{ doc: DocumentType<User>, created: boolean }>;
}

const UserModel = getModelForClass(User);
const result = await UserModel.findOrCreate({ ... });
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
class Location {
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

---

## Known Issues

[Here are the known-issues](https://typegoose.github.io/typegoose/guides/known-issues/)

## FAQ

[Here is the FAQ](https://typegoose.github.io/typegoose/guides/faq/)

## Notes

* `mongoose` is a peer-dependency, and a dev dependency to install it for dev purposes
* Please dont add comments with `+1` or something like that, use the Reactions
* `npm run doc` generates all documentation for all files that can be used as modules (is used for github-pages)
* `npm run doc:all` generates documentation even for internal modules
