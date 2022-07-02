---
id: environment-variables
title: 'Environment Variables'
---

Typegoose allows the use of some environment variables to set global options.

## Variables

### TG_ALLOW_MIXED

Sets the options [`options.allowMixed`](./decorators/modelOptions.md#allowmixed) to the given Severity.  
This option mainly exists to force it to run for just a run without modifying the actual code to see what is actually happening.

Accepts:

- numbers, in the range of `Severity`
- strings, in the range of `Severity`

## Examples

```sh
TG_ALLOW_MIXED=ALLOW npm run script # result: "options.allowMixed" is now "ALLOW" (actual: 0)

TG_ALLOW_MIXED=0 npm run script # result: "options.allowMixed" is now "ALLOW" (actual: 0)
```
