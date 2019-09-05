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
- in this PR: `_id: false` does not work, i dont know why
- please make sure to use the right decorator execution order to prevent something like hook to fail if `@modelOptions` changes the name

[Please look here first, to decide if it is an typegoose/mongoose issue](https://github.com/Automattic/mongoose/issues?utf8=✓&q=is%3Aissue+involves%3Ahasezoey)
