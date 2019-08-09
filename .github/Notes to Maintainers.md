# Notes to Maintainers

## Before a Merge

- Make sure Travis Builds a passing
- Run the tests locally
- Review the Pull-Request if something should be changed

## How to Merge

* If its is just one commit that is just a fix or a hotfix, use Squash-Merge
* If it is a larger Branch (like a release) use merge --no-ff

## When to make a Version

* If a release branch (like 6.0.0) gets merged into master, make a Major Version
* If a collection of "should-not-break" commits, make a minor version
* If a hotfix | fix, that dosnt break anything make a patch version
* If a fix, that can potentially break something, make a minor version
* ([Advanced](https://semver.org))

## Versioning

[look at README#Versioning](../README.md#versioning)

---
*this is just the base, changes will occure*
