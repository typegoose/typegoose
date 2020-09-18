# How to Contribue

## Before making a Pull Request

- Make sure all tests pass locally (`npm run test`)
- Make sure you have run tslint & if something should come up, fix it to keep the code in one style (`npm run lint -- --fix`)
- When you add documentation please make sure to keep the existing style
- Make sure you read [Mastering-Markdown](https://guides.github.com/features/mastering-markdown/)
- Make sure when you make documentation of a something, you use the [TSDoc standard](https://api-extractor.com/pages/tsdoc/doc_comment_syntax/), not JSDoc

---

## Additional Style guidelines

- use `@deprecate`(tsdoc) & `util.deprecate` to deprecate a function / class / variable
- for logging (that isnt for debugging) use the `logger` (src/logSettings)

---

Note: All Pull Request will get squash merged, so no need for force-pushing
