---
id: use-without-emitDecoratorMetadata
title: 'Use Without "emitDecoratorMetadata"'
---

Typegoose can be used without the option [`emitDecoratorMetadata`](https://www.typescriptlang.org/tsconfig#emitDecoratorMetadata), but it is generally recommeneded to enable it for auto-inferring from the typescript type

## Advantages to "emitDecoratorMetadata"

With the use of `emitDecoratorMetadata`, it is not needed to be explicit about *everything*, like

```ts
class Kitten {
  @prop({ required: true })
  public name!: string;

  @prop({ type: () => [String], required: true })
  public friendNames!: string[];

  @prop({ type: () => Number, required: true })
  public favoritePlacePriority!: Map<string, number>;
}
```

would simply "compile" into the appropiate types, like `Primitve`, `Array` and `Map`

but when not having `emitDecoratorMetadata` enabled, everything needs to be explicitly defined:

```ts
class Kitten {
  @prop({ type: () => String, required: true })
  public name!: string;

  @prop({ type: () => [String], required: true }, WhatIsIt.ARRAY)
  public friendNames!: string[];

  @prop({ type: () => Number, required: true }, WhatIsIt.MAP)
  public favoritePlacePriority!: Map<string, number>;
}
```

[look here for what `WhatIsIt` is](../api/decorators/prop.md#whatisit)

---

References:
- [tsconfig option `emitDecoratorMetadata`](https://www.typescriptlang.org/tsconfig#emitDecoratorMetadata)
- [Typescript explanation to decorators and Reflection](https://www.typescriptlang.org/docs/handbook/decorators.html#metadata)
