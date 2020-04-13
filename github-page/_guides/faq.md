---
title: "FAQ"
---

*<sub>This File may change often</sub>*

## Repository

### What happened to the original author?

A: The original author szokodiakos (github name) [has abandoned the project](https://github.com/szokodiakos/typegoose/issues/99#issuecomment-364639150), but might look into it again at some time

### Is this Project still active?

A: Yes it is, but not on the main repository anymore because of [What happened to the original author?](#what-happened-to-the-original-author) and [Github Permissions](https://help.github.com/en/articles/permission-levels-for-a-user-account-repository) (TL;DR: for short: a collaborator cannot add another collaborater, only the owner can)

### Why is the package now released in another package?

(context: from `typegoose` to `@hasezoey/typegoose`)<br/>
A: Because of a Repository Switch ([reasons](#is-this-project-still-active)) and because a name cannot be used by multiple packages except if it is scoped

### Why @typegoose/typegoose

A: because i (hasezoey) dont have permissions over the old `typegoose` repository and i dont want to touch the old npm package

## Functional

### Why does `new Model({})` not have types?

A: because typegoose doesn't modify any mongoose code, it is still the same as mongoose's original `new Model()`, you would have to do `new Model({} as Class)` (or sometimes `new Model({} as Partial<Class>)`, because of functions)
