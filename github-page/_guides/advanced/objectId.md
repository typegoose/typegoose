---
title: "Using ObjectId Type"
redirect_from:
  - /guides/advanced/objectid
---

Using the type `ObjectId` can be done by defining it as such:

```ts
import * as mongoose from 'mongoose';
import { prop } from '@typegoose/typegoose';

class FooModel {
  @prop()
  userId: mongoose.Types.ObjectId;
}
```

You need to refer to the full length type since defining it as `type ObjectId = mongoose.Types.ObjectId` and referencing that will lead to it being an `Object` at compile time, meaning Typegoose will translate the property type to `Mixed`.

In order to query this model later you should use the type `mongoose.Types.ObjectId`

```ts
const FooModel = getModelForClass(FooModel);
FooModel.findOne({ userId: new mongoose.Types.ObjectId('5e997f95d6a35f3a0def3339') })
```
