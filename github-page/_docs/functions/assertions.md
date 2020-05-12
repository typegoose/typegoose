---
title: "Assertions"
redirect_from:
  - /docs/functions/assertions
---

## assertion

`assertion(cond, error?)` is an custom assertion function that utilizes [`asserts` from typescript 3.7](https://devblogs.microsoft.com/typescript/announcing-typescript-3-7/#assertion-functions)
-> it is an internal function, but can be used outside of typegoose too

Example:

```ts
let someMultiValue: string | number | boolean = "Hello";
// "someMultiValue"'s type is currently "string | number | boolean", even with an string defined
assertion(typeof someMultiValue === "string");
// now the type of "someMultiValue" is just "string" and an error is thrown if it is not an string
```

Note: the function is named `assertion` and not `assert` to not confuse the types of testing frameworks and from nodejs itself

## assertionIsClass

`assertionIsClass(class)` is like [assertion](#assertion), but with an condition and error pre-defined
-> it is an internal function, but can be used outside of typegoose too
