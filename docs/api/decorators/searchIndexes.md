---
id: searchIndexes
title: '@searchIndex'
---

**Typings:**

```ts
function searchIndex(description: SearchIndexDescription): ClassDecorator
```

**Parameters:**

| Name                                                               |                                                         Type                                                         | Description                                                             |
|:-------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------|
| `description` <span class="badge badge--secondary">Required</span> | [`SearchIndexDescription`](https://mongodb.github.io/node-mongodb-native/6.5/interfaces/SearchIndexDescription.html) | Description of the search index, including definition and optional name |

`@searchIndex` is used to set search indices on the schema, this decorator acts
like [`schema.searchIndex()`](https://mongoosejs.com/docs/api/schema.html#Schema.prototype.searchIndex()).

:::warning
Search indices are only supported in `M10` (or higher) Mongo Atlas clusters running MongoDB 6.0+ or 7.0+. Full
documentation
can be found [here](https://www.mongodb.com/docs/atlas/atlas-search/manage-indexes/).
:::

:::note
Because creating a search index can be a very heavy operation, automatic creation of search indices is disabled by
default. To enable automatic creation of search indices,
the [`autoSearchIndex`](https://mongoosejs.com/docs/guide.html#autoSearchIndex) option must be set to `true` in the
schema options using the [`@modelOptions`](https://typegoose.github.io/typegoose/docs/api/decorators/model-options)
decorator.
:::

## Example

```ts
// static search index that only maps some fields
@searchIndex({
  name: 'authorSearch',
  definition: {
    mappings: {
      dynamic: false,
      fields: {
        birthday: { type: 'date' },
        biography: { type: 'string' },
      },
    },
  },
})
class Author {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public birthday!: Date;

  @prop({ required: true })
  public biography!: string;
}
```

```ts
// dynamic index that maps all fields based on their type
@searchIndex({ name: 'BookSearch', definition: { dynamic: true } })
class Book {
  @prop({ required: true })
  public title!: string;

  @prop({ required: true })
  public author!: Ref<Author>;

  @prop({ required: true })
  public description!: string;

  @prop({ required: true })
  public publicationYear!: number;
}
```
