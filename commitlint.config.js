module.exports = {
  "extends": [
    "@commitlint/config-conventional"
  ],
  "rules": {
    "scope-case": [0, "never"],
    "body-min-length": [2, "always", 3],
    "footer-max-line-length": [1, "always", 200],
    "type-enum": [2, "always", ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'revert', 'dependencies', 'release']]
  }
};
