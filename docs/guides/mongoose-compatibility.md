---
id: mongoose-compatibility
title: 'Mongoose Compatibility'
---

The version values use [npm's semver convention](https://www.npmjs.com/package/semver).

If no upper mongoose version is defined and a newer typegoose version exists within the range of the lower typegoose version, take the next typegoose versions start point as the upper range (exclusive) for the lower typegoose version, this is because mongoose may break something (like types) even in patch versions.

| Typegoose Version | Mongoose Version |
| ----------------- | ---------------- |
| 9.11.x            | ~6.5.0           |
| 9.10.x            | ~6.4.2           |
| 9.9.x             | ~6.3.5           |
| 9.8.x             | ~6.3.0           |
| 9.7.x             | ~6.2.3           |
| 9.6.x             | ~6.2.0           |
| 9.5.x             | ~6.1.6           |
| 9.4.x             | ~6.1.3           |
| 9.3.x             | ~6.0.14          |
| 9.2.x             | ~6.0.11          |
| 9.1.x             | 6.0.9 - 6.0.10   |
| 9.0.x             | ~6.0.7           |
| 8.2.x             | ~5.13.8          |
| 8.1.x             | ~5.13.3          |
| 8.0.x             | ~5.13.3          |
| 7.6.x             | 5.10.0 - 5.10.18 |
| 7.5.x             | 5.10.0 - 5.10.18 |
| 7.4.x             | 5.10.0 - 5.10.18 |
| 7.3.x             | ~5.9.22          |
| 7.2.x             | ~5.9.17          |
| 7.1.x             | ~5.9.14          |
| 7.0.x             | ~5.9.9           |
| 6.4.x             | ~5.9.2           |
| 6.3.x             | ~5.8.11          |
| 6.2.x             | ~5.8.3           |
| 6.1.x             | ~5.7.7           |
| 6.0.x             | ~5.7.1           |
| 5.9.x             | ~5.6.7           |
