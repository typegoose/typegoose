---
id: change-id-type
title: 'Change _id Type'
---

You can easily change the type of the `_id` field by doing:

```ts
class SomeChangedID {
  @prop()
  public _id!: string; // change the type of _id to string
}
```

The example above sets the `_id` type to be a string, but does not provide a `default` function, so the `_id` property needs to be always set manually before saving / inserting a document, use the [`default`](../../api/decorators/prop.md#default) option to set a function to generate a new id automatically, be careful to not forget that using `default: fn()` will only call the function *once at scope time* instead of *everytime a new document is created*.

```ts
class SomeUUIDv4 {
  @prop({ required: true, default: () => uuidv4() })
  public _id!: string;
}
```

The `_id` property can also be disabled for subdocuments, with the [prop option `_id: false`](../../api/decorators/prop.md#_id) for the field in the class that uses the subdocument, or the [schema option `_id`](https://mongoosejs.com/docs/guide.html#_id), but note that the schema-option does not disable `_id` if it is not a sub-document.

```ts
@modelOptions({ schemaOptions: { _id: false } }) // with the schema option
class WithNoId {
  @prop()
  public someValue: string;
}

class SomeChangedID {
  @prop({ type: WithNoId, _id: false }) // or with the prop-option
  public someField: WithNoId[];
}
```

<div id="with-the-base-class"></div>

## With the Base Interface

There is also a [`Base` interface](../defaultClasses.md#base) typegoose provides which includes `_id` and `id`, it can be used as follows:

```ts
class Something implements Base<string> {
  @prop()
  public _id: string;
  // .. other properties "Base" might provide and needs to be implemented
}

// The Base interface can also be used together with other classes and other interfaces
class Something extends TimeStamps implements Base<string> {
  @prop()
  public _id: string;
  // .. other properties "Base" might provide and needs to be implemented
}
```

:::info Restriction
This method (extending `Base`) can only be used with types that are in `RefType` (all of `mongoose.Schema.Types` should work except `Array`, `Mixed`, `Boolean`).
:::
