---
title: "Known Issues"
redirect_from:
  - /guides/KNOWN-ISSUES
  - /guides/knownissues
  - /guides/knownIssues
---

## Known Issues

[Please look here first, to decide if it is an typegoose or an mongoose issue](https://github.com/Automattic/mongoose/issues?utf8=✓&q=is%3Aissue+involves%3Ahasezoey)

### transpile-only

Never run `ts-node --transpile-only` or `tsc --transpile-only`, otherwise sometimes types are missing completly or are the wrong type

### tsconfig-paths

typescript provide the option to alias paths (with `tsconfig-paths`), but is somehow incompatible with typegoose, [more info in here]({% include gitissue repo="szokodiakos" num=392 %})

### Self-Containing classes

It is currently not possible to use an self-containing class (sub-documents)

```ts
class SomeClass {
  @prop()
  public ref: SomeClass; // ERROR "Maximum Class Stack Size Exceeded"
}
```

For References it will work

```ts
class SomeClass {
  @prop({ ref: () => SomeClass }) // or hardcode the string
  public ref: Ref<SomeClass>;
}
```

### Class-transformer

Typegoose (/Mongoose) currently doesn't work well with `class-transformer`, when you want to get a POJO, use `model.operation.lean()` OR `doc.toJSON()` - but `classToPlain` (or any other method from CT) will not work and map incorrect properties (More info: {% include gitissue repo="typegoose" num=61 %}, [typegoose#9 (comment)]({% include gitissue repo="typegoose" num=96 %}#issuecomment-549031131), [class-transformer#227](https://github.com/typestack/class-transformer/issues/227))

### Babel

Using babel as an typescript-compiler is known to cause problems (like incorrect types)
Recommened is to use `tsc` directly, or `ts-node` or `ts-jest` for jest-testing

If Babel is still needed, then read [Babel TypeScript preset](https://babeljs.io/docs/en/babel-preset-typescript) and install the following plugins:
you will need to reproduce the `--experimentalDecorators` and `--emitDecoratorMetadata` [TypeScript compiler options](https://babeljs.io/docs/en/babel-plugin-transform-typescript#typescript-compiler-options) by using the corresponding plugins for [enabling decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators) and [emitting decorator metadata](https://github.com/leonardfactory/babel-plugin-transform-typescript-metadata):

```js
module.exports = {
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    'babel-plugin-transform-typescript-metadata',
  ]
}
```

### prop on get & set

`@prop` cannot be applied to `get` & `set` (ES6), because virtuals do not accept options & schema.loadClass wouldnt load these

## Known Mongoose incompatibilities

### typePojoToMixed

This option will **NOT** work because there is no neat / simple way of defining such thing in the same class

Workaround:
Create multiple classes:

```ts
class Sub {
  @prop()
  public name: string;
}

class Parent {
  @prop()
  public subDoc: Sub;
}
```

### @types/mongoose@5.7.22 and higher

Since 5.7.22 of `@types/mongoose` there are types for `.create`, but they are not fully compatible with typegoose's types, so if an error comes that cannot be fixed, the workaround is to use `<any>`

```ts
model.create<any>({ anything: anything });
```
