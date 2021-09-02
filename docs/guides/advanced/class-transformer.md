---
id: using-with-class-transformer
title: 'Using with class-transformer'
---

This guide shows how to use `typegoose` with `class-transformer`.

## Implementation

Suppose you have this `Account` class decorated with `class-transformer`:

```ts
import { Exclude, Expose, Transform } from 'class-transformer';
import { getModelForClass, mongoose, prop } from 'typegoose';

// re-implement base Document to allow class-transformer to serialize/deserialize its properties
// This class is needed, otherwise "_id" and "__v" would be excluded from the output
class DocumentCT {
  @Expose()
  // makes sure that when deserializing from a Mongoose Object, ObjectId is serialized into a string
  @Transform((value: any) => {
    if ('value' in value) {
      return value.value instanceof mongoose.Types.ObjectId ? value.value.toHexString() : value.value.toString();
    }

    return 'unknown value';
  })
  public _id: string;

  @Expose()
  public __v: number;
}

@Exclude()
class Account extends DocumentCT {
  @prop()
  @Expose()
  public email: string;

  @prop()
  @Expose({ groups: ['admin'] })
  public password: string;
}

const AccountModel = getModelForClass(Account);
```

Side-Note: Typegoose dosnt provide an class like `DocumentCT` by default, because this would require adding `class-transformer` as an dependency

You can then use, for example:

* `lean()` on the query:

  ```ts
  // lean return a Plain Old Javascript Object
  const pojo = await AccountModel.findById(id).orFail().lean().exec();
  // deserialize Plain Old Javascript Object into an instance of the Account class
  const deserialized = plainToClass(Account, pojo);
  // serialize Account instance back to a Plain Old Javascript Object, applying class-transformer's magic
  const serialized = classToPlain(deserialized);
  ```

* or a normal document:

  ```ts
  // exec return a Mongoose Object
  const mo = await AccountModel.findById(id).orFail().exec();
  // deserialize Mongoose Object into an instance of the Account class
  const deserialized = plainToClass(Account, mo);
  // serialize Account instance back to a Plain Old Javascript Object, applying class-transformer's magic
  const serialized = classToPlain(deserialized);
  ```

As you can see from these examples, there is:

* a redundant step to first turn the output of the query into a full instance of `Account` : `plainToClass(..., ...)`
* before being able to benefit from its features for serialization: `classToPlain(...)`

The reson for doing this is so queries will output `DocumentType<Account>` (Mongoose Document) instead of required `Account` (Plain Object / instance of the Class) in this example.

`class-transformer` can only operate its magic on instances of annotated classes.

---

:::info
For more information, you can always look at the [typegoose `class-transformer` tests](https://github.com/typegoose/typegoose/blob/master/test/tests/classTransformer.test.ts)
:::
