---
id: error-warning-details
title: 'Error & Warning Details'
---

## Errors

:::note
Only Removed Error will have a link to their code, because there is currently no good way to keep the links up-to-date when the file changes
:::

### Mongoose Version [E001]

Error: `Please use mongoose 6.0.14 or higher (Current mongoose: x.x.x) [E001]`

Error Class: `Error`

Details:  
Typegoose requires at least mongoose version `6.0.14`, because that version changed something that affected typegoose internals

### NodeJS Version [E002]

Error: `You are using a NodeJS Version below 12.22.0, Please Upgrade! [E002]`

Error Class: `Error`

Details:  
Typegoose requires at least NodeJS Version 12.22, because NodeJS 12 is the lowest activly maintained version AND is the lowest that supports all functions needed by typegoose (without having to add polyfills)

### Function only supports to be called "${supported}" times [E003]

Error:

```txt
Function "${functionName}" only supports to be called "${supported}" times with the same parameters [E003]
${extra}
```

Error Class: `FunctionCalledMoreThanSupportedError`

Details:  
For example [`addModelToTypegoose`](../api/functions/addModelToTypegoose.md) only supports to be called once (1) with the same model name, [this problem has a specific Guide](./advanced/models-with-same-name.md).

### Self Containg Class [E004]

Error:

```txt
It seems like the type used is the same as the target class, which is not supported
Please look at https://github.com/typegoose/typegoose/issues/42 for more information (${name}.${key}) [E004]
```

Error Class: `SelfContainingClassError`

Details:  
Because of limitations of JS, it is not possible to use a self-containing-class  
-> But Self-Referencing still works

### ref is undefined [E005]

Error: `Prop-Option "ref"'s value is "null" or "undefined" for "${name}.${key}" [E005]`

Error Class: `RefOptionIsUndefinedError`

