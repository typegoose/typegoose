---
id: get-name
title: 'Get Name For Class'
---

`getName(class)` gets the name of the resulting model (accounts for `customName` & `automaticName`)

:::note
This function only works on classes, not on models or schemas.
:::

## Example

```ts
class Kitten {}
getName(Kitten); // "Kitten"

@modelOptions({ options: { customName: 'SomeRandomKitten' } })
class Kitten2 {}
getName(Kitten); // "SomeRandomKitten"

@modelOptions({ schemaOptions: { collection: 'RandomKittens' }, options: { automaticName: true } })
class Kitten3 {}
getName(Kitten); // "Kitten3_RandomKittens"
```
