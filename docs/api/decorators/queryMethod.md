---
id: query-method
title: '@queryMethod'
---

`@queryMethod(func: (this: QueryHelperThis<U, QueryHelpers>, ...args: any[]) => mongoose.DocumentQuery)` is a decorator to add [custom query methods](https://thecodebarbarian.com/mongoose-custom-query-methods)
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
import { types } from "@typegoose/typegoose";

// an interface is needed to add query-function types to the class
interface QueryHelpers {
  // use the actual function types dynamically
  findByName: types.AsQueryMethod<typeof findByName>;
  findByLastname: types.AsQueryMethod<typeof findByLastname>;
}

function findByName(this: types.QueryHelperThis<typeof Person, QueryHelpers>, name: string) {
  return this.find({ name }); // it is important to not do a "await" and ".exec"
}
@queryMethod(findByName)
class Person {
  @prop({ required: true })
  public name: string;
}
const PersonModel = getModelForClass<typeof Person, QueryHelpers>(Person);

// thanks to "QueryHelpers" the function "findByName" should exist here and return the correct type
const docs: types.DocumentType<Person>[] = await PersonModel.find()
  .findByName('hello')
  .orFail()
  .exec();
```
