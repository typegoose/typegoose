---
id: change-id-type
title: 'Change _id Type'
---

You can easily change the type of the `_id` field by doing:

```ts
class SomeChangedID {
  @prop()
  public _id: string; // change the type of _id to string
}
```

:::note
When the type is manually set (having an `@prop`, even for `ObjectId`), then the value need to be always defined before saving, or using the [`default`](../../api/decorators/prop.md#default) option
:::

To disable the `_id` field altogether (useful in arrays of subdocuments), add option [`@prop({ _id: false })`](api/decorators/prop.md#_id) or on the subdocument class [`@modelOptions({ schemaOptions: { _id: false } })`](https://mongoosejs.com/docs/guide.html#_id) (This option has no effect when the class / schema is the root schema).

```ts
@modelOptions({ schemaOptions: { _id: false } }) // either with the schema option
class WithNoId {
  @prop()
  public someValue: string;
}

class SomeChangedID {
  @prop({ type: WithNoId, _id: false }) // or with the prop-option
  public someField: WithNoId[];
}
```

## With the Base Class

There is also a `Base` interface typegoose provides, which includes `_id` and `id`, which can be used as follows:

```ts
interface Something extends Base<string> {} // have the interface to add the types of "Base" to the class
class Something { // have your class, OR
  @prop()
  public _id: string;
}
class Something extends TimeStamps { // have your class extend some other class
  @prop()
  public _id: string;
}
```

:::note
The `_id` property needs to also be included in the actual class, because the default interface `Base` doesn't change anything at runtime (`Base` does not use `@prop`).
:::

:::info Restriction
This method (extending `Base`) can only be used with types that are in `RefType` (all of `mongoose.Schema.Types` should work except `Array`, `Mixed`, `Boolean`).
:::
