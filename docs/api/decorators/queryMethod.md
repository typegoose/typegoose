---
id: query-method
title: '@queryMethod'
---

**Typings:**

```ts
function queryMethod<QueryHelpers, U extends AnyParamConstructor<any>>(
  func: (this: QueryHelperThis<U, QueryHelpers>, ...params: any[]) => Query<any, any>
): ClassDecorator
```

**Parameters:**

| Name                                                        |                                      Type                                       | Description                           |
| :---------------------------------------------------------- | :-----------------------------------------------------------------------------: | :------------------------------------ |
| `func` <span class="badge badge--secondary">Required</span> | `(this: QueryHelperThis<U, QueryHelpers>, ...params: any[]) => Query<any, any>` | The Function to add as a Query Method |

`@queryMethod` is used to add [Custom Query Methods](https://thecodebarbarian.com/mongoose-custom-query-methods).

**`func` Parameters:**

| Name               |                Type                | Description                                               |
| :----------------- | :--------------------------------: | :-------------------------------------------------------- |
| `this`             | `QueryHelperThis<U, QueryHelpers>` | The Current Query, with Query Helpers available           |
| `...params`        |              `any[]`               | Extra Parameters defined by the Query Helper to be added  |
| `=>` (Return Type) |          `mongoose.Query`          | A Mongoose Query has to be returned from the Query Helper |

:::warning
A Named function has do be used, it also cannot be a Arrow-Function (`() => any`), because the Query can only be accessed with `this` and a name has to be supplied to be callable later on. (see Example below)
:::

## Example

```ts
import { types } from "@typegoose/typegoose";

// an interface is needed to add query-function types to the class
interface QueryHelpers {
  // use the actual function types dynamically
  findByName: types.AsQueryMethod<typeof findByName>;
  // the same can be done with other functions (not listed in this example)
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
