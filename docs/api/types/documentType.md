---
id: document-type
title: 'Document Type'
---

*previously known as `InstanceType<T>`*

The Type `DocumentType<T>` is the type used for Documents.

-> It is the logical 'AND' of the `mongoose.Document` and `T`

:::note
When `typeof Class` is used, it might not work.
:::

:::caution
If the current project's tsconfig also includes `compilerOptions.lib` with `dom`, then the types from Typegoose and Typescript will conflict.  
Solution is to remove `dom` from the `lib` array.
:::

## Example

```ts
class Kitten {
  @prop()
  public name?: string;

  // this is an Instance Method
  public getName(this: DocumentType<Kitten>) {
    return this.name; // thanks to "DocumentType" "this" has type information
  }
}
```
