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

### FindOrCreate

This class provides all the types supplied be the plugin `mongoose-findOrCreate`

-> This class should only be used if the plugin is used too

## Extra Infomation

Here you can find extra infomation

### Use multiple classes together

Because [TimeStamps](#timestamps) dosnt extend [Base](#base), you can combine them like below, but because multiple extends are not supported nativly in ES/JS/TS, you have to use mixins
-> [Look at Typescript guide to understand this](https://www.typescriptlang.org/docs/handbook/mixins.html)

```ts
interface Something extends Base, TimeStamps {} // have the interface to override the types
class Something {} // have your class
applyMixins(Something, [Base, TimeStamps]); // apply the two other classes
```
