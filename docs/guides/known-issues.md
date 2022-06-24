---
id: known-issues
title: 'Known Issues'
---

## Known Issues

[Please look here first, to decide if it is a Typegoose or a Mongoose issue.](https://github.com/Automattic/mongoose/issues?utf8=✓&q=is%3Aissue+involves%3Ahasezoey)

### transpile-only

It is not recommended to run compilers with option `transpile-only` (like `tsc --transpile-only` or `ts-node --transpile-only`), because this will act like not having `emitDecoratorMetadata` enabled, see [Use Without "emitDecoratorMetadata"](./use-without-emitDecoratorMetadata.md).

### tsconfig-paths

TypeScript provides the option to alias paths (with `tsconfig-paths`), but is somehow incompatible with Typegoose, [more info in here](https://github.com/szokodiakos/typegoose/issues/392).

### Self-Containing classes

It is currently not (and probably never) possible to use a self-containing class:

```ts
class SomeClass {
  @prop()
  public ref: SomeClass; // ERROR "Maximum Class Stack Size Exceeded"
}
```

Though Deferred Reference will still work:

```ts
class SomeClass {
  @prop({ ref: () => SomeClass }) // or hardcode the string
  public ref: Ref<SomeClass>;
}
```

### Babel

<span class="badge badge--warning">This Section may be outdated</span>

Using babel as a TypeScript compiler is known to cause problems (like incorrect types) (see [`transpile-only`](#transpile-only)), it is recommened you use `tsc`, `ts-node` or `ts-jest` directly.

If Babel is still needed, then read [Babel TypeScript preset](https://babeljs.io/docs/en/babel-preset-typescript) and install the following plugins:  

- To reproduce the typescript decorators (`experimentalDecorators`), use [`@babel/plugin-proposal-decorators`](https://babeljs.io/docs/en/babel-plugin-proposal-decorators)
- To reproduce the decorator metadata output (`emitDecoratorMetadata`), use [`babel-plugin-transform-typescript-metadata`](https://github.com/leonardfactory/babel-plugin-transform-typescript-metadata)
- Plugin [`@babel/plugin-proposal-class-properties`](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties) is required to solve the error `Syntax error, Definitely assigned fields cannot be initialized here, but only in the constructor` which would come with using decorators (legacy / stage 1) nowdays

:::info
`emitDecoratorMetadata` is not strictly needed, see [Use Without `emitDecoratorMetadata`](./use-without-emitDecoratorMetadata.md).
:::

```js
module.exports = {
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ]
}
```

### prop on get & set

`@prop` cannot be applied to `get` & `set` (ES6 class keywords), because virtuals do not accept options & [`schema.loadClass`](https://mongoosejs.com/docs/advanced_schemas.html#creating-from-es6-classes-using-loadclass) wouldn't load these.

### Webpack

Webpack's `minimize` cannot be used with typegoose, because typegoose relies heavily on reflection and property names.

In webpack, it can be disabled when adding the following to the webpack config:

```js
module.exports = {
  optimization: {
    minimize: false
  }
}
```

:::note
There are some workarounds for some minification problems, like the class name (which would be the model name) can be changed with [`customName`](../api/decorators/model-options#customname).
:::

### `@types/node` breaking change

Early January 2022, there was a update in `@types/node`, which was actually a breaking change which causes typescript compile errors to show up (like for `GridFSBucketWriteStream` from mongodb, even though unused).

~~The current only workaround is to pin the versions of `@types/node` used to ones before the update, which in the case of typegoose is `@types/node@12.20.39`.~~  
As of 02-02-2022 (d/m/y), mongoose has released `6.2.0` which upgraded `mongodb` to a version that has updated types, and typegoose `9.6.0` uses this mongoose version.

### NodeJS 17.5 Breaking Change

NodeJS 17.5 was released, which included a breaking change for mongoose, which resulted in a error (/ crash of the application).

Mongoose has released version `6.2.2` on 16.2.22 (d/m/y) which fixes the issue on mongoose's side.  
Since 24.2.22 (d/m/y) NodeJS 17.6 is released which should include the fix.

### `DocumentType` is not generic

Typescript has its own `DocumentType` when having `DOM` enabled in `tsconfig` option `lib`, in any case the correct `DocumentType` has to be imported directly from typegoose.  
It is also recommended to remove the option `DOM` from the `tsconfig` option `lib` when possible.
