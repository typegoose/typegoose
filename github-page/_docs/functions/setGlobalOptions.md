---
title: "Set Global Options"
---

`setGlobalOptions(options)` is used to set the global Options  

Example:

```ts
setGlobalOptions({ options: { allowMixed: true } });
```

## Options

### schemaOptions

Will be merged with every class's `modelOptions`'s `schemaOptions`

[Please look here for more](https://mongoosejs.com/docs/guide.html#options)

### options

Will be merged with every class's `modelOptions`'s `options`

[Please look here for more info]({{ site.baseurl }}{% link _docs/decorators/modelOptions.md%}#options-1)

### globalOptions

Global Options that will be applied nowhere, only globally

#### useNewEnum

Removed, [Please look here for more info]({{ site.baseurl }}{% link changelog.md%}#620)
