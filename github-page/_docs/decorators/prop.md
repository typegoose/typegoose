---
title: "Prop"
---

`@prop(options: object)` is used for setting properties in a Class (without this set, it is just a type and will **NOT** be in the final model/document)

## Options

### required

Accepts Type: `boolean`

Set if this Property is required (best practice is `public property!: any`, note the `!`)  
For more information see the [mongoose documentation](http://mongoosejs.com/docs/api.html#schematype_SchemaType-required)

Example:

```ts
class Something {
  @prop({ required: true }) // this is now required in the schema
  public firstName!: string;

  @prop() // by default, a property is not required
  public lastName?: string; // using the "?" marks the property as optional
}
```

### index

Accepts Type: `boolean`

Create an Index for this Property. Should act like the `@index` class decorator, but without options.

Example:

```ts
class IndexedClass {
  @prop({ index: true })
  public indexedField?: string;
}
```

### unique

Accepts Type: `boolean`

Create an Index that sets this property to be [unique](http://mongoosejs.com/docs/api.html#schematype_SchemaType-unique).

Example:

```ts
class IndexedClass {
  @prop({ unique: true }) // implicitly has "index: true"
  public uniqueId?: string;
}
```

### default

Accepts Type: `any`

Set a default when no value is given at creation time.

Example:

```ts
class Defaulted {
  @prop({ default: "hello world" })
  public upperCase?: string; // mark as optional, because it will be defaulted
}
```

### _id

Accepts Type: `boolean`

Set this to `false` if you want to turn of creating IDs for sub-documents.

Example:

```ts
class Nested {}

class Parent {
  @prop({ _id: false })
  public nest: Nested;
}
```

### ref

Accepts Type: `Class | string`

Set which class to use for Reference (this cannot be inferred by the type).

[->look here where `Class` cannot be used]({{ site.baseurl }}{% link _guides/advanced/reference-other-classes.md%}#common-problems)

Example:

```ts
class Nested {}

class Parent {
  @prop({ ref: Nested })
  public nest: Ref<Nested>;
  // or
  @prop({ ref: "Nested" })
  public nest: Ref<Nested>;
}
```

### refPath

Accepts Type: `string`

Set at which path to look for which Class to use.

Example:

```ts
class Car {}
class Shop {}

// in another class
class Another {
  @prop({ required: true, enum: 'Car' | 'Shop' })
  public which!: string;

  @prop({ refPath: 'which' })
  public kind?: Ref<Car | Shop>;
}
```

### refType

Accepts Type: `mongoose.Schema.Types.Number` \| `mongoose.Schema.Types.String` \| `mongoose.Schema.Types.Buffer` \| `mongoose.Schema.Types.ObjectId`

Set which Type to use for refs.

-> [`@prop`'s `type`]({{ site.baseurl }}{% link _docs/decorators/prop.md %}#type) can be used too

```ts
class Nested {}

class Parent {
  @prop({ ref: "Nested", refType: mongoose.Schema.Types.ObjectId }) // it is a "String" because of reference errors
  public nest: Ref<Nested>;
}
```

### validate

Accepts Type: `object` OR `RegExp` OR `(value) => boolean` OR `object[]`
Required options of the object:
  - `validator`: `(value) => boolean`
  - `message`: `String`, the message shows when the validator fails

Set a custom function for validation (must return a boolean).

Example: (For more Examples look at [Mongoose's Documentation](https://mongoosejs.com/docs/api.html#schematype_SchemaType-validate))

```ts
// "maxlength" already exists as an option, this just shows how to use validate
class Validated {
  @prop({ validate: {
    validator: (v) => {
      return v.length <= 10;
    },
    message: "value is over 10 characters long!"
  } })
  public validated?: string;
}
```

### alias

Accepts Type: `string`

Set an Alias for a property (best practice is to add type information for it).

-> For more information see the [mongoose documentation](https://mongoosejs.com/docs/guide.html#aliases)

Example:

```ts
class Dummy {
  @prop({ alias: "helloWorld" })
  public hello: string; // will be included in the DB
  public helloWorld: string; // will NOT be included in the DB, just for type completion (gets passed as hello in the DB)
}
```

### select

Accepts Type: `boolean`

Set it to `false` if you want to retrieve data without this property by default  
-> [Read more in mongoose's offical documentation](https://mongoosejs.com/docs/api.html#schematype_SchemaType-select)

```ts
class Dummy {
   @prop({ select: false })
   public hello: string;
}
```

In order to retrieve a prop marked as `select: false`, you must explicitly ask for it:

```ts
// find all in the collection and have the "hello" property selected
const dummies = await DummyModel.find().select('+hello').exec();
```

Note: `select()` accepts an array as well  
Note: `select()` accepts a long string with space as a separator

### get & set

Accepts Type: `(input) => output`

set gets & setters for fields, it is not virtual
-> both get & set must be defined all the time, even when you just want to use one, we are sorry

Example:

```ts
class Dummy {
  @prop({ set: (val: string) => val.toLowerCase(), get: (val: string) => val })
  public hello: string;
}
```

### type

Accepts Type: `any`

This option is mainly used for [get & set](#get--set) to override the inferred type,
but it can also be used to override the inferred type of any prop.

-> this overwriting is meant as a last resort, please open a new issue if you need to use it

Example: get as `string[]`, save as `string`

```ts
class Dummy {
  @prop({ set: (val: string[]) => val.join(' '), get: (val: string) => val.split(' '), type: String })
  public hello: string[];
}
```

Example: Overwrite inferred type as last resort

```ts
class Dummy {
  @prop({ type: mongoose.Schema.Types.Mixed }) // used for mongoose / how it is stored to the DB
  public something: NewableFunction; // used for intellisense / TypeScript
}
```

#### enum

Accepts Type: `enum | any[]`

Only allow Values from the enum (best practice is to use TypeScript's enum).

Note: `design:type` will be set to `String` if the enum is full of Strings, and `Number` if full of Numbers, and `Object` if the enum contains both.

Example for String-Enums:

```ts
enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

class Enumed {
  @prop({ enum: Gender })
  public gender?: Gender;
}
```

Example for Number-Enums:
(since mongoose 5.8 and typegoose 6.2)

```ts
enum Gender {
  MALE, // equal to "= 0"
  FEMALE, // equal to "= 1"
}

class Enumed {
  @prop({ enum: Gender })
  public gender?: Gender;
}
```

<!--Below are just the Specific Options-->

### String Transform options

#### lowercase

Accepts Type: `boolean`

Set this to `true` if the value should always be lowercased.

Example:

```ts
class LowerCased {
  @prop({ lowercase: true })
  public lowerCase: string; // "HELLO" -> "hello"
}
```

#### uppercase

Accepts Type: `boolean`

Set this to `true` if the value should always be UPPERCASED.

Example:

```ts
class UpperCased {
  @prop({ uppercase: true })
  public upperCase: string; // "hello" -> "HELLO"
}
```

#### trim

Accepts Type: `boolean`

Set this to `true` if the value should always be trimmed.

Example:

```ts
class Trimmed {
  @prop({ trim: true })
  public trim: string; // "   Trim me   " -> "Trim me"
}
```

### String Validation options

#### maxlength

Accepts Type: `number`

Set the maximum length the string can have.

Example:

```ts
class MaxLengthed {
  @prop({ maxlength: 10 })
  public maxlengthed?: string; // the string can only be 10 characters long
}
```

#### minlength

Accepts Type: `number`

Set the minimum length the string must have (must be above 0).

Example:

```ts
class MinLengthed {
  @prop({ minlength: 10 })
  public minlengthed?: string; // the string must be at least 10 characters long
}
```

### Number Validation options

#### max

Accepts Type: `number`

Set the maximum value the property can have.

Example:

```ts
class Maxed {
  @prop({ max: 10 })
  public maxed?: number; // the value can be at most 10
}
```

#### min

Accepts Type: `number`

Set the minimum value the property can have.

Example:

```ts
class Mined {
  @prop({ min: 0 })
  public mined?: number; // the value must be at least 0
}
```
