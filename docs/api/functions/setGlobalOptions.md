---
id: set-global-options
title: 'setGlobalOptions'
---

**Typings:**

```ts
function setGlobalOptions(options: IGlobalOptions)
```

**Parameters:**

| Name      |       Type       | Description                   |
| :-------- | :--------------: | :---------------------------- |
| `options` | `IGlobalOptions` | The Options to apply globally |

`setGlobalOptions` is used to set [`schemaOptions`](../decorators/modelOptions.md#schemaoptions) and [`options`](../decorators/modelOptions.md#options-1) of [`IModelOptions`](../decorators/modelOptions.md#imodeloptions) globally (applied to all schemas created by [`buildSchema`](./buildSchema.md)) and also set some global operation options for typegoose with [`globalOptions`](#options) property.

Only the specified options in `options` are changed, if a subsequent call is made with different keys, it will not affect other keys, only the first 2 levels are merged.

:::caution
The `setGlobalOptions` call has to be before any `buildSchema` (by extension also `getModelForClass`) calls, which means when doing `export const Model = buildSchema(class)`, the `setGlobalOptions` call has to be before any of the imports that export schemas / models.
:::

## Example

```ts
setGlobalOptions({ options: { allowMixed: Severity.ERROR } });
setGlobalOptions({ globalOptions: { disableCaching: true } }); // does not affect the previous setting of "options"
setGlobalOptions({ globalOptions: { someOtherOption: true } }); // does not affect the previous setting of "globalOptions"
setGlobalOptions({ options: { disableLowerIndexes: true, allowMixed: Severity.WARN } }); // will overwrite previous setting of "allowMixed"

// the global options would now look like
{
  options: {
    allowMixed: Severity.WARN,
    disableLowerIndexes: true
  },
  globalOptions: {
    disableCaching: true,
    someOtherOption: true
  }
}
```

## Global Typegoose Options {#options}

### disableCaching

Default: `false`

Set if caching should be disabled.

Enabling this will disable cache (will not clear cache if already something is added).

Effects:

- [`deleteModel`](./deleteModel.md#deletemodel) & [`deleteModelWithClass`](./deleteModel.md#deletemodelwithclass) will throw [`E033`](../../guides/error-warning-details.md#cache-disabled-e033) when used
- [`getClass`](./getClass.md) will throw [`E033`](../../guides/error-warning-details.md#cache-disabled-e033) when used
- [`getModelWithString`](./getModelWithString.md) will throw [`E033`](../../guides/error-warning-details.md#cache-disabled-e033) when used
- [`buildSchema`](./buildSchema.md) will not add anything to the `constructors` cache
- [`addModelToTypegoose`](./addModelToTypegoose.md) will not add anything to `constructors` and `models` cache (but will still check if the class and model are valid)
- [`getModelForClass`](./getModelForClass.md) & [`getDiscriminatorModelForClass`](./getDiscriminatorModelForClass.md) will not try to get anything from cache
