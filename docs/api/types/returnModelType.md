---
id: return-model-type
title: 'Return Model Type'
---

The Type `ReturnModelType<T, QueryHelpers>` is the type used to have type information for a class converted to a Mongoose Model.

- `T` is the logical `AND` of `mongoose.Model<DocumentType<T>>` and `T`
- `QueryHelpers` is for a Query-Helpers interface, [more here](api/decorators/queryMethod.md)

**Notes**:
- It has to be always with `typeof Class`, otherwise it will not work
- This type should always be used over (the now internal) `ModelType`

## Example

```ts
class Kitten {
  @prop()
  public name?: string;

  // this is an Model Method
  public static findByName(this: ReturnModelType<typeof Kitten>, name: string) {
    return this.find({ name }).exec(); // thanks to "ReturnModelType" "this" has type information
  }
}
```

## Difference to ModelType

`ModelType` is the logical `AND` of `mongoose.Model<DocumentType<T>>` and `T` whereas `ReturnModelType` is an extension to `ModelType`:
`ModelType<InstanceType<U>> & U`
