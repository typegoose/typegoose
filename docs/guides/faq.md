---
id: faq
title: 'FAQ'
---

## Repository

### What happened to the original author?

A: The original author szokodiakos (github name) [has abandoned the project](https://github.com/szokodiakos/typegoose/issues/99#issuecomment-364639150), but might look into it again at some time.

### Is this Project still active?

A: Yes it is, but not on the main repository anymore because of [What happened to the original author?](#what-happened-to-the-original-author) and [Github Permissions](https://help.github.com/en/articles/permission-levels-for-a-user-account-repository) (TL;DR: a collaborator cannot add another collaborater, only the owner can)

### Why is the original project not archived?

A: Because a collaborator cannot archive a project, only the owner can ([What happened to the original author?](#what-happened-to-the-original-author))

### Why is the package now released in another package?

(context: from `typegoose` to `@typegoose/typegoose`)  
A: Because of a Repository Switch ([reasons](#is-this-project-still-active)) and because a name cannot be used by multiple packages, except if it is scoped.

### Why @typegoose/typegoose

A: Because I (hasezoey) don't have permissions over the old `typegoose` repository and I dont want to touch the old npm package. It is a typical forking and continuation of an OSS project.

## Functional

### Why does `new Model({})` not have types?

A: Because Typegoose doesn't modify any Mongoose code, it is still the same as Mongoose's original `new Model()`, you would have to do `new Model({} as Class)` (or sometimes `new Model({} as Partial<Class>)`, because of functions.)

## Edge Cases

### I want to the return document with property `id` instead of `_id`

Mongoose automatically adds a virtual named `id`, use the following for type definitions:

```ts
class Cat {
  id: mongoose.Types.ObjectId;
  _id: mongoose.Types.ObjectId;
}
```
