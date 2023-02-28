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

| Field Name |           Type            |
| :--------: | :-----------------------: |
|   `_id`    | `mongoose.Types.ObjectId` |
|    `id`    |         `string`          |

How to override `_id` type:  
<sub>This only works with typegoose 6.0.2+</sub>

```ts
interface Something extends Base {} // have the interface to add the types of "Base" to the class
class Something {} // have your class, OR
class Something extends TimeStamps {} // have your class extend some other class
```

## Extra information

### Use multiple classes together

Because Typescript & JavaScript don't have functions for multiple inheritance, it can only be achieved by the following

```ts
interface Something extends Base {} // have the interface to add the types of "Base" to the class
class Something extends TimeStamps {} // have your class
```

:::note
This only works because `Base` only has types and does not modify anything.
:::
