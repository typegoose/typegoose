---
id: get-name
title: 'getName'
---

**Typings:**

```ts
function getName<U extends AnyParamConstructor<any>>(cl: U, overwriteOptions?: IModelOptions)
```

**Parameters:**

| Name                                                      |      Type       | Description                                          |
| :-------------------------------------------------------- | :-------------: | :--------------------------------------------------- |
| `cl` <span class="badge badge--secondary">Required</span> |       `U`       | The Class to get a name from / for                   |
| `overwriteOptions`                                        | `IModelOptions` | Overwrite select `IModelOptions` for name generation |

`getName` generates the name of the given Class (`cl`) with the given OverwriteOptions (`overwriteOptions`).

[Name Generation in typegoose.](../../guides/advanced/name-generation.md)

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
