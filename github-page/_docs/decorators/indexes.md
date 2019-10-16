---
title: "Indexes"
---

`@index(properties: object, options: object)` is used to set indexes (mainly for compound indexes)
  - `properties`: set key-number pairs like `{ prop1: 1 }` (1 for ascending and -1 for descending)
  - `options`: [Please Refer to this](https://mongodb.github.io/node-mongodb-native/3.0/api/Db.html#createIndex)

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
