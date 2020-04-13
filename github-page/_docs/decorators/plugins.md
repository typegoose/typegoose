---
title: "Plugins"
---

`@plugin(mongoosePlugin: (...args: any) => any, options: object)` is used to add plugins to a class
  - `mongoosePlugin`: the plugin itself; some plugins might have to be called first
  - `options`: the options for the plugin

-> Typegoose has a [default-class for `findOrCreate`]({{ site.baseurl }}{% link _guides/defaultClasses.md %}#findorcreate) with all the types supplied by the plugin

Example:

```ts
import { plugin, getModelForClass, defaultClasses } from "@typegoose/typegoose";
import * as findOrCreate from 'mongoose-findorcreate';

@plugin(findOrCreate)
class User extends FindOrCreate {}

const UserModel = getModelForClass(User);
const result = await UserModel.findOrCreate({ ... });
```

## Typegoose plugins

- [Auto-Increment](https://github.com/typegoose/auto-increment/)
