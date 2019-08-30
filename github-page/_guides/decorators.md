---
title: "All the Decorators"
---

This Guide shows all the decorators that can be used for / in a class

## All Decorators

- All in-Class decorators:
  - `@prop` is the most important decorator, because it defines values(\|keys) that are then in the model & document
  - `@arrayProp` is the second most important decorator, it is the same as `@prop`, just for arrays
  - `@mapProp` is for a Map<string, T>
<!--This is just a seperator-->
- All out-Class decorators:
  - `@modelOptions`, used for Schema Options, an existing Mongoose and an existing Connection
  - `@index` is for indexes, that are **NOT** defined in the prop (mainly for compound indexes)
  - `@plugin` is for adding plugins, please note that plugins cannot modify the types of prop, we are sorry for this
  - Hooks:
    - `@pre` is for Pre-Hooks
    - `@post` is for Post-Hooks
