---
id: using-with-deepkit-type
title: 'Using with @deepkit/type'
---

This guide shows how to use `typegoose` with `@deepkit/type`.

## Implementation

Suppose you have this `Account` class decorated with `@deepkit/type`:

:::note
It is better to have [DTOs](https://en.wikipedia.org/wiki/Data_transfer_object) to separate your API logic (decorated with @deepkit/type decorators) from your Entities (decorated with Typgoose decorators). This may seem like extra code, verbosity and work, but it is smart, because it will allow you to change your API and Entities separate from each other.
:::

```ts
import { classToPlain, t, plainToClass } from '@deepkit/type';
import { getModelForClass, prop } from '../../src/typegoose';

enum Group {
  confidential = 'confidential',
  public = 'public',
}

class Account {
  @t.mongoId.group(Group.public)
  public _id: string;

  @t.group(Group.public)
  public __v: number;

  @t.group(Group.public)
  @prop()
  public email: string;

  @t.group(Group.confidential)
  @prop()
  public confidentialProperty?: string;
}

const AccountModel = getModelForClass(Account);
```

You can then do, for example:

* the following, where we have a POJO. In this example, we are using Mongoose's `lean()` to get the POJO. Just imagine it is an incoming DTO though:

  ```ts
  // our simulated incoming DTO, a POJO
  const pojo = await AccountModel.findById(id).orFail().lean().exec();
  // groupsExclude option excludes the property group
  const access = { groupsExclude: [Group.confidential] };
  // deserialize pojo back to an Account instance
  const deserialized = plainToClass(Account, pojo, access);
  // we could actually do an await Account.Model.create(deserialized)
  expect(deserialized).toStrictEqual(accountClassObject);
  ```

* or where we have a normal document, and want to serialize it to a POJO, for sending the data back out to the client:

  ```ts
  // exec returns a Mongoose Object
  const doc = await AccountModel.findById(id).orFail().exec();
  // groupsExclude option excludes the property group
  const access = { groupsExclude: [Group.confidential] };
  // serialize Account instance back to a Plain Old Javascript Object
  const serialized = classToPlain(Account, doc, access);
  expect(serialized).toStrictEqual({
    _id: id,
    __v: 0,
    email: 'somebody@gmail.com',
  });
  // we can now send the "serialized" POJO out to the client
  ```

As you can see from these code examples, there is:

* an `access` or "grouping" definition needed to ouput the required properties for any serializing or deserializing. The `@deepkit/type` author suggests not using groupings at all, as they cause `@deepkit/type`'s performance to deteriorate. [See Offical Documentation for Reference](https://deepkit.io/documentation/type/serialization#groups), official quote:
  >  Note: Using grouped serialization is much slower than regular serialization. If performance is important, consider rearranging your data into multiple classes instead.
* a `Mongodb.ObjectId` decorator (`@t.mongoId`) is built into `@deepkit/type`'s decorators to handle the type conversion to string and back to a MongoId.

The `@deepkit/type`'s author also suggests not putting passwords or other confidential data directly inside entities that have mainly public access. It is better to put them in their own class or classes, so they can be handled without the grouping feature. This allows for the performance of serialization and deserialization to be much better and you can control who sees the confidential data more appropriately i.e. not via serialization steps.

Also, you'll only need `@t` to decorate your Entity, so your code will be cleaner too. This is what the `Account` entity would look like without the grouping/ access code.

```ts
class Account {
  @t.mongoId
  public _id: string;

  @t
  public __v: number;

  @t
  @prop()
  public email: string;
}
```

The `confidentialProperty` property would be in a different entity/ class.

And again, as was mentioned above, an even better tip is to not use the entity class at all for the serialization and deserialization definitions (i.e. with decorator metadata). It is much better to use [DTOs](https://en.wikipedia.org/wiki/Data_transfer_object) for this purpose.  

---

:::info
For more information, you can always look at the [typegoose `@deepkit/type` tests](https://github.com/typegoose/typegoose/blob/master/test/tests/deepkitType.test.ts)
:::
