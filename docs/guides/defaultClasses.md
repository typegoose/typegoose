---
id: default-classes
title: 'Default Classes'
---

This Guide contains all default classes Typegoose provides.

:::note
All properties provided are just types to show which are available from Mongoose, or stated otherwise.
:::

### TimeStamps

The `TimeStamps` class provides the following fields:

| Field Name  |  Type  |
| :---------: | :----: |
| `createdAt` | `Date` |
| `updatedAt` | `Date` |

And also applies the following `schemaOptions`:

|  Field Name  | Value  |
| :----------: | :----: |
| `timestamps` | `true` |

### Base

The Base *Interface* provides the following fields:

| Field Name |                           Type                           |
| :--------: | :------------------------------------------------------: |
|   `_id`    | The chosen ID-Type, by default `mongoose.Types.ObjectId` |
|    `id`    |                         `string`                         |

:::tip
Note that `@prop()` should **not** be used on the implemented properties, unless you specifically want to overwrite default behavior or [change the `_id` type](./advanced/changeIDType.md).
:::

Example Usage:  
<sub>This only works with typegoose 8.0.0+</sub>

```ts
class Something implements Base {
  public _id!: ObjectId
  public id!: string;
}
// Base can also be used together with other classes
class Something extends TimeStamps implements Base {
  // ... properties to implement
}
```
