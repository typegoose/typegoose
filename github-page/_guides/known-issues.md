---
title: "Known Issues"
redirect_from:
  - /guides/KNOWN-ISSUES
  - /guides/knownissues
  - /guides/knownIssues
---

- ts-jest: some wierd behavior on ts-jest (only) leads to type errors
- ts-node: never run `ts-node --transpile-only` (seems like ts-node will not fix it)
- typegoose dosnt work with classes that have the same name [{% include gitissue repo="hasezoey" num=23 %}, {% include gitissue repo="hasezoey" num=24 %}]
- `@prop` cannot be applied to `get` & `set` (virtuals), because virtuals do not accept options & schema.loadClass wouldnt load these
- please make sure to use the right decorator execution order to prevent something like hook to fail if `@modelOptions` changes the name, [here is a reference](https://github.com/wycats/javascript-decorators/issues/29), [another reference](https://stackoverflow.com/a/50714345/8944059)
- typescript provide the option to alias paths (with `tsconfig-paths`), but is somehow incompatible with typegoose, [more info in here](https://github.com/szokodiakos/typegoose/issues/392)
- Self-Containing Classes do not work currently (Maximum Class Stack Size Exceeded)

[Please look here first, to decide if it is an typegoose/mongoose issue](https://github.com/Automattic/mongoose/issues?utf8=✓&q=is%3Aissue+involves%3Ahasezoey)
