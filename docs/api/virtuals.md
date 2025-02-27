---
id: virtuals
title: 'Virtuals'
---

## get & set

Mongoose offers developers the option to create [virtual properties](http://mongoosejs.com/docs/api/schema.html#schema_Schema-virtual). As virtual properties, they are just 'calculated properties', meaning, there are no actual reads or writes to the database.<br/>
A virtual property can have a setter and a getter. ES6 Classes have `get` & `set` functions, which Mongoose uses for virtual property definitions (no Typegoose decorator can be used on them, because they are handled directly by Mongoose).

:::warning
Do not confuse this `get` & `set` with [`@prop`'s `get` & `set`](api/decorators/prop.md#get--set)
:::
:::warning
No Typegoose decorator can be used on `get` & `set` functions, because they are directly handled by Mongoose.
:::

Example:

```ts
class Name {
  @prop()
  public firstName?: string;

  @prop()
  public lastName?: string;

  // this will create a virtual property called 'fullName'
  public get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  public set fullName(full) {
    const [firstName, lastName] = full.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
```

Resulting Document in MongoDB:

```js
{
  _id: ObjectId('<some long id>'),
  firstName: 'Will',
  lastName: 'Smith'
}
```

### Difference between @prop's get & set and this get & set

*This shows the difference between [`@prop`'s get & set](./decorators/prop.md#get--set) and [this one](#get--set)*

The difference between `@prop`'s and this one is simple, `@prop`'s get & set are ***actual properties*** that get saved to the database, only with a conversion layer.  
The get & set of *getter's & setter's* are absolutely virtual.

## Virtual Populate

Virtual-Populate is also supported by Typegoose

Options ([look here for more details](https://mongoosejs.com/docs/api/schema.html#schema_Schema-virtual)):

- `ref`: This is like a normal [ref](https://typegoose.github.io/typegoose/docs/api/decorators/prop/#ref), use `'ClassName'` when the classes are in different files <span class="badge badge--secondary">Required</span>
- `foreignField`: Which property(on the ref-Class) to match `localField` against <span class="badge badge--secondary">Required</span>
- `localField`: Which property(on the current-Class) to match `foreignField` against <span class="badge badge--secondary">Required</span>
- `justOne`: Return as One Document(true) or as Array(false) ***[Optional]***
- `count`: Return the number of Documents found instead of the actual Documents ***[Optional]***
- `options`: Extra Query Options ***[Optional]***
- `match`: Extra Match Options ***[Optional]***

Example: for an array

```ts
class Kittens {
  @prop({ required: true, ref: () => Cat ) }) // providing the type deferred
  public parent: Ref<Cat>;
}

class Cat {
  @prop({
    ref: () => Kittens,
    foreignField: 'parent', // compare this value to the document populate is called on
    localField: '_id' // compare this to the foreign document's value defined in "foreignField"
  })
  public kittens: Ref<Kittens>[];
}
```

Example: for only one document

```ts
// I couldn't think of a real use case example
class Sub {
  @prop({ required: true, ref: () => Parent }) // providing the type deferred
  public parent: Ref<Parent>;
}

class Parent {
  @prop({
    ref: () => Sub,
    foreignField: 'parent',
    localField: '_id',
    justOne: true // when this is not set to "true", mongoose will always return a Array
  })
  public one: Ref<Sub>;
}
```

Example (since typegoose 7.4): dynamic `ref`, `localField` and `foreignField`

```ts
class Sub {
  @prop({ required: true })
  public parentId!: mongoose.Types.ObjectId;
}
class Parent {
  @prop({
    ref: () => (doc: DocumentType<Parent>) => doc.from, // This need to be written this way, because since typegoose "7.1", deferred function are supported
    foreignField: () => 'parentId', // no "doc" parameter provided here
    localField: (doc: DocumentType<Parent>) => doc.local,
    justOne: false
  })
  public nested?: Ref<Sub>[];

  @prop({ required: true })
  public local!: string;

  @prop({ required: true })
  public from!: string;
}

// later in some async code
const parent = await ParentModel.create({ local: '_id', from: getName(Sub) });
await SubModel.create({ parentId: parent._id });
```

## Extra Notes

### Why is my virtual not included in the output?

By default Mongoose doesn't output virtuals. To achieve this, you need to add `toObject` and(/or) `toJSON` to `schemaOptions` in `@modelOptions`.

Note: it can be set in `@modelOptions`, but it can be set in `getModelForClass` too (and in the `doc.toJSON()`/`doc.toObject()` functions).

Example:

```ts
class Sub {}

@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
})
class Parent {
  @prop({
    ref: Sub,
    foreignField: 'parent',
    localField: '_id',
    justOne: true
  })
  public one: Ref<Sub>;
}
```

:::note
These options will be applied to all classes which inherit the class that got the options applied.
:::
