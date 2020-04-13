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
* If a hotfix | fix, that doesn't break anything make a patch version
* If a fix, that can potentially break something, make a minor version
* ([Advanced](https://semver.org))

## Branch structure

*This will take place when version 6.0.0 will release*

branch `master` will be the current version, where all the feature branches are based on (for the current version)
branches in `old/` are legacy versions (like `5.x`) which are used to backport / fix version specific things
when a new (major) version comes out, the old version is moved into `old/` for legacy support
-> example for it:
  current version is: 5.9.0 (master)
  next version is: 6.0.0 (6/master)
  
  when 6.0.0 comes out, the old version (5.9.x) will be moved into (`old/5.x`) and `6/master` merged into master

## Versioning

[look at README#Versioning](../README.md#versioning)

---
*this is just the base, changes will occure*
