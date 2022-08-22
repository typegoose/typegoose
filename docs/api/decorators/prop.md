---
id: prop
title: '@prop'
---

**Typings:**

```ts
function prop(
  options?: BasePropOptions | ArrayPropOptions | MapPropOptions | PropOptionsForNumber | PropOptionsForString | VirtualOptions,
  kind?: PropType
): PropertyDecorator
```

**Parameters:**

| Name                                                           |          Type           | Description                                  |
| :------------------------------------------------------------- | :---------------------: | :------------------------------------------- |
| `options` <span class="badge badge--secondary">Required</span> |    `BasePropOptions`    | The Option to set for the following property |
| `kind`                                                         | [`PropType`](#proptype) | Overwrite what Kind is used                  |

`@prop` is used to mark properties to be in the Schema and also set Options of that property.

:::note
Any Property that does not have `@prop` on it, will not be in the Schema, because it cannot be seen at runtime.
:::

## Single Options

Example:

```ts
class Cat {
  @prop()
  public name?: string;
}

class Cat2 {
  @prop({ type: () => String }) // explicitly define the Type
  public name?: string;
}

class Cat3 {
  @prop({ type: () => String }, PropType) // explicitly define the "PropType"
  public name?: string;
}
```

### required

Accepts Type: `boolean`

Set this to true, if the property is required (best practice is `public property!: any`, note the `!`)  
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

Set a default, when no value is given at creation time.

Example:

```ts
class Defaulted {
  @prop({ default: 'hello world' })
  public upperCase?: string; // mark as optional, because it will be defaulted
}
```

You may also set the `default` schema option to a function. Mongoose will execute that function and use the return value as the default.

Example:

```ts
class Defaulted {
  @prop({ required: true })
  firstName!: string
  @prop({ required: true })
  lastName!: string
  
  @prop({ 
    default: function (this: DocumentType<Defaulted>) {
      return `${this.firstName} ${this.lastName}`
    }
  })
  public fullName?: string; // mark as optional, because it will be defaulted
}
```

:::note
To have the `this` keyword correctly typed, you have to pass a defined [this parameter](https://www.typescriptlang.org/docs/handbook/functions.html#this-parameters).
:::

### _id

Accepts Type: `boolean`

Set this to `false`, if you want to turn off creating IDs for sub-documents.

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

[Look here where `Class` cannot be used](../../guides/advanced/reference-other-classes.md#common-problems)

Example:

```ts
class Kitten {
  @prop()
  public name?: string;
}

class Cat {
  // single examples
  @prop({ ref: () => Kitten })
  public kitten?: Ref<Kitten>;
  // or
  @prop({ ref: 'Kitten' })
  public kitten?: Ref<Kitten>;

  // array examples
  @prop({ ref: () => Kitten })
  public kittens?: Ref<Kitten>[];
  // or
  @prop({ ref: 'Kitten' })
  public kittens?: Ref<Kitten>[];
}
```

The `'Nested'`(as string) form is useful to avoid unintuitive errors due to circular dependencies, such as [`Option "ref" for "${name}.${key}" is null/undefined! [E005]`](../../guides/error-warning-details.md#ref-is-undefined-e005).

### refPath

Accepts Type: `string`

Set which path to look for which Class to use.

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

### validate

Accepts Type: `object` OR `RegExp` OR `(value) => boolean` OR `object[]` Required options of the object:

- `validator`: `(value) => boolean`
- `message`: `String`, the message shows when the validator fails

Set a custom function for validation (must return a boolean).

Example: (For more Examples look at [Mongoose's Documentation](https://mongoosejs.com/docs/api.html#schematype_SchemaType-validate))

```ts
// "maxlength" already exists as an option, this just shows how to use validate
class Validated {
  @prop({
    validate: {
      validator: (v) => {
        return v.length <= 10;
      },
      message: 'value is over 10 characters long!'
    }
  })
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
  @prop({ alias: 'helloWorld' })
  public hello: string; // will be included in the DB
  public helloWorld: string; // will NOT be included in the DB, just for type completion (gets passed as hello in the DB)
}
```

### select

Accepts Type: `boolean`

Set it to `false`, if you want to retrieve data without this property by default  
-> [Read more in Mongoose's official documentation](https://mongoosejs.com/docs/api.html#schematype_SchemaType-select)

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

:::note
`select()` accepts an array as well
:::
:::note
`select()` accepts a long string with space as a separator
:::

### get & set

Accepts Type: `(input) => output`

Set getters & setters for fields, it is not virtual.  

:::note
Both `get` & `set` must be defined all the time, even when just wanting to use one.
:::

:::note
If the [PropType](#PropType) (Primitive / Array / Map) is different from what is got from the reflection, it requires **explicit** setting that it is different
:::

Pre-process string to string:

```ts
class Dummy {
  @prop({ set: (val: string) => val.toLowerCase(), get: (val: string) => val })
  public hello: string;
}
```

Store string, runtime have string array (string array to string):

```ts
class Dummy {
  // this value is a "string-array" during runtime and is stored in the database as a "primite-string"
  @prop({ set: (val: string[]) => val.join(' '), get: (val: string) => val.split(' '), type: String }, PropType.NONE) // requires explicit setting of "PropType"
  public fullName?: string[];
}
```

### type

Accepts Type: `any | () => any`

Overwrite the type generated for the `design:type` reflection

:::note
Mongoose initializes arrayProp arrays with `[]` instead of `null` / `undefined`
:::

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

Example: Overwrite type for an enum.

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

Example: Overwrite the inferred type as a last resort.

```ts
class Dummy {
  @prop({ type: mongoose.Schema.Types.Mixed }) // used for mongoose / how it is stored to the DB
  public something: NewableFunction; // used for intellisense / TypeScript
}
```

### enum

Accepts Type: `enum | any[]`

Only allow values from the enum (best practice is to use TypeScript's enum).

:::note
`design:type` will be set to `String`, if the enum is full of Strings, and `Number`, if full of Numbers and `Object` of the enum contains both.
:::

Example for String-Enums:

```ts
enum Gender {
  MALE = 'male',
  FEMALE = 'female'
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
  FEMALE // equal to "= 1"
}

class Enumed {
  @prop({ enum: Gender })
  public gender?: Gender;
}
```

Known-Issues:
- Babel doesn't set the type for enums correctly. They need to be set manually with [the `type` option](#type)
- If transpiling your code with `tsc --transpile-only` or `ts-node -- transpile-only`, then the `--transpile-only` needs to be removed or the type needs to be set manually with [the `type` option](#type) (see [Known-Issues: Babel](../../guides/known-issues.md#babel))

### addNullToEnum

Accepts Type: `boolean`

Adds `null` to the enum array.

:::note
This doesn't work if the value is `required`
:::

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

// this is necessary to avoid a validation error
new AddNullToEnumModel({ value: null } as AddNullToEnum);
```

### discriminators

Accepts Type: `() => [DiscriminatorObject | Class]`

Use this function for embedded discriminators.

:::note
The `discriminatorKey` (like in the example property `type`) needs to be always set in a newly created document (via `.create({ type: 'yourKey' })`, or `.save()`)
:::
:::note
There currently is no typegoose built-in way to get the models the `path.discriminator` call would return, see [typegoose/typegoose#744](https://github.com/typegoose/typegoose/issues/744).
:::

Example for `[Class]`:

```ts
@modelOptions({
  schemaOptions: {
    discriminatorKey: 'type'
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
    discriminatorKey: 'type'
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
  @prop({
    type: Building,
    discriminators: () => [
      { type: Garage, value: 'G' },
      { type: SummerHouse, value: 'S' }
    ]
  })
  public buildings: Building[];
}

const AreaModel = getModelForClass(Area);

// then somewhere in an async function
const area = await AreaModel.create({});
area.buildings.push({ type: 'S', distanceToLake: 100 } as SummerHouse);
area.buildings.push({ type: 'G', slotsForCars: 20 } as Garage);
await area.save();
```

### innerOptions

`innerOptions` is used to override options at the "Type" level

:::caution
Use this only when absolutely necessary and please open a new issue about it
:::
:::note
This option can be used everywhere `mapOptions` function is called (currently being `PropType.ARRAY` and `PropType.MAP`)
:::

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

// when using the override
class Something {
  @prop({ innerOptions: { required: true } })
  public propy: string[];
}

// This would be mapped to
{
  type: [{ type: String, required: true }]
}
```

### outerOptions

`outerOptions` is used to override options at the "Array" level

:::caution
Use this only when absolutely necessary and please open a new issue about it
:::
:::note
This option can be used everywhere `mapOptions` function is called (currently being `PropType.ARRAY` and `PropType.MAP`)
:::

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

// when using the override
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

### allowMixed

`allowMixed` is used to set a custom `warnMixed` Severity for a specific Property.  
Takes priority over class-wide `allowMixed`.

See [`modelOptions#allowMixed`](./modelOptions.md#allowmixed) for all possible variants for the enum.

Example:

```ts
class Something {
  @prop({ allowMixed: Severity.ERROR, type: () => mongoose.Schema.Type.Mixed })
  public propy?: any;
}

buildSchema(Something); // would throw a "warnMixed" error
```

<!--Below are just the Specific Options-->

## Array Options

:::note
Option `type` must be provided, otherwise the array will result in `Mixed` [read typegoose issue #300 for more info](https://github.com/typegoose/typegoose/issues/300)
:::

Example:

```ts
class Kitten {
  @prop()
  public name?: string;
}

class Cat {
  @prop({ type: () => [Kitten] })
  public kitten?: Kitten[]; // "[]" or "Array<any>" or "mongoose.Types.Array<any>" or "mongoose.Types.DocumentArray" is needed to be detected as an Array
}

class Cat2 {
  @prop({ type: () => [Kitten] }, PropType.ARRAY) // explicitly define the "PropType"
  public kitten?: Kitten[];
}
```

### dim

`dim` is used to set the Dimensions this array should have (for something like a matrix)  
-> needs to be higher than 0  
-> **This Option is overridden by using `type () => [Type]`**

Example:

```ts
class Something {
  @prop({ dim: 3, type: String })
  public propy: string[][][];
  //or
  @prop({ type: () => [[[String]]] })
  public propy: string[][][];
}

// This would be mapped to
{
  type: [[[{ type: String }]]]
}
```

This option `dim` can be omitted, when used with the `() => [Type]` syntax (since `7.4.0`):

```ts
class ArrayInType {
  @prop({ type: () => [[String]] }) // dim is 2
  public propy: string[][];

  @prop({ type: () => [String] }) // dim is 1
  public propy: string[];
}
```

## Map Options

Example:

```ts
class SomeMapClass1 {
  @prop({ type: String })
  public lookup?: Map<string, string>; // "Map<any, any>" or "mongoose.Types.Map<any>" is needed to be detected as a Map
}

class SomeMapClass2 {
  @prop({ type: () => String }, PropType.MAP) // explicitly define the "PropType"
  public lookup?: Map<string, string>;
}

// Extra Examples with different types
// Example: Primitive-Arrays
class SomeMapClass3 {
  @prop({ type: () => [String] })
  public lookup?: Map<string, string[]>;
}

// Example: SubDocuments
class Nested {
  @prop()
  public dummy?: string;
}
class SomeMapClass3 {
  @prop({ type: () => Nested, _id: false })
  public lookup?: Map<string, Nested>;
}

// Example: SubDocument-Arrays (since 8.1.1)
class Nested {
  @prop()
  public dummy?: string;
}
class SomeMapClass3 {
  @prop({ type: () => [Nested], _id: false })
  public lookup?: Map<string, Nested[]>;
}
```

:::note
`type` can be Primitives, Primitive-Arrays, SubDocuments(Classes) and SubDocument(Class)-Arrays
:::

## String Transform options

### lowercase

Accepts Type: `boolean`

Set this to `true`, if the value should always be transformed to be lowercased.

Example:

```ts
class LowerCased {
  @prop({ lowercase: true })
  public lowerCase: string; // "HELLO" -> "hello"
}
```

### uppercase

Accepts Type: `boolean`

Set this to `true`, if the value should always be transformed to be UPPERCASE. <!--please don't change this to lowercase-->

Example:

```ts
class UpperCased {
  @prop({ uppercase: true })
  public upperCase: string; // "hello" -> "HELLO"
}
```

### trim

Accepts Type: `boolean`

Set this to `true`, if the value should always be trimmed.

Example:

```ts
class Trimmed {
  @prop({ trim: true })
  public trim: string; // "   Trim me   " -> "Trim me"
}
```

## String Validation options

### maxlength

Accepts Type: `number`

Sets the maximum length the string can have.

Example:

```ts
class MaxLengthed {
  @prop({ maxlength: 10 })
  public maxlengthed?: string; // the string can only be 10 characters long
}
```

### minlength

Accepts Type: `number`

Sets the minimum length the string can have (must be above 0).

Example:

```ts
class MinLengthed {
  @prop({ minlength: 10 })
  public minlengthed?: string; // the string must be at least 10 characters long
}
```

### match

Accepts Type: `RegExp`

Sets a Regular Expression for the string must match.

Example:

```ts
class RegExpString {
  @prop({ match: /^H/i })
  public matched?: string;
}
```

## Number Validation options

### max

Accepts Type: `number`

Sets the maximum value the number property can have.

Example:

```ts
class Maxed {
  @prop({ max: 10 })
  public maxed?: number; // the value can be at most 10
}
```

### min

Accepts Type: `number`

Sets the minimum value the number property can have.

Example:

```ts
class Mined {
  @prop({ min: 0 })
  public mined?: number; // the value must be at least 0
}
```

## Virtual Populate Options

Options for [Virtual Populate](../virtuals.md#virtual-populate)

### ref {#virtual-populate-ref}

Required: yes, if using virtual populate

For Options and Typings, see normal [`ref`](#ref).

### foreignField

Accepts Type: `string | DynamicStringFunc<any>`  
Required: yes, if using virtual populate

Set the field to look at in the remote document and be compared with the field set by [`localField`](#localfield).

### localField

Accepts Type: `string | DynamicStringFunc<any>`  
Required: yes, if using virtual populate

Set the field to look at in the local document and be compared with the field set by [`foreignField`](#foreignfield).

### justOne

Accepts Type: `boolean`  
Conflicts with: [`count`](#count)

Set whether the query should only return one document instead of a array of documents.

### count

Accepts Type: `boolean`  
Conflicts with: [`justOne`](#justone)

Set whether the query should return a count of found documents instead of the documents themself.

### options {#virtual-populate-options-option}

Accepts Type: `mongoose.QueryOptions`

Set custom options to be used in the query for virtual populate.

### match {#virtual-populate-match}

Accepts Type: `object | (doc) => object`

Set a custom matcher for virtual populate.

<!--The Following "a" is a backwards-compatibility anchor-->
<a name="whatisit"></a>

## PropType

This is an Enum to represent what the prop should be, this is in most cases automatically set. It can be overridden in the second parameter of `@prop`

Full Enum:

```ts
enum PropType {
  ARRAY,
  MAP,
  NONE // default for properties if no Map / Array is detected
}
```

For Examples, look at:

- [Single Options](#single-options) - `NONE`
- [Array Options](#array-options) - `ARRAY`
- [Map Options](#map-options) - `MAP`

## Passthrough Class

:::caution
It is not recommended to use this class, it should always be another class if nesting, like [in the quick-start-guide](../../guides/quick-start-guide.md/#quick-overview-of-typegoose) is wanted
:::

The `Passthrough` class is, like the name implies, is to pass-through a schema definition directly, without "wrapping" it in a `new Schema({})` explicitly.

### Non-Direct {#passthrough-nondirect}

Using the `Passthrough` class this way will be from mongoose 6.0 onward the same as doing another class (see [Mongoose#7181](https://github.com/Automattic/mongoose/issues/7181)).  
Also see the [FAQ `Do all Classes get compiled to their own "mongoose.Schema"?`](../../guides/faq.md#do-all-classes-get-compiled-to-their-own-mongooseschema).

:::note
It should be noted that using this method no typegoose transformations or warnings will be applied to what is inside `Passthrough.raw` (like `type: () => Class` will not be translated, it will stay as-is).
:::

There is also a option to set the `Passthrough` class to `direct` mode (with the second parameter), this will mean that absolutely no typegoose process is applied (everything has to be done manually), see [Passthrough-Class#Direct](#passthrough-direct).

Example for `PropType.NONE`:

```ts
class PassthroughNoDirect {
  @prop()
  public normalProp?: string;

  @prop({ type: () => new Passthrough({ somePath: String }) })
  public child?: { somePath: string };
}

// would be equal to

new mongoose.Schema({
  normalProp: {
    type: String
  },
  child: {
    type: {
      somePath: String
    }
  }
})
```

Example for `PropType.ARRAY`:

:::note
This was not working before mongoose 6.0.9, see [issue #10750](https://github.com/Automattic/mongoose/issues/10750).
:::

:::note
Using this way will throw a "Mixed" warning for property `child`, because at the time where typegoose checks types is way before it being a proper Type.
:::

```ts
class PassthroughNoDirect {
  @prop({ type: () => new Passthrough({ somePath: String }) })
  public child?: [{ somePath: string }]
}

// would be equal to
new mongoose.Schema({
  child: {
    type: [{
      somePath: String
    }]
  }
})
```

Example for `PropType.MAP`:

```ts
class PassthroughNoDirect {
  @prop({ type: () => new Passthrough({ someProp: String }) })
  public child?: Map<string, { someProp: string }>;
}

// would be equal to
new mongoose.Schema({
  child: {
    type: Map,
    of: {
      type: {
        someProp: String
      }
    }
  }
})
```

### Direct {#passthrough-direct}

The option `direct` (second parameter to `Passthrough`, default `false`), is used to set assigning the contents of `raw` (first parameter to `Passthrough`) directly, with no processing on the typegoose side or preceding `type:`.

:::note
With the option `direct` set to `true`, no other option will be applied (even when defined) (like defining `required`, will have no effect).  

The most obvious one being that no `type:` will be in-front of what `Passthrough` holds.
:::

Example for `PropType.NONE`:

```ts
class PassthroughWithDirect {
  @prop({ type: () => new Passthrough({ somePath: String }, true) })
  public child?: { somePath: string; };
}

// would be equal to

new mongoose.Schema({
  child: {
    somePath: String
  }
})
```

Example for `PropType.ARRAY`:

```ts
class PassthroughWithDirect {
  @prop({ type: () => new Passthrough([{ somePath: String }], true) })
  public child?: [{ somePath: string; }];
}

// would be equal to

new mongoose.Schema({
  child: [{ somePath: String }]
})
```

Example for `PropType.MAP`:

```ts
class PassthroughWithDirect {
  @prop({ type: () => new Passthrough({ type: Map, of: { somePath: String } }, true) })
  public child?: Map<string, { somePath: string }>;
}

// would be equal to

new mongoose.Schema({
  child: {
    type: Map,
    of: {
      somePath: String
    }
  }
})
```
