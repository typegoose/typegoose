---
id: name-generation
title: "Typegoose's Name Generation"
---

In Typegoose the name generation can vary somewhat, this guide will explain all possible ways a name gets generated.

:::info
This Guide will use the [`assertion`](../../api/functions/assertions.md) function that typegoose provides.  
TL;DR: This function is basically like NodeJS's [`assert`](https://nodejs.org/api/assert.html#assertvalue-message), just more typescript friendly.
:::

## Default

The default, without any options the name that gets generated is the Class Name.

Example:

```ts
class SomeClass {
  @prop()
  public someProp: string;
}

// The resulting name will be the class name
assertion(getName(SomeClass) === 'SomeClass');
```

## Using with `automaticName`

When using the option [`automaticName`](../../api/decorators/modelOptions.md#automaticname), there are multiple cases when having `collection` defined.

Example:

```ts
// Example without having "collection" defined
@modelOptions({ options: { automaticName: true } })
class SomeClassWithoutCollection {
  @prop()
  public someProp: string;
}

// The resulting name will be the class name
assertion(getName(SomeClassWithoutCollection) === 'SomeClassWithoutCollection');

// Example having "collection" defined
@modelOptions({ schemaOptions: { collection: 'someCollection' }, options: { automaticName: true } })
class SomeClassWithoutCollection {
  @prop()
  public someProp: string;
}

// The resulting name will be a combination of the class name and the collection
assertion(getName(SomeClassWithoutCollection) === 'SomeClassWithoutCollection_someCollection');
```

## Using with `customName`

When using the option [`customName`](../../api/decorators/modelOptions.md#customname), it will be the name that gets generated.

Example:

```ts
// Example having "customName" statically set
@modelOptions({ options: { customName: "Hello" } })
class SomeClassWithCustomName {
  @prop()
  public someProp: string;
}

// The resulting name will be the statically defined "customName"
assertion(getName(SomeClassWithCustomName) === 'Hello');

// Example having "customName" be a function
let counter = 0;
@modelOptions({ options: { customName: () => {
  counter++;
  return "Hello" + counter;
} } })
class SomeClassWithCustomNameFunction {
  @prop()
  public someProp: string;
}

// The resulting name will be the generated "customName"
assertion(getName(SomeClassWithCustomNameFunction) === 'Hello0');
assertion(getName(SomeClassWithCustomNameFunction) === 'Hello1');
```

## Using with `automaticName` and `customName`

When using option [`automaticName`](../../api/decorators/modelOptions.md#automaticname) and [`customName`](../../api/decorators/modelOptions.md#customname) together, the resulting name will be a combination of the class name and [`customName`](../../api/decorators/modelOptions.md#customname).

Example:

```ts
// Example having "customName" statically set and having "automaticName"
@modelOptions({ options: { customName: "Hello", automaticName: true } })
class SomeClassWithCustomNameAndAutomaticName {
  @prop()
  public someProp: string;
}

// The resulting name will be a combination of the class name and "customName"
assertion(getName(SomeClassWithCustomNameAndAutomaticName) === 'SomeClassWithCustomNameAndAutomaticName_Hello');
```

## Simple Matrix

This is a simple matrix to show what interacts with what, or also called a Truth Table.

<sub>`x` means it is unset</sub>

| Class name | customName      | automaticName | collection         | Result                   |
| ---------- | --------------- | ------------- | ------------------ | ------------------------ |
| `"Hello"`  | x               | x             | x                  | `"Hello"`                |
| `"Hello"`  | x               | x             | `"SomeCollection"` | `"Hello"`                |
| `"Hello"`  | `"AcustomName"` | x             | x                  | ``"AcustomName"``        |
| `"Hello"`  | x               | `true`        | x                  | `"Hello"`                |
| `"Hello"`  | x               | `true`        | `"SomeCollection"` | `"Hello_SomeCollection"` |
| `"Hello"`  | `"AcustomName"` | `true`        | x                  | `"Hello_AcustomName"`    |
| `"Hello"`  | `"AcustomName"` | `true`        | `"SomeCollection"` | `"Hello_AcustomName"`    |
