---
id: manual-schema-modification
title: "Manual Schema Modification"
---

Sometimes manual schema modification is needed, this Guide will describe on how to do it.

When wanting to get the schema of a class, but not the model yet, then [`buildSchema`](../../api/functions/buildSchema.md) should be used and [`addModelToTypegoose`](../../api/functions/addModelToTypegoose.md) to add it to the typegoose cache and get the correct types.

Example:

```ts
// Normal Typegoose Class definition
class Cat {
  @prop()
  public name?: string;
}

// "buildSchema" is called like "getModelForClass"
// "buildSchema" also supports overwriting options like "getModelForClass" (essentially "getModelForClass" passes the options to "buildSchema")
const CatSchema = buildSchema(Cat);

// example modifying the schema before adding
// in this case adding a virtual "getName"
CatSchema.virtual("getName").get(function() { return this.name });

// The Schema will have to be manually made into a model
const CatModelRaw = mongoose.model(getName(Cat), CatSchema);

// And finally the model will get added to the typegoose cache with the class and also have proper types
// essentially "addModelToTypegoose" re-exports the input model, but cast as the correct typegoose type
export const CatModel = addModelToTypegoose(CatModelRaw, Cat);
```

Note: the example above uses [`getName`](../../api/functions/getName.md) to generate the name like typegoose does normally.
