---
title: "Default Classes"
redirect_from:
  - /guides/default-classes
  - /guides/default_classes
  - /guides/defaultclasses
---

This Guide contains all default classes typegoose provides

->Please know that all properties provied are just types to show which are available from mongoose, or stated otherwise

Example of using all of them:

```ts
class SomeClass extends TimeStamps, Base {} // this class now has the types of "TimeStamps" & "Base"
```

## TimeStamps

The Time Stamps Class provides the following types:

- `createdAt`: Date
- `updatedAt`: Date

## Base

The Base Class provides the following types:

- `_id`: ObjectId ; when you need an other type, override it
- `__v`: number
- `__t`: undefined \| string \| number
