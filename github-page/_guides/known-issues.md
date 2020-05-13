---
title: "Known Issues"
redirect_from:
  - /guides/KNOWN-ISSUES
  - /guides/knownissues
  - /guides/knownIssues
---

- ts-node: never run `ts-node --transpile-only` (seems like ts-node will not fix it)
- `@prop` cannot be applied to `get` & `set` (virtuals), because virtuals do not accept options & schema.loadClass wouldnt load these
- typescript provide the option to alias paths (with `tsconfig-paths`), but is somehow incompatible with typegoose, [more info in here]({% include gitissue repo="szokodiakos" num=392 %})
- Self-Containing Classes do not work currently (Maximum Class Stack Size Exceeded)
- Typegoose (/ Mongoose) currently doesn't work well with `class-transformer`, when you want to get a POJO, use `model.operation.lean()` OR `doc.toJSON()` - but `classToPlain` (or any other method from CT) will not work and map incorrect properties (More info: {% include gitissue repo="typegoose" num=61 %}, [typegoose#9 (comment)]({% include gitissue repo="typegoose" num=96 %}#issuecomment-549031131), [class-transformer#227](https://github.com/typestack/class-transformer/issues/227))

[Please look here first, to decide if it is an typegoose or an mongoose issue](https://github.com/Automattic/mongoose/issues?utf8=✓&q=is%3Aissue+involves%3Ahasezoey)

## Known Mongoose incompatibilities

## typePojoToMixed

This option will **NOT** work because there is no neat / simple way of defining such thing in the same class

Workaround:
Create multiple classes:

```ts
class Sub {
  @prop()
  public name: string;
}

class Parent {
  @prop()
  public subDoc: Sub;
}
```
