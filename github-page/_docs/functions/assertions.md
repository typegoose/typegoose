---
title: 'Assertions'
redirect_from:
  - /docs/functions/assertions
---

## assertion

`assertion(cond, error?)` is a custom assertion function that utilizes
[`asserts` from typescript 3.7](https://devblogs.microsoft.com/typescript/announcing-typescript-3-7/#assertion-functions) -> it is an
internal function, but can be used outside of Typegoose too

Example:

```ts
let someMultiValue: string | number | boolean = 'Hello';
// "someMultiValue"'s type is currently "string | number | boolean", even with an string defined
assertion(typeof someMultiValue === 'string');
// now the type of "someMultiValue" is just "string" and an error is thrown if it is not an string
```

Note: the function is named `assertion` and not `assert`, so do not confuse it and the types of testing frameworks and from NodeJS itself.

## assertionIsClass

`assertionIsClass(class)` is like [assertion](#assertion), but with a condition and error pre-defined. -> it is an internal function, but
can be used outside of Typegoose too
