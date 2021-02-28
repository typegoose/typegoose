---
id: query-method
title: 'Query Methods'
---

`@queryMethod(func: (this: ReturnModelType<U, QueryHelpers>, ...args: any[]) => mongoose.DocumentQuery)` is a decorator to add [custom query methods](https://thecodebarbarian.com/mongoose-custom-query-methods)
- `this` needs to be defined to have the correct types inside the class (and to make it compatible with `@queryMethod`)
- `func` is the function that should be added
- the return type of the function needs to be `mongoose.DocumentQuery`

:::note
The function needs to have a name and can't be an array-function (it needs to handle and use `this`)
:::
:::note
It is recommended to not define the functions inside the decorator, like in the example below
:::

Example:

```ts
// an interface is needed to add query-function types to the class
interface QueryHelpers {
  // use the actual function types dynamically
  findByName: AsQueryMethod<typeof findByName>;
  findByLastname: AsQueryMethod<typeof findByLastname>;
}

function findByName(this: ReturnModelType<typeof Person, QueryHelpers>, name: string) {
  return this.find({ name }); // important to not do an "await" and ".exec"
}
@queryMethod(findByName)
class Person {
  @prop({ required: true })
  public name: string;
}
const PersonModel = getModelForClass<typeof Person, QueryHelpers>(Person);

// thanks to "QueryHelpers" the function "findByName" should exist here and return the correct type
const docs: DocumentType<Person>[] = await PersonModel.find()
  .findByName('hello')
  .orFail()
  .exec();
```
