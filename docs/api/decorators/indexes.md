---
id: indexes
title: '@index'
---

**Typings:**

```ts
function index<T extends BeAnObject = BeAnObject>(fields: mongoose.IndexDefinition, options?: IndexOptions<T>): ClassDecorator
```

**Parameters:**

| Name                                                          |                                                    Type                                                     | Description                                                   |
| :------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------ |
| `fields` <span class="badge badge--secondary">Required</span> |                                         `mongoose.IndexDefinition`                                          | All Fields for this single index                              |
| `options`                                                     | [`IndexOptions<T>`](https://mongodb.github.io/node-mongodb-native/4.11/interfaces/CreateIndexesOptions.html) | Overwrite Schema Options, merged with original schema options |

<!--TODO: update "options" type field link with latest mongodb version-->

`@index` is used to set indices on the schema, this decorator acts like `schema.index()`.

:::note
For [Full-Text Search](https://docs.mongodb.com/manual/tutorial/control-results-of-text-search/) option `weights` all fields (from `fields`) have to also be defined in `weights`.
:::

## Example

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

  @prop({ type: Number, dim: 2 })
  public location?: number[][];
}
```
