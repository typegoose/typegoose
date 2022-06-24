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

`setGlobalOptions` is used to set [`schemaOptions`](../decorators/modelOptions.md#schemaoptions) and [`options`](../decorators/modelOptions.md#options-1) of [`IModelOptions`](../decorators/modelOptions.md#options) globally (applied to all schemas created by [`buildSchema`](./buildSchema.md)) and also set some global operation options for typegoose with [`globalOptions`](#options) property.

:::caution
Each call to `setGlobalOptions` overwrites previous calls.
:::

## Example

```ts
setGlobalOptions({ options: { allowMixed: Severity.ERROR } });
```

## Global Typegoose Options {#options}

There are currently no global Typegoose specific options
