---
title: "Query Methods"
redirect_from:
  - /docs/decorators/querymethod
  - /docs/decorators/querymethods
  - /docs/decorators/queryMethods
---

`@queryMethod(func: (...args: any[]) => any)` is a decorator to add [custom query methods](https://thecodebarbarian.com/mongoose-custom-query-methods)
  - func: the function that should be added

Note: the function needs to have an name and cant be an array-function (it needs to handle and use `this`)

Example:

```ts
function findByName(this: ReturnModelType<typeof QueryMethods>, name: string) {
  return this.find({ name }); // important to not do an "await" and ".exec"
}
@queryMethod(findByName)
class QueryMethods {
  @prop({ required: true })
  public name: string;
}
const QueryMethodsModel = getModelForClass(QueryMethods);

const docs: DocumentType<QueryMethods>[] | null = await (QueryMethodsModel.find() as any).findByName('hello').exec();
```

Important: currently there is no practical way to add the function to the available types, so the query needs to be cast as `any` to allow the function to be used, what gets returned needs to be casted aswell
([Tracking issue](https://github.com/typegoose/typegoose/issues/236))
