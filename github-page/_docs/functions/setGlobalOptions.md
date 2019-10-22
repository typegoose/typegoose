---
title: "Set Global Options"
---

`setGlobalOptions(options)` is used to set the global Options  
If no Mongoose model exists for this class yet, one will be created automatically  

Example:

```ts
class Kitten {
  @prop()
  public name?: string;
}
```

## Options

### globalSchemaOptions

[Please look here for more](https://mongoosejs.com/docs/guide.html#options)

### options

This is to set typegoose options

#### allowMixed

Set this to a Severity you want

- `ALLOW`: allow the use and execution of "mongoose.Schema.Types.Mixed" if the inferred type cannot be set otherwise
- `WARN`: Warn for it in the logger, but still allow the use of it
- `ERROR`: Error out when it comes to it
