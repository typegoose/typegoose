# Notes to Maintainers

## Before a Merge

- Make sure Travis Builds a passing
- Run the tests locally (`npm run buildtests & npm run test`)
- Review the Pull-Request if something should be changed

## How to Merge

For this Project, squash-merging it the preferred method
-> The only time where `--no-ff` will be used is for releases (like merging an version branch back into master)

## Branch structure

branch `master` will be the current version, where all the feature branches are based on (for the current version)
branches in `old/` are legacy versions (like `5.x`) which are used to backport / fix version specific things
when a new major version comes out, the old version is moved into `old/` for legacy support
-> example for it:
  current version is: 5.9.0 (master)
  next version is: 6.0.0 (r6/master)
  
  when 6.0.0 comes out, the old version (5.9.x) will be moved into (`old/5.x`) and `r6/master` merged into master

## Versioning

[look at README#Versioning](../README.md#versioning)

---
*this is just the base, changes will occure*
