---
id: delete-model
title: 'deleteModel*'
---

## deleteModel

**Typings:**

```ts
function deleteModel(name: string)
```

**Parameters:**

| Name                                                        |   Type   | Description                      |
| :---------------------------------------------------------- | :------: | :------------------------------- |
| `name` <span class="badge badge--secondary">Required</span> | `string` | The Key to remove from the Cache |

`deleteModel` deletes the given Key (`name`) from mongoose and the Typegoose Cache, the key is the generated [Model Name](../../guides/advanced/name-generation.md).

Use [`deleteModelWithClass`](#deletemodelwithclass) when wanting to delete by class instead of by key directly.

:::caution
This function also deletes the Model from Mongoose itself.
:::
:::caution
Currently this function does not delete any entries that have different name generation applied at insertion time (like having name generation overwritten in [`getModelForClass`](./getClassForDocument.md))).
:::
:::caution
Will throw a Error when caching is disabled [E033](../../guides/error-warning-details.md#cache-disabled-e033).
:::

```ts
class SomeUser {}

const SomeUserModel = getModelForClass(SomeUser);
deleteModel('SomeUser');
```

## deleteModelWithClass

**Typings:**

```ts
function deleteModelWithClass<U extends AnyParamConstructor<any>>(cl: U)
```

**Parameters:**

| Name                                                      | Type  | Description                        |
| :-------------------------------------------------------- | :---: | :--------------------------------- |
| `cl` <span class="badge badge--secondary">Required</span> |  `U`  | The Class to remove from the Cache |

`deleteModelWithClass` tries to find the given Class (`cl`) in the cache and calls [`deleteModel`](#deletemodel) with the key the Class has given.

:::caution
Will throw a Error when caching is disabled [E033](../../guides/error-warning-details.md#cache-disabled-e033).
:::

```ts
class SomeUser {}

const SomeUserModel = getModelForClass(SomeUser);
deleteModelWithClass(SomeUser);
```
