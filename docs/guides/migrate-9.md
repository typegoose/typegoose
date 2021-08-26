---
id: migrate-9
title: 'Migrate to 9.0.0'
---

These are the changes made for 9.0.0 that are breaking or just important to know

## Requirements changed

- Mongoose `6.0.1` or [higher is now required](#mongoose-60-is-now-supported)

## Mongoose 6.0 is now supported

Mongoose version `6.0.1` (and possibly higher) is now supported, for mongoose specific migration, look at the [6.0 migration guide](https://mongoosejs.com/docs/migrating_to_6.html)

## Class-transformer transform of "ObjectId" became broken

Since mongodb 5.0 (mongoose 6.0) the `value` in `@Transform` is not equals to `obj[key]` anymore, see [the updated Class-Transformer Guide](./advanced/class-transformer.md#implementation) and [the Issue about this](https://github.com/typestack/class-transformer/issues/879)

## Build order for Class-to-Schema changed

The build order for Class-to-Schema (`buildSchema`) changed from "top-down" to "bottom-up"
