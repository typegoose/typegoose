---
id: return-model-type
title: 'ReturnModelType<T, QueryHelpers>'
---

**Typings:**

```ts
type ReturnModelType<U extends AnyParamConstructor<any>, QueryHelpers = BeAnObject>
```

**Parameters:**

| Name                                                     |                      Type                      | Description                                |
| :------------------------------------------------------- | :--------------------------------------------: | :----------------------------------------- |
| `U` <span class="badge badge--secondary">Required</span> |           `AnyParamConstructor<any>`           | The type of a Class to get a Model type of |
| `QueryHelpers`                                           | [`QueryHelpers`](../decorators/queryMethod.md) | Add Query Helpers to the type              |

The Type `ReturnModelType<T, QueryHelpers>` is the type used to have type information for a class converted to a Mongoose Model.

- `T` is the logical `AND` of `mongoose.Model<DocumentType<T>>` and `T`
- `QueryHelpers` is for a Query-Helpers interface, [more here](api/decorators/queryMethod.md)

:::note
When using Classes directly it has to always be `typeof Class`, to get the static representation of a class instead of the instance of a class.
:::
:::note
This type should always be used over (internal) `ModelType`,
:::

## Example

```ts
class Kitten {
  @prop()
  public name?: string;

  // this is a Model Method
  public static findByName(this: ReturnModelType<typeof Kitten>, name: string) {
    return this.find({ name }).exec(); // thanks to "ReturnModelType" "this" has type information
  }
}

const KittenModel: ReturnModelType<typeof Kitten> = getModelForClass(Kitten);
```

## Difference to `ModelType`

`ModelType` is the logical `AND` of `mongoose.Model<DocumentType<T>>` and `T` whereas `ReturnModelType` is an extension to `ModelType`:
`ModelType<InstanceType<U>> & U`
