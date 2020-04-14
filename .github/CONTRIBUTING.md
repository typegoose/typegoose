# How to Contribue

## Before making a Pull Request

- Make sure all tests pass locally
- Make sure you have run tslint & if something should come up, fix it to keep the code in one style
- When you add documentation please make sure to keep the existing style
- Make sure you read [Mastering-Markdown](https://guides.github.com/features/mastering-markdown/), thanks
- Make sure when you make documentation of a something, you use the [TSDoc standard](https://api-extractor.com/pages/tsdoc/doc_comment_syntax/), not JSDoc, thanks

---

## How to structure Commits

```txt
Some Title
- moving fileA to folderB/
- removing fileB
- adding tests for FeatureX
- adding `@prop({ optionA })`
- adding tsdoc for FeatureX
- modify README to include Docs about A
```

and please sign commits

-> if you make "fix" commits (like fixing a typo, fixing travis) use `git commit --fixup` (for autosquash)

*Legend:*
- add `[#1]` at the end when there is an issue for it (and modify it to the actual number)
- the title should be a short introduction like (for small fixes)`Add @mapProp for Maps with tests` (for bigger)`Adding TSDoc`[preferably split the commits when they get to large with adding more features]
- the first word should be "adding" "removing" "moving", except if it can't be expressed with those

## Additional Style guidelines

- if you ever see `console.log`, someone messed up, this should never be there
- don't use `console.error`, the only occurrence is in test's config when some error occurs
- use `@deprecate`(tsdoc) & `util.deprecate` to deprecate a function / class / variable

---
*this is just the base, changes will occure*
