---
id: all-decorators
title: 'All Decorators'
---

This Page shows all the decorators that can be used for / in a class.

- All Property decorators:
  - [`@prop`](../api/decorators/prop.md) is the most important decorator, because it defines values(\|keys) that are then in the model & document.
<!--This is just a separator-->
- All Class decorators:
  - [`@modelOptions`](../api/decorators/modelOptions.md), used for Schema Options, an existing Mongoose and an existing Connection
  - [`@index`](../api/decorators/indexes.md) is for indexes, that are **NOT** defined in the prop (mainly for compound indexes)
  - [`@plugin`](../api/decorators/plugin.md) is for adding plugins. Please note that plugins cannot modify the types of prop.
  - [`@queryMethod`](../api/decorators/queryMethod.md) is for adding custom query Methods.
  - [Hooks](../api/decorators/hooks.md):
    - [`@pre`](../api/decorators/hooks.md#pre) is for Pre-Hooks.
    - [`@post`](../api/decorators/hooks.md#post) is for Post-Hooks.
