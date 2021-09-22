---
id: migrate-9
title: 'Migrate to 9.0.0'
---

These are the changes made for 9.0.0 that are breaking or just important to know

:::caution Important, Read this first
This Guide is written for migration from version `8.3.0` to `9.0.0`, for versions `>9.0.0 <10.0.0`, please consult the [CHANGELOG](https://github.com/typegoose/typegoose/blob/master/CHANGELOG.md)
:::

## Requirements changed

- Mongoose `6.0.7` or [higher is now required](#mongoose-60-is-now-supported)
- Typescript `4.4` is now suggested to be used

## Mongoose 6.0 is now supported

Mongoose version `6.0.7` (and possibly higher) is now supported, for mongoose specific migration, look at the [6.0 migration guide](https://mongoosejs.com/docs/migrating_to_6.html)

## Class-transformer transform of "ObjectId" became broken

Since mongodb 5.0 (mongoose 6.0) the `value` in `@Transform` is not equals to `obj[key]` anymore, see [the updated Class-Transformer Guide](../integration-examples/class-transformer.md#implementation) and [the Issue about this](https://github.com/typestack/class-transformer/issues/879)

## Build order for Class-to-Schema changed

The build order for Class-to-Schema (`buildSchema`) changed from "top-down" to "bottom-up"

## Error "E007" got removed

The Error [`E007`](../error-warning-details.md#get--set-options-e007) got removed, because `get` and `set` options can be defined independently of eachother.

## Error "E023" got merged into "E013"

The Error [`E023`](../error-warning-details.md#ref-is-not-supported-for-propkind-name-key-e023) got merged into [`E013`](../error-warning-details.md#invalid-whatisit-used-e013).

## Errors "E008" & "E015" & "E022" got merged into "E026"

The Errors [`E008`](../error-warning-details.md#refpath-must-be-of-type-string-e008) & [`E015`](../error-warning-details.md#customname-must-be-string-and-at-least-one-character-e015) & [`E022`](../error-warning-details.md#return-type-of-function-assigned-to-customname-doesnt-return-a-string-or-is-empty-e022) got merged into a new Error, [`E026`](../error-warning-details.md#expected-string-to-have-length-e026).
