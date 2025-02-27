---
id: mongoose-compatibility
title: 'Mongoose Compatibility'
---

The version values use [npm's semver convention](https://www.npmjs.com/package/semver).

If no upper mongoose version is defined and a newer typegoose version exists within the range of the lower typegoose version, take the next typegoose versions start point as the upper range (exclusive) for the lower typegoose version, this is because mongoose may break something (like types) even in patch versions.

| Typegoose Version | Mongoose Version |
| ----------------- | ---------------- |
| 12.12.x           | ~8.11.0          |
| 12.11.x           | ~8.10.0          |
| 12.10.x           | ~8.9.0           |
| 12.9.x            | ~8.8.0           |
| 12.8.x            | ~8.7.0           |
| 12.7.x            | ~8.6.0           |
| 12.6.x            | ~8.5.0           |
| 12.5.x            | ~8.4.0           |
| 12.4.x            | ~8.3.1           |
| 12.3.x            | ~8.2.4           |
| 12.2.x            | ~8.2.0           |
| 12.1.x            | ~8.1.0           |
| 12.0.x            | ~8.0.1           |
| 11.8.x            | ~7.8.0           |
| 11.7.x            | ~7.6.3           |
| 11.6.x            | ~7.6.1           |
| 11.5.x            | ~7.5.0           |
| 11.4.x            | ~7.4.0           |
| 11.3.x            | ~7.3.0           |
| 11.2.x            | ~7.2.0           |
| 11.1.x            | ~7.1.0           |
| 11.0.x            | ~7.0.3           |
| 10.6.x            | ~6.13.0          |
| 10.5.x            | ~6.12.0          |
| 10.4.x            | ~6.11.0          |
| 10.3.x            | ~6.10.0          |
| 10.2.x            | ~6.10.0          |
| 10.1.x            | ~6.9.0           |
| 10.0.x            | ~6.8.0           |
| 9.13.x            | ~6.7.2           |
| 9.12.x            | ~6.6.0           |
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
