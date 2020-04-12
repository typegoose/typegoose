---
title: "Change _id Type"
redirect_from:
  - /guides/advanced/changeidtype
---

To change the type of `_id` is done easily:

```ts
class SomeChangedID {
  @prop()
  public _id: string; // to change the _id to type of string
}
```

Note: when the type is not `ObjectID` you need to explicitly set the `_id` before saving

## With the Base Class

With the `Base` class's special _id treatment (types) it can be used like that:

```ts
class SomeChangedIDBase extends Base<string> {
  @prop()
  public _id: string;
}
```

Note: it needs to be duplicated, because the `Base` class only provides *types* and doesn't actuall change anything runtime

Note: to have `_id` not be `any`, the project needs to have either `noImplicitAny` or `strict` active in the `tsconfig`

Restriction: this method (extending Base) can only be done with types that are in `RefType` (all of `mongoose.Schema.Types` should work except `Array`, `Mixed`, `Boolean`)
