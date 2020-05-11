---
title: "Indexes"
---

`@index(fields: object, options: object)` is used to set indexes (mainly for compound indexes)
  - `fields`: set of key-number pairs like `{ field1: 1 }` (`1` for ascending and `-1` for descending), or for text indexes, `{ field1: 'text' }`.
  - `options`: [please see the MongoDB driver docs](https://mongodb.github.io/node-mongodb-native/3.6/api/Db.html#createIndex). Note that if you want to add `weights` to the `options` (for [full-text search](https://docs.mongodb.com/manual/tutorial/control-results-of-text-search/)), you must define the same set of fields in `fields` as in the `weights`.

Example:

```ts
@index({ article: 1, user: 1 }, { unique: true }) // compound index
@index({ location: '2dsphere' }) // single index with no options
@index({ article: 1 }, { partialFilterExpression: { stars: { $gte: 4.5 } } }) // single index with options
class Location {
  @prop()
  public article?: number;

  @prop()
  public user?: number;

  @prop()
  public stars?: number;

  @arrayProp({ items: Array })
  public location?: [[Number]] // Please note that Multi-Dimensonal Arrays are not supported by typegoose currently as explicit types
}
```
