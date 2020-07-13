---
title: "Prop"
---

`@prop(options: object, kind: WhatIsIt)` is used for setting properties in a Class (without this set, it is just a type and will **NOT** be in the final model/document)
- `options` is to set [all options](#options)
- `kind` is to overwrite what kind of prop this is (None = Normal, Array = for arrays, Map = for Maps) (should be auto-inferred)

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

Set this to `false` if you want to turn off creating IDs for sub-documents.

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
  @prop({ ref: 'Nested' })
  public nest: Ref<Nested>;
}
```

The `'Nested'` form is useful to avoid unintuitive errors due to circular dependencies, such as
`Error: Options "ref" is set, but is undefined/null!`.

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

Deprecated since `7.2.0`, use [`@prop`'s `type`](#type)

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

Accepts Type: `any | () => any`

Overwrite the type that is got from the `design:type` reflection

Example: Arrays (array item types can't be automatically inferred via Reflect)

```ts
class Dummy {
  @prop({ type: String })
  public hello: string[];
}
```

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

Example: Overwrite type for an enum

```ts
enum SomeEnum {
  One,
  Two
}
class Dummy {
  @prop({ enum: SomeEnum, type: Number })
  public enumprop: SomeEnum;
}
```

### enum

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

Known-Issues:
- Babel dosnt set the type for enums correctly, the need to be set manually with [the `type` option](#type)
- If the code got transpiled with `tsc --transpile-only` or `ts-node --transpile-only` then `--transpile-only` neeeds to be removed or the type needs to be set manually with [the `type` option](#type)

### addNullToEnum

Accepts Type: `boolean`

Add "null" to the enum array

Note: dosnt work if the value is `required`

Example:

```ts
enum SomeNumberEnum {
  one = 1,
  two = 2
}
class AddNullToEnum {
  @prop({ enum: SomeNumberEnum, addNullToEnum: true })
  public value?: SomeNumberEnum;
}

const AddNullToEnumModel = getModelForClass(AddNullToEnum);

AddNullToEnumModel.schema.path('value').options.enum === [1, 2, null]; // true

// this allows to do the following without an validation error
new AddNullToEnumModel({ value: null } as AddNullToEnum);
```

### discriminators

Accepts Type: `() => [DiscriminatorObject | Class]`

Use this function for embedded discriminators

Note: the `discriminatorKey` (like in the example property `type`) needs to be always set in a newly created document (via `.create({..., type: "..."})`, or `.save()`)

Example for `[Class]`:

```ts
@modelOptions({
  schemaOptions: {
    discriminatorKey: 'type',
  }
})
class Building {
  @prop({ default: 100 })
  public width: number;

  @prop({ required: true })
  public type: string;
}

class Garage extends Building {
  @prop({ default: 10 })
  public slotsForCars: number;
}

class SummerHouse extends Building {
  @prop({ default: 100 })
  public distanceToLake: number;
}

class Area {
  @prop({ type: Building, discriminators: () => [Garage, SummerHouse] })
  public buildings: Building[];
}

const AreaModel = getModelForClass(Area);

// then somewhere in an async function
const area = await AreaModel.create({});
area.buildings.push({ type: getName(SummerHouse), distanceToLake: 100 } as SummerHouse);
area.buildings.push({ type: getName(Garage), slotsForCars: 20 } as Garage);
await area.save();
```

Example for `[DiscriminatorObject]`:

```ts
@modelOptions({
  schemaOptions: {
    discriminatorKey: 'type',
  }
})
class Building {
  @prop({ default: 100 })
  public width: number;

  @prop({ required: true })
  public type: string;
}

class Garage extends Building {
  @prop({ default: 10 })
  public slotsForCars: number;
}

class SummerHouse extends Building {
  @prop({ default: 100 })
  public distanceToLake: number;
}

class Area {
  @prop({ type: Building, discriminators: () => [{ type: Garage, value: "G", }, { type: SummerHouse, value: "S" }] })
  public buildings: Building[];
}

const AreaModel = getModelForClass(Area);

// then somewhere in an async function
const area = await AreaModel.create({});
area.buildings.push({ type: "S", distanceToLake: 100 } as SummerHouse);
area.buildings.push({ type: "G", slotsForCars: 20 } as Garage);
await area.save();
```

<!--Below are just the Specific Options-->

### Array Options

#### items

Accepts Type: `any`
(alias for [`type`](#type) from `@prop`)

Deprecated since `7.2.0`, use [`@prop`'s `type`](#type)

Tell Typegoose that this is an array which consists of primitives (if `String`, `Number`, or another primitive type is given) or of subdocuments, if a class is given.

```ts
// Array of Primitives
class Something {
  @prop({ items: String })
  public languages?: string[];
}

// Array of subdocuments
class Link {
  @prop()
  url: string;

  @prop()
  text: string;
}

class Something {
  @prop({ items: Link })
  public links?: Link[];
}
```

#### innerOptions

`innerOptions` is used to overwrite here the options in this object go
-> Use this only when absolutely needed and please open a new issue about it - or for plugins

Example:

```ts
class Something {
  @prop({ required: true })
  public propy: string[];
}

// This would be mapped to
{
  type: [{ type: String }],
  required: true
}

// when using the overwrite
class Something {
  @prop({ innerOptions: { required: true } })
  public propy: string[];
}

// This would be mapped to
{
  type: [{ type: String, required: true }]
}
```

#### outerOptions

`outerOptions` is used to overwrite here the options in this object go
-> Use this only when absolutely needed and please open a new issue about it - or for plugins

Example:

```ts
class Something {
  @prop({ maxlength: 1 })
  public propy: string[];
}

// This would be mapped to
{
  type: [{ type: String, maxlength: 1 }]
}

// when using the overwrite
class Something {
  @prop({ outerOptions: { maxlength: 1 } })
  public propy: string[];
}

// This would be mapped to
{
  type: [{ type: String }],
  maxlength: 1
}
```

#### dim

`dim` is used to set the Dimensions this array should have (for something like an matrix)
-> needs to be higher than 0

Example:

```ts
class Something {
  @prop({ dim: 3, type: String })
  public propy: string[][][];
}

// This would be mapped to
{
  type: [[[{ type: String }]]]
}
```

### Map Options

#### of

Accepts Type: `any`
(alias for [`type`](#type) from `@prop`)

Deprecated since `7.2.0`, use [`@prop`'s `type`](#type)

This will tell Typegoose that the Map value consists of primitives (If `String`, `Number`, or other primitive type is given) or this is an array which consists of subdocuments (if it's extending the `Typegoose` class).

```ts
class Car {
  @mapProp({ of: Car })
  public keys?: Map<string, Car>;
}
```

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

#### match

Accepts Type: `RegExp`

Set an Regular Expression the string must match with

Example:

```ts
class RegExpString {
  @prop({ match: /^H/i })
  public matched?: string;
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
