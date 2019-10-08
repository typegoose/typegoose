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
class SomeClass extends TimeStamps, Base {} // this class now has the types of "TimeStamps" & "Base"
```

### TimeStamps

The Time Stamps Class provides the following types:

- `createdAt`: Date
- `updatedAt`: Date

### Base

The Base Class provides the following types:

- `_id`: ObjectId
- `__v`: number
- `__t`: undefined \| string \| number

How to override `_id` type:  
<sub>This only works on 6.0.2+</sub>

```ts
class Something extends Base<mongoose.Schema.Type.String> {} // _id is now of type "String" (from mongoose)
```

## Extra Infomation

Here you can find extra infomation

### Use multiple classes together

Because [TimeStamps](#timestamps) dont extend [Base](#base), you can use multiple classes like in this Example:

```ts
class Something extends TimeStamps, Base {}
```
