---
id: reference-other-classes
title: 'Reference other Classes'
---

[Look here for the `Ref` type documentation](../../api/types/ref-type.md)

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

### Reference other classes with different _id type

Sometimes the `_id` type needs to be changed (to something like `String` / `Number`) and needs to be manually defined in the reference:

```ts
class Cat {
  @prop()
  public _id: string;
}

class Person {
  @prop()
  public name: string;

  @prop({ ref: () => Cat, type: () => String })
  public pet?: Ref<Cat, string>;
}
```

:::info
By default typegoose sets the default for the option `type` (if not defined) to `mongoose.Schema.Types.ObjectId`
:::

:::note
The generic-parameter `IDType` from `Ref` is not automatically inferred from the generic-parameter `Class` yet (may be in the future)  
The option `type` is not automatically inferred at runtime, because this could cause more "Circular Dependency" issues
:::

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
  @prop({ ref: 'Nested' }) // since 7.0 it is recommended to use "console.log(getName(Class))" to get the generated name once and hardcode like shown here
  public nested: Ref<Nested>;
}
```

When you get errors about references, try making the name of the referenced class a string.

:::caution
The new `() => Class` is meant to help with Circular Dependencies, but cannot remove the problems
:::

### Circular Dependencies

As an warning in [Common Problems](#common-problems) already said, the `() => Class` way can help with circular dependencies, but not remove them, this is due to how javascript works.

The only way known to resolve this is to do something like the following:

Class file A:

```ts
import { B } from "./B";

export class A {
  @prop()
  public name: string;

  @prop({ ref: () => B })
  public b: Ref<B>;
}
```

Class file B:

```ts
import { A } from "./A";

export class B {
  @prop()
  public name: string;

  @prop({ ref: () => A })
  public a: Ref<A>;
}
```

Central processing file:

```ts
import { A } from "./A";
import { B } from "./B";

export const AModel = getModelForClass(A);
export const BModel = getModelForClass(B);
```

This may seem like it is not changing much, but actually nodejs will resolve & load all required imports fully before trying to use any of them.  
And because the `() => Class` way is used, the reference to `Class` will only be resolved once the function is actually called, that is why it works, but just `Class` doesn't.
