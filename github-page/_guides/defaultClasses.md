---
title: "Default Classes"
redirect_from:
  - /guides/default-classes
  - /guides/default_classes
  - /guides/defaultclasses
---

This Guide contains all default classes typegoose provides

->Please know that all properties provied are just types to show which are available from mongoose, or stated otherwise

## All the Default Classes

Example of using all of them:

```ts
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

class SomeClass extends TimeStamps, Base {} // this class now has the types of "TimeStamps" & "Base"
```

### TimeStamps

The `TimeStamps` class provides the following fields:

- `createdAt`: Date
- `updatedAt`: Date

### Base

The Base Class provides the following fields:

- `_id`: ObjectId
- `__v`: number
- `__t`: undefined \| string \| number

How to override `_id` type:  
<sub>This only works on 6.0.2+</sub>

```ts
class Something extends Base<mongoose.Schema.Type.String> {} // _id is now of type "String" (from mongoose)
```

### FindOrCreate

This class provides all the types supplied be the plugin `mongoose-findOrCreate`

-> This class should only be used if the plugin is used too

## Extra information

Here you can find extra information

### Use multiple classes together

Because Typescript & JavaScript don't have functions for multiple inheritance, it can only be achieved by the following

```ts
interface Something extends Base {} // have the interface to add the types of "Base" to the class
class Something extends TimeStamps {} // have your class
```

Note: This only works because `Base` only has types and does not modify anything
