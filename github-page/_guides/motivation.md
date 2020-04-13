---
title: "Motivation"
---

A common problem when using Mongoose with TypeScript is that you have to define both the Mongoose model and the TypeScript interface. If the model changes, you also have to keep the TypeScript interface file in sync or the TypeScript interface would not represent the real data structure of the model.

Typegoose aims to solve this problem by defining only a TypeScript interface (class) which need to be enhanced with special Typegoose decorators.

Under the hood it uses the Reflect & [reflect-metadata](https://github.com/rbuckton/reflect-metadata) API to retrieve the types of the properties, so redundancy can be significantly reduced.

---

If you want better & official Typescript .d.ts files, [please push this issue](https://github.com/Automattic/mongoose/issues/8108)
