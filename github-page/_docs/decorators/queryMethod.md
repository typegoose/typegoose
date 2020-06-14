---
title: "Query Methods"
redirect_from:
  - /docs/decorators/querymethod
  - /docs/decorators/querymethods
  - /docs/decorators/queryMethods
---

`@queryMethod(func: (this: ReturnModelType<U, QueryHelpers>, ...args: any[]) => mongoose.DocumentQuery)` is a decorator to add [custom query methods](https://thecodebarbarian.com/mongoose-custom-query-methods)
- `this` needs to be defined to have the correct types inside the class (and to make it comaptible with `@queryMethod`)
- `func` is the function that should be added
- the return type of the function needs to be `mongoose.DocumentQuery`

Notes:
- The function needs to have an name and cant be an array-function (it needs to handle and use `this`)
- It is recommened to to not define the functions inside the decorator, like in the example below

Example:

```ts
interface QueryHelpers {
  findByName: QueryMethod<typeof findByName>;
  findByLastname: QueryMethod<typeof findByLastname>;
}

function findByName(this: ReturnModelType<typeof QueryMethods, QueryHelpers>, name: string) {
  return this.find({ name }); // important to not do an "await" and ".exec"
}
@queryMethod(findByName)
class QueryMethods {
  @prop({ required: true })
  public name: string;
}
const QueryMethodsModel = getModelForClass(QueryMethods);

// thanks to "QueryHelpers" the function "findByName" should exist here and return the correct type
const docs: DocumentType<QueryMethods>[] = await QueryMethodsModel.find().findByName('hello').orFail().exec();
```

Important: currently there is no practical way to add the function to the available types, so the query needs to be cast as `any` to allow the function to be used, what gets returned needs to be casted aswell
([Tracking issue](https://github.com/typegoose/typegoose/issues/236))
