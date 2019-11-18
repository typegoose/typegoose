---
title: "Custom Types"
---

A Custom Type needs to have the following properties for typegoose to work:
- `name`: to show what the type is
- `prototype.OptionsConstructor`: to know where options are mapped to
- inherit / extend `mongoose.SchemaType`

Please look at [Mongoose's Documentation](https://mongoosejs.com/docs/customschematypes.html) on how to create an register an Custom Type
