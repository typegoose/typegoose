---
id: get-class-for-document
title: 'getClassForDocument'
---

**Typings:**

```ts
function getClassForDocument(document: mongoose.Document): NewableFunction | undefined
```

**Parameters:**

| Name                                                            |        Type         | Description                        |
| :-------------------------------------------------------------- | :-----------------: | :--------------------------------- |
| `document` <span class="badge badge--secondary">Required</span> | `mongoose.Document` | The Document to get the Class from |

`getClassForDocument` is used to get a Class from a document (which either has a `.typegooseName` function or property), this function is a more specific case of [`getClass`](./getClass.md).

:::note
This function only works if the schema has been created with [`buildSchema`](./buildSchema.md) or a property / function has been manually added.
:::

## Example

```ts
class Kitten {
  @prop()
  public name?: string;
}

const KittenModel = getModelForClass(Kitten);

const doc = new KittenModel();

getClassForDocument(doc) === Kitten; // should be "true"
```
