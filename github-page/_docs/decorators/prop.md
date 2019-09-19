---
title: "Prop"
---
<!--TODO: copy all examples from README to here-->

`@prop(options: object)` is used for setting properties in a model (without this set, it is just a type and will **NOT** be in the final model/document)

## Options

### required

Accepts Type: `boolean`

Set if this Property is required (best practice is `public property!: any`, note the `!`)

### index

Accepts Type: `boolean`

Create an Index for this Property

### unique

Accepts Type: `boolean`

Create an Index that sets this property to unique

Look at [Mongoose unique](http://mongoosejs.com/docs/api.html#schematype_SchemaType-unique) for more infomation

### enum

Accepts Type: `enum | any[]`

Only allow Values from the enum (best practice is to use TypeScript's enum)

### default

Accepts Type: `any`

Set an default always when no value is givin at creation time

### _id

Accepts Type: `boolean`

Set this to `false` if you want to turn of creating ID's for sub-documents

### ref

Accepts Type: `Ref<any>`

Set which class to use for Reference (this cannot be infered by the type)

### refPath

Accepts Type: `string`

Set at which path to look for which Class to use

### validate

Accepts Type: `() => boolean`(Functions that returns a boolean)

Set a custom function for validation (must return an boolean)

### alias

Accepts Type: `string`

Set an Alias for a property (best practice is to add type infomation for it)

```ts
class Dummy {
  @prop({ alias: "helloWorld" })
  public hello: string; // will be included in the DB
  public helloWorld: string; // will NOT be included in the DB, just for type completion (gets passed as hello in the DB)
}
```

### get & set

Accepts Type: `(input) => output`

set gets & setters for fields, it is not virtual
-> both get & set must be defined all the time, even when you just want to use one, we are sorry

```ts
class Dummy {
  @prop({ set: (val: string) => val.toLowerCase(), get: (val: string) => val })
  public hello: string;
}
```

### type

Accepts Type: `any`

Override the type that gets saved, used when get/set return different types than set on the prop field:

Example: get as `string[]`, save as `string`

```ts
class Dummy {
  @prop({ set: (val: string[]) => val.join(' '), get: (val: string) => val.split(' '), type: String })
  public hello: string[];
}
```

-> only used with [set & get](#get--set)

<!--Below are just the Specific Options-->

### String Transform options

#### lowercase

Accepts Type: `boolean`

Set this to `true` if the value should always be lowercased

#### uppercase

Accepts Type: `boolean`

Set this to `true` if the value should always be UPPERCASED

#### trim

Accepts Type: `boolean`

Set this to `true` if the value should always be trimmed

### String Validation options

#### minlength

Accepts Type: `number`

Set a minimal length the string must have (must be above 0)

#### maxlength

Accepts Type: `number`

Set a maximal length the string can have

### Number Validation options

#### max

Accepts Type: `number`

Set a highest number the property can have

#### min

Accepts Type: `number`

Set a lowest number the property can have

<!--Logical Seperator-->

## Virtuals

*no Documentation*
