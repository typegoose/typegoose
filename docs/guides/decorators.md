---
id: all-decorators
title: 'All the Decorators'
---

This Guide shows all the decorators that can be used for / in a class.

## All Decorators

- All Property decorators:
  - [`@prop`](api/decorators/prop.md) is the most important decorator, because it defines values(\|keys) that are then in the model & document.
  - [`@arrayProp`](api/decorators/arrayProp.md) it is the same as `@prop`, just for arrays **[Deprecated]**
  - [`@mapProp`](api/decorators/mapProp.md) is for a Map<string, T> **[Deprecated]**
<!--This is just a separator-->
- All Class decorators:
  - [`@modelOptions`](api/decorators/modelOptions.md), used for Schema Options, an existing Mongoose and an existing Connection
  - [`@index`](api/decorators/indexes.md) is for indexes, that are **NOT** defined in the prop (mainly for compound indexes)
  - [`@plugin`](api/decorators/plugins.md) is for adding plugins. Please note that plugins cannot modify the types of prop, we are sorry for this.
  - [`@queryMethod`](api/decorators/queryMethod.md) is for adding query Methods.
  - [Hooks](api/decorators/hooks.md):
    - `@pre` is for Pre-Hooks.
    - `@post` is for Post-Hooks.
