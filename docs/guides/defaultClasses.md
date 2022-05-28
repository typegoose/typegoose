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

### Base

The Base Class provides the following fields:

| Field Name |             Type              |
| :--------: | :---------------------------: |
|   `_id`    |   `mongoose.Types.ObjectId`   |
|   `__v`    |           `number`            |
|   `__t`    | undefined \| string \| number | <!--This has to not be a inline-block, because docusaurus does not like " | "--> |

How to override `_id` type:  
<sub>This only works with typegoose 6.0.2+</sub>

```ts
class Something extends Base<mongoose.Schema.Type.String> {} // _id is now of type "String" (from mongoose)
```

### FindOrCreate

This class provides all the types supplied by the plugin [`mongoose-findorcreate`](./integration-examples/common-plugins.mdx#mongoose-findorcreate).

:::note
This class should only be used, if the plugin is used too
:::

[An Example can be seen in common-plugins](./integration-examples/common-plugins.mdx#mongoose-findorcreate)

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
