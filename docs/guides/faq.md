---
id: faq
title: 'FAQ'
---

## Repository

### What happened to the original author?

A: The original author szokodiakos (github name) [has abandoned the project](https://github.com/szokodiakos/typegoose/issues/99#issuecomment-364639150), but might look into it again at some time.

### Is this Project still active?

A: Yes it is, but not on the main repository anymore because of [What happened to the original author?](#what-happened-to-the-original-author) and [Github Permissions](https://help.github.com/en/articles/permission-levels-for-a-user-account-repository) (TL;DR: a collaborator cannot add another collaborator, only the owner can)

### Why is the package now released in another package?

(context: from `typegoose` to `@typegoose/typegoose`)  
A: Because of a Repository Switch ([reasons](#is-this-project-still-active)) and because a name cannot be used by multiple packages, except if it is scoped.

### Why `@typegoose/typegoose`

A: Because I (hasezoey) don't have permissions over the old `typegoose` repository and I don't want to touch the old npm package. It is a typical forking and continuation of an [OSS](https://en.wikipedia.org/wiki/Open-source_software) project.

## Functional

### Why does `new Model({})` not have types?

A: Since around mongoose 6.0.0, `new Model()` and `Model.create()` have types, but they are not enforced (as in they will be suggested, but will not error if not present / other unknown properties are present).

### Do all Classes get compiled to their own `mongoose.Schema`?

A: Yes, all classes compiled through typegoose (like `type: () => SubClass`, or by reflection) will be their own `mongoose.Schema`.

This means that the following is equal:

```ts
// Native Mongoose
const subSchema = new mongoose.Schema({ someprop: { type: String } });
const mainSchema = new mongoose.Schema({
  subDoc: subSchema
})

// Typegoose
class Sub {
  @prop()
  public someprop: string;
}

class Main {
  @prop()
  public subDoc: Sub; // by reflection, not explicitly defining option "type"
  // OR
  @prop({ type: () => Sub }) // defining option "type" explicitly
  public subDoc: Sub;
}
```

There is also a option to not use sub-classes, called [the `Passthrough` class](../api/decorators/prop.md#passthrough-class), but it is not recommended to be used.

## Edge Cases

### I want to the return document with property `id` instead of `_id`

Mongoose automatically adds a virtual named `id`, use the following for type definitions if it does not already exist:

```ts
class Cat {
  id: mongoose.Types.ObjectId;
  _id: mongoose.Types.ObjectId;
}
```

### Why is `_id` `unknown`?

It is very likely that your class is just empty, and typescript somehow does not correctly match that and treats it like a generic object.

Example:

```ts
class Dummy {}
const DummyModel = getModelForClass(Dummy);
const newDoc = new DummyModel()
newDoc._id; // type: unknown

class Dummy {
  // simple dummy property for types, will complain if actually used
  public _dummy: never;
}
const DummyModel = getModelForClass(Dummy);
const newDoc = new DummyModel()
newDoc._id; // type: mongoose.Types.ObjectId
```
