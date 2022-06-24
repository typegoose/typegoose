---
id: get-model-with-string
title: 'getModelWithString'
---

**Typings:**

```ts
function getModelWithString<U extends AnyParamConstructor<any>, QueryHelpers = BeAnObject>(
  key: string
): undefined | ReturnModelType<U, QueryHelpers>
```

**Parameters:**

| Name                                                       |   Type   | Description                                     |
| :--------------------------------------------------------- | :------: | :---------------------------------------------- |
| `key` <span class="badge badge--secondary">Required</span> | `string` | Get a Model from Cache by the name of the model |

`getModelWithString` tries to find the given key in the Typegoose Model Cache and return the Model.

Similar to [`getClass`](./getClass.md), only that this function currently directly requires the key.

## Example

```ts
class Kitten {
  @prop()
  public name?: string;
}

const KittenModel = getModelForClass(Kitten);

const KittenModelNew = getModelWithString(KittenModel.modelName);
// OR with the internal utils.getName(class)
const KittenModelNew = getModelWithString(utils.getName(Kitten));
// BUT when you have the class at your disposal, you should use "getModelForClass" - it will return the already compiled model
// also possible is to use "getClass" to get the class from something like a document, but it would be better to directly get the model from the document
const KittenModelNew = getModelWithString(getClass(somedocument) ?? "");
// instead of using a document it is recommended to directly get the model with
somedocument.$model;
```
