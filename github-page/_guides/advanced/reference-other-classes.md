---
title: 'Reference other Classes'
description: >
  Reference other Classes as a Property of an class
---

*This is just a base Documentation, making it cleaner would be appreciated*

## Referencing other Classes

Referencing other Classes is easy as the following:

```ts
class Nested {
  @prop()
  public someNestedProperty: string;
}

class Main {
  @prop({ ref: Nested })
  public nested: Nested;
}
```

## Common Problems

Because of the order classes are loaded and reordered at runtime, might result that some references are null / undefined / not existing, thats why mongoose provides the following

```ts
class Nested {
  @prop()
  public someNestedProperty: string;
}

class Main {
  @prop({ ref: "Nested" })
  public nested: Nested;
}
```

When you get errors about references, try putting it as a string
