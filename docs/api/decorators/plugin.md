---
id: plugin
title: '@plugin'
---

**Typings:**

```ts
function plugin<TFunc extends Func, TParams = Parameters<TFunc>[1]>(mongoosePlugin: TFunc, options?: TParams): ClassDecorator
```

**Parameters:**

| Name                                                                  |   Type    | Description                                                                                       |
| :-------------------------------------------------------------------- | :-------: | :------------------------------------------------------------------------------------------------ |
| `mongoosePlugin` <span class="badge badge--secondary">Required</span> |  `TFunc`  | The Plugin to add, works like a normal `schema.plugin(plugin)` call                               |
| `options`                                                             | `TParams` | Options to add to the plugin, works like the second parameter to `schema.plugin(plugin, options)` |

Also see [Common Plugins](../../guides/integration-examples/common-plugins.mdx).

:::tip
If the Plugin to be added has options defined, it can be automatically inferred and set as the type for `options`, it can also be manually overwritten with the second generic.
:::

## Example

```ts
import { plugin, getModelForClass } from '@typegoose/typegoose';
import * as findOrCreate from 'mongoose-findorcreate';

@plugin(findOrCreate)
class User {}

const UserModel = getModelForClass(User);
const result = await UserModel.findOrCreate({ ... });
```
