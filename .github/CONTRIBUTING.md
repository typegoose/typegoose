# How to Contribue

## Before making a Pull Request

- Make sure all tests pass locally (`npm run test`)
- Make sure you have run `yarn run lint` & if something should come up, fix it to keep the code in one style (`yarn run lint --fix`)
- When you add documentation please make sure to keep the existing style
- Make sure you read [Mastering-Markdown](https://guides.github.com/features/mastering-markdown/)
- Make sure when you make documentation of a something, you use the [TSDoc standard](https://api-extractor.com/pages/tsdoc/doc_comment_syntax/), not JSDoc

---

## Additional Style guidelines

- use `@deprecate`(tsdoc) & `util.deprecate` to deprecate a function / class / variable
- for logging (that isnt for debugging) use the `logger` (src/logSettings)

---

Note: All Pull Request will get squash merged, so no need for force-pushing

## Commit Structure

This Repository uses the [Angular Commit Message Format](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)
This format is used by `semantic-release` to automatically release new versions based on changes

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```txt
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer than 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

### Revert

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header
of the reverted commit.
In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit
being reverted.

### Type

Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing or correcting existing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation
* **revert**: Revert an commit
* **dependencies**: Update field `dependencies` (/ `devDependencies`)
* **release**: An Release Commit

look into [releaserc](../.releaserc.js) for corresponding versions

### Scope

The scope could be anything specifying place of the commit change. For example the file that got modified

You can use `*` when the change affects more than a single scope.

### Subject

The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to reference GitHub issues that this commit closes

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines.
The rest of the commit message is then used for this.

## Documentation Guidelines

When doing code examples in the documentation:
- ensure that the spacing is `2` spaces, no tabs
- use single-quotes (`'`), and not double-quotes (`"`) to keep the documentation consitent (only use template strings where necessary) (except comment, there use double-quotes for readability)
- prefer the usage of template strings over `"hello " + variable + " world`

When generally writing (outside of code examples):
- use inline-code-blocks for versions, code, variable names, etc (like: `this is an inline-code-block`)
- use double-quotes for things that dont need inline-code-blocks
