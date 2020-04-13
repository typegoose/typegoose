---
title: "Environment Variables"
---

Typegoose allows the use of some environment variables to set global options.

## Variables

### TG_USE_NEW_ENUM

Removed, [Please look here for more info]({{ site.baseurl }}{% link changelog.md%}#620)

### TG_ALLOW_MIXED

Sets the options [`options.allowMixed`]({{ site.baseurl }}{% link _docs/decorators/modelOptions.md%}#allowmixed) to the given Severity

Accepts:
- numbers, in the range of `Severity`
- strings, in the range of `Severity`

## Examples

```sh
TG_ALLOW_MIXED=ALLOW npm run script # result: "options.allowMixed" is now "ALLOW" (actual: 0)

TG_ALLOW_MIXED=0 npm run script # result: "options.allowMixed" is now "ALLOW" (actual: 0)
```
