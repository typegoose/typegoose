---
title: 'Reference other Classes'
description: >
  Reference other Classes as a Property of an class
---

## Referencing other Classes

Referencing other Classes is easy as the following:

```ts
class Nested {
  @prop()
  public someNestedProperty: string;
}

class Main {
  @prop({ ref: Nested }) // for one
  public nested: Ref<Nested>;

  @prop({ ref: Nested }) // for an array of references
  public nestedArray: Ref<Nested>[];
}
```

Since 7.1.0 it is also allowed to do arrow-functions returning the type:

```ts
class Nested {
  @prop()
  public someNestedProperty: string;
}

class Main {
  @prop({ ref: () => Nested })
  public nested: Ref<Nested>;
}
```

This is useful if the class is either defined *after* the current class, or will otherwise be `undefined` and without hardcoding strings

## Common Problems

Because of the order classes are loaded and reordered at runtime, might result that some references are null / undefined / not existing, thats why mongoose provides the following

```ts
class Nested {
  @prop()
  public someNestedProperty: string;
}

class Main {
  @prop({ ref: "Nested" }) // since 7.0 it is recommended to use "ref: getName(Class)" to dynamically get the name
  public nested: Ref<Nested>;
}
```

When you get errors about references, try putting it as a string
