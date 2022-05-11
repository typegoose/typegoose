---
id: nesting-classes
title: 'Nesting Classes'
---

<!--MDX Import section-->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!--END MDX Import section-->

### Differences from Mongoose

Typegoose Nesting is slightly different from mongoose, the following will show a basic mongoose schema which has nesting and how it would be translated to typegoose.

<Tabs groupId="mongoose-typegoose">
  <TabItem value="mongoose" label="Mongoose" default>

```ts
const AnimalSchema = new mongoose.Schema({
  name: String,
  properties: {
    hasEaten: Boolean,
    nicknames: [String]
  }
});
```

  </TabItem>
  <TabItem value="typegoose" label="Typegoose">

```ts
class Animal {
  @prop()
  public name?: string;

  @prop()
  public properties?: Properties;
}

class Properties {
  @prop()
  public hasEaten?: boolean;

  @prop({ type: String })
  public nicknames?: string[];
}
```

  </TabItem>
</Tabs>

It is required to put nested properties in their own class because of how typescript reflection works, it currently just translates `{ someprop: string }` to `Object` in reflection.

Also, under the hood, typegoose creates the schemas that would be equivalent to writing:

```ts
const PropertiesSchema = new mongoose.Schema({
  hasEaten: {
    type: Boolean
  },
  nicknames: [{
    type: String
  }]
});

const AnimalSchema = new mongoose.Schema({
  name: {
    type: String
  },
  properties: {
    type: PropertiesSchema
  }
});
```

### Using the Passthrough Class

:::warning
It is not recommended to use the `Passthrough` Class unless explicitly required to workaround something. In case you have found a problem that could only be solved with the Passthrough class, please open a new issue in the [typegoose repository](https://github.com/typegoose/typegoose/) so that we can fix having to use the Passthrough Class.
:::

In Typegoose there also exists a special class called [`Passthrough`](../api/decorators/prop.md#passthrough-class) which can be used to write a mongoose schema-like directly, without typegoose processing it.

Here is a Example of how a mongoose schema would look like writing it with `Passthrough`:

<Tabs groupId="mongoose-typegoose">
  <TabItem value="mongoose" label="Mongoose" default>

Mongoose Initial Schema:

```ts
const AnimalSchema = new mongoose.Schema({
  name: String,
  properties: {
    hasEaten: Boolean,
    nicknames: [String]
  }
});
```

  </TabItem>
  <TabItem value="typegoose" label="Typegoose">

And the Typegoose Equivalent with `Passthrough` (using the [`Direct`](../api/decorators/prop.md#passthrough-direct) mode):

```ts
class Animal {
  @prop()
  public name?: string;

  @prop({ type: () => new Passthrough({ hasEaten: Boolean, nicknames: [String] }, true) })
  public properties?: { hasEaten: boolean, nicknames: string[] };
}
```

  </TabItem>
</Tabs>

With `Passthrough` and the `Direct` mode, the typegoose class above is fully equivalent in how it is given to mongoose as the mongoose schema example.

### Difference to References

In Typegoose, references and subdocuments are written similarly:

<Tabs groupId="diff-reference">
  <TabItem value="ref-subdoc" label="Subdocument" default>

```ts
class Animal {
  @prop()
  public name?: string;

  @prop()
  public properties?: Properties;
}

class Properties {
  @prop()
  public hasEaten?: boolean;

  @prop({ type: String })
  public nicknames?: string[];
}
```

  </TabItem>
  <TabItem value="ref-ref" label="Reference">

```ts
class Animal {
  @prop()
  public name?: string;

  @prop({ ref: () => Properties })
  public properties?: Ref<Properties>;
}

class Properties {
  @prop()
  public hasEaten?: boolean;

  @prop({ type: String })
  public nicknames?: string[];
}
```

  </TabItem>

  <TabItem value="diff" label="Difference">

```diff
class Animal {
  @prop()
  public name?: string;

-   @prop()
-   public properties?: Properties;
+   @prop({ ref: () => Properties })
+   public properties?: Ref<Properties>;
}

class Properties {
  @prop()
  public hasEaten?: boolean;

  @prop({ type: String })
  public nicknames?: string[];
```

  </TabItem>
</Tabs>

For more on referencing other classes, read [Reference other Classes](./advanced/reference-other-classes.md).
