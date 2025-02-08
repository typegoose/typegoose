---
id: use-without-emitDecoratorMetadata
title: 'Use Without "emitDecoratorMetadata"'
---

Typegoose can be used without the option [`emitDecoratorMetadata`](https://www.typescriptlang.org/tsconfig#emitDecoratorMetadata), but it is generally recommended to enable it for auto-inferring from the typescript type.

## Advantages to "emitDecoratorMetadata"

When using `emitDecoratorMetadata`, it is not needed to be explicit about *everything*, like the following example would simply "compile" into the appropriate types.

:::info
Some properties (like Arrays & Maps) need to be always explicit, see [`@prop` Array Options](../api/decorators/prop.md#array-options).
:::

```ts
class Kitten {
  @prop({ required: true }) // Not needed to be explicit that this property is a "String"
  public name!: string;

  @prop({ type: () => [String], required: true })
  public friendNames!: string[];

  @prop({ type: () => Number, required: true })
  public favoritePlacePriority!: Map<string, number>;
}
```

But when not using `emitDecoratorMetadata`, every property needs to be explicitly defined:

```ts
class Kitten {
  @prop({ type: () => String, required: true }) // Needs to be explicitly defined, because "emitDecoratorMetadata" is not enabled
  public name!: string;

  @prop({ type: () => [String], required: true }, PropType.ARRAY)
  public friendNames!: string[];

  @prop({ type: () => Number, required: true }, PropType.MAP)
  public favoritePlacePriority!: Map<string, number>;
}
```

:::tip
Since typegoose 12.11.0, `type: [TYPE]` will also infer [`PropType.ARRAY`](../api/decorators/prop.md#proptype), unless manually specified.
:::

[Look here for what `PropType` is](../api/decorators/prop.md#proptype)

## References

- [tsconfig option `emitDecoratorMetadata`](https://www.typescriptlang.org/tsconfig#emitDecoratorMetadata)
- [Typescript explanation to decorators and Reflection](https://www.typescriptlang.org/docs/handbook/decorators.html#metadata)
