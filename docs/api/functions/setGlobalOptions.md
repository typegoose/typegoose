---
id: set-global-options
title: 'Set Global Options'
---

`setGlobalOptions(options)` is used to set the global Options.

Example:

```ts
setGlobalOptions({ options: { allowMixed: Severity.ALLOW } });
```

## Options

### schemaOptions

Will be merged with every class's `modelOptions`'s `schemaOptions`.

[See the Mongoose docs](https://mongoosejs.com/docs/guide.html#options).

### options

Will be merged with every class's `modelOptions`'s `options`.

[Please look here for more info](../decorators/modelOptions.md#options-1)

### globalOptions

Global Options that will be applied no where else other than globally.