Details:  
Either:
- The Option `ref` was defined with a function, but that function returned `undefined / null`
- The Option `ref` was defined with `undefined / null` (`{ ref: undefined }`) ([Can Be Solved with this guide](guides/../advanced/reference-other-classes.md#common-problems))

Example of when this gets triggerd:

```ts
class ErrorClass {
  @prop({ ref: () => undefined }) // <- error here
  public someProp?: Ref<ErrorClass>;

  @prop({ ref: undefined }) // <- error here
  public someProp?: Ref<ErrorClass>;
}
```

### Not All Virtual Populate Elements Provided [E006]

Error: `${name}.${key}" has not all needed Virtual Populate Options! Needed are: ${allVirtualoptions.join(', ')} [E006]`

Error Class: `NotAllVPOPElementsError`

Details:  
Not all required Virtual-Populate options were provided, required are: `localField, foreignField, ref`

### Get & Set Options [E007]

<span class="badge badge--warning">This Error got removed in 9.0.0</span>

Error:
- `"${name}.${key}" does not have a set function! [E007]`
- `"${name}.${key}" does not have a get function! [E007]`

Error Class: [`TypeError`](https://github.com/typegoose/typegoose/blob/8fad2ac213a953579a4eeaa236951a57fb12855f/src/internal/processProp.ts#L182-L183)

Details:  
When using the `get & set` options, both are required to be specified at the same time

### refPath must be of type String [E008]

<span class="badge badge--warning">This Error got removed in 9.0.0</span>

:::info
This Error got merged with [`E026`](#expected-string-to-have-length-e026) in 9.0.0
:::

Error: `"refPath" for "${name}, ${key}" should be of type String! [E008]`

Error Class: [`TypeError`](https://github.com/typegoose/typegoose/blob/8fad2ac213a953579a4eeaa236951a57fb12855f/src/internal/processProp.ts#L260)

Details:  
The Option `refPath` needs to be defined as a string (mongoose limitation, typegoose check)

### Invalid Type [E009]

Error: `"${targetName}.${key}"'s Type is invalid! Type is: "${Type}" [E009]`

Error Class: `InvalidTypeError`

Details:  
The `Type` in its final state (after checking `rawOptions.type` and executing the deferring-function) is either `undefined / null` or not being a function

Example of when this gets triggered:

```ts
enum TestEnum {}

class ErrorClass {
  @prop({ type: () => undefined }) // <- error here, correct type: "String"
  public someProp?: string;

  @prop({ type: 'Hello' }) // <- error here, correct type: "String"
  public someProp?: string;

  @prop({ type: TestEnum }) // <- error here, correct type: "String"
  public someProp?: TestEnum
}
```

### Not String Type Error (Enum) [E010]

Error:

```txt
Typeof "${targetName}.${key}" is "String", used enum is not only Strings! [E010]
  Encountered with property in Enum: ${enumKey}.${typeof enumValue}
```

Error Class: `NotStringTypeError`

Details:  
This Error should never be thrown if Typescript is used, it throws if the `Type` is `String` and an `enum`(option) is provided, but the enum is not *only consisting* of strings

### Not Number Type Error (Enum) [E011]

Error:

```txt
Typeof "${targetName}.${key}" is "Number", value is undefined/null or does not have a reverse mapping! [E011]
  Encountered with property: ${enumKey}.${typeof enumValue}
```

Error Class: `NotNumberTypeError`

Details:  
This Error should never be thrown if Typescript is used, it throws if the `Type` is `Number` and an `enum`(option) is provided, but the enum is not *only consisting* of numbers (checked by the reverse mapping)

### Invalid Type for Enum [E012]

Error: `Invalid type used for enums!, got: "${Type}" (${name}.${key}) [E012]`

Error Class: `Error`

Details:  
This Error should never be thrown if Typescript is used, it throws if the `Type` is not `String` or `Number`

### Invalid WhatIsIt used [E013]

Error: `"${whatisit}"(${where}) is invalid for "${name}.${key}" [E013]`

Error Class: `InvalidWhatIsItError`

Details:  
The Value `${whatisit}` is not supported in `${where}` or does not exist in the [`WhatIsIt`](../api/decorators/prop.md#whatisit) enum.

### Input was not string or have .typegooseName function/string [E014]

Error: `Input was not a string AND didnt have a .typegooseName function AND didnt have a .typegooseName string [E014]`

Error Class: `ReferenceError`

Details:  
The Provided Input wasnt a string and didnt have a `.typegooseName` function / string to be searched by

### customName must be string and at least one character [E015]

<span class="badge badge--warning">This Error got removed in 9.0.0</span>

:::info
This Error got merged with [`E026`](#expected-string-to-have-length-e026) in 9.0.0
:::

Error: `"customName" must be a string AND at least one character ("${baseName}") [E015]`

Error Class: [`TypeError`](https://github.com/typegoose/typegoose/blob/8fad2ac213a953579a4eeaa236951a57fb12855f/src/internal/utils.ts#L342)

Details:  
The `customName` option must be a String AND at least *one* character long

### Type dosnt have "OptionsConstructor" [E016]

Error: `Type does not have a valid "OptionsConstructor"! (${getName(loggerType)} on ${getName(target)}.${pkey}) [E016]`

Error Class: `TypeError`

Details:  
The `Type` provided does not have a property `OptionsConstructor` (`undefined / null`), this is required to map options of an array & map

Typegoose uses the property [`OptionsConstructor`](https://github.com/Automattic/mongoose/tree/master/lib/options) on types (ex `mongoose.Schema.Types.ObjectId.OptionsConstructor`) to correctly map the options (from `@prop(options)`) to the appropiate place

If custom types are used and they dont have `OptionsConstructor`, and an easy way to workaround this error is the following:

```ts
mongoose.Schema.Types.Custom.OptionsConstructor = {}; // only do this if really necessary
mongoose.Schema.Types.Custom.OptionsConstructor = mongoose.SchemaTypeOptions; // prefer this if possible
```

### Setting "Mixed" is not allowed [E017]

Error: `Setting "Mixed" is not allowed! (${name}, ${key}) [E017]`

Error Class: `TypeError`

Details:  
The option to change Severity is set to `Severity.ERROR`  
[read here on how to change this](api/decorators/modelOptions.md#allowmixed)

### dim needs to be 1 or higher [E018]

Error: `"dim" needs to be higher than 0 (${name}.${key}) [E018]`

Error Class: `RangeError`

Details:  
The Option `dim` must be at least 1 or higher, because an array with 0 (or less) dimensions is not possible

### Assertion Error [E019]

Error: `Assert failed - no custom error [E019]`

Error Class: `AssertionFallbackError`

Details:  
This Error should never show up, if it does report it

### PropOptions.discriminators dosnt support Arrays with more or less than 1 dimension [E020]

<span class="badge badge--warning">This Error got removed in 0.0.0</span>

:::info
This Error got merged with [`E027`](#the-option-does-not-support-a-option-value-e027) in 0.0.0
:::

Error: `"PropOptions.discriminators" dosnt support Arrays higher and lower than 1 (got "${gotType.dim}" dimensions at "${name}.${key}") [E020]`

Error Class: `Error`

Details:  
Somewhere the option `discriminators` was defined with an array which had more or less than 1 dimension

Example of when this gets triggered:

```ts
class ErrorClass {
  @prop({ discriminators: () => [[ErrorClass]] }) // <- error here
  public someProp?: ErrorClass; // (this is just an example)

  @prop({ discriminators: () => ErrorClass }) // <- error here
  public someProp?: ErrorClass; // (this is just an example)
}
```

### PropOptions.ref dosnt support Arrays [E021]

<span class="badge badge--warning">This Error got removed in 0.0.0</span>

:::info
This Error got merged with [`E027`](#the-option-does-not-support-a-option-value-e027) in 0.0.0
:::

Error: `Prop-Option "ref" does not support Arrays! (got "${dim}" dimensions, for property "${name}.${key}") [E021]`

Error Class: `OptionRefDoesNotSupportArraysError`

Details:  
Somewhere the option `ref` was defined with an array, which is not supported

Example of when this gets triggered:

```ts
class ErrorClass {
  @prop({ ref: () => [ErrorClass] }) // <- error here
  public someProp?: Ref<ErrorClass>;
}
```

### Return type of function assigned to "customName" doesn't return a string or is empty [E022]

<span class="badge badge--warning">This Error got removed in 9.0.0</span>

:::info
This Error got merged with [`E026`](#expected-string-to-have-length-e026) in 9.0.0
:::

Error: `The return type of the function assigned to "customName" must be a string and must not be empty! ("${baseName}") [E022]`

Error Class: [`TypeError`](https://github.com/typegoose/typegoose/blob/8fad2ac213a953579a4eeaa236951a57fb12855f/src/internal/utils.ts#L324-L326)

Details:  
The function used to create a custom model name (via the `modelOptions` "option" prop) must return a string and it should not be empty.

### "ref" is not supported for "${propKind}"! (${name}, ${key}) [E023]

<span class="badge badge--warning">This Error got removed in 9.0.0</span>

:::info
This Error got merged with [`E013`](#invalid-whatisit-used-e013) in 9.0.0
:::

Error:  
- `"ref" is not supported for "${propKind}"! (${name}, ${key}) [E023]`
- `"refPath" is not supported for "${propKind}"! (${name}, ${key}) [E023]`

Error Class: [`TypeError`](https://github.com/typegoose/typegoose/blob/8fad2ac213a953579a4eeaa236951a57fb12855f/src/internal/processProp.ts#L251), [`TypeError`](https://github.com/typegoose/typegoose/blob/8fad2ac213a953579a4eeaa236951a57fb12855f/src/internal/processProp.ts#L287)

Details:  
The option `ref` / `refPath` are not supported for this `propKind` (which in most cases is `MAP`)

### A property key in Typegoose cannot be an symbol! [E024]

Error: `A property key in Typegoose cannot be an symbol! (${name}.${String(key)}) [E024]`

Error Class: `CannotBeSymbolError`

Details:  
A Property Key in Typegoose cannot be a Symbol, it must be a String (also a limitation of mongoose)

### Expected "${where}" to be a valid mongoose.Model! [E025]

Error: `Expected "${where}" to be a valid mongoose.Model! (got: "${model}") [E025]`

Error Class: `NotValidModelError`

Details:  
A Valid instance of `mongoose.Model` was expected at `where`, but was not given a valid model.

### Expected String to have length [E026]

Error: `Expected "${valueName}" to have at least length of "${length}" (got: "${got}", where: "${where}") [E026]`

Error Class: `StringLengthExpectedError`

Details:  
Expected `valueName` to be a String and have at least the length of `length`, but got length / value `got` at `where`.

This Error gets most commonly thrown when:

- [`customName`](../api/decorators/modelOptions.md#customname) is a Function, but the function does not return a String or the returned String does not have the required length.
- [`customName`](../api/decorators/modelOptions.md#customname) is defined, but is not a String or the defined String does not have the required length.
- [`refPath`](../api/decorators/prop.md#refpath) is defined, but is not a String or the defined String does not have the required length.

### The Option does not support a Option Value [E027]

Error: `The Option "${currentOption}" does not support Option "${problemOption}" other than "${expected}" (provided was: "${provided}") [E027]`

Error Class: `OptionDoesNotSupportOption`

Details:  
The Option `currentOption` does not support the value `provided` that was set for `problemOption`, expected value was `expected`.

This Error gets most commonly thrown when:

- Option `discriminators`'s function return value is not a array.
- Option `discriminators`' function return value is a multi-layer array.
- Option `ref`'s value or function return value is a array.

Example of when this gets triggered:

```ts
class ErrorClassDiscriminators {
  @prop({ discriminators: () => [[ErrorClass]] }) // <- error here
  public someProp?: ErrorClass; // (this is just an example)

  @prop({ discriminators: () => ErrorClass }) // <- error here
  public someProp?: ErrorClass; // (this is just an example)

  @prop({ ref: () => [ErrorClass] }) // <- error here
  public someProp?: Ref<ErrorClass>;
}
```

### Value is not a function or does not have a constructor [E028]

Error:

```txt
Value is not a function or does not have a constructor! [E028]
Value: "${toStringNoFail(value)}"
```

Error Class: `NoValidClassError`

Details:  
The Input variable (stringified) `value` is not a function or/and does not have a constructor (`value.prototype.constructor.name`)

Example of when this gets triggered:

```ts
getModelForClass(undefined); // first argument is the class
getDiscriminatorModelForClass(ParentModel, undefined); // second argument is the class
addModelToTypegoose("ModelName", ModelSchema, undefined); // third argument is the class
buildSchema(undefined); // first argument is the class
deleteModelWithClass(undefined); // first argument is the class
getName(undefined); // first argument is the class (this function is currently more lenient)
```

## Warnings

### Type is not ${type}, but includes the following ${extra} options [W001]

Warning:

```txt
Type of "${name}.${key}" is not ${type}, but includes the following ${extra} options [W001]:
  [${included.join(', ')}]
```

Details:  
The provided options (listed in the warning) do nothing with the provided `Type`
