---
id: motivation
title: 'Motivation'
---

A common problem when using Mongoose with TypeScript is that you have to define both the Mongoose model and the TypeScript interface. If the model changes, you also have to keep the TypeScript interface file in sync or the TypeScript interface would not represent the real data structure of the model.

Typegoose aims to solve this problem by only defining ES6 Classes, which need to be enhanced with special Typegoose decorators.

Under the hood it uses [Reflection](https://www.typescriptlang.org/docs/handbook/decorators.html#metadata) & [reflect-metadata](https://github.com/rbuckton/reflect-metadata) API to retrieve the types of the properties, so redundancy can be significantly reduced.
