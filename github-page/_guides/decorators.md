---
title: "All the Decorators"
---

This Guide shows all the decorators that can be used for / in a class

## All Decorators

- All Property decorators:
  - [`@prop`]({{ site.baseurl }}{% link _docs/decorators/prop.md %}) is the most important decorator, because it defines values(\|keys) that are then in the model & document
  - [`@arrayProp`]({{ site.baseurl }}{% link _docs/decorators/arrayProp.md %}) it is the same as `@prop`, just for arrays **[Deprecated]**
  - [`@mapProp`]({{ site.baseurl }}{% link _docs/decorators/mapProp.md %}) is for a Map<string, T> **[Deprecated]**
<!--This is just a separator-->
- All Class decorators:
  - [`@modelOptions`]({{ site.baseurl }}{% link _docs/decorators/modelOptions.md %}), used for Schema Options, an existing Mongoose and an existing Connection
  - [`@index`]({{ site.baseurl }}{% link _docs/decorators/indexes.md %}) is for indexes, that are **NOT** defined in the prop (mainly for compound indexes)
  - [`@plugin`]({{ site.baseurl }}{% link _docs/decorators/plugins.md %}) is for adding plugins, please note that plugins cannot modify the types of prop, we are sorry for this
  - [`@queryMethod`]({{ site.baseurl }}{% link _docs/decorators/queryMethod.md %}) is for adding query Methods
  - [Hooks]({{ site.baseurl }}{% link _docs/decorators/hooks.md %}):
    - `@pre` is for Pre-Hooks
    - `@post` is for Post-Hooks
