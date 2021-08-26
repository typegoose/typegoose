---
id: error-warning-details
title: 'Error & Warning Details'
---

## Errors

### Mongoose Version [E001]

Error: `Please use mongoose 5.13.8 or higher (Current mongoose: x.x.x) [E001]`

Details:  
Typegoose requires at least mongoose version `5.13.8`, because that version changed something that affected typegoose internals

### NodeJS Version [E002]

Error: `You are using a NodeJS Version below 12.22.0, Please Upgrade! [E002]`

Details:  
Typegoose requires at least NodeJS Version 12.22, because NodeJS 12 is the lowest activly maintained version AND is the lowest that supports all functions needed by typegoose (without having to add polyfills)

### addModelToTypegoose called twice [E003]

Error:

```txt
It seems like "addModelToTypegoose" got called twice
Or multiple classes with the same name are used, which is not supported! (Model Name: "${name}") [E003]
```

Details:  
`addModelToTypegoose` can only be called once with one name, mongoose dosnt support multiple models with the same name on the same connection / mongoose instance and typegoose has an internal cache where the key is the name (needs to be unique)  

-> [More Information on how to solve it](guides/../advanced/models-with-same-name.md)

### Self Containg Class [E004]

Error:

```txt
It seems like the type used is the same as the target class, which is not supported
Please look at https://github.com/typegoose/typegoose/issues/42 for more information (${name}.${key}) [E004]
```

Details:  
Because of limitations of JS, it is not possible to use a self-containing-class  
-> But Self-Referencing still works

### ref is undefined [E005]

Error: `Option "ref" for "${name}.${key}" is null/undefined! [E005]`

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

Details:  
Not all required Virtual-Populate options were provided, required are: `localField, foreignField, ref`

### Get & Set Options [E007]

Error:
- `"${name}.${key}" does not have a set function! [E007]`
- `"${name}.${key}" does not have a get function! [E007]`

Details:  
When using the `get & set` options, both are required to be specified at the same time

### refPath must be of type String [E008]

Error: `"refPath" for "${name}, ${key}" should be of type String! [E008]`

Details:  
The Option `refPath` needs to be defined as a string (mongoose limitation, typegoose check)

### Invalid Type [E009]

Error: `"${targetName}.${key}"'s Type is invalid! Type is: "${Type}" [E009]`

Details:  
The `Type` in its final state (after checking `rawOptions.type` and executing the deferring-function) is either `undefined / null` or not being a function

Example of when this gets triggered:

```ts
class ErrorClass {
  @prop({ type: () => undefined }) // <- error here
  public someProp?: string;

  @prop({ type: 'Hello' }) // <- error here
  public someProp?: string;
}
```

### Not String Type Error (Enum) [E010]

Error:

```txt
Typeof "${targetName}.${key}" is "String", used enum is not only Strings! [E010]
  Encountered with property in Enum: ${enumKey}.${typeof enumValue}
```

Details:  
This Error should never be thrown if Typescript is used, it throws if the `Type` is `String` and an `enum`(option) is provided, but the enum is not *only consisting* of strings

### Not Number Type Error (Enum) [E011]

Error:

```txt
Typeof "${targetName}.${key}" is "Number", value is undefined/null or does not have a reverse mapping! [E011]
  Encountered with property: ${enumKey}.${typeof enumValue}
```

Details:  
This Error should never be thrown if Typescript is used, it throws if the `Type` is `Number` and an `enum`(option) is provided, but the enum is not *only consisting* of numbers (checked by the reverse mapping)

### Invalid Type for Enum [E012]

Error: `Invalid type used for enums!, got: "${Type}" (${name}.${key}) [E012]`

Details:  
This Error should never be thrown if Typescript is used, it throws if the `Type` is not `String` or `Number`

### Invalid WhatIsIt used [E013]

Error: `"${whatisit}"(${where}) is invalid for "${name}.${key}" [E013]`

Details:  
A Value not specified by the enum `WhatIsIt` was provided (no case matched), [read more about it here](../api/decorators/prop.md#whatisit)

### Input was not string or have .typegooseName function/string [E014]

Error: `Input was not a string AND didnt have a .typegooseName function AND didnt have a .typegooseName string [E014]`

Details:  
The Provided Input wasnt a string and didnt have a `.typegooseName` function / string to be searched by

### customName must be string and at least one character [E015]

Error: `"customName" must be a string AND at least one character ("${baseName}") [E015]`

Details:  
The `customName` option must be a String AND at least *one* character long

### Type dosnt have "OptionsConstructor" [E016]

Error: `Type does not have a valid "OptionsConstructor"! (${getName(loggerType)} on ${getName(target)}.${pkey}) [E016]`

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

Details:  
The option to change Severity is set to `Severity.ERROR`  
[read here on how to change this](api/decorators/modelOptions.md#allowmixed)

### dim needs to be 1 or higher [E018]

Error: `"dim" needs to be higher than 0 (${name}.${key}) [E018]`

Details:  
The Option `dim` must be at least 1 or higher, because an array with 0 (or less) dimensions is not possible

### Assertion Error [E019]

Error: `Assert failed - no custom error [E019]`

Details:  
This Error should never show up, if it does report it

### PropOptions.discriminators dosnt support Arrays with more or less than 1 dimension [E020]

Error: `"PropOptions.discriminators" dosnt support Arrays higher and lower than 1 (got "${gotType.dim}" dimensions at "${name}.${key}") [E020]`

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

Error: `"PropOptions.ref" dosnt support Arrays (got "${gotType.dim}" dimensions at "${name}.${key}") [E021]`

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

Error: `The return type of the function assigned to "customName" must be a string and must not be empty! ("${baseName}") [E022]`

Details:  
The function used to create a custom model name (via the `modelOptions` "option" prop) must return a string and it should not be empty.

### "ref" is not supported for "${propKind}"! (${name}, ${key}) [E023]

Error:  
- `"ref" is not supported for "${propKind}"! (${name}, ${key}) [E023]`
- `"refPath" is not supported for "${propKind}"! (${name}, ${key}) [E023]`

Details:  
The option `ref` / `refPath` are not supported for this `propKind` (which in most cases is `MAP`)

### A property key in Typegoose cannot be an symbol! [E024]

Error: `A property key in Typegoose cannot be an symbol! (${name}.${String(key)}) [E024]`

Details:  
A Property Key in Typegoose cannot be a Symbol, it must be a String (also a limitation of mongoose)

## Warnings

### Type is not ${type}, but includes the following ${extra} options [W001]

Warning:

```txt
Type of "${name}.${key}" is not ${type}, but includes the following ${extra} options [W001]:
  [${included.join(', ')}]
```

Details:  
The provided options (listed in the warning) do nothing with the provided `Type`
