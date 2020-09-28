---
id: reference-other-classes
title: 'Reference other Classes'
---

## Referencing other Classes

Referencing other Classes is easy as shown by the following example:

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

Since 7.1.0, you can also use arrow-functions to return the type:

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

This is useful, if the class is either defined *after* the current class, or will otherwise be `undefined` and without hardcoding strings.

## Common Problems

Because of the order classes are loaded and reordered at runtime, this might result in some references being null / undefined / not existing. This is why Typegoose provides the following:

```ts
class Nested {
  @prop()
  public someNestedProperty: string;
}

// Recommended first fix:
class Main {
  @prop({ ref: () => Nested }) // since 7.1 arrow functions can be used to defer getting the type
  public nested: Ref<Nested>;
}

// Not recommended workaround (hardcoding model name):
class Main {
  @prop({ ref: 'Nested' }) // since 7.0 it is recommended to use "ref: getName(Class)" to dynamically get the name
  public nested: Ref<Nested>;
}
```

When you get errors about references, try making the name of the referenced class a string.
