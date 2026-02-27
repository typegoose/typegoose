## [13.2.0-beta.2](https://github.com/typegoose/typegoose/compare/v13.2.0-beta.1...v13.2.0-beta.2) (2026-02-27)

### Fixes

* **processProp:** allow overwriting "type" in "Map" with "innerOptions" ([c7851f8](https://github.com/typegoose/typegoose/commit/c7851f888488041106050978f8a257c703862dfe)), closes [#1031](https://github.com/typegoose/typegoose/issues/1031)
* **utils::mapOptions:** check that it extends OR *is* a options constructor ([a37752a](https://github.com/typegoose/typegoose/commit/a37752a1ea8babc68d5ff5cac349df64b3aa2afe)), closes [#1031](https://github.com/typegoose/typegoose/issues/1031)
* **utils::mapOptions:** shallow-copy instead of assign ([4754ca9](https://github.com/typegoose/typegoose/commit/4754ca9195a71a5352c6d10300803ba8ad855892)), closes [#1031](https://github.com/typegoose/typegoose/issues/1031)

## [13.2.0-beta.1](https://github.com/typegoose/typegoose/compare/v13.1.1-beta.1...v13.2.0-beta.1) (2026-02-26)

### Features

* support "refPath" as a function ([ee187fa](https://github.com/typegoose/typegoose/commit/ee187fa4b37c258bd5bfd83be80f3d03a6e35835)), closes [#1028](https://github.com/typegoose/typegoose/issues/1028)

### Dependencies

* **mongoose:** upgrade to 9.2.1 ([c7382bc](https://github.com/typegoose/typegoose/commit/c7382bcb4f8fb19b7a305314aa6ea9dfdacbe1f2))
* **mongoose:** upgrade to 9.2.2 ([9238112](https://github.com/typegoose/typegoose/commit/92381121787d06baff66e55420f7161fa9b74cb1))

## [13.1.1-beta.1](https://github.com/typegoose/typegoose/compare/v13.1.0...v13.1.1-beta.1) (2026-01-19)

### Fixes

* **types:** add "DocumentArrayType" for document arrays ([6692d07](https://github.com/typegoose/typegoose/commit/6692d07933f7a51e22f8ee79478b8ce68e83e60b)), closes [#1025](https://github.com/typegoose/typegoose/issues/1025)

## [13.1.0](https://github.com/typegoose/typegoose/compare/v13.0.1...v13.1.0) (2026-01-16)

### Dependencies

* **mongoose:** upgrade to 9.1.4 ([ea5188b](https://github.com/typegoose/typegoose/commit/ea5188bb7f998aab9cf6bb43e853c549b1854992))

## [13.0.1](https://github.com/typegoose/typegoose/compare/v13.0.0...v13.0.1) (2026-01-13)

### Fixes

* pass along merged "IModelOptions" to "processProp" and then to "warnMixed" ([5d4db21](https://github.com/typegoose/typegoose/commit/5d4db21c2f970068a83b4c3662f1e9578389f57d)), closes [#1024](https://github.com/typegoose/typegoose/issues/1024)
* **types::IGlobalOptions:** remove "disableLowerIndexes" properties from "options" ([731a36b](https://github.com/typegoose/typegoose/commit/731a36b10ab804a27b84cf941c646e549c7ca3e4))

## [13.0.1-beta.1](https://github.com/typegoose/typegoose/compare/v13.0.0...v13.0.1-beta.1) (2026-01-13)

### Fixes

* pass along merged "IModelOptions" to "processProp" and then to "warnMixed" ([5d4db21](https://github.com/typegoose/typegoose/commit/5d4db21c2f970068a83b4c3662f1e9578389f57d)), closes [#1024](https://github.com/typegoose/typegoose/issues/1024)
* **types::IGlobalOptions:** remove "disableLowerIndexes" properties from "options" ([731a36b](https://github.com/typegoose/typegoose/commit/731a36b10ab804a27b84cf941c646e549c7ca3e4))

## [13.0.0](https://github.com/typegoose/typegoose/compare/v12.20.0...v13.0.0) (2025-12-22)

### ⚠ BREAKING CHANGES

* **mongoose:** mongoose 9.0.0
* **tsconfig.json:** tsconfig "target" is now "es2023" which could be potentially breaking
* **package.json:** Minimal NodeJS version is now 20.19.0
* **tsconfig.json:** tsconfig "target" is now "es2022" which could be potentially breaking
* **package.json:** Minimal NodeJS version is now 18.0.0

### Features

* apply global options at build-time ([21aa014](https://github.com/typegoose/typegoose/commit/21aa0148af18c5c602b1ffc0762ed22ab8cba28f)), closes [#939](https://github.com/typegoose/typegoose/issues/939)
* **package.json:** update nodejs version to 18.0 ([5682b6b](https://github.com/typegoose/typegoose/commit/5682b6bcd80f280508e3d275f0f038c8201b46d4))
* **package.json:** update nodejs version to 20.19 ([483f81f](https://github.com/typegoose/typegoose/commit/483f81fbddc0e1e41036cab813be642a7c412428))
* **tsconfig.json:** update "target" to match minimal NodeJS capabilities ([6ff88a7](https://github.com/typegoose/typegoose/commit/6ff88a7aad2511bee427ff7e1d00bd03ddf7559b))
* **tsconfig.json:** update "target" to match minimal NodeJS capabilities ([2074c56](https://github.com/typegoose/typegoose/commit/2074c5695a7f95a2a09e071fc25b88cb0f4a682c))

### Fixes

* **types:** manually add the "id" virtual now ([5f56fb9](https://github.com/typegoose/typegoose/commit/5f56fb98f2a1be43753c7c466fda061b1277ac1c))

### Style

* migrate to eslint flat config ([eaa99e2](https://github.com/typegoose/typegoose/commit/eaa99e2e6f36a32898ad9106e68413b037694c52))

### Dependencies

* **mongoose:** upgrade to 9.0 GIT ([9cedc31](https://github.com/typegoose/typegoose/commit/9cedc31ae5394e815dcf50782f731f1ec02c46d5))
* **mongoose:** upgrade to 9.0 GIT ([ca069ec](https://github.com/typegoose/typegoose/commit/ca069ec5c176731ceaa826775fa85c50289d0050))
* **mongoose:** upgrade to 9.0.0 ([5d9f473](https://github.com/typegoose/typegoose/commit/5d9f47305ea320cf5a95cd54da8ffc59c04a1444)), closes [#1018](https://github.com/typegoose/typegoose/issues/1018)
* **mongoose:** upgrade to latest branch version ([862bd30](https://github.com/typegoose/typegoose/commit/862bd307aac293b03cb50f369c943cc7ac7dd58c))
* **semver:** upgrade to 7.7.3 ([d60494c](https://github.com/typegoose/typegoose/commit/d60494c7582d123b050f15916673cc3e372b7cf2))

### Dev-Dependencies

* **@types/jest:** upgrade to 30.0.0 ([6573a4e](https://github.com/typegoose/typegoose/commit/6573a4e59cf0ba59f4a3b59965e4d084bbb6b8a2))
* **@types/lodash:** upgrade to 4.17.21 ([56af0b8](https://github.com/typegoose/typegoose/commit/56af0b8f07d88db01e84e0b4417cbed2166d7a7e))
* **@types/node:** upgrade to 18.19.87 ([399b4b6](https://github.com/typegoose/typegoose/commit/399b4b69307555506853a30f76a5fb273e44f5f6))
* **@types/node:** upgrade to 24.10.0 ([4caf8f3](https://github.com/typegoose/typegoose/commit/4caf8f32e9f6f25bb3e22522f2410b04cd829ffa))
* **@types/node:** upgrade to 24.10.1 ([67aab80](https://github.com/typegoose/typegoose/commit/67aab80faca5d1e61c8fa435ac772c60d5a240db))
* **@typescript-eslint/*:** upgrade to 7.18.0 ([c60c5dc](https://github.com/typegoose/typegoose/commit/c60c5dc049f16d1169beff4f09d1be0082aa0a42))
* **@typescript-eslint/*:** upgrade to 8.31.1 ([9193683](https://github.com/typegoose/typegoose/commit/9193683c6a63b8e876223f19ecea618200828f80))
* **commitlint:** upgrade to 19.8.0 ([4441d43](https://github.com/typegoose/typegoose/commit/4441d43f5784680ac5245febb687081c8f005097))
* **commitlint:** upgrade to 20.1.0 ([64b79d6](https://github.com/typegoose/typegoose/commit/64b79d683cce9ce30d7be9d7b2faffe0b1856c52))
* **commitlint:** upgrade to 20.2.0 ([569bb2a](https://github.com/typegoose/typegoose/commit/569bb2ae3750064ea141f9b75d32da195991814d))
* **eslint-config-prettier:** upgrade to 10.1.2 ([e9d3304](https://github.com/typegoose/typegoose/commit/e9d3304dc69a099a6dc90b76d9e0a257eb0b2946))
* **eslint-config-prettier:** upgrade to 10.1.8 ([51cef59](https://github.com/typegoose/typegoose/commit/51cef591af8b3e974fa53633ba117d99a5de0e2c))
* **eslint:** upgrade to 9.25.1 ([0dcbb17](https://github.com/typegoose/typegoose/commit/0dcbb17c352b121ec51e75cb9a87385d09e2f867))
* **eslint:** upgrade to 9.39.1 ([c4c0e25](https://github.com/typegoose/typegoose/commit/c4c0e25d6327971038111961f3fff41f38ed2b98))
* **eslint:** upgrade to 9.39.2 ([63067d6](https://github.com/typegoose/typegoose/commit/63067d65370da42ee2cf3b67136fd7e907100a32))
* **husky:** upgrade to 9.1.7 ([6ec3c30](https://github.com/typegoose/typegoose/commit/6ec3c300eef35cec554a3e22b7dad4954355082f))
* **jest:** upgrade to 30.2.0 ([70aac45](https://github.com/typegoose/typegoose/commit/70aac45f9c7efab2479cf9b6fd0587f2bef966b4))
* **lint-staged:** upgrade to 15.5.1 ([a63e744](https://github.com/typegoose/typegoose/commit/a63e7444fcf13593b844114f3b1dc916a7dbd8cc))
* **lint-staged:** upgrade to 16.2.7 ([f72a235](https://github.com/typegoose/typegoose/commit/f72a235da7870a36841c358bcaa6fd1775a1b3d7))
* **mongodb-memory-server:** upgrade to 11.0.0 ([ad812d0](https://github.com/typegoose/typegoose/commit/ad812d03e88da06b3d64731ceff5eeec24533d71))
* **mongodb-memory-server:** upgrade to 11.0.0-beta.1 ([c9782a5](https://github.com/typegoose/typegoose/commit/c9782a5dbffd5d48b7de0a26ce6e16bdc16b2496))
* **mongodb-memory-server:** upgrade to 11.0.0-beta.3 ([31022be](https://github.com/typegoose/typegoose/commit/31022be87f08bb99f22319b1e368a5557e58f15e))
* **prettier:** upgrade to 3.7.4 ([5af2664](https://github.com/typegoose/typegoose/commit/5af266490fa62b93b2b806848fdac80f91e9c3d0))
* **rimraf:** upgrade to 6.1.2 ([c30d81d](https://github.com/typegoose/typegoose/commit/c30d81dbed9a3e65011489ab6cd2493427eec061))
* **ts-jest:** upgrade to 29.4.6 ([e68b1b3](https://github.com/typegoose/typegoose/commit/e68b1b30aa3e575c9be0157bf7e5f4ca6b109c57))
* **tstyche:** upgrade to 3.5.0 ([64535c3](https://github.com/typegoose/typegoose/commit/64535c3098f03d76775188ae55efe791f282c0c1))
* **tstyche:** upgrade to 5.0.1 ([136207b](https://github.com/typegoose/typegoose/commit/136207b4535777f4fcf119b4493f09717dda575a))
* **tstyche:** upgrade to 5.0.2 ([9c9c1af](https://github.com/typegoose/typegoose/commit/9c9c1afcc9c69c9aba717d593a8114c231929824))
* **typescript-eslint:** upgrade to 8.46.3 ([327a2ce](https://github.com/typegoose/typegoose/commit/327a2ce2c22186f62adbe2e605f2a7def0caa2d7))
* **typescript-eslint:** upgrade to 8.48.1 ([98cc600](https://github.com/typegoose/typegoose/commit/98cc600f6fda5c6557dbe4d938cac012ae322fde))
* **typescript-eslint:** upgrade to 8.50.0 ([a1d7141](https://github.com/typegoose/typegoose/commit/a1d71415975bccb96dd952440cf087929a627827))
* **typescript:** upgrade to 5.7.3 ([b95487c](https://github.com/typegoose/typegoose/commit/b95487cacedf68a12c0964a14783c084d7d18214))
* **typescript:** upgrade to 5.9.3 ([658a39f](https://github.com/typegoose/typegoose/commit/658a39fb865789de9d6a944085de8960d6106f79))

## [13.0.0-beta.2](https://github.com/typegoose/typegoose/compare/v13.0.0-beta.1...v13.0.0-beta.2) (2025-12-04)

### Features

* apply global options at build-time ([21aa014](https://github.com/typegoose/typegoose/commit/21aa0148af18c5c602b1ffc0762ed22ab8cba28f)), closes [#939](https://github.com/typegoose/typegoose/issues/939)

### Dev-Dependencies

* **mongodb-memory-server:** upgrade to 11.0.0-beta.3 ([31022be](https://github.com/typegoose/typegoose/commit/31022be87f08bb99f22319b1e368a5557e58f15e))

## [13.0.0-beta.1](https://github.com/typegoose/typegoose/compare/v12.20.0...v13.0.0-beta.1) (2025-12-03)

### ⚠ BREAKING CHANGES

* **mongoose:** mongoose 9.0.0
* **tsconfig.json:** tsconfig "target" is now "es2023" which could be potentially breaking
* **package.json:** Minimal NodeJS version is now 20.19.0
* **tsconfig.json:** tsconfig "target" is now "es2022" which could be potentially breaking
* **package.json:** Minimal NodeJS version is now 18.0.0

### Features

* **package.json:** update nodejs version to 18.0 ([5682b6b](https://github.com/typegoose/typegoose/commit/5682b6bcd80f280508e3d275f0f038c8201b46d4))
* **package.json:** update nodejs version to 20.19 ([483f81f](https://github.com/typegoose/typegoose/commit/483f81fbddc0e1e41036cab813be642a7c412428))
* **tsconfig.json:** update "target" to match minimal NodeJS capabilities ([6ff88a7](https://github.com/typegoose/typegoose/commit/6ff88a7aad2511bee427ff7e1d00bd03ddf7559b))
* **tsconfig.json:** update "target" to match minimal NodeJS capabilities ([2074c56](https://github.com/typegoose/typegoose/commit/2074c5695a7f95a2a09e071fc25b88cb0f4a682c))

### Fixes

* **types:** manually add the "id" virtual now ([5f56fb9](https://github.com/typegoose/typegoose/commit/5f56fb98f2a1be43753c7c466fda061b1277ac1c))

### Style

* migrate to eslint flat config ([eaa99e2](https://github.com/typegoose/typegoose/commit/eaa99e2e6f36a32898ad9106e68413b037694c52))

### Dependencies

* **mongoose:** upgrade to 9.0 GIT ([9cedc31](https://github.com/typegoose/typegoose/commit/9cedc31ae5394e815dcf50782f731f1ec02c46d5))
* **mongoose:** upgrade to 9.0 GIT ([ca069ec](https://github.com/typegoose/typegoose/commit/ca069ec5c176731ceaa826775fa85c50289d0050))
* **mongoose:** upgrade to 9.0.0 ([5d9f473](https://github.com/typegoose/typegoose/commit/5d9f47305ea320cf5a95cd54da8ffc59c04a1444)), closes [#1018](https://github.com/typegoose/typegoose/issues/1018)
* **mongoose:** upgrade to latest branch version ([862bd30](https://github.com/typegoose/typegoose/commit/862bd307aac293b03cb50f369c943cc7ac7dd58c))
* **semver:** upgrade to 7.7.3 ([d60494c](https://github.com/typegoose/typegoose/commit/d60494c7582d123b050f15916673cc3e372b7cf2))

### Dev-Dependencies

* **@types/jest:** upgrade to 30.0.0 ([6573a4e](https://github.com/typegoose/typegoose/commit/6573a4e59cf0ba59f4a3b59965e4d084bbb6b8a2))
* **@types/lodash:** upgrade to 4.17.21 ([56af0b8](https://github.com/typegoose/typegoose/commit/56af0b8f07d88db01e84e0b4417cbed2166d7a7e))
* **@types/node:** upgrade to 18.19.87 ([399b4b6](https://github.com/typegoose/typegoose/commit/399b4b69307555506853a30f76a5fb273e44f5f6))
* **@types/node:** upgrade to 24.10.0 ([4caf8f3](https://github.com/typegoose/typegoose/commit/4caf8f32e9f6f25bb3e22522f2410b04cd829ffa))
* **@types/node:** upgrade to 24.10.1 ([67aab80](https://github.com/typegoose/typegoose/commit/67aab80faca5d1e61c8fa435ac772c60d5a240db))
* **@typescript-eslint/*:** upgrade to 7.18.0 ([c60c5dc](https://github.com/typegoose/typegoose/commit/c60c5dc049f16d1169beff4f09d1be0082aa0a42))
* **@typescript-eslint/*:** upgrade to 8.31.1 ([9193683](https://github.com/typegoose/typegoose/commit/9193683c6a63b8e876223f19ecea618200828f80))
* **commitlint:** upgrade to 19.8.0 ([4441d43](https://github.com/typegoose/typegoose/commit/4441d43f5784680ac5245febb687081c8f005097))
* **commitlint:** upgrade to 20.1.0 ([64b79d6](https://github.com/typegoose/typegoose/commit/64b79d683cce9ce30d7be9d7b2faffe0b1856c52))
* **eslint-config-prettier:** upgrade to 10.1.2 ([e9d3304](https://github.com/typegoose/typegoose/commit/e9d3304dc69a099a6dc90b76d9e0a257eb0b2946))
* **eslint-config-prettier:** upgrade to 10.1.8 ([51cef59](https://github.com/typegoose/typegoose/commit/51cef591af8b3e974fa53633ba117d99a5de0e2c))
* **eslint:** upgrade to 9.25.1 ([0dcbb17](https://github.com/typegoose/typegoose/commit/0dcbb17c352b121ec51e75cb9a87385d09e2f867))
* **eslint:** upgrade to 9.39.1 ([c4c0e25](https://github.com/typegoose/typegoose/commit/c4c0e25d6327971038111961f3fff41f38ed2b98))
* **husky:** upgrade to 9.1.7 ([6ec3c30](https://github.com/typegoose/typegoose/commit/6ec3c300eef35cec554a3e22b7dad4954355082f))
* **jest:** upgrade to 30.2.0 ([70aac45](https://github.com/typegoose/typegoose/commit/70aac45f9c7efab2479cf9b6fd0587f2bef966b4))
* **lint-staged:** upgrade to 15.5.1 ([a63e744](https://github.com/typegoose/typegoose/commit/a63e7444fcf13593b844114f3b1dc916a7dbd8cc))
* **lint-staged:** upgrade to 16.2.7 ([f72a235](https://github.com/typegoose/typegoose/commit/f72a235da7870a36841c358bcaa6fd1775a1b3d7))
* **mongodb-memory-server:** upgrade to 11.0.0-beta.1 ([c9782a5](https://github.com/typegoose/typegoose/commit/c9782a5dbffd5d48b7de0a26ce6e16bdc16b2496))
* **prettier:** upgrade to 3.7.4 ([5af2664](https://github.com/typegoose/typegoose/commit/5af266490fa62b93b2b806848fdac80f91e9c3d0))
* **rimraf:** upgrade to 6.1.2 ([c30d81d](https://github.com/typegoose/typegoose/commit/c30d81dbed9a3e65011489ab6cd2493427eec061))
* **ts-jest:** upgrade to 29.4.6 ([e68b1b3](https://github.com/typegoose/typegoose/commit/e68b1b30aa3e575c9be0157bf7e5f4ca6b109c57))
* **tstyche:** upgrade to 3.5.0 ([64535c3](https://github.com/typegoose/typegoose/commit/64535c3098f03d76775188ae55efe791f282c0c1))
* **tstyche:** upgrade to 5.0.1 ([136207b](https://github.com/typegoose/typegoose/commit/136207b4535777f4fcf119b4493f09717dda575a))
* **typescript-eslint:** upgrade to 8.46.3 ([327a2ce](https://github.com/typegoose/typegoose/commit/327a2ce2c22186f62adbe2e605f2a7def0caa2d7))
* **typescript-eslint:** upgrade to 8.48.1 ([98cc600](https://github.com/typegoose/typegoose/commit/98cc600f6fda5c6557dbe4d938cac012ae322fde))
* **typescript:** upgrade to 5.7.3 ([b95487c](https://github.com/typegoose/typegoose/commit/b95487cacedf68a12c0964a14783c084d7d18214))
* **typescript:** upgrade to 5.9.3 ([658a39f](https://github.com/typegoose/typegoose/commit/658a39fb865789de9d6a944085de8960d6106f79))

## [12.20.0](https://github.com/typegoose/typegoose/compare/v12.19.0...v12.20.0) (2025-10-07)

### Dependencies

* **mongoose:** upgrade to 8.19.1 ([ffde89f](https://github.com/typegoose/typegoose/commit/ffde89fddcad870eb93aee506504fe2325fb32c9))

### Dev-Dependencies

* **@types/semver:** upgrade to 7.7.1 ([ed1afb7](https://github.com/typegoose/typegoose/commit/ed1afb76fb7a11a2610077741b4fc8d11924b695))
* **mongodb-memory-server:** upgrade to 10.2.2 ([15f2a4c](https://github.com/typegoose/typegoose/commit/15f2a4c61abaf6ec3bc7be6695aac606d6719317))
* **ts-jest:** upgrade to 29.4.4 ([e383405](https://github.com/typegoose/typegoose/commit/e3834055ce4c9f638cd29b93676535c3fea354f6))

## [12.19.0](https://github.com/typegoose/typegoose/compare/v12.18.0...v12.19.0) (2025-08-25)

### Features

* **modelOptions:** allow specifying generics ([1f35e6b](https://github.com/typegoose/typegoose/commit/1f35e6ba1bbfdfd3e3522eedb412582a6aaab578)), closes [#1004](https://github.com/typegoose/typegoose/issues/1004) [#1005](https://github.com/typegoose/typegoose/issues/1005)

### Dependencies

* **mongoose:** upgrade to  8.18.0 ([6b59f9c](https://github.com/typegoose/typegoose/commit/6b59f9c5e3f0b57561d11ec24c1d1f5e87c5d5c9))
* **typescript:** upgrade to  5.4.5 ([e431018](https://github.com/typegoose/typegoose/commit/e431018799f0037efeb37cc0e9387420f217b33c))

### Dev-Dependencies

* **eslint-plugin-prettier:** upgrade to 5.5.4 ([017e905](https://github.com/typegoose/typegoose/commit/017e905ac65cbfb5475bcacfaad478b1bd85941a))
* **ts-jest:** upgrade to 29.4.1 ([267f89d](https://github.com/typegoose/typegoose/commit/267f89dec16e69d4d51a54eb4fd36593296e6f65))

## [12.19.0-beta.1](https://github.com/typegoose/typegoose/compare/v12.18.0...v12.19.0-beta.1) (2025-08-25)

### Features

* **modelOptions:** allow specifying generics ([1f35e6b](https://github.com/typegoose/typegoose/commit/1f35e6ba1bbfdfd3e3522eedb412582a6aaab578)), closes [#1004](https://github.com/typegoose/typegoose/issues/1004) [#1005](https://github.com/typegoose/typegoose/issues/1005)

### Dependencies

* **mongoose:** upgrade to  8.18.0 ([6b59f9c](https://github.com/typegoose/typegoose/commit/6b59f9c5e3f0b57561d11ec24c1d1f5e87c5d5c9))
* **typescript:** upgrade to  5.4.5 ([e431018](https://github.com/typegoose/typegoose/commit/e431018799f0037efeb37cc0e9387420f217b33c))

### Dev-Dependencies

* **eslint-plugin-prettier:** upgrade to 5.5.4 ([017e905](https://github.com/typegoose/typegoose/commit/017e905ac65cbfb5475bcacfaad478b1bd85941a))
* **ts-jest:** upgrade to 29.4.1 ([267f89d](https://github.com/typegoose/typegoose/commit/267f89dec16e69d4d51a54eb4fd36593296e6f65))

## [12.18.0](https://github.com/typegoose/typegoose/compare/v12.17.0...v12.18.0) (2025-08-02)

### Dependencies

* **mongoose:** upgrade to  8.17.0 ([074f9e6](https://github.com/typegoose/typegoose/commit/074f9e6dcf759da42e594f6d5eb45d5ccf5f5d74))

### Dev-Dependencies

* **@types/lodash:** upgrade to 4.17.20 ([56c9423](https://github.com/typegoose/typegoose/commit/56c9423540a8f38c83904e338d30b28f22fb461c))
* **eslint-config-prettier:** upgrade to 9.1.2 ([84d1d6c](https://github.com/typegoose/typegoose/commit/84d1d6c0a15fc067d36ddb60949ed848d0c76efd))
* **eslint-plugin-prettier:** upgrade to 5.5.3 ([a1e4171](https://github.com/typegoose/typegoose/commit/a1e41714b36063511478f63c27b0d141bc940d3b))
* **mongodb-memory-server:** upgrade to 10.2.0 ([bf8479e](https://github.com/typegoose/typegoose/commit/bf8479e56197c024f80ee6b50e50ba1a0d0c3c2f))
* **prettier:** upgrade to 3.6.2 ([1dc4dce](https://github.com/typegoose/typegoose/commit/1dc4dcebe6740c8eaf9a574ceff0971f7ce3370d))

## [12.17.0](https://github.com/typegoose/typegoose/compare/v12.16.0...v12.17.0) (2025-06-18)

### Dependencies

* **mongoose:** upgrade to  8.16.0 ([4c6fff0](https://github.com/typegoose/typegoose/commit/4c6fff08dd3d48e798182ceb08b7eb646f3e68a0))

### Dev-Dependencies

* **@types/lodash:** upgrade to 4.17.18 ([8d0f028](https://github.com/typegoose/typegoose/commit/8d0f0280d5223a79bf2be843377cc099987aebcf))
* **eslint-plugin-prettier:** upgrade to 5.5.0 ([5458820](https://github.com/typegoose/typegoose/commit/54588204aea5cfa62b37e4c46dca2282c9bfd6da))
* **ts-jest:** upgrade to 29.4.0 ([727d214](https://github.com/typegoose/typegoose/commit/727d214ea3801759a77bae297b4d43ebeaa52365))

## [12.16.0](https://github.com/typegoose/typegoose/compare/v12.15.1...v12.16.0) (2025-05-17)

### Fixes

* **hooks:** update for specific "init"(post) hooks methods ([05e1724](https://github.com/typegoose/typegoose/commit/05e1724b349f123b7c57331e428cba90be8de32c))

### Dependencies

* **mongoose:** upgrade to  8.15.0 ([941f86f](https://github.com/typegoose/typegoose/commit/941f86f9435c8f0784d9dcd5b8024a70eff1a034))
* **semver:** upgrade to  7.7.2 ([44ce473](https://github.com/typegoose/typegoose/commit/44ce4738c617401a68ce370a860aebdcaabf2ae2))

### Dev-Dependencies

* **ts-jest:** upgrade to 29.3.4 ([16b821d](https://github.com/typegoose/typegoose/commit/16b821df0ffdf9f1963879643194197afc39b4c4))

## [12.15.1](https://github.com/typegoose/typegoose/compare/v12.15.0...v12.15.1) (2025-05-08)

### Fixes

* **hooks:** update for specific "init" hook methods ([63f3f28](https://github.com/typegoose/typegoose/commit/63f3f28be06791ad4a8f2e71b5af1f930a68f665)), closes [#997](https://github.com/typegoose/typegoose/issues/997)

## [12.15.0](https://github.com/typegoose/typegoose/compare/v12.14.0...v12.15.0) (2025-04-29)

### Dependencies

* **mongoose:** upgrade to 8.14.0 ([9791638](https://github.com/typegoose/typegoose/commit/979163839cc8f4db81253432c40d71ece3d6a3b8))

### Dev-Dependencies

* **@types/semver:** upgrade to 7.7.0 ([1b380cb](https://github.com/typegoose/typegoose/commit/1b380cb0e32b3a4ea8496eedf0c0a4160c4ead30))
* **eslint-plugin-prettier:** upgrade to 5.2.6 ([9329367](https://github.com/typegoose/typegoose/commit/9329367662bc03fe53a9f9487cdc44f355918f56))
* **ts-jest:** upgrade to 29.3.2 ([b5e2551](https://github.com/typegoose/typegoose/commit/b5e2551617137572d31367e9bf7086219f9bb4f6))

## [12.14.0](https://github.com/typegoose/typegoose/compare/v12.13.0...v12.14.0) (2025-03-25)

### Dependencies

* **mongoose:** upgrade to 8.13.0 ([cc25059](https://github.com/typegoose/typegoose/commit/cc25059))

### Dev-Dependencies

* **eslint-plugin-prettier:** upgrade to 5.2.4 ([4ebc94c](https://github.com/typegoose/typegoose/commit/4ebc94c))
* **ts-jest:** upgrade to 29.3.0 ([68bceb5](https://github.com/typegoose/typegoose/commit/68bceb5))

## [12.13.0](https://github.com/typegoose/typegoose/compare/v12.12.0...v12.13.0) (2025-03-04)


### Dependencies

* **mongoose:** upgrade to 8.12.0 ([f1ee800](https://github.com/typegoose/typegoose/commit/f1ee8006eafc96d0f4988f00c10986bfaec6e79e))


### Dev-Dependencies

* **@types/lodash:** upgrade to 4.17.16 ([09b5c54](https://github.com/typegoose/typegoose/commit/09b5c5491be555973fde9f849258a72a9cb5b6b1))
* **prettier:** upgrade to 3.5.3 ([6155413](https://github.com/typegoose/typegoose/commit/6155413b835917ff876fa1c22fc39c8e1f3b9e4d))

## [12.12.0](https://github.com/typegoose/typegoose/compare/v12.11.0...v12.12.0) (2025-02-27)


### Fixes

* **typegoose:** move "isCachingEnabled" in "addModelToTypegoose" before assertions ([8bfa8c4](https://github.com/typegoose/typegoose/commit/8bfa8c4d7ad8a2405175b1aa2bdd719f4f5d29cf)), closes [#981](https://github.com/typegoose/typegoose/issues/981)


### Dependencies

* **mongoose:** upgrade to 8.11.0 ([5ac66ac](https://github.com/typegoose/typegoose/commit/5ac66ace9e754a15c3c9aaa10a3f848856b1fc9e))


### Dev-Dependencies

* **mongodb-memory-server:** upgrade to 10.1.4 ([9290abd](https://github.com/typegoose/typegoose/commit/9290abd9b7a3708a6bf7e5756ae9fc5dacad66be))
* **prettier:** upgrade to 3.5.2 ([542ac77](https://github.com/typegoose/typegoose/commit/542ac776e81d2c81c2ab76ce2b3f0ada408e811c))
* **ts-jest:** upgrade to 29.2.6 ([7091dde](https://github.com/typegoose/typegoose/commit/7091dde8048d45f0592468c225a44c9e5bcd5f63))

## [12.11.0](https://github.com/typegoose/typegoose/compare/v12.10.2...v12.11.0) (2025-02-08)


### Features

* infer "type: [TYPE]" as PropType.ARRAY, unless manually specified ([68e5a37](https://github.com/typegoose/typegoose/commit/68e5a37f9c574178eb2757a3cd6d8a9baf22db5b))


### Dependencies

* **mongoose:** upgrade to 8.10.0 ([1daf0f7](https://github.com/typegoose/typegoose/commit/1daf0f781664633c5fb965b08f8545def084302c))
* **semver:** upgrade to 7.7.1 ([eef140a](https://github.com/typegoose/typegoose/commit/eef140a7389c8b24e215371d6ba0a15a51a65c82))


### Dev-Dependencies

* **@types/lodash:** upgrade to 4.17.15 ([112747c](https://github.com/typegoose/typegoose/commit/112747cf215f801676c8b77b92a3a7d8ccd7e9c9))
* **eslint-plugin-prettier:** upgrade to 5.2.3 ([e2d77fe](https://github.com/typegoose/typegoose/commit/e2d77fe6435373e069cc49daabe5bce12196e785))
* **mongodb-memory-server:** upgrade to 10.1.3 ([e25bdb0](https://github.com/typegoose/typegoose/commit/e25bdb06f4ab516455e7cb075d70fab97cf976c7))

## [12.10.2](https://github.com/typegoose/typegoose/compare/v12.10.1...v12.10.2) (2025-02-08)


### Fixes

* **logSettings:** actually allow more levels than "warn" and "error" ([e406af2](https://github.com/typegoose/typegoose/commit/e406af2f9ab7c76f67ba2c759e90a9d7fcd45b9f))

## [12.10.1](https://github.com/typegoose/typegoose/compare/v12.10.0...v12.10.1) (2024-12-14)


### Fixes

* **logSettings:** re-export used functions explicitly ([b3dbe11](https://github.com/typegoose/typegoose/commit/b3dbe1169dfe833f8dcba04a1ab3bedaaf669da0))
* **logSettings:** revert removing "import * as logger" ([ca11619](https://github.com/typegoose/typegoose/commit/ca116198c8e9e5b045ba881558db044c33512481))

## [12.10.0](https://github.com/typegoose/typegoose/compare/v12.9.1...v12.10.0) (2024-12-14)


### Fixes

* **tsconfig:** enable "esModuleInterop" ([dc26ef8](https://github.com/typegoose/typegoose/commit/dc26ef880db605314d8cb76f1158e53c530db450))


### Style

* change import style to use default imports ([7f920be](https://github.com/typegoose/typegoose/commit/7f920be89b1b493db35c4e784a97db1a9a34a9bb))
* **types:** add "unknown[]" to "prop[#type](https://github.com/typegoose/typegoose/issues/type)" to better convey intention ([96229f1](https://github.com/typegoose/typegoose/commit/96229f140d26c7fbf6b57b0cec5b5d96ad744c09))
* **utils::lodash:** change import style to use default imports ([04847f7](https://github.com/typegoose/typegoose/commit/04847f7a1905a2743592b71f1b44aebf5175dce7))


### Dependencies

* **mongoose:** upgrade to 8.9.0 ([6f39022](https://github.com/typegoose/typegoose/commit/6f390224fb43f87fefae40d63736c9af73daf442))


### Dev-Dependencies

* **prettier:** upgrade to 3.4.2 ([cc6c4d5](https://github.com/typegoose/typegoose/commit/cc6c4d506e866aaa6b0340ffdf0c3da4f8171949))

## [12.9.1](https://github.com/typegoose/typegoose/compare/v12.9.0...v12.9.1) (2024-11-21)


### Fixes

* **typegoose:** move "parseENV" call before loading defaultclasses ([a685aea](https://github.com/typegoose/typegoose/commit/a685aea79ee092683e3b370174a31afaae39dbc9)), closes [#939](https://github.com/typegoose/typegoose/issues/939) [#issuecomment-2490189922](https://github.com/typegoose/typegoose/issues/issuecomment-2490189922)

## [12.9.0](https://github.com/typegoose/typegoose/compare/v12.8.0...v12.9.0) (2024-11-03)


### Fixes

* **types:** add "Default__v" type because of mongoose 8.8 ([a3d1477](https://github.com/typegoose/typegoose/commit/a3d147796baa0e771d35bd81ee0e11e22a3740c8))


### Dependencies

* **mongoose:** upgrade to 8.8.0 ([306bcdd](https://github.com/typegoose/typegoose/commit/306bcdd9a63856a3f4f92d4409befc6cfc5eb52a))
* **tslib:** upgrade to 2.8.1 ([add96f5](https://github.com/typegoose/typegoose/commit/add96f558742aa7c061066cc636f97ec142d3d29))


### Dev-Dependencies

* **@types/jest:** upgrade to 29.5.14 ([ea96773](https://github.com/typegoose/typegoose/commit/ea9677376d94f7313088809a30c3a230f1f5f3c5))
* **@types/lodash:** upgrade to 4.17.13 ([25a1446](https://github.com/typegoose/typegoose/commit/25a14466d57275b1b6800df004ac5eed230b0a25))
* **mongodb-memory-server:** upgrade to 10.1.2 ([279b598](https://github.com/typegoose/typegoose/commit/279b5982ef6700385c22413f305825f1da99253d))

## [12.9.0-beta.1](https://github.com/typegoose/typegoose/compare/v12.8.0...v12.9.0-beta.1) (2024-11-03)


### Fixes

* **types:** add "Default__v" type because of mongoose 8.8 ([a3d1477](https://github.com/typegoose/typegoose/commit/a3d147796baa0e771d35bd81ee0e11e22a3740c8))


### Dependencies

* **mongoose:** upgrade to 8.8.0 ([306bcdd](https://github.com/typegoose/typegoose/commit/306bcdd9a63856a3f4f92d4409befc6cfc5eb52a))
* **tslib:** upgrade to 2.8.1 ([add96f5](https://github.com/typegoose/typegoose/commit/add96f558742aa7c061066cc636f97ec142d3d29))


### Dev-Dependencies

* **@types/jest:** upgrade to 29.5.14 ([ea96773](https://github.com/typegoose/typegoose/commit/ea9677376d94f7313088809a30c3a230f1f5f3c5))
* **@types/lodash:** upgrade to 4.17.13 ([25a1446](https://github.com/typegoose/typegoose/commit/25a14466d57275b1b6800df004ac5eed230b0a25))
* **mongodb-memory-server:** upgrade to 10.1.2 ([279b598](https://github.com/typegoose/typegoose/commit/279b5982ef6700385c22413f305825f1da99253d))

## [12.8.0](https://github.com/typegoose/typegoose/compare/v12.7.0...v12.8.0) (2024-09-28)


### Dependencies

* **loglevel:** upgrade to 1.9.2 ([42d34c6](https://github.com/typegoose/typegoose/commit/42d34c6745380a61eb047fffc74241961b429e24))
* **mongoose:** upgrade to 8.7.0 ([d25ddf4](https://github.com/typegoose/typegoose/commit/d25ddf4c222954eb9be6c7a28e29d83bdcd3a1ed))


### Dev-Dependencies

* **@types/jest:** upgrade to 29.5.13 ([8f737fc](https://github.com/typegoose/typegoose/commit/8f737fc6e777828619527315ae6f776015836a31))
* **@types/lodash:** upgrade to 4.17.9 ([be6aba1](https://github.com/typegoose/typegoose/commit/be6aba180879bab68b12e5e6768a84025fe02d95))
* **eslint:** upgrade to 8.57.1 ([a3a08e3](https://github.com/typegoose/typegoose/commit/a3a08e384a7dd79a013c479c5c883f786f982662))
* **mongodb-memory-server:** upgrade to 10.0.1 ([5464812](https://github.com/typegoose/typegoose/commit/546481203dd1c24dcf8292c20af6d735dd7326c4))

## [12.7.0](https://github.com/typegoose/typegoose/compare/v12.6.0...v12.7.0) (2024-08-31)


### Style

* **types:** fix typo in BasePropOptions's autopopulate description ([#952](https://github.com/typegoose/typegoose/issues/952)) ([8613414](https://github.com/typegoose/typegoose/commit/8613414dd0bbb7599e327fb1990527792f346ba9))


### Dependencies

* **mongoose:** upgrade to 8.6.0 ([d3cc8c0](https://github.com/typegoose/typegoose/commit/d3cc8c0436eeb3e49c25af9169e1bd74d0785b51))
* **semver:** upgrade to 7.6.3 ([52c01b7](https://github.com/typegoose/typegoose/commit/52c01b72d8e5bdde967558063c7302d4432685ff))
* **tslib:** upgrade to 2.7.0 ([6cb1d44](https://github.com/typegoose/typegoose/commit/6cb1d44025d732c04badfbf99df9bc165899eb35))


### Dev-Dependencies

* **@types/lodash:** upgrade to 4.17.7 ([5ee6344](https://github.com/typegoose/typegoose/commit/5ee63440a4403ef398f0fabe92e061b89d565720))
* **eslint-plugin-prettier:** upgrade to 5.2.1 ([37a6774](https://github.com/typegoose/typegoose/commit/37a67747bf096c471fc27192867af3eec3ea7607))
* **mongodb-memory-server:** upgrade to 10.0.0 ([f3097dd](https://github.com/typegoose/typegoose/commit/f3097dd7fa09f5c7da7ffa34eab364d71b513a8c))
* **prettier:** upgrade to 3.3.3 ([f05c6d3](https://github.com/typegoose/typegoose/commit/f05c6d34edcb0f87b5a6c8e288296aa01a92bde6))
* **rimraf:** upgrade to 5.0.10 ([357b04f](https://github.com/typegoose/typegoose/commit/357b04ff90dc1c81e74df7fac28018c480faf621))
* **ts-jest:** upgrade to 29.2.5 ([8ba7a22](https://github.com/typegoose/typegoose/commit/8ba7a225ddd877f2ea76700076b8c8edc63e878e))

## [12.6.0](https://github.com/typegoose/typegoose/compare/v12.5.0...v12.6.0) (2024-07-10)


### Dependencies

* **mongoose:** upgrade to 8.5.0 ([8f3e4f6](https://github.com/typegoose/typegoose/commit/8f3e4f6446d85783bc3fb8a89211a8c38062d5b4))
* **tslib:** upgrade to 2.6.3 ([f299ccc](https://github.com/typegoose/typegoose/commit/f299cccf3ed9d0dd2fedc05babd8c7132afe3b8c))


### Dev-Dependencies

* **@types/lodash:** upgrade to 4.17.6 ([86b8a0f](https://github.com/typegoose/typegoose/commit/86b8a0f66e67dcb6be9c51c214865d916cbdf707))
* **mongodb-memory-server:** upgrade to 9.4.0 ([578671e](https://github.com/typegoose/typegoose/commit/578671efa21a3d851f5fc4c78ad1590c7f6c4d08))
* **prettier:** upgrade to 3.3.2 ([1f6ccb1](https://github.com/typegoose/typegoose/commit/1f6ccb1dfdfafa7fb89c06b60a3f15113e07d808))
* **ts-jest:** upgrade to 29.2.1 ([f16d6f2](https://github.com/typegoose/typegoose/commit/f16d6f203388062775591f44bd2198491c5dfc34))

## [12.5.0](https://github.com/typegoose/typegoose/compare/v12.4.0...v12.5.0) (2024-05-19)


### Dependencies

* **mongoose:** upgrade to 8.4.0 ([7a3e65e](https://github.com/typegoose/typegoose/commit/7a3e65eca52e9ee7d3b8fd94ae2d336338d6fecc))
* **semver:** upgrade to 7.6.2 ([877b7da](https://github.com/typegoose/typegoose/commit/877b7daa77b0099d88d901f9eb1107731aad9931))


### Dev-Dependencies

* **@types/lodash:** upgrade to 4.17.4 ([b4193fa](https://github.com/typegoose/typegoose/commit/b4193fa7b5c1cd4d170d8197379dbba21b82ad22))
* **rimraf:** upgrade to 5.0.7 ([54559a3](https://github.com/typegoose/typegoose/commit/54559a362312deb889346f79340417008745ad27))

## [12.4.0](https://github.com/typegoose/typegoose/compare/v12.3.1...v12.4.0) (2024-04-22)


### Dependencies

* **mongoose:** upgrade to 8.3.1 ([a431d3a](https://github.com/typegoose/typegoose/commit/a431d3ab314346f770f276b873558ef151ee986c))


### Dev-Dependencies

* **jest-runner-tsd:** upgrade to 6.0.0 ([06ec544](https://github.com/typegoose/typegoose/commit/06ec544b28121a33eec994aaae977efbfd5c7fdd))
* **mongodb-memory-server:** upgrade to 9.2.0 ([f999238](https://github.com/typegoose/typegoose/commit/f999238e2844109c4fd75336fa2a523156c4f72c))

## [12.4.0-beta.2](https://github.com/typegoose/typegoose/compare/v12.4.0-beta.1...v12.4.0-beta.2) (2024-04-15)


### Fixes

* **searchindex:** export "[@search](https://github.com/search)Index" in main entry point ([#930](https://github.com/typegoose/typegoose/issues/930)) ([9674e51](https://github.com/typegoose/typegoose/commit/9674e51cc940db9d20d4d233be06b197444c8229)), closes [#921](https://github.com/typegoose/typegoose/issues/921)

## [12.4.0-beta.1](https://github.com/typegoose/typegoose/compare/v12.3.0...v12.4.0-beta.1) (2024-04-12)


### Dependencies

* **mongoose:** upgrade to 8.3.1 ([a431d3a](https://github.com/typegoose/typegoose/commit/a431d3ab314346f770f276b873558ef151ee986c))


### Dev-Dependencies

* **jest-runner-tsd:** upgrade to 6.0.0 ([06ec544](https://github.com/typegoose/typegoose/commit/06ec544b28121a33eec994aaae977efbfd5c7fdd))


## [12.3.1](https://github.com/typegoose/typegoose/compare/v12.3.0...v12.3.1) (2024-04-15)


### Fixes

* **searchindex:** export "[@search](https://github.com/search)Index" in main entry point ([#930](https://github.com/typegoose/typegoose/issues/930)) ([9674e51](https://github.com/typegoose/typegoose/commit/9674e51cc940db9d20d4d233be06b197444c8229)), closes [#921](https://github.com/typegoose/typegoose/issues/921)

## [12.3.0](https://github.com/typegoose/typegoose/compare/v12.2.0...v12.3.0) (2024-04-06)


### Features

* add support for declaring search indexes ([#921](https://github.com/typegoose/typegoose/issues/921)) ([5246241](https://github.com/typegoose/typegoose/commit/5246241dfa3c4e41e162c09d482aacba41b52a65))


### Fixes

* **typegoose:** update minimal node version check to match engines ([a07c9ee](https://github.com/typegoose/typegoose/commit/a07c9ee50282863a1f300ac603e1f9870927b5da))
* **typegoose:** update mongoose version check for 8.2.4 ([f197dbe](https://github.com/typegoose/typegoose/commit/f197dbe99fd8d4b1f77bd6949d2c10d228eab4ed))


### Dependencies

* **mongoose:** upgrade to 8.2.4 ([f1e3dc7](https://github.com/typegoose/typegoose/commit/f1e3dc7bc1b28231e8d7b64d5575be954ff549d4))
* **reflect-metadata:** upgrade to 0.2.2 ([1e4d282](https://github.com/typegoose/typegoose/commit/1e4d2829d30b3e9193c98948871d2b0d113956ec))


### Dev-Dependencies

* **@types/lodash:** upgrade to 4.17.0 ([a536cb9](https://github.com/typegoose/typegoose/commit/a536cb9d5d489edd032fa54f172a777aa9aafc51))
* **@types/semver:** upgrade to 7.5.8 ([8757a20](https://github.com/typegoose/typegoose/commit/8757a2047ce88bfbdf82932ba9a33aecbc404c3f))
* **eslint:** upgrade to 8.57.0 ([7979a37](https://github.com/typegoose/typegoose/commit/7979a377f4a38b0833ba483fb988ac76f59e0e3f))
* **mongodb-memory-server:** upgrade to 9.1.8 ([e287b6b](https://github.com/typegoose/typegoose/commit/e287b6bc471a0c2c8a86652a30506520927618c0))

## [12.3.0-beta.2](https://github.com/typegoose/typegoose/compare/v12.3.0-beta.1...v12.3.0-beta.2) (2024-04-02)


### Features

* add support for declaring search indexes ([#921](https://github.com/typegoose/typegoose/issues/921)) ([5246241](https://github.com/typegoose/typegoose/commit/5246241dfa3c4e41e162c09d482aacba41b52a65))


### Fixes

* **typegoose:** update minimal node version check to match engines ([a07c9ee](https://github.com/typegoose/typegoose/commit/a07c9ee50282863a1f300ac603e1f9870927b5da))
* **typegoose:** update mongoose version check for 8.2.4 ([f197dbe](https://github.com/typegoose/typegoose/commit/f197dbe99fd8d4b1f77bd6949d2c10d228eab4ed))

## [12.3.0-beta.1](https://github.com/typegoose/typegoose/compare/v12.2.0...v12.3.0-beta.1) (2024-03-30)


### Dependencies

* **mongoose:** upgrade to 8.2.4 ([f1e3dc7](https://github.com/typegoose/typegoose/commit/f1e3dc7bc1b28231e8d7b64d5575be954ff549d4))
* **reflect-metadata:** upgrade to 0.2.2 ([1e4d282](https://github.com/typegoose/typegoose/commit/1e4d2829d30b3e9193c98948871d2b0d113956ec))


### Dev-Dependencies

* **@types/lodash:** upgrade to 4.17.0 ([a536cb9](https://github.com/typegoose/typegoose/commit/a536cb9d5d489edd032fa54f172a777aa9aafc51))
* **@types/semver:** upgrade to 7.5.8 ([8757a20](https://github.com/typegoose/typegoose/commit/8757a2047ce88bfbdf82932ba9a33aecbc404c3f))
* **eslint:** upgrade to 8.57.0 ([7979a37](https://github.com/typegoose/typegoose/commit/7979a377f4a38b0833ba483fb988ac76f59e0e3f))
* **mongodb-memory-server:** upgrade to 9.1.8 ([e287b6b](https://github.com/typegoose/typegoose/commit/e287b6bc471a0c2c8a86652a30506520927618c0))

## [12.2.0](https://github.com/typegoose/typegoose/compare/v12.1.0...v12.2.0) (2024-02-23)


### Dependencies

* **loglevel:** upgrade to 1.9.1 ([f3455d1](https://github.com/typegoose/typegoose/commit/f3455d1758571144afd7baa82ba7e825b4cd5542))
* **mongoose:** upgrade to 8.2.0 ([186328e](https://github.com/typegoose/typegoose/commit/186328ed5d4757950e45c7f0689cc00ac62f1c74))
* **semver:** upgrade to 7.6.0 ([1dcd4d2](https://github.com/typegoose/typegoose/commit/1dcd4d29f5ff2046db6eb421f64c452639b20072))


### Dev-Dependencies

* **@types/jest:** upgrade to 29.5.12 ([b176241](https://github.com/typegoose/typegoose/commit/b1762416b3aced567015c63de5d9a765ca996d82))
* **@types/semver:** upgrade to 7.5.7 ([18482ba](https://github.com/typegoose/typegoose/commit/18482badf7103b1bab98f80ff790845ee86f6ebf))
* **@typescript-eslint/*:** upgrade to 6.21.0 ([e3c333a](https://github.com/typegoose/typegoose/commit/e3c333aa01d8b5bddb2062af3c981b6eb2b10c69))
* **mongodb-memory-server:** upgrade to 9.1.6 ([e81622f](https://github.com/typegoose/typegoose/commit/e81622f1955047326c904bfe9bcdec233ee90717))
* **prettier:** upgrade to 3.2.5 ([a6b494c](https://github.com/typegoose/typegoose/commit/a6b494c187eb693d0ea0bdef55bc049ec6b3d1ba))
* **ts-jest:** upgrade to 29.1.2 ([cb72e87](https://github.com/typegoose/typegoose/commit/cb72e8740ae020ede727301333085f7bac28286b))

## [12.1.0](https://github.com/typegoose/typegoose/compare/v12.0.0...v12.1.0) (2024-01-17)


### Dependencies

* **mongoose:** upgrade to 8.1.0 ([99b3eca](https://github.com/typegoose/typegoose/commit/99b3eca7c3f8674801d4e128954cba7052a3ae39))
* **reflect-metadata:** upgrade to 0.2.1 ([0cc46a7](https://github.com/typegoose/typegoose/commit/0cc46a79948e26b782d249414d7e9fd06d16c650))


### Dev-Dependencies

* **@types/jest:** upgrade to 29.5.11 ([db83044](https://github.com/typegoose/typegoose/commit/db830446a1d8872549becd2b954bd4f98826c9c6))
* **@typescript-eslint/*:** upgrade to 6.19.0 ([d48adfb](https://github.com/typegoose/typegoose/commit/d48adfb140a04251862b735bd45195bd56bb36de))
* **commitlint:** upgrade to 17.8.1 ([77ed29f](https://github.com/typegoose/typegoose/commit/77ed29f80390bed4490a0a2f9017b473ed993a99))
* **eslint-config-prettier:** upgrade to 9.1.0 ([97b7859](https://github.com/typegoose/typegoose/commit/97b7859885cadd4ca51d8491610a5d4a28942faf))
* **eslint-plugin-prettier:** upgrade to 5.1.3 ([6536299](https://github.com/typegoose/typegoose/commit/6536299f07ff4d4aaeb44cbb54f24d793b95d48b))
* **eslint:** upgrade to 8.56.0 ([464cb26](https://github.com/typegoose/typegoose/commit/464cb269b4b2e52b59af135c3701e820f3196b9f))
* **mongodb-memory-server:** upgrade to 9.1.5 ([432798b](https://github.com/typegoose/typegoose/commit/432798b03eb3ad93ffb1fd71184805b208dcd120))
* **prettier:** upgrade to 3.2.4 ([91cdff8](https://github.com/typegoose/typegoose/commit/91cdff8fff621880d12d5434e25b3db1da73239d))
* **typescript:** upgrade to 5.3.3 ([6a821f8](https://github.com/typegoose/typegoose/commit/6a821f8afcbb79dda244e456e21b39c092b55b93))

## [12.0.0](https://github.com/typegoose/typegoose/compare/v11.7.1...v12.0.0) (2023-11-25)


### ⚠ BREAKING CHANGES

* **mongoose:** mongoose 8.0.0 is now the version in use
* **tsconfig.json:** tsconfig "target" is now "es2021" which could be potentially breaking
* **package.json:** Minimal NodeJS version is now 16.20.1

### Features

* **package.json:** update nodejs version to 16.20 ([8dd8467](https://github.com/typegoose/typegoose/commit/8dd84673e2cadf00667e29a1b592a0e587db8270))
* **tsconfig.json:** update "target" to match minimal NodeJS capabilities ([ce3cf74](https://github.com/typegoose/typegoose/commit/ce3cf74042a6221841ab673b080ebdaba202e81e))


### Fixes

* **types::QueryHelperThis:** provide generic "RawDocType" ([74cdf28](https://github.com/typegoose/typegoose/commit/74cdf288cc8bd7e0de52d05de29824d101496f45)), closes [#870](https://github.com/typegoose/typegoose/issues/870) [#870](https://github.com/typegoose/typegoose/issues/870)


### Style

* **processProp:** fix lint ([db6042a](https://github.com/typegoose/typegoose/commit/db6042a17bcb0f3f22f9ecdc7d82fbabdf1f6d14))
* **types::EnumValues:** remove some TODOs ([5f0abf5](https://github.com/typegoose/typegoose/commit/5f0abf5321ba995963be8604b5a80b0116f3e1d9))


### Dependencies

* **mongoose:** upgrade to 8.0.0 ([fc16e81](https://github.com/typegoose/typegoose/commit/fc16e8136df8f6f7890078462504b329c8f0c96f))
* **mongoose:** upgrade to 8.0.1 ([6223bf8](https://github.com/typegoose/typegoose/commit/6223bf82ca9c075ae89daebe481546ed758ba8c4))


### Dev-Dependencies

* **@types/jest:** upgrade to 29.5.10 ([ac2869a](https://github.com/typegoose/typegoose/commit/ac2869a5106d37c155a4c1d0f1b89eb8e1f22157))
* **@types/jest:** upgrade to 29.5.8 ([571d2af](https://github.com/typegoose/typegoose/commit/571d2af5edeabecadae1baa80f0ac2bd6b9b181d))
* **@types/lodash:** upgrade to 4.14.201 ([9be7a9e](https://github.com/typegoose/typegoose/commit/9be7a9ed27fcd802508b797ba74e5b4d5f57243e))
* **@types/lodash:** upgrade to 4.14.202 ([3868481](https://github.com/typegoose/typegoose/commit/386848120b88856cea7a98f4534bf2cc9fe23371))
* **@types/node:** upgrade to 16.11.7 ([e0de5a1](https://github.com/typegoose/typegoose/commit/e0de5a1afa99c05fb1f61371deb90fab44c26375))
* **@types/semver:** upgrade to 7.5.5 ([1bdd67b](https://github.com/typegoose/typegoose/commit/1bdd67b62d6e2e54daf789f00ea47aca8df4ab2f))
* **@types/semver:** upgrade to 7.5.6 ([f96c647](https://github.com/typegoose/typegoose/commit/f96c6478dae5231e4b48e6aca56e52ec09ca6eb4))
* **@typescript-eslint/*:** upgrade to 6.11.0 ([470cae7](https://github.com/typegoose/typegoose/commit/470cae7cca9573c6b9729d93d66f70264dee2e99))
* **@typescript-eslint/*:** upgrade to 6.12.0 ([df34158](https://github.com/typegoose/typegoose/commit/df3415847ff1c0ef4bffb6b439808610a9c5452b))
* **@typescript-eslint/*:** upgrade to 6.9.1 ([1e7784d](https://github.com/typegoose/typegoose/commit/1e7784d36fa0aafc29671b6322b0d8469c6a644c))
* **eslint:** upgrade to 8.53.0 ([f8a1573](https://github.com/typegoose/typegoose/commit/f8a1573e8960e8db0492f396cc15ea4ba363c8c6))
* **eslint:** upgrade to 8.54.0 ([61a7124](https://github.com/typegoose/typegoose/commit/61a71246f0d29a0f1da96193d4e6fc83f1e2b198))
* **jest-runner-tsd:** upgrade to 5.0.0 ([9d2dc2d](https://github.com/typegoose/typegoose/commit/9d2dc2d06ad37c58e523041aa8b50372f3eb37de))
* **lint-staged:** upgrade to 14.0.1 ([b77a092](https://github.com/typegoose/typegoose/commit/b77a092acf8494b9c56cf5967eb4eb13dc3ae6ae))
* **mongodb-memory-server:** upgrade to 9.1.1 ([e57d841](https://github.com/typegoose/typegoose/commit/e57d8414c7ad757f23b40cfb5ae2462e4ba69c68))
* **prettier:** upgrade to 3.1.0 ([433488b](https://github.com/typegoose/typegoose/commit/433488b608319b1324f1ec787b61c1f69e5c749d))
* **typescript:** upgrade to 5.2.2 ([e5ce00b](https://github.com/typegoose/typegoose/commit/e5ce00b31079080b8a8a6954db5a87a78ed0fe78))

## [12.0.0-beta.1](https://github.com/typegoose/typegoose/compare/v11.7.1...v12.0.0-beta.1) (2023-11-16)


### ⚠ BREAKING CHANGES

* **mongoose:** mongoose 8.0.0 is now the version in use
* **tsconfig.json:** tsconfig "target" is now "es2021" which could be potentially breaking
* **package.json:** Minimal NodeJS version is now 16.20.1

### Features

* **package.json:** update nodejs version to 16.20 ([8dd8467](https://github.com/typegoose/typegoose/commit/8dd84673e2cadf00667e29a1b592a0e587db8270))
* **tsconfig.json:** update "target" to match minimal NodeJS capabilities ([ce3cf74](https://github.com/typegoose/typegoose/commit/ce3cf74042a6221841ab673b080ebdaba202e81e))


### Fixes

* **types::QueryHelperThis:** provide generic "RawDocType" ([74cdf28](https://github.com/typegoose/typegoose/commit/74cdf288cc8bd7e0de52d05de29824d101496f45)), closes [#870](https://github.com/typegoose/typegoose/issues/870) [#870](https://github.com/typegoose/typegoose/issues/870)


### Style

* **processProp:** fix lint ([db6042a](https://github.com/typegoose/typegoose/commit/db6042a17bcb0f3f22f9ecdc7d82fbabdf1f6d14))
* **types::EnumValues:** remove some TODOs ([5f0abf5](https://github.com/typegoose/typegoose/commit/5f0abf5321ba995963be8604b5a80b0116f3e1d9))


### Dependencies

* **mongoose:** upgrade to 8.0.0 ([fc16e81](https://github.com/typegoose/typegoose/commit/fc16e8136df8f6f7890078462504b329c8f0c96f))
* **mongoose:** upgrade to 8.0.1 ([6223bf8](https://github.com/typegoose/typegoose/commit/6223bf82ca9c075ae89daebe481546ed758ba8c4))


### Dev-Dependencies

* **@types/jest:** upgrade to 29.5.8 ([571d2af](https://github.com/typegoose/typegoose/commit/571d2af5edeabecadae1baa80f0ac2bd6b9b181d))
* **@types/lodash:** upgrade to 4.14.201 ([9be7a9e](https://github.com/typegoose/typegoose/commit/9be7a9ed27fcd802508b797ba74e5b4d5f57243e))
* **@types/node:** upgrade to 16.11.7 ([e0de5a1](https://github.com/typegoose/typegoose/commit/e0de5a1afa99c05fb1f61371deb90fab44c26375))
* **@types/semver:** upgrade to 7.5.5 ([1bdd67b](https://github.com/typegoose/typegoose/commit/1bdd67b62d6e2e54daf789f00ea47aca8df4ab2f))
* **@typescript-eslint/*:** upgrade to 6.11.0 ([470cae7](https://github.com/typegoose/typegoose/commit/470cae7cca9573c6b9729d93d66f70264dee2e99))
* **@typescript-eslint/*:** upgrade to 6.9.1 ([1e7784d](https://github.com/typegoose/typegoose/commit/1e7784d36fa0aafc29671b6322b0d8469c6a644c))
* **eslint:** upgrade to 8.53.0 ([f8a1573](https://github.com/typegoose/typegoose/commit/f8a1573e8960e8db0492f396cc15ea4ba363c8c6))
* **jest-runner-tsd:** upgrade to 5.0.0 ([9d2dc2d](https://github.com/typegoose/typegoose/commit/9d2dc2d06ad37c58e523041aa8b50372f3eb37de))
* **lint-staged:** upgrade to 14.0.1 ([b77a092](https://github.com/typegoose/typegoose/commit/b77a092acf8494b9c56cf5967eb4eb13dc3ae6ae))
* **prettier:** upgrade to 3.1.0 ([433488b](https://github.com/typegoose/typegoose/commit/433488b608319b1324f1ec787b61c1f69e5c749d))
* **typescript:** upgrade to 5.2.2 ([e5ce00b](https://github.com/typegoose/typegoose/commit/e5ce00b31079080b8a8a6954db5a87a78ed0fe78))

## [11.8.0](https://github.com/typegoose/typegoose/compare/v11.7.1...v11.8.0) (2024-07-26)


### Style

* **processProp:** fix lint ([3641525](https://github.com/typegoose/typegoose/commit/3641525a7859ccb56a5a2bce0842819040489c1e))


### Dependencies

* **loglevel:** upgrade to 1.9.1 ([0bc6ba5](https://github.com/typegoose/typegoose/commit/0bc6ba5584c370e1cf616082600a7f5e6ecc003a))
* **mongoose:** upgrade to 7.8.0 ([aca3a8c](https://github.com/typegoose/typegoose/commit/aca3a8c39771effd2182b534aae0d264a51e427a))
* **reflect-metadata:** upgrade to 0.1.14 ([fea8cb9](https://github.com/typegoose/typegoose/commit/fea8cb9bfc85a847152d5a5adfa81b6efbf9add6))
* **semver:** upgrade to 7.6.2 ([ed8ca90](https://github.com/typegoose/typegoose/commit/ed8ca90be6cbd3343903190625829cfdf1b13e9c))
* **tslib:** upgrade to 2.6.3 ([874a9a4](https://github.com/typegoose/typegoose/commit/874a9a4a62fb14cef399d9401ae79fffe077a5d9))


### Dev-Dependencies

* **@types/jest:** upgrade to 29.5.12 ([3b324bd](https://github.com/typegoose/typegoose/commit/3b324bd483eb8beefed7035857a999b00762a9a0))
* **@types/lodash:** upgrade to 4.17.6 ([d14ea23](https://github.com/typegoose/typegoose/commit/d14ea2351dc7ef8e73656ea578688b773b3d207f))
* **@types/semver:** upgrade to 7.5.8 ([7e13171](https://github.com/typegoose/typegoose/commit/7e13171d4f766474a8986ef81212d9ab00521f93))
* **commitlint:** upgrade to 17.8.1 ([869183e](https://github.com/typegoose/typegoose/commit/869183e185e680be2753d71a16205401654ac3bc))
* **eslint-config-prettier:** upgrade to 9.1.0 ([50ad085](https://github.com/typegoose/typegoose/commit/50ad085bde1aa892808b123f9e8dbafd5fc4a65a))
* **eslint-plugin-prettier:** upgrade to 5.1.3 ([0df5265](https://github.com/typegoose/typegoose/commit/0df526543933476aa18b082dbc4d0dd23b18d3c6))
* **eslint:** upgrade to 8.57.0 ([f68f830](https://github.com/typegoose/typegoose/commit/f68f830f2d33e9203a35b2f9840b7eb8a2e8ed8f))
* **mongodb-memory-server:** upgrade to 9.4.0 ([7731371](https://github.com/typegoose/typegoose/commit/773137187b2978d31d5c95788c7410eaeedb4cfb))
* **prettier:** upgrade to 3.3.2 ([031aac7](https://github.com/typegoose/typegoose/commit/031aac7395d0128680c27181c7a592ee27ee1c83))
* **rimraf:** upgrade to 5.0.9 ([24e6a64](https://github.com/typegoose/typegoose/commit/24e6a64d59248aadf7bd7a931e9acc4e65c22f14))
* **ts-jest:** upgrade to 29.2.1 ([58158f4](https://github.com/typegoose/typegoose/commit/58158f4b048f3f7744ce992720ff776e52bf3adc))


## [11.7.1](https://github.com/typegoose/typegoose/compare/v11.7.0...v11.7.1) (2023-11-16)


### Fixes

* **types::QueryHelperThis:** provide generic "RawDocType" ([ff778ea](https://github.com/typegoose/typegoose/commit/ff778eafc498ac76ba139a658bfae40ba438adf9)), closes [#870](https://github.com/typegoose/typegoose/issues/870) [#870](https://github.com/typegoose/typegoose/issues/870)

## [11.7.0](https://github.com/typegoose/typegoose/compare/v11.6.0...v11.7.0) (2023-11-03)


### Features

* dont inherit typegoose option "disableLowerIndexes" ([7706715](https://github.com/typegoose/typegoose/commit/77067152296cde9d57129d01ba64a05c539ced40))
* **hooks:** update hook definitions to match mongoose 7.6.2 ([c97bb88](https://github.com/typegoose/typegoose/commit/c97bb8847da3e7ce3c344e510331705a1a3e559f))
* **typegoose::buildSchema:** correctly get and set "superOptions" if the top level class sets it ([717a60c](https://github.com/typegoose/typegoose/commit/717a60c41ee59e5e52b90f4ea21a6b9596665f91)), closes [typegoose/typegoose#890](https://github.com/typegoose/typegoose/issues/890)


### Fixes

* **utils::mergeMetadata:** add options to use "getOwnMetadata" instead of "getMetadata" ([148983b](https://github.com/typegoose/typegoose/commit/148983b5f5fd964c849f05781fe5ac74cb03a54e))


### Style

* **typegoose::buildSchema:** rename variable to make more sense ([ca4863c](https://github.com/typegoose/typegoose/commit/ca4863ca9066ad699a156a8eab110cb1430a5451))


### Dependencies

* **mongoose:** upgrade to 7.6.3 ([c9399f2](https://github.com/typegoose/typegoose/commit/c9399f21302572b475ad2f1f13bf98206439eb12))


### Dev-Dependencies

* **@types/jest:** upgrade to 29.5.6 ([375057a](https://github.com/typegoose/typegoose/commit/375057a5d0870303abc1feda9add4fd712689768))
* **@types/lodash:** upgrade to 4.14.200 ([ab70e0c](https://github.com/typegoose/typegoose/commit/ab70e0c0f3e43bbe6e717ac196f644baebefa724))
* **@types/semver:** upgrade to 7.5.4 ([a86d143](https://github.com/typegoose/typegoose/commit/a86d1434a841ed6f5cfa47704207f76cb92392b9))
* **eslint-plugin-prettier:** upgrade to 5.0.1 ([80f448f](https://github.com/typegoose/typegoose/commit/80f448f85f946ae874b4e7605b787284f4edf950))
* **eslint:** upgrade to 8.52.0 ([feecd5f](https://github.com/typegoose/typegoose/commit/feecd5f305cd138232f70d2f5e01c815aa7ab315))
* **mongodb-memory-server:** upgrade to 9.0.1 ([22c233d](https://github.com/typegoose/typegoose/commit/22c233dc587bac1de3e8806db6d9f6bf7a64d51c))

## [11.7.0-beta.1](https://github.com/typegoose/typegoose/compare/v11.6.0...v11.7.0-beta.1) (2023-10-30)


### Features

* dont inherit typegoose option "disableLowerIndexes" ([7706715](https://github.com/typegoose/typegoose/commit/77067152296cde9d57129d01ba64a05c539ced40))
* **hooks:** update hook definitions to match mongoose 7.6.2 ([c97bb88](https://github.com/typegoose/typegoose/commit/c97bb8847da3e7ce3c344e510331705a1a3e559f))
* **typegoose::buildSchema:** correctly get and set "superOptions" if the top level class sets it ([717a60c](https://github.com/typegoose/typegoose/commit/717a60c41ee59e5e52b90f4ea21a6b9596665f91)), closes [typegoose/typegoose#890](https://github.com/typegoose/typegoose/issues/890)


### Fixes

* **utils::mergeMetadata:** add options to use "getOwnMetadata" instead of "getMetadata" ([148983b](https://github.com/typegoose/typegoose/commit/148983b5f5fd964c849f05781fe5ac74cb03a54e))


### Style

* **typegoose::buildSchema:** rename variable to make more sense ([ca4863c](https://github.com/typegoose/typegoose/commit/ca4863ca9066ad699a156a8eab110cb1430a5451))


### Dependencies

* **mongoose:** upgrade to 7.6.3 ([c9399f2](https://github.com/typegoose/typegoose/commit/c9399f21302572b475ad2f1f13bf98206439eb12))


### Dev-Dependencies

* **@types/jest:** upgrade to 29.5.6 ([375057a](https://github.com/typegoose/typegoose/commit/375057a5d0870303abc1feda9add4fd712689768))
* **@types/lodash:** upgrade to 4.14.200 ([ab70e0c](https://github.com/typegoose/typegoose/commit/ab70e0c0f3e43bbe6e717ac196f644baebefa724))
* **@types/semver:** upgrade to 7.5.4 ([a86d143](https://github.com/typegoose/typegoose/commit/a86d1434a841ed6f5cfa47704207f76cb92392b9))
* **eslint-plugin-prettier:** upgrade to 5.0.1 ([80f448f](https://github.com/typegoose/typegoose/commit/80f448f85f946ae874b4e7605b787284f4edf950))
* **eslint:** upgrade to 8.52.0 ([feecd5f](https://github.com/typegoose/typegoose/commit/feecd5f305cd138232f70d2f5e01c815aa7ab315))
* **mongodb-memory-server:** upgrade to 9.0.1 ([22c233d](https://github.com/typegoose/typegoose/commit/22c233dc587bac1de3e8806db6d9f6bf7a64d51c))

## [11.6.0](https://github.com/typegoose/typegoose/compare/v11.5.1...v11.6.0) (2023-10-10)


### Dependencies

* **mongoose:** upgrade to 7.6.1 ([61ae900](https://github.com/typegoose/typegoose/commit/61ae90083cecf1bd80ef147d76701dfa7f0c2b19))

## [11.5.1](https://github.com/typegoose/typegoose/compare/v11.5.0...v11.5.1) (2023-10-07)


### Style

* apply prettier 3.0 formatting changes ([07826fa](https://github.com/typegoose/typegoose/commit/07826fa25d1c8a36ae533e5c4d4332f37c2d7dcc))


### Dev-Dependencies

* **@types/jest:** upgrade to 29.5.5 ([e1a1a9f](https://github.com/typegoose/typegoose/commit/e1a1a9f7c5083c0199698a3908b6a9bf87d4083d))
* **@types/lodash:** upgrade to 4.14.199 ([0985e4f](https://github.com/typegoose/typegoose/commit/0985e4f581d5780526feca7477f1da4a25cd43f9))
* **@types/node:** upgrade to 14.18.63 ([f62f379](https://github.com/typegoose/typegoose/commit/f62f379c7c557cd25f2683ce52f6a6b991c781c2))
* **@types/semver:** upgrade to 7.5.3 ([41683d7](https://github.com/typegoose/typegoose/commit/41683d71378ff37e156d53ad25f331833252810c))
* **@typescript-eslint/*:** upgrade to 5.62.0 ([2b84106](https://github.com/typegoose/typegoose/commit/2b8410604c7278ceeb42687f0cf435b16d03e32b))
* **commitlint:** upgrade to 17.7.2 ([bad796b](https://github.com/typegoose/typegoose/commit/bad796b0ee00c8bc9afa9ab39309ef53da56633f))
* **eslint-config-prettier:** upgrade to 8.10.0 ([a15c884](https://github.com/typegoose/typegoose/commit/a15c884bbd6fbe0881d8c779667e6e3ccd367508))
* **eslint-config-prettier:** upgrade to 9.0.0 ([93e3f85](https://github.com/typegoose/typegoose/commit/93e3f8507bfdf1c47feefc8f1da9c5ca1b47400e))
* **eslint:** upgrade to 8.51.0 ([5313ded](https://github.com/typegoose/typegoose/commit/5313dede47917453e4339f9ab31ee66027b25fc7))
* **jest:** upgrade to 29.7.0 ([13d92f7](https://github.com/typegoose/typegoose/commit/13d92f7c6f8c16ae5ecd9beb0163382bbfa6ce81))
* **mongodb-memory-server:** upgrade to 9.0.0 ([88df9ab](https://github.com/typegoose/typegoose/commit/88df9ab77a317231171ac647b8bf80e736049804))
* **prettier:** upgrade to 3.0.3 ([7c198cd](https://github.com/typegoose/typegoose/commit/7c198cdf36b2c6c2e63db2b29c8ba9297185335a))
* **rimraf:** upgrade to 5.0.5 ([b72f5c6](https://github.com/typegoose/typegoose/commit/b72f5c624829e4d8244a61a6c3af79e9d7f15eda))

## [11.5.0](https://github.com/typegoose/typegoose/compare/v11.4.1...v11.5.0) (2023-09-01)


### Dependencies

* **@types/jest:** upgrade to 29.5.4 ([ab2ab5e](https://github.com/typegoose/typegoose/commit/ab2ab5e9abb2e1132a3ea6976a1b7b4d84c16bf8))
* **@types/lodash:** upgrade to 4.14.197 ([27e1ce1](https://github.com/typegoose/typegoose/commit/27e1ce17ab5841000bc293cc74742574ed12474d))
* **@types/semver:** upgrade to 7.5.1 ([84aa0f2](https://github.com/typegoose/typegoose/commit/84aa0f2f806c6fc2062b1c83b0939ae70488512f))
* **commitlint:** upgrade to 17.7.1 ([ae0c1f6](https://github.com/typegoose/typegoose/commit/ae0c1f6650e08267de0f5fbee7621e12616191fd))
* **eslint:** upgrade to 8.48.0 ([03efd47](https://github.com/typegoose/typegoose/commit/03efd47ad7aedcb877bafc8655db68472aa50b60))
* **jest:** upgrade to 29.6.4 ([51d5112](https://github.com/typegoose/typegoose/commit/51d51120129b878e18aa85e8fa5a413de44499ae))
* **mongodb-memory-server:** upgrade to 8.15.1 ([4501d7e](https://github.com/typegoose/typegoose/commit/4501d7e3b0520dda41a7650201cbfe19cdadd3dd))
* **mongoose:** upgrade to 7.5.0 ([9a59535](https://github.com/typegoose/typegoose/commit/9a59535868ff87c397958bb027286e9fa70d410e))
* **tslib:** upgrade to 2.6.2 ([0e839ff](https://github.com/typegoose/typegoose/commit/0e839ff9183f5d2b3cf661dfb8f8b5c4fbe73757))

## [10.5.0](https://github.com/typegoose/typegoose/compare/v10.4.0...v10.5.0) (2023-09-01)


### Dependencies

* **@types/jest:** upgrade to 29.5.4 ([9ba93c1](https://github.com/typegoose/typegoose/commit/9ba93c1ad9b35c6409ff157a16af1647ab252db0))
* **@types/lodash:** upgrade to 4.14.197 ([70c77e6](https://github.com/typegoose/typegoose/commit/70c77e6b8192f1236a870123e29001a274e91581))
* **@types/semver:** upgrade to 7.5.1 ([96824e8](https://github.com/typegoose/typegoose/commit/96824e871eb0ab07b1d7ebe6fdb83a5195c6ce64))
* **@typescript-eslint/*:** upgrade to 5.62.0 ([00f3265](https://github.com/typegoose/typegoose/commit/00f3265345d5d317cc42e3700dd84d8e75f191d1))
* **commitlint:** upgrade to 17.7.1 ([85d2c31](https://github.com/typegoose/typegoose/commit/85d2c3135f6361d5f06e16392692c3883965bc73))
* **eslint-config-prettier:** upgrade to 8.10.0 ([1b3b2af](https://github.com/typegoose/typegoose/commit/1b3b2afaf215eeaa1c761b20fb5053cbcac5063f))
* **eslint:** upgrade to 8.48.0 ([9b16f59](https://github.com/typegoose/typegoose/commit/9b16f59bffdfa260b47695d680ae817db9fb2d79))
* **jest:** upgrade to 29.6.4 ([bc52aff](https://github.com/typegoose/typegoose/commit/bc52aff0cfded132d95b1ca537579b1a8410d847))
* **mongodb-memory-server:** upgrade to 8.15.1 ([1f3ee1b](https://github.com/typegoose/typegoose/commit/1f3ee1b99b3fac7cdcee2fbb556019be8dc15480))
* **mongoose:** upgrade to 6.12.0 ([0f11694](https://github.com/typegoose/typegoose/commit/0f116948bb6cf90ef125b89b6bf0cb176f471abb))
* **semver:** upgrade to 7.5.4 ([ec121a9](https://github.com/typegoose/typegoose/commit/ec121a97736647d1b60caed7aefba7ca7c55eeda))
* **ts-jest:** upgrade to 29.1.1 ([52a35f2](https://github.com/typegoose/typegoose/commit/52a35f261522ef9553037b0673867312ab520122))
* **tslib:** upgrade to 2.6.2 ([3c5fd4b](https://github.com/typegoose/typegoose/commit/3c5fd4b1145e4551bb7fd475bc444a7086b080ed))

## [11.4.1](https://github.com/typegoose/typegoose/compare/v11.4.0...v11.4.1) (2023-08-02)


### Fixes

* **types::QueryHelperThis:** use InstanceType<T> instead of T ([b9cf61f](https://github.com/typegoose/typegoose/commit/b9cf61fd334073126ebbaa478e8822d44d31badf))

## [11.4.0](https://github.com/typegoose/typegoose/compare/v11.3.0...v11.4.0) (2023-07-19)


### Dependencies

* **@types/jest:** upgrade to 29.5.3 ([f9dec27](https://github.com/typegoose/typegoose/commit/f9dec275a11db21e5bb518fa3628a7529dc0ea0b))
* **commitlint:** upgrade to 17.6.7 ([c211481](https://github.com/typegoose/typegoose/commit/c211481b9c530065a44df062de82eff63c879512))
* **eslint:** upgrade to 8.45.0 ([7c119d4](https://github.com/typegoose/typegoose/commit/7c119d4969959f8441a4d43c38c78f7cd8f8d967))
* **jest:** upgrade to 29.6.1 ([171f22d](https://github.com/typegoose/typegoose/commit/171f22ddc77d80d3030ebddda44f07857cc22f61))
* **lint-staged:** upgrade to 13.2.3 ([0951c02](https://github.com/typegoose/typegoose/commit/0951c023a366068bad930f52ed339dff80cf1dc4))
* **mongoose:** upgrade to 7.4.0 ([6ee5ace](https://github.com/typegoose/typegoose/commit/6ee5ace6a4a2f1c5f002a17d49a3b50ba3860b61))
* **semver:** upgrade to 7.5.4 ([962f6b9](https://github.com/typegoose/typegoose/commit/962f6b9cb6def54d45c4f5802361498481f1e7e7))
* **ts-jest:** upgrade to 29.1.1 ([9a1eff8](https://github.com/typegoose/typegoose/commit/9a1eff869ed62fba200f0fef5c8a51682288acf2))
* **tslib:** upgrade to 2.6.0 ([ad83bc1](https://github.com/typegoose/typegoose/commit/ad83bc1af1c8c5547cca66caee5a498e36de7323))

## [11.3.0](https://github.com/typegoose/typegoose/compare/v11.2.0...v11.3.0) (2023-06-17)


### Style

* **website/fetch_versions:** disable eslint rule for function ([187a7f1](https://github.com/typegoose/typegoose/commit/187a7f17dcee0d49945635fd6c34020fcd48d25e))


### Dependencies

* **@semantic-release/github:** upgrade to 8.1.0 ([55a64d9](https://github.com/typegoose/typegoose/commit/55a64d9086d0ad6999a43def10241e9d824795c3))
* **@types/jest:** upgrade to 29.5.2 ([ced9aee](https://github.com/typegoose/typegoose/commit/ced9aee92768cd361b10919c490af4e0d42034c6))
* **@types/lodash:** upgrade to 4.14.195 ([c5c57fd](https://github.com/typegoose/typegoose/commit/c5c57fd7ea400545facd2f23a479d99ac70c47f9))
* **@types/node:** upgrade to 14.18.48 ([ec31169](https://github.com/typegoose/typegoose/commit/ec31169d9ba01a0fadd9f701b1ceb7f2cd67cdfe))
* **@types/node:** upgrade to 14.18.51 ([79ff1cc](https://github.com/typegoose/typegoose/commit/79ff1ccbbeebbc026cf6f83afc94c93cf4b8ceec))
* **@typescript-eslint/*:** upgrade to 5.59.11 ([13947d4](https://github.com/typegoose/typegoose/commit/13947d445339173b33e5bb025100624276b92c5e))
* **@typescript-eslint/*:** upgrade to 5.59.8 ([39db711](https://github.com/typegoose/typegoose/commit/39db7117f21a635555e9209779531b803993621f))
* **commitlint:** upgrade to 17.6.5 ([d94e87f](https://github.com/typegoose/typegoose/commit/d94e87fe7144cd2e30f10774a636c51115ca42a1))
* **eslint:** upgrade to 8.42.0 ([476375e](https://github.com/typegoose/typegoose/commit/476375e2f0fc6d3526b35f1ecb97ec689d5cc1b2))
* **eslint:** upgrade to 8.43.0 ([25ac895](https://github.com/typegoose/typegoose/commit/25ac8955276fe04e7bf9a8cc7a5824b47e34d902))
* **mongodb-memory-server:** upgrade to 8.13.0 ([55c501f](https://github.com/typegoose/typegoose/commit/55c501fe7480a45b8e01da7466e732b7c46cb7d1))
* **mongoose:** upgrade to 7.2.3 ([e0374bd](https://github.com/typegoose/typegoose/commit/e0374bd422ece10393860247b50c5b6ba8ce7b3a)), closes [typegoose/typegoose#846](https://github.com/typegoose/typegoose/issues/846)
* **mongoose:** upgrade to 7.3.0 ([e78ce78](https://github.com/typegoose/typegoose/commit/e78ce780abc269cefb895702c6813247c9f2b017))
* **rimraf:** upgrade to 5.0.1 ([227bc3c](https://github.com/typegoose/typegoose/commit/227bc3c0bb9d11201f75b85087ca8cd48f7a914f))
* **semver:** upgrade to 7.5.2 ([84934a0](https://github.com/typegoose/typegoose/commit/84934a06ea9c8162963e4fc23e0dbcb9aadd7bc1))
* **tslib:** upgrade to 2.5.3 ([1fcdc17](https://github.com/typegoose/typegoose/commit/1fcdc17b9a30e53465bec2d5254f694dee5f5878))

## [11.3.0-beta.3](https://github.com/typegoose/typegoose/compare/v11.3.0-beta.2...v11.3.0-beta.3) (2023-06-17)


### Dependencies

* **@types/node:** upgrade to 14.18.51 ([79ff1cc](https://github.com/typegoose/typegoose/commit/79ff1ccbbeebbc026cf6f83afc94c93cf4b8ceec))
* **eslint:** upgrade to 8.43.0 ([25ac895](https://github.com/typegoose/typegoose/commit/25ac8955276fe04e7bf9a8cc7a5824b47e34d902))
* **rimraf:** upgrade to 5.0.1 ([227bc3c](https://github.com/typegoose/typegoose/commit/227bc3c0bb9d11201f75b85087ca8cd48f7a914f))

## [11.3.0-beta.2](https://github.com/typegoose/typegoose/compare/v11.3.0-beta.1...v11.3.0-beta.2) (2023-06-16)


### Style

* **website/fetch_versions:** disable eslint rule for function ([187a7f1](https://github.com/typegoose/typegoose/commit/187a7f17dcee0d49945635fd6c34020fcd48d25e))

## [11.3.0-beta.1](https://github.com/typegoose/typegoose/compare/v11.2.0...v11.3.0-beta.1) (2023-06-16)


### Dependencies

* **@semantic-release/github:** upgrade to 8.1.0 ([55a64d9](https://github.com/typegoose/typegoose/commit/55a64d9086d0ad6999a43def10241e9d824795c3))
* **@types/jest:** upgrade to 29.5.2 ([ced9aee](https://github.com/typegoose/typegoose/commit/ced9aee92768cd361b10919c490af4e0d42034c6))
* **@types/lodash:** upgrade to 4.14.195 ([c5c57fd](https://github.com/typegoose/typegoose/commit/c5c57fd7ea400545facd2f23a479d99ac70c47f9))
* **@types/node:** upgrade to 14.18.48 ([ec31169](https://github.com/typegoose/typegoose/commit/ec31169d9ba01a0fadd9f701b1ceb7f2cd67cdfe))
* **@typescript-eslint/*:** upgrade to 5.59.11 ([13947d4](https://github.com/typegoose/typegoose/commit/13947d445339173b33e5bb025100624276b92c5e))
* **@typescript-eslint/*:** upgrade to 5.59.8 ([39db711](https://github.com/typegoose/typegoose/commit/39db7117f21a635555e9209779531b803993621f))
* **commitlint:** upgrade to 17.6.5 ([d94e87f](https://github.com/typegoose/typegoose/commit/d94e87fe7144cd2e30f10774a636c51115ca42a1))
* **eslint:** upgrade to 8.42.0 ([476375e](https://github.com/typegoose/typegoose/commit/476375e2f0fc6d3526b35f1ecb97ec689d5cc1b2))
* **mongodb-memory-server:** upgrade to 8.13.0 ([55c501f](https://github.com/typegoose/typegoose/commit/55c501fe7480a45b8e01da7466e732b7c46cb7d1))
* **mongoose:** upgrade to 7.2.3 ([e0374bd](https://github.com/typegoose/typegoose/commit/e0374bd422ece10393860247b50c5b6ba8ce7b3a)), closes [typegoose/typegoose#846](https://github.com/typegoose/typegoose/issues/846)
* **mongoose:** upgrade to 7.3.0 ([e78ce78](https://github.com/typegoose/typegoose/commit/e78ce780abc269cefb895702c6813247c9f2b017))
* **semver:** upgrade to 7.5.2 ([84934a0](https://github.com/typegoose/typegoose/commit/84934a06ea9c8162963e4fc23e0dbcb9aadd7bc1))
* **tslib:** upgrade to 2.5.3 ([1fcdc17](https://github.com/typegoose/typegoose/commit/1fcdc17b9a30e53465bec2d5254f694dee5f5878))

## [11.2.0](https://github.com/typegoose/typegoose/compare/v11.1.0...v11.2.0) (2023-05-20)


### Features

* support "enum" being a deferred function ([3b754f0](https://github.com/typegoose/typegoose/commit/3b754f0a18a3d1d1c5549d29d50542faf9153a5f))


### Reverts

* Revert "dependencies(@types/node): upgrade to 16.11.7" ([90c5fde](https://github.com/typegoose/typegoose/commit/90c5fde4f1f3addeb7843f4cc88a1fab76ca7cfd))


### Fixes

* allow usage and translation of "enum: { values: Type }" ([3ca1d5f](https://github.com/typegoose/typegoose/commit/3ca1d5fe04cd19f16b4f19e9ea16310bcb640466))


### Dependencies

* **@types/lodash:** upgrade to 4.14.192 ([b9ec3fe](https://github.com/typegoose/typegoose/commit/b9ec3fe22f7f9e5bf47b6629f0e973c3904eb012))
* **@types/node:** upgrade to 14.18.45 ([502436a](https://github.com/typegoose/typegoose/commit/502436a43ff20ab675cf6d876693526cc7ce2241))
* **@types/semver:** upgrade to 7.5.0 ([162d0a6](https://github.com/typegoose/typegoose/commit/162d0a6daa66c8f6ae8817c60e5b3a155a535381))
* **@typescript-eslint/*:** upgrade to 5.57.0 ([ed40301](https://github.com/typegoose/typegoose/commit/ed40301d69cb0fa6dbd50bb2102561575e7445a4))
* **@typescript-eslint/*:** upgrade to 5.59.6 ([b4c7760](https://github.com/typegoose/typegoose/commit/b4c776027d42860eeb34a7ca2ac59d909b91fd54))
* **commitlint:** upgrade to 17.5.1 ([1a3db22](https://github.com/typegoose/typegoose/commit/1a3db22e1e33fdce7d36ea9f06dfde26d740d7c0))
* **commitlint:** upgrade to 17.6.3 ([4181605](https://github.com/typegoose/typegoose/commit/41816058272e15dc26ce5d4a62c5b087e0ed1ee9))
* **eslint:** upgrade to 8.37.0 ([62cac9f](https://github.com/typegoose/typegoose/commit/62cac9f8eef2d85a996b529063d4ebb8273d2f05))
* **eslint:** upgrade to 8.41.0 ([e2f55d7](https://github.com/typegoose/typegoose/commit/e2f55d76c9c3ceb721faa30142fca777330122ae))
* **mongoose:** upgrade to 7.2.0 ([c53fa61](https://github.com/typegoose/typegoose/commit/c53fa61324485d9d952ae18c87bd1fff1331ee79))
* **semver:** upgrade to 7.5.1 ([0b929d2](https://github.com/typegoose/typegoose/commit/0b929d247dc442f410470d3a271ce710d666eefe))
* **tslib:** upgrade to 2.5.2 ([1c9b9cb](https://github.com/typegoose/typegoose/commit/1c9b9cb2049e73a19778f908c588196cf4801f50))


## [11.2.0-beta.2](https://github.com/typegoose/typegoose/compare/v11.2.0-beta.1...v11.2.0-beta.2) (2023-05-20)


### Dependencies

* **@types/semver:** upgrade to 7.5.0 ([162d0a6](https://github.com/typegoose/typegoose/commit/162d0a6daa66c8f6ae8817c60e5b3a155a535381))
* **@typescript-eslint/*:** upgrade to 5.59.6 ([b4c7760](https://github.com/typegoose/typegoose/commit/b4c776027d42860eeb34a7ca2ac59d909b91fd54))
* **commitlint:** upgrade to 17.6.3 ([4181605](https://github.com/typegoose/typegoose/commit/41816058272e15dc26ce5d4a62c5b087e0ed1ee9))
* **eslint:** upgrade to 8.41.0 ([e2f55d7](https://github.com/typegoose/typegoose/commit/e2f55d76c9c3ceb721faa30142fca777330122ae))
* **mongoose:** upgrade to 7.2.0 ([c53fa61](https://github.com/typegoose/typegoose/commit/c53fa61324485d9d952ae18c87bd1fff1331ee79))
* **semver:** upgrade to 7.5.1 ([0b929d2](https://github.com/typegoose/typegoose/commit/0b929d247dc442f410470d3a271ce710d666eefe))
* **tslib:** upgrade to 2.5.2 ([1c9b9cb](https://github.com/typegoose/typegoose/commit/1c9b9cb2049e73a19778f908c588196cf4801f50))

## [11.2.0-beta.1](https://github.com/typegoose/typegoose/compare/v11.1.0...v11.2.0-beta.1) (2023-05-08)


### Features

* support "enum" being a deferred function ([3b754f0](https://github.com/typegoose/typegoose/commit/3b754f0a18a3d1d1c5549d29d50542faf9153a5f))


### Reverts

* Revert "dependencies(@types/node): upgrade to 16.11.7" ([90c5fde](https://github.com/typegoose/typegoose/commit/90c5fde4f1f3addeb7843f4cc88a1fab76ca7cfd))


### Fixes

* allow usage and translation of "enum: { values: Type }" ([3ca1d5f](https://github.com/typegoose/typegoose/commit/3ca1d5fe04cd19f16b4f19e9ea16310bcb640466))


### Dependencies

* **@types/lodash:** upgrade to 4.14.192 ([b9ec3fe](https://github.com/typegoose/typegoose/commit/b9ec3fe22f7f9e5bf47b6629f0e973c3904eb012))
* **@types/node:** upgrade to 14.18.45 ([502436a](https://github.com/typegoose/typegoose/commit/502436a43ff20ab675cf6d876693526cc7ce2241))
* **@typescript-eslint/*:** upgrade to 5.57.0 ([ed40301](https://github.com/typegoose/typegoose/commit/ed40301d69cb0fa6dbd50bb2102561575e7445a4))
* **commitlint:** upgrade to 17.5.1 ([1a3db22](https://github.com/typegoose/typegoose/commit/1a3db22e1e33fdce7d36ea9f06dfde26d740d7c0))
* **eslint:** upgrade to 8.37.0 ([62cac9f](https://github.com/typegoose/typegoose/commit/62cac9f8eef2d85a996b529063d4ebb8273d2f05))

## [10.4.0](https://github.com/typegoose/typegoose/compare/v10.3.4...v10.4.0) (2023-05-02)


### Dependencies

* **@semantic-release/changelog:** upgrade to 6.0.3 ([07ef745](https://github.com/typegoose/typegoose/commit/07ef745abaa250a04ed81973bd52902938bd9090))
* **@types/jest:** upgrade to 29.5.1 ([32926b1](https://github.com/typegoose/typegoose/commit/32926b1fa6a52b48c3c67d19a04c875ae85e9f5e))
* **@types/lodash:** upgrade to 4.14.194 ([74e3e30](https://github.com/typegoose/typegoose/commit/74e3e30b43b22521541d3c035da521c01f7325f9))
* **@typescript-eslint/*:** upgrade to 5.59.2 ([799fcf6](https://github.com/typegoose/typegoose/commit/799fcf64750eeb5f1b0f38d581680b9c00c3f6f1))
* **commitlint:** upgrade to 17.6.1 ([6242a75](https://github.com/typegoose/typegoose/commit/6242a7514ed9c93cb84f70d8e61d168d1bad7450))
* **eslint-config-prettier:** upgrade to 8.8.0 ([de27921](https://github.com/typegoose/typegoose/commit/de27921037374751d08ae87ba2f0c90e9988f1be))
* **eslint:** upgrade to 8.39.0 ([cb6000a](https://github.com/typegoose/typegoose/commit/cb6000ae9acc98605b7ec379c32316222b20bd61))
* **jest:** upgrade to 29.5.0 ([e2512c9](https://github.com/typegoose/typegoose/commit/e2512c9a8db757ce3be413cd88c813093721d21c))
* **lint-staged:** upgrade to 13.2.2 ([380cb76](https://github.com/typegoose/typegoose/commit/380cb767ecbfed107b7cd833e5ebfe1e1fcdb2ef))
* **mongodb-memory-server:** upgrade to 8.12.2 ([950fa0b](https://github.com/typegoose/typegoose/commit/950fa0ba9463e08e9b8bc756d09936615ed39223))
* **mongoose:** upgrade to 6.11.0 ([a392262](https://github.com/typegoose/typegoose/commit/a392262c9b46875b09647d6d5c7b9ceeaa37a85b))
* **prettier:** upgrade to 2.8.8 ([354be24](https://github.com/typegoose/typegoose/commit/354be2440e68bce436daf84995e41e03b522939e))
* **semver:** upgrade to 7.5.0 ([e57bd3b](https://github.com/typegoose/typegoose/commit/e57bd3b204d41d8ba3d445367c1a64d5d8f0d038))
* **ts-jest:** upgrade to 29.1.0 ([cfb66bd](https://github.com/typegoose/typegoose/commit/cfb66bd3ecf740b07f6300a7ff30db817b326b2a))


### Style

* **test::model::typeguards:** add comments noting that a type is meant to be ([269cf7f](https://github.com/typegoose/typegoose/commit/269cf7f96ba0d3b1d24fefaf0520366cb46fb67e))


### Fixes

* consistently merge ModelOptions with "getMergedModelOptions" ([cdbb70e](https://github.com/typegoose/typegoose/commit/cdbb70e94df36be76eec94657d59aba63d9097d4)), closes [typegoose/typegoose#827](https://github.com/typegoose/typegoose/issues/827)
* **utils:** add function to consistently merge ModelOptions ([42e86f3](https://github.com/typegoose/typegoose/commit/42e86f3bc1f932d19d7384868c25c770ed4d1863))


## [11.1.0](https://github.com/typegoose/typegoose/compare/v11.0.3...v11.1.0) (2023-04-29)

Note: when updating to this version, `@types/node@16` is required (instead of the previous `@14`)

### Dependencies

* **@types/jest:** upgrade to 29.5.1 ([16000b5](https://github.com/typegoose/typegoose/commit/16000b5439546ff1e092c2df32a444c37da8c907))
* **@types/lodash:** upgrade to 4.14.194 ([19dda46](https://github.com/typegoose/typegoose/commit/19dda46396d2dc873d1208913e38be6e77e257a1))
* **@types/node:** upgrade to 16.11.7 ([d2739b9](https://github.com/typegoose/typegoose/commit/d2739b981272510a76709921ae5c71904bc9ada5))
* **@typescript-eslint/*:** upgrade to 5.59.1 ([0b5ed3a](https://github.com/typegoose/typegoose/commit/0b5ed3a1a294a58693336e216240562a7bb6bc88))
* **commitlint:** upgrade to 17.6.1 ([19b9ffd](https://github.com/typegoose/typegoose/commit/19b9ffd38b4da2359d231be8532d2f925fa6c948))
* **eslint:** upgrade to 8.39.0 ([ca7d21e](https://github.com/typegoose/typegoose/commit/ca7d21e2c9c53ca1f450c2bdf30180d28911d8ad))
* **lint-staged:** upgrade to 13.2.2 ([056eb2c](https://github.com/typegoose/typegoose/commit/056eb2c531b02a53cdbe5bea62e56ed991cf3fcc))
* **mongodb-memory-server:** upgrade to 8.12.2 ([dd03def](https://github.com/typegoose/typegoose/commit/dd03def3228ed0fd6ecc52040fe066050ea7aa4e))
* **mongoose:** upgrade to 7.1.0 ([017b7a1](https://github.com/typegoose/typegoose/commit/017b7a1dfc8b243912cca120e5bddb21b1550da2))
* **prettier:** upgrade to 2.8.8 ([e84fd4e](https://github.com/typegoose/typegoose/commit/e84fd4e3473d89c4e037c33cbbf7cf3a12898ce0))
* **semver:** upgrade to 7.5.0 ([9c09ed6](https://github.com/typegoose/typegoose/commit/9c09ed6e4121ad28d71739a5120b694056b06f17))
* **ts-jest:** upgrade to 29.1.0 ([69be082](https://github.com/typegoose/typegoose/commit/69be082474d24b2344ffb03c737dd14b78cbc682))

## [11.0.3](https://github.com/typegoose/typegoose/compare/v11.0.2...v11.0.3) (2023-04-27)


### Fixes

* consistently merge ModelOptions with "getMergedModelOptions" ([5fec7e0](https://github.com/typegoose/typegoose/commit/5fec7e06678e13009a167ba7b812071cba8879c6)), closes [typegoose/typegoose#827](https://github.com/typegoose/typegoose/issues/827)
* **utils:** add function to consistently merge ModelOptions ([e8c9203](https://github.com/typegoose/typegoose/commit/e8c92039f94104b5193fb2bc717b2cf6b6aa35bc))

## [11.0.2](https://github.com/typegoose/typegoose/compare/v11.0.1...v11.0.2) (2023-04-19)


### Fixes

* **types:** add helper type "FilterOutFunctionKeys" ([ce91f29](https://github.com/typegoose/typegoose/commit/ce91f29fba25f04e19f3be2b5033f86ec00d94dd))

## [11.0.1](https://github.com/typegoose/typegoose/compare/v11.0.0...v11.0.1) (2023-04-15)


### Fixes

* **typegoose::getDiscriminatorModelForClass:** fix "from" type for models with different _id type ([fb752fc](https://github.com/typegoose/typegoose/commit/fb752fc77d5763bccade2d0a8cdd45f8fdad6631))

## [11.0.0](https://github.com/typegoose/typegoose/compare/v10.3.4...v11.0.0) (2023-03-27)


### ⚠ BREAKING CHANGES

* **mongoose:** mongoose 7.0.0 is now in use
* Default-Class "FindOrCreate" (and type "FindOrCreateResult") has been removed, because mongoose-findorcreate is not compatible with mongoose 7.0

### Features

* remove usage and references to "mongoose-findorcreate" ([6de3aa9](https://github.com/typegoose/typegoose/commit/6de3aa9c034a52891ef47bf378bedfc010746d08))


### Fixes

* update types and type-tests for mongoose 7.0 ([b3df459](https://github.com/typegoose/typegoose/commit/b3df45987778e66aea1a6a4ec1d90c0611b133d3))


### Style

* **hooks:** update version notice ([02fc3bb](https://github.com/typegoose/typegoose/commit/02fc3bb107cee724cf95c61e958266387ff034d2))
* **test::model::typeguards:** add comments noting that a type is meant to be ([6aa8f17](https://github.com/typegoose/typegoose/commit/6aa8f17c6b967d1d8b4cd9885c997cd7fa54430a))


### Dependencies

* **@semantic-release/changelog:** upgrade to 6.0.3 ([3196d08](https://github.com/typegoose/typegoose/commit/3196d08959d267c3bd3e31be6b572fab3afd03e1))
* **@types/jest:** upgrade to 29.5.0 ([a2aeefb](https://github.com/typegoose/typegoose/commit/a2aeefb7d87ded392488040627a3646e86db6b3b))
* **@typescript-eslint/*:** upgrade to 5.55.0 ([40d882f](https://github.com/typegoose/typegoose/commit/40d882f9c151d6f1aa80d43de201561f3911f166))
* **@typescript-eslint/*:** upgrade to 5.56.0 ([0116947](https://github.com/typegoose/typegoose/commit/01169476119886f61a5cf771f3301f0d02ab73bd))
* **commitlint:** upgrade to 17.5.0 ([d7986a1](https://github.com/typegoose/typegoose/commit/d7986a1ce5faca88d6131f0f34a9666ef1cda875))
* **eslint-config-prettier:** upgrade to 8.7.0 ([9394fcf](https://github.com/typegoose/typegoose/commit/9394fcf5b3253d46809af4ef15691d08480ad22d))
* **eslint-config-prettier:** upgrade to 8.8.0 ([25bfc89](https://github.com/typegoose/typegoose/commit/25bfc89f90b9d900ed182775c1807393f61d634a))
* **eslint:** upgrade to 8.36.0 ([4b1db7a](https://github.com/typegoose/typegoose/commit/4b1db7a11766ef305c48f3c6e20ba044b4edef65))
* **jest:** upgrade to 29.5.0 ([50491f0](https://github.com/typegoose/typegoose/commit/50491f0a6c480bd007fc57c45ef79bf430ed9161))
* **lint-staged:** upgrade to 13.2.0 ([4417d74](https://github.com/typegoose/typegoose/commit/4417d748a33dea03c55d59ba5eba81f7034ee0e5))
* **mongodb-memory-server:** upgrade to 9.12.1 ([fd2874b](https://github.com/typegoose/typegoose/commit/fd2874bc01e0bd03a6fa5c16d4cb572be308cc70))
* **mongoose:** upgrade to 7.0.0 ([0e06ec9](https://github.com/typegoose/typegoose/commit/0e06ec97d18e099026597e2a31d3ca15fbe388e7))
* **mongoose:** upgrade to 7.0.2 ([bedb61d](https://github.com/typegoose/typegoose/commit/bedb61d5c2bdcfd37b5dde8b7a4b9426c4099587))
* **mongoose:** upgrade to 7.0.3 ([8e964ea](https://github.com/typegoose/typegoose/commit/8e964ea28d63d392db2222e88e2d32afd02c0257))
* **prettier:** upgrade to 2.8.7 ([c72bd0c](https://github.com/typegoose/typegoose/commit/c72bd0ce654b530cc8cab5791ac9daf91965c7d2))
* **rimraf:** upgrade to 4.1.2 ([88181b6](https://github.com/typegoose/typegoose/commit/88181b64b7c27b3dc9fa867c6996d2fc15c8cec6))
* **rimraf:** upgrade to 4.4.0 ([3395239](https://github.com/typegoose/typegoose/commit/33952398cfa8074d3f57dff86ad3649ece3c7566))
* **rimraf:** upgrade to 4.4.1 ([f23b668](https://github.com/typegoose/typegoose/commit/f23b6689647650bad26b5aa2c9d736e416c549fd))

## [11.0.0-beta.3](https://github.com/typegoose/typegoose/compare/v11.0.0-beta.2...v11.0.0-beta.3) (2023-03-27)


### Style

* **types:** fix minor grammar mistakes ([#803](https://github.com/typegoose/typegoose/issues/803)) ([6bd97ae](https://github.com/typegoose/typegoose/commit/6bd97ae87c9e39d1538e0f3be465eba69d535cc4))


### Dependencies

* **@semantic-release/changelog:** upgrade to 6.0.3 ([3196d08](https://github.com/typegoose/typegoose/commit/3196d08959d267c3bd3e31be6b572fab3afd03e1))
* **@typescript-eslint/*:** upgrade to 5.56.0 ([0116947](https://github.com/typegoose/typegoose/commit/01169476119886f61a5cf771f3301f0d02ab73bd))
* **commitlint:** upgrade to 17.5.0 ([d7986a1](https://github.com/typegoose/typegoose/commit/d7986a1ce5faca88d6131f0f34a9666ef1cda875))
* **eslint-config-prettier:** upgrade to 8.8.0 ([25bfc89](https://github.com/typegoose/typegoose/commit/25bfc89f90b9d900ed182775c1807393f61d634a))
* **mongoose:** upgrade to 7.0.3 ([8e964ea](https://github.com/typegoose/typegoose/commit/8e964ea28d63d392db2222e88e2d32afd02c0257))
* **prettier:** upgrade to 2.8.7 ([c72bd0c](https://github.com/typegoose/typegoose/commit/c72bd0ce654b530cc8cab5791ac9daf91965c7d2))
* **rimraf:** upgrade to 4.4.1 ([f23b668](https://github.com/typegoose/typegoose/commit/f23b6689647650bad26b5aa2c9d736e416c549fd))

## [11.0.0-beta.2](https://github.com/typegoose/typegoose/compare/v11.0.0-beta.1...v11.0.0-beta.2) (2023-03-19)


### Fixes

* **errors:** update E004 message and example ([c777def](https://github.com/typegoose/typegoose/commit/c777def88e92281b71db899023c5eb0a9b3b3e94))
* **globalOptions:** another fix to check for "process" being undefined ([5d81464](https://github.com/typegoose/typegoose/commit/5d8146465b6ef0e363b958ffdb8d8637e71723d2))
* **typegoose:** fix "process" variable checking for being undefined on browser ([39743e2](https://github.com/typegoose/typegoose/commit/39743e20a5a065a1f5ee76d3a9b8d2905658d059))


### Dependencies

* **@types/jest:** upgrade to 29.5.0 ([a2aeefb](https://github.com/typegoose/typegoose/commit/a2aeefb7d87ded392488040627a3646e86db6b3b))
* **@typescript-eslint/*:** upgrade to 5.55.0 ([40d882f](https://github.com/typegoose/typegoose/commit/40d882f9c151d6f1aa80d43de201561f3911f166))
* **eslint-config-prettier:** upgrade to 8.7.0 ([9394fcf](https://github.com/typegoose/typegoose/commit/9394fcf5b3253d46809af4ef15691d08480ad22d))
* **eslint:** upgrade to 8.36.0 ([4b1db7a](https://github.com/typegoose/typegoose/commit/4b1db7a11766ef305c48f3c6e20ba044b4edef65))
* **jest:** upgrade to 29.5.0 ([50491f0](https://github.com/typegoose/typegoose/commit/50491f0a6c480bd007fc57c45ef79bf430ed9161))
* **lint-staged:** upgrade to 13.2.0 ([4417d74](https://github.com/typegoose/typegoose/commit/4417d748a33dea03c55d59ba5eba81f7034ee0e5))
* **mongodb-memory-server:** upgrade to 9.12.1 ([fd2874b](https://github.com/typegoose/typegoose/commit/fd2874bc01e0bd03a6fa5c16d4cb572be308cc70))
* **mongoose:** upgrade to 7.0.2 ([bedb61d](https://github.com/typegoose/typegoose/commit/bedb61d5c2bdcfd37b5dde8b7a4b9426c4099587))
* **rimraf:** upgrade to 4.4.0 ([3395239](https://github.com/typegoose/typegoose/commit/33952398cfa8074d3f57dff86ad3649ece3c7566))

## [11.0.0-beta.1](https://github.com/typegoose/typegoose/compare/v10.3.0...v11.0.0-beta.1) (2023-03-03)


### ⚠ BREAKING CHANGES

* **mongoose:** mongoose 7.0.0 is now in use
* Default-Class "FindOrCreate" (and type "FindOrCreateResult") has been removed, because mongoose-findorcreate is not compatible with mongoose 7.0

### Features

* remove usage and references to "mongoose-findorcreate" ([6de3aa9](https://github.com/typegoose/typegoose/commit/6de3aa9c034a52891ef47bf378bedfc010746d08))


### Dependencies

* **mongoose:** upgrade to 7.0.0 ([0e06ec9](https://github.com/typegoose/typegoose/commit/0e06ec97d18e099026597e2a31d3ca15fbe388e7))
* **rimraf:** upgrade to 4.1.2 ([88181b6](https://github.com/typegoose/typegoose/commit/88181b64b7c27b3dc9fa867c6996d2fc15c8cec6))


### Fixes

* update types and type-tests for mongoose 7.0 ([b3df459](https://github.com/typegoose/typegoose/commit/b3df45987778e66aea1a6a4ec1d90c0611b133d3))


### Style

* **hooks:** update version notice ([02fc3bb](https://github.com/typegoose/typegoose/commit/02fc3bb107cee724cf95c61e958266387ff034d2))
* **test::model::typeguards:** add comments noting that a type is meant to be ([6aa8f17](https://github.com/typegoose/typegoose/commit/6aa8f17c6b967d1d8b4cd9885c997cd7fa54430a))

## [10.3.4](https://github.com/typegoose/typegoose/compare/v10.3.3...v10.3.4) (2023-03-23)


### Style

* **types:** fix minor grammar mistakes ([#803](https://github.com/typegoose/typegoose/issues/803)) ([6bd97ae](https://github.com/typegoose/typegoose/commit/6bd97ae87c9e39d1538e0f3be465eba69d535cc4))

## [10.3.3](https://github.com/typegoose/typegoose/compare/v10.3.2...v10.3.3) (2023-03-18)


### Fixes

* **errors:** update E004 message and example ([c777def](https://github.com/typegoose/typegoose/commit/c777def88e92281b71db899023c5eb0a9b3b3e94))

## [10.3.2](https://github.com/typegoose/typegoose/compare/v10.3.1...v10.3.2) (2023-03-13)


### Fixes

* **globalOptions:** another fix to check for "process" being undefined ([5d81464](https://github.com/typegoose/typegoose/commit/5d8146465b6ef0e363b958ffdb8d8637e71723d2))

## [10.3.1](https://github.com/typegoose/typegoose/compare/v10.3.0...v10.3.1) (2023-03-13)


### Fixes

* **typegoose:** fix "process" variable checking for being undefined on browser ([39743e2](https://github.com/typegoose/typegoose/commit/39743e20a5a065a1f5ee76d3a9b8d2905658d059))

## [10.3.0](https://github.com/typegoose/typegoose/compare/v10.2.0...v10.3.0) (2023-02-28)


### Features

* add a way to disable caching ([2528601](https://github.com/typegoose/typegoose/commit/2528601529fd63efceda932809a8edabd128bd92)), closes [typegoose/typegoose#789](https://github.com/typegoose/typegoose/issues/789)
* add option to locally disable caching ([78ac3bc](https://github.com/typegoose/typegoose/commit/78ac3bce1536cf667d454fd02810035c6758901a))
* **types:** change "DocumentType" to actually use a proper "_id" type ([c63c5f1](https://github.com/typegoose/typegoose/commit/c63c5f1528dda78fc2d5c2ffc440a9d09a188b41))


### Fixes

* rename global "disableCaching" to "disableGlobalCaching" ([5deb0eb](https://github.com/typegoose/typegoose/commit/5deb0eb2efca76a4c3f0d3f0e132790e89244024))


### Style

* **types:** update tsdoc example for "DocumentType" ([33fa48e](https://github.com/typegoose/typegoose/commit/33fa48ec6b1b24117653fbd02c3441f1dcf0c69c))


### Dependencies

* **@typescript-eslint/*:** upgrade to 5.52.0 ([97cc0b1](https://github.com/typegoose/typegoose/commit/97cc0b17c3318554b4b20b722942753f9e137d9c))
* **@typescript-eslint/*:** upgrade to 5.54.0 ([5c08a5c](https://github.com/typegoose/typegoose/commit/5c08a5c36fb29df17355e4b5a4ca1925120de027))
* **commitlint:** upgrade to 17.4.4 ([c696ac2](https://github.com/typegoose/typegoose/commit/c696ac29d8d5c4b52d6cc84c9c2a0f1d2391c51d))
* **eslint:** upgrade to 8.34.0 ([7c51f83](https://github.com/typegoose/typegoose/commit/7c51f8356cfaa11d338d28a20e6b38f162ce9a82))
* **eslint:** upgrade to 8.35.0 ([0dce134](https://github.com/typegoose/typegoose/commit/0dce134da2270443200d2b7dfa039d4a0b6251ce))
* **jest:** upgrade to 29.4.3 ([d7ab126](https://github.com/typegoose/typegoose/commit/d7ab126140d10d25eca38ce8531032b956c9a786))
* **lint-staged:** upgrade to 13.1.2 ([6c4ce7e](https://github.com/typegoose/typegoose/commit/6c4ce7e037eef827785be6793d3d40c875f318fd))
* **prettier:** upgrade to 2.8.4 ([9fd5e78](https://github.com/typegoose/typegoose/commit/9fd5e78765223b7d7d2408e9a7c8fd40295bbff8))
* **typescript:** upgrade to 4.9.5 ([27a1838](https://github.com/typegoose/typegoose/commit/27a18388a420b4da7f41d1ba4aba906b04f89e92))

## [10.2.0](https://github.com/typegoose/typegoose/compare/v10.1.1...v10.2.0) (2023-02-23)


### Dependencies

* **@typescript-eslint/*:** upgrade to 5.53.0 ([d1fda7b](https://github.com/typegoose/typegoose/commit/d1fda7b0d4cde8683bc6adff8a6637630f5d6757))
* **commitlint:** upgrade to 17.4.4 ([1399451](https://github.com/typegoose/typegoose/commit/13994519c2697c056d766eecb1fd644ea7f11ae5))
* **eslint:** upgrade to 8.34.0 ([0585e4c](https://github.com/typegoose/typegoose/commit/0585e4c36aa5688056444194ba95552e98dfe311))
* **jest:** upgrade to 29.4.3 ([c369561](https://github.com/typegoose/typegoose/commit/c36956117ebd2c5b585991cb284ac8da79446f4b))
* **lint-staged:** upgrade to 13.1.2 ([e1bd015](https://github.com/typegoose/typegoose/commit/e1bd015f94f52e2278c73044a47ca686990769e1))
* **mongodb-memory-server:** upgrade to 8.11.5 ([502a3c8](https://github.com/typegoose/typegoose/commit/502a3c81d1d54a831eac9de3f4c9a612b826ed5e))
* **mongoose:** upgrade to 6.10.0 ([33558f7](https://github.com/typegoose/typegoose/commit/33558f73bc8b528b23ff1e0ae9cac1df3b1672e4))
* **prettier:** upgrade to 2.8.4 ([382d82c](https://github.com/typegoose/typegoose/commit/382d82c88d15e673ec7fe9dd2544003d760eab21))
* **typescript:** upgrade to 4.9.5 ([92b6779](https://github.com/typegoose/typegoose/commit/92b677943e0cdb27f87f6ebf8e273b6c0234b55b))


## [10.2.0-beta.3](https://github.com/typegoose/typegoose/compare/v10.2.0-beta.2...v10.2.0-beta.3) (2023-02-19)


### Features

* **types:** change "DocumentType" to actually use a proper "_id" type ([c63c5f1](https://github.com/typegoose/typegoose/commit/c63c5f1528dda78fc2d5c2ffc440a9d09a188b41))


### Dependencies

* **@typescript-eslint/*:** upgrade to 5.52.0 ([97cc0b1](https://github.com/typegoose/typegoose/commit/97cc0b17c3318554b4b20b722942753f9e137d9c))
* **commitlint:** upgrade to 17.4.4 ([c696ac2](https://github.com/typegoose/typegoose/commit/c696ac29d8d5c4b52d6cc84c9c2a0f1d2391c51d))
* **eslint:** upgrade to 8.34.0 ([7c51f83](https://github.com/typegoose/typegoose/commit/7c51f8356cfaa11d338d28a20e6b38f162ce9a82))
* **jest:** upgrade to 29.4.3 ([d7ab126](https://github.com/typegoose/typegoose/commit/d7ab126140d10d25eca38ce8531032b956c9a786))
* **lint-staged:** upgrade to 13.1.2 ([6c4ce7e](https://github.com/typegoose/typegoose/commit/6c4ce7e037eef827785be6793d3d40c875f318fd))
* **prettier:** upgrade to 2.8.4 ([9fd5e78](https://github.com/typegoose/typegoose/commit/9fd5e78765223b7d7d2408e9a7c8fd40295bbff8))
* **typescript:** upgrade to 4.9.5 ([27a1838](https://github.com/typegoose/typegoose/commit/27a18388a420b4da7f41d1ba4aba906b04f89e92))


### Style

* **types:** update tsdoc example for "DocumentType" ([33fa48e](https://github.com/typegoose/typegoose/commit/33fa48ec6b1b24117653fbd02c3441f1dcf0c69c))

## [10.2.0-beta.2](https://github.com/typegoose/typegoose/compare/v10.2.0-beta.1...v10.2.0-beta.2) (2023-02-09)


### Features

* add option to locally disable caching ([78ac3bc](https://github.com/typegoose/typegoose/commit/78ac3bce1536cf667d454fd02810035c6758901a))


### Fixes

* rename global "disableCaching" to "disableGlobalCaching" ([5deb0eb](https://github.com/typegoose/typegoose/commit/5deb0eb2efca76a4c3f0d3f0e132790e89244024))

## [10.2.0-beta.1](https://github.com/typegoose/typegoose/compare/v10.1.1...v10.2.0-beta.1) (2023-02-07)


### Features

* add a way to disable caching ([2528601](https://github.com/typegoose/typegoose/commit/2528601529fd63efceda932809a8edabd128bd92)), closes [typegoose/typegoose#789](https://github.com/typegoose/typegoose/issues/789)

## [10.1.1](https://github.com/typegoose/typegoose/compare/v10.1.0...v10.1.1) (2023-02-05)


### Fixes

* **typegoose::getDiscriminatorModelForClass:** add warning when using different "existing*" options ([0599ef2](https://github.com/typegoose/typegoose/commit/0599ef299901e5eb4a47e64fea298a802f25d9c5)), closes [typegoose/typegoose#789](https://github.com/typegoose/typegoose/issues/789)

## [10.1.0](https://github.com/typegoose/typegoose/compare/v10.0.0...v10.1.0) (2023-01-29)


### Dependencies

* **@semantic-release/npm:** upgrade to 9.0.2 ([44633e4](https://github.com/typegoose/typegoose/commit/44633e40a99d7d86138d0846be4acfa88f208daa))
* **@types/jest:** upgrade to 29.4.0 ([424ba45](https://github.com/typegoose/typegoose/commit/424ba4538506eb8ca8cb1b684811a0f378058275))
* **@typescript-eslint/*:** upgrade to 5.49.0 ([108630d](https://github.com/typegoose/typegoose/commit/108630d88e38cb0ceab666b68c7cb3f549e68bfa))
* **commitlint:** upgrade to 17.4.2 ([22b0881](https://github.com/typegoose/typegoose/commit/22b08818c0799f53b5d863b1132401db0ebbe610))
* **eslint-config-prettier:** upgrade to 8.6.0 ([144aaa6](https://github.com/typegoose/typegoose/commit/144aaa6b2060d5a8cd379dc7e6ff800b65172b99))
* **eslint:** upgrade to 8.32.0 ([eb047d1](https://github.com/typegoose/typegoose/commit/eb047d1408a89e19153533d179b315582ac1f3fe))
* **husky:** upgrade to 8.0.3 ([c4fe8a2](https://github.com/typegoose/typegoose/commit/c4fe8a23df656f978aa55b287dc02fe4ea63f6b3))
* **jest:** upgrade to 29.4.1 ([b97b56f](https://github.com/typegoose/typegoose/commit/b97b56fb2344e5b4084be4ad40089206d5af8d7e))
* **mongodb-memory-server:** upgrade to 8.11.4 ([24e6ca3](https://github.com/typegoose/typegoose/commit/24e6ca3220b536e3f14ff3eb04e9a8f568ddceeb))
* **mongoose:** upgrade to 6.9.0 ([14239a6](https://github.com/typegoose/typegoose/commit/14239a683ed5d33a8bbb1ce5a7f720c2ede8e10b))
* **prettier:** upgrade to 2.8.3 ([f691573](https://github.com/typegoose/typegoose/commit/f691573880d1a5a31209f040b5c222e363f5deac))
* **ts-jest:** upgrade to 29.0.5 ([0b45b90](https://github.com/typegoose/typegoose/commit/0b45b90fe347d8ecf0641fe9bb3a2b6d5234cff5))
* **tslib:** upgrade to 2.5.0 ([b463238](https://github.com/typegoose/typegoose/commit/b4632388c1dee9727047f6f76044b47e41442cd0))

## [10.0.0](https://github.com/typegoose/typegoose/compare/v9.13.2...v10.0.0) (2022-12-12)


### ⚠ BREAKING CHANGES

* **typegoose::buildSchema:** "buildSchema" now only accepts 2 parameters instead of 3 (the last 2 got merged)
* Option "runSyncIndexes" has been removed, if still wanting to continue to use it, run "model.syncIndexes()" manually
* File "index(.ts|.js)" got renamed to "indexes(.ts|.js)" to lessen confusion
* **utils:** Function "getClassForDocument" is removed, use "getClass" directly
* **types::IndexOptions:** Anyone using "@index" or "IndexOptions" directly with a generic will have to remove the generic
* "DecoratedPropertyMetadata::whatis" got renamed to "DecoratedPropertyMetadata::propType" for anyone using it
* **tsconfig.json:** tsconfig "target" is now "es2020" which could be potentially be breaking
* NodeJS 14.0 is now the lowest required node version
* **types::Ref:** "Ref" now transparently uses "DocumentType", which could lead ot breaking changes.
"isDocumentType" and "isRefType" now narrow out the type that is tested, which could be a breaking change.
* **tsconfig.json:** tsconfig "target" is now "es2019" which could be potentially be breaking

### Features

* add option to not inherit indexes from extending class ([6f49c6f](https://github.com/typegoose/typegoose/commit/6f49c6f400b8a95fb8b11d963d074eca6bd5ec29)), closes [typegoose/typegoose#696](https://github.com/typegoose/typegoose/issues/696)
* change "overwriteOptions" to be just for naming options ([7713b0e](https://github.com/typegoose/typegoose/commit/7713b0edc36541a914106d15048d2f710e3b0044)), closes [typegoose/typegoose#721](https://github.com/typegoose/typegoose/issues/721)
* refactor to remove "data.schemas" ([3fdeab1](https://github.com/typegoose/typegoose/commit/3fdeab1c2247f80f0c60103a35f9e65e3d9b308a)), closes [typegoose/typegoose#760](https://github.com/typegoose/typegoose/issues/760)
* remove deprecated references to "WhatIsIt" ([b0cd080](https://github.com/typegoose/typegoose/commit/b0cd080ae3b4465a8187962b2fdb78bbd4f0d798))
* remove option "runSyncIndexes" ([7532411](https://github.com/typegoose/typegoose/commit/753241139feb15e568e10bb7eb9f5b0e5f331963))
* rename "index.ts" to "indexes.ts" ([59b3da7](https://github.com/typegoose/typegoose/commit/59b3da7e2bbdd2daeedaff6f58b85350870d1ad6))
* support defining nested-discriminators on the base class ([3a26c10](https://github.com/typegoose/typegoose/commit/3a26c1038158dcdb952954d74fec339370598df2)), closes [typegoose/typegoose#758](https://github.com/typegoose/typegoose/issues/758)
* **tsconfig.json:** update "target" to match minimal NodeJS capabilities ([896aef2](https://github.com/typegoose/typegoose/commit/896aef2c06e279c64b135313f9b7d5f7ccb521b1)), closes [typegoose/typegoose#735](https://github.com/typegoose/typegoose/issues/735)
* **tsconfig.json:** update "target" to match minimal NodeJS capabilities ([59826c1](https://github.com/typegoose/typegoose/commit/59826c1aabec37ba577f9c110c5d916024ae463c)), closes [typegoose/typegoose#735](https://github.com/typegoose/typegoose/issues/735)
* **typegoose::buildSchema:** reduce amout of parameters needed ([75a067c](https://github.com/typegoose/typegoose/commit/75a067cda915062a9ab6a75ec007b7f8a6cd9584)), closes [typegoose/typegoose#721](https://github.com/typegoose/typegoose/issues/721)
* **types::Ref:** update to transparently use "DocumentType" ([4b3520e](https://github.com/typegoose/typegoose/commit/4b3520e55b8b13947cce2a28d83b53825e22fd60)), closes [typegoose/typegoose#730](https://github.com/typegoose/typegoose/issues/730) [typegoose/typegoose#772](https://github.com/typegoose/typegoose/issues/772)
* **utils::getClass:** support getting name from "modelName" if available ([5447184](https://github.com/typegoose/typegoose/commit/5447184a6eda1c458c87296ad32b6b1c03b159e0))
* **utils:** remove function "getClassForDocument" ([da3a878](https://github.com/typegoose/typegoose/commit/da3a878a9625a70073dedca4fc30e7d4929c4575))
* **utils:** remove function "initProperty" ([0993605](https://github.com/typegoose/typegoose/commit/0993605c59e317af2f1bf5b6582b16a96b8f152d))


### Refactor

* **hooks:** dont define empty hooks options if not provided ([89b9416](https://github.com/typegoose/typegoose/commit/89b94169efc80d1be3fea7419d9289b110621918))
* **hooks:** use mongoose's array looping over methods over typegoose's ([ca2a03a](https://github.com/typegoose/typegoose/commit/ca2a03a64c9d23c5ad30e42eaa1800eac79ac5f6)), closes [typegoose/typegoose#587](https://github.com/typegoose/typegoose/issues/587)
* **utils::initProperty:** simplify paths ([37ca83e](https://github.com/typegoose/typegoose/commit/37ca83ede507340bac06fa340d04552f906fb953))


* update minimal NodeJS version to 14.0.0 ([fcffbd8](https://github.com/typegoose/typegoose/commit/fcffbd8f9a2f2444b06637ef4ef839ff8079beae))


### Fixes

* **hooks:** update types for new "errorHandler" option ([f52ea0d](https://github.com/typegoose/typegoose/commit/f52ea0d4caf1f73686280ff01123db24b84f54d5))
* **plugin:** actually print "anonymous" if function name is empty ([ae124bc](https://github.com/typegoose/typegoose/commit/ae124bcb6c8478275aef571ce4137afff75029b2))
* **typegoose:** lessen the amount of "merge*" calls ([e30f4ae](https://github.com/typegoose/typegoose/commit/e30f4ae61ca17912688398ffb2a3f0b93724b5f6))


### Style

* **biguser.test:** fix type error for "toMatchSnapshot" missing property "_id" ([b7e86eb](https://github.com/typegoose/typegoose/commit/b7e86ebc6b675d6f6eefcd4e080de1bbd66617d0))
* **hooks:** update types to more closely match mongoose's ([62e1f2b](https://github.com/typegoose/typegoose/commit/62e1f2bd7cca0376f392cc78aa20ea3f254fc330)), closes [typegoose/typegoose#587](https://github.com/typegoose/typegoose/issues/587)
* **schema:** remove test todo ([8a3a296](https://github.com/typegoose/typegoose/commit/8a3a2969cb2b6dd5e4dd190cb0283685bbd0fee4))
* **schema:** update comment explaining on why "as any" is used for hooks ([3e0386b](https://github.com/typegoose/typegoose/commit/3e0386b3d2dda194e0552e9b84facbb359235d53))
* **typegoose:** rename some internal variables ([fc04892](https://github.com/typegoose/typegoose/commit/fc048924e63dcd11381fe257de7dcb6e811f1eba))
* **types::DecoratedPropertyMetadata:** change "options" to have proper type instead of "any" ([845c5e0](https://github.com/typegoose/typegoose/commit/845c5e0720eab62b6790d4a7b60a815157783fe7))
* **types::EmptyVoidFn:** remove unused type ([2e79801](https://github.com/typegoose/typegoose/commit/2e79801f482d784305fcbdfc8567f0ccfec07373))
* **types::IndexOptions:** remove unused generic ([5ed9f25](https://github.com/typegoose/typegoose/commit/5ed9f25be95a007f151ceaa00099eb34e64cda3d))
* **types:** fix typescript complaining about a tsdoc link ([90fca45](https://github.com/typegoose/typegoose/commit/90fca4585f3e0b3c166cbd16adc951f73b887f1d))
* **types:** remove deprecated temporary options from "ICustomOptions" ([932cce5](https://github.com/typegoose/typegoose/commit/932cce52c9b728136850c1d2b142241f04319fdd))
* **types:** remove type "IObjectWithTypegooseName" ([67e8350](https://github.com/typegoose/typegoose/commit/67e8350d4da9382186755fb608fe6395eaf0b89b))
* **utils::getClass:** update types to better reflect what it is doing ([a9a23f6](https://github.com/typegoose/typegoose/commit/a9a23f6c40db74e6b83b9b6e61a13e894c9bb2d2))
* **utils::getClass:** update types to use less duplicate types ([5435d88](https://github.com/typegoose/typegoose/commit/5435d881fb275cd299a8e7dbc3928e691a419cf4))
* **utils:** remove unused imports ([4b79a49](https://github.com/typegoose/typegoose/commit/4b79a49b899f87aaba74ca23b807cc207d0e238d))


### Dependencies

* **@semantic-release/changelog:** upgrade to 6.0.2 ([91ef4b4](https://github.com/typegoose/typegoose/commit/91ef4b48504e0341b41e0f3accdb7fb96388e7a3))
* **@semantic-release/github:** upgrade to 8.0.7 ([ece0c7e](https://github.com/typegoose/typegoose/commit/ece0c7e341311bef4063e063b6cd231621f10983))
* **@types/jest:** upgrade to 29.2.4 ([296960a](https://github.com/typegoose/typegoose/commit/296960a7df8bed42ce0fb40da3af57f26e69cedb))
* **@types/lodash:** upgrade to 4.14.190 ([57233c9](https://github.com/typegoose/typegoose/commit/57233c9a09345338aa5e7c67a5a5f38369ffd8da))
* **@types/lodash:** upgrade to 4.14.191 ([99df11d](https://github.com/typegoose/typegoose/commit/99df11d90676c92457eda1eb30443ee809a7ea7d))
* **@types/node:** upgrade to 14.14.31 ([9f150d4](https://github.com/typegoose/typegoose/commit/9f150d443082149ffe68c5a311e9dc272b8e4179))
* **@typescript-eslint/*:** upgrade to 5.44.0 ([70ab1bb](https://github.com/typegoose/typegoose/commit/70ab1bb8ba9b6e2d32c22c85880e0c6b0d4733c7))
* **@typescript-eslint/*:** upgrade to 5.45.0 ([58f19ca](https://github.com/typegoose/typegoose/commit/58f19cad35a63fb3fa4f4e7585d24a9fa135ca4c))
* **@typescript-eslint/*:** upgrade to 5.46.0 ([75576a0](https://github.com/typegoose/typegoose/commit/75576a0b7fe9c196a5c559e2bb2eb226e5fa0725))
* **commitlint:** upgrade to 17.3.0 ([ee9fc80](https://github.com/typegoose/typegoose/commit/ee9fc80adbe88456e2023da2fa11c4bd8354cdaa))
* **eslint:** upgrade to 8.28.0 ([ddcd191](https://github.com/typegoose/typegoose/commit/ddcd191ab4b5183c5ec19b4b3a75b46ed307a893))
* **eslint:** upgrade to 8.29.0 ([8cb5c46](https://github.com/typegoose/typegoose/commit/8cb5c4601541be7e38ab3e55fe2502c4f20b4ec9))
* **husky:** upgrade to 8.0.2 ([4e1c894](https://github.com/typegoose/typegoose/commit/4e1c894ad2120a8fd97c0f30ab80923ac11f81c0))
* **jest:** upgrade to 29.0.3 ([4252897](https://github.com/typegoose/typegoose/commit/4252897efcfff050513bca42df9d1b7cc2f9bc6e))
* **lint-staged:** upgrade to 13.0.4 ([31f082c](https://github.com/typegoose/typegoose/commit/31f082c870b87d74ee18a9640b392aa200467a23))
* **lint-staged:** upgrade to 13.1.0 ([b904e07](https://github.com/typegoose/typegoose/commit/b904e07ad028531dfaa8392ad586a3c35971d013))
* **mongodb-memory-server:** upgrade to 8.10.1 ([287dda8](https://github.com/typegoose/typegoose/commit/287dda87acd6482b850fe700cc545e191b69d129))
* **mongodb-memory-server:** upgrade to 8.10.2 ([12b257d](https://github.com/typegoose/typegoose/commit/12b257db432fabb41c7b2b02128c7f844b76d3e5))
* **mongoose:** upgrade to 6.7.3 ([f3870ff](https://github.com/typegoose/typegoose/commit/f3870ffddb89efa9e6eea3f676646b9585793047))
* **mongoose:** upgrade to 6.7.5 ([f68226e](https://github.com/typegoose/typegoose/commit/f68226e379cfaf35caa735b355a98da421b57aaf))
* **mongoose:** upgrade to 6.8.0 ([8e8958f](https://github.com/typegoose/typegoose/commit/8e8958f60753e671661086b76c51ac06c2ccb8ed))
* **prettier:** upgrade to 2.8.0 ([9328043](https://github.com/typegoose/typegoose/commit/932804318f66c1f8b2de0b8f059bdff0f919c3ac))
* **prettier:** upgrade to 2.8.1 ([a8a7513](https://github.com/typegoose/typegoose/commit/a8a75135b6b869940731c9b64b28ef171119222a))
* **semantic-release:** upgrade to 19.0.5 ([3d9175e](https://github.com/typegoose/typegoose/commit/3d9175ec2f257ca8f67f44b3e528003d8bc2936e))
* **typescript:** upgrade to 4.9.3 ([cfca616](https://github.com/typegoose/typegoose/commit/cfca61665838f0e565cdd946ef339c8e2c78644b))
* **typescript:** upgrade to 4.9.4 ([1698424](https://github.com/typegoose/typegoose/commit/169842432ca7af6be4f6c0c844de7a39cc41a271))

## [10.0.0-beta.3](https://github.com/typegoose/typegoose/compare/v10.0.0-beta.2...v10.0.0-beta.3) (2022-12-12)


### Style

* **schema:** remove test todo ([8a3a296](https://github.com/typegoose/typegoose/commit/8a3a2969cb2b6dd5e4dd190cb0283685bbd0fee4))


### Dependencies

* **@types/jest:** upgrade to 29.2.4 ([296960a](https://github.com/typegoose/typegoose/commit/296960a7df8bed42ce0fb40da3af57f26e69cedb))
* **@typescript-eslint/*:** upgrade to 5.46.0 ([75576a0](https://github.com/typegoose/typegoose/commit/75576a0b7fe9c196a5c559e2bb2eb226e5fa0725))
* **eslint:** upgrade to 8.29.0 ([8cb5c46](https://github.com/typegoose/typegoose/commit/8cb5c4601541be7e38ab3e55fe2502c4f20b4ec9))
* **lint-staged:** upgrade to 13.1.0 ([b904e07](https://github.com/typegoose/typegoose/commit/b904e07ad028531dfaa8392ad586a3c35971d013))
* **mongodb-memory-server:** upgrade to 8.10.2 ([12b257d](https://github.com/typegoose/typegoose/commit/12b257db432fabb41c7b2b02128c7f844b76d3e5))
* **prettier:** upgrade to 2.8.1 ([a8a7513](https://github.com/typegoose/typegoose/commit/a8a75135b6b869940731c9b64b28ef171119222a))
* **typescript:** upgrade to 4.9.4 ([1698424](https://github.com/typegoose/typegoose/commit/169842432ca7af6be4f6c0c844de7a39cc41a271))

## [10.0.0-beta.2](https://github.com/typegoose/typegoose/compare/v10.0.0-beta.1...v10.0.0-beta.2) (2022-12-06)


### Dependencies

* **mongoose:** upgrade to 6.8.0 ([8e8958f](https://github.com/typegoose/typegoose/commit/8e8958f60753e671661086b76c51ac06c2ccb8ed))


### Fixes

* **hooks:** update types for new "errorHandler" option ([f52ea0d](https://github.com/typegoose/typegoose/commit/f52ea0d4caf1f73686280ff01123db24b84f54d5))

## [10.0.0-beta.1](https://github.com/typegoose/typegoose/compare/v9.13.2...v10.0.0-beta.1) (2022-12-01)


### ⚠ BREAKING CHANGES

* **typegoose::buildSchema:** "buildSchema" now only accepts 2 parameters instead of 3 (the last 2 got merged)
* Option "runSyncIndexes" has been removed, if still wanting to continue to use it, run "model.syncIndexes()" manually
* File "index(.ts|.js)" got renamed to "indexes(.ts|.js)" to lessen confusion
* **utils:** Function "getClassForDocument" is removed, use "getClass" directly
* **types::IndexOptions:** Anyone using "@index" or "IndexOptions" directly with a generic will have to remove the generic
* "DecoratedPropertyMetadata::whatis" got renamed to "DecoratedPropertyMetadata::propType" for anyone using it
* **tsconfig.json:** tsconfig "target" is now "es2020" which could be potentially be breaking
* NodeJS 14.0 is now the lowest required node version
* **types::Ref:** "Ref" now transparently uses "DocumentType", which could lead ot breaking changes.
"isDocumentType" and "isRefType" now narrow out the type that is tested, which could be a breaking change.
* **tsconfig.json:** tsconfig "target" is now "es2019" which could be potentially be breaking

### Features

* add option to not inherit indexes from extending class ([6f49c6f](https://github.com/typegoose/typegoose/commit/6f49c6f400b8a95fb8b11d963d074eca6bd5ec29)), closes [typegoose/typegoose#696](https://github.com/typegoose/typegoose/issues/696)
* change "overwriteOptions" to be just for naming options ([7713b0e](https://github.com/typegoose/typegoose/commit/7713b0edc36541a914106d15048d2f710e3b0044)), closes [typegoose/typegoose#721](https://github.com/typegoose/typegoose/issues/721)
* refactor to remove "data.schemas" ([3fdeab1](https://github.com/typegoose/typegoose/commit/3fdeab1c2247f80f0c60103a35f9e65e3d9b308a)), closes [typegoose/typegoose#760](https://github.com/typegoose/typegoose/issues/760)
* remove deprecated references to "WhatIsIt" ([b0cd080](https://github.com/typegoose/typegoose/commit/b0cd080ae3b4465a8187962b2fdb78bbd4f0d798))
* remove option "runSyncIndexes" ([7532411](https://github.com/typegoose/typegoose/commit/753241139feb15e568e10bb7eb9f5b0e5f331963))
* rename "index.ts" to "indexes.ts" ([59b3da7](https://github.com/typegoose/typegoose/commit/59b3da7e2bbdd2daeedaff6f58b85350870d1ad6))
* support defining nested-discriminators on the base class ([3a26c10](https://github.com/typegoose/typegoose/commit/3a26c1038158dcdb952954d74fec339370598df2)), closes [typegoose/typegoose#758](https://github.com/typegoose/typegoose/issues/758)
* **tsconfig.json:** update "target" to match minimal NodeJS capabilities ([896aef2](https://github.com/typegoose/typegoose/commit/896aef2c06e279c64b135313f9b7d5f7ccb521b1)), closes [typegoose/typegoose#735](https://github.com/typegoose/typegoose/issues/735)
* **tsconfig.json:** update "target" to match minimal NodeJS capabilities ([59826c1](https://github.com/typegoose/typegoose/commit/59826c1aabec37ba577f9c110c5d916024ae463c)), closes [typegoose/typegoose#735](https://github.com/typegoose/typegoose/issues/735)
* **typegoose::buildSchema:** reduce amout of parameters needed ([75a067c](https://github.com/typegoose/typegoose/commit/75a067cda915062a9ab6a75ec007b7f8a6cd9584)), closes [typegoose/typegoose#721](https://github.com/typegoose/typegoose/issues/721)
* **types::Ref:** update to transparently use "DocumentType" ([4b3520e](https://github.com/typegoose/typegoose/commit/4b3520e55b8b13947cce2a28d83b53825e22fd60)), closes [typegoose/typegoose#730](https://github.com/typegoose/typegoose/issues/730) [typegoose/typegoose#772](https://github.com/typegoose/typegoose/issues/772)
* **utils::getClass:** support getting name from "modelName" if available ([5447184](https://github.com/typegoose/typegoose/commit/5447184a6eda1c458c87296ad32b6b1c03b159e0))
* **utils:** remove function "getClassForDocument" ([da3a878](https://github.com/typegoose/typegoose/commit/da3a878a9625a70073dedca4fc30e7d4929c4575))
* **utils:** remove function "initProperty" ([0993605](https://github.com/typegoose/typegoose/commit/0993605c59e317af2f1bf5b6582b16a96b8f152d))


### Refactor

* **hooks:** dont define empty hooks options if not provided ([89b9416](https://github.com/typegoose/typegoose/commit/89b94169efc80d1be3fea7419d9289b110621918))
* **hooks:** use mongoose's array looping over methods over typegoose's ([ca2a03a](https://github.com/typegoose/typegoose/commit/ca2a03a64c9d23c5ad30e42eaa1800eac79ac5f6)), closes [typegoose/typegoose#587](https://github.com/typegoose/typegoose/issues/587)
* **utils::initProperty:** simplify paths ([37ca83e](https://github.com/typegoose/typegoose/commit/37ca83ede507340bac06fa340d04552f906fb953))


* update minimal NodeJS version to 14.0.0 ([fcffbd8](https://github.com/typegoose/typegoose/commit/fcffbd8f9a2f2444b06637ef4ef839ff8079beae))


### Fixes

* **plugin:** actually print "anonymous" if function name is empty ([ae124bc](https://github.com/typegoose/typegoose/commit/ae124bcb6c8478275aef571ce4137afff75029b2))
* **typegoose:** lessen the amount of "merge*" calls ([e30f4ae](https://github.com/typegoose/typegoose/commit/e30f4ae61ca17912688398ffb2a3f0b93724b5f6))


### Style

* **biguser.test:** fix type error for "toMatchSnapshot" missing property "_id" ([b7e86eb](https://github.com/typegoose/typegoose/commit/b7e86ebc6b675d6f6eefcd4e080de1bbd66617d0))
* **hooks:** update types to more closely match mongoose's ([62e1f2b](https://github.com/typegoose/typegoose/commit/62e1f2bd7cca0376f392cc78aa20ea3f254fc330)), closes [typegoose/typegoose#587](https://github.com/typegoose/typegoose/issues/587)
* **schema:** update comment explaining on why "as any" is used for hooks ([3e0386b](https://github.com/typegoose/typegoose/commit/3e0386b3d2dda194e0552e9b84facbb359235d53))
* **typegoose:** rename some internal variables ([fc04892](https://github.com/typegoose/typegoose/commit/fc048924e63dcd11381fe257de7dcb6e811f1eba))
* **types::DecoratedPropertyMetadata:** change "options" to have proper type instead of "any" ([845c5e0](https://github.com/typegoose/typegoose/commit/845c5e0720eab62b6790d4a7b60a815157783fe7))
* **types::EmptyVoidFn:** remove unused type ([2e79801](https://github.com/typegoose/typegoose/commit/2e79801f482d784305fcbdfc8567f0ccfec07373))
* **types::IndexOptions:** remove unused generic ([5ed9f25](https://github.com/typegoose/typegoose/commit/5ed9f25be95a007f151ceaa00099eb34e64cda3d))
* **types:** fix typescript complaining about a tsdoc link ([90fca45](https://github.com/typegoose/typegoose/commit/90fca4585f3e0b3c166cbd16adc951f73b887f1d))
* **types:** remove deprecated temporary options from "ICustomOptions" ([932cce5](https://github.com/typegoose/typegoose/commit/932cce52c9b728136850c1d2b142241f04319fdd))
* **types:** remove type "IObjectWithTypegooseName" ([67e8350](https://github.com/typegoose/typegoose/commit/67e8350d4da9382186755fb608fe6395eaf0b89b))
* **utils::getClass:** update types to better reflect what it is doing ([a9a23f6](https://github.com/typegoose/typegoose/commit/a9a23f6c40db74e6b83b9b6e61a13e894c9bb2d2))
* **utils::getClass:** update types to use less duplicate types ([5435d88](https://github.com/typegoose/typegoose/commit/5435d881fb275cd299a8e7dbc3928e691a419cf4))
* **utils:** remove unused imports ([4b79a49](https://github.com/typegoose/typegoose/commit/4b79a49b899f87aaba74ca23b807cc207d0e238d))


### Dependencies

* **@semantic-release/changelog:** upgrade to 6.0.2 ([91ef4b4](https://github.com/typegoose/typegoose/commit/91ef4b48504e0341b41e0f3accdb7fb96388e7a3))
* **@semantic-release/github:** upgrade to 8.0.7 ([ece0c7e](https://github.com/typegoose/typegoose/commit/ece0c7e341311bef4063e063b6cd231621f10983))
* **@types/lodash:** upgrade to 4.14.190 ([57233c9](https://github.com/typegoose/typegoose/commit/57233c9a09345338aa5e7c67a5a5f38369ffd8da))
* **@types/lodash:** upgrade to 4.14.191 ([99df11d](https://github.com/typegoose/typegoose/commit/99df11d90676c92457eda1eb30443ee809a7ea7d))
* **@types/node:** upgrade to 14.14.31 ([9f150d4](https://github.com/typegoose/typegoose/commit/9f150d443082149ffe68c5a311e9dc272b8e4179))
* **@typescript-eslint/*:** upgrade to 5.44.0 ([70ab1bb](https://github.com/typegoose/typegoose/commit/70ab1bb8ba9b6e2d32c22c85880e0c6b0d4733c7))
* **@typescript-eslint/*:** upgrade to 5.45.0 ([58f19ca](https://github.com/typegoose/typegoose/commit/58f19cad35a63fb3fa4f4e7585d24a9fa135ca4c))
* **commitlint:** upgrade to 17.3.0 ([ee9fc80](https://github.com/typegoose/typegoose/commit/ee9fc80adbe88456e2023da2fa11c4bd8354cdaa))
* **eslint:** upgrade to 8.28.0 ([ddcd191](https://github.com/typegoose/typegoose/commit/ddcd191ab4b5183c5ec19b4b3a75b46ed307a893))
* **husky:** upgrade to 8.0.2 ([4e1c894](https://github.com/typegoose/typegoose/commit/4e1c894ad2120a8fd97c0f30ab80923ac11f81c0))
* **jest:** upgrade to 29.0.3 ([4252897](https://github.com/typegoose/typegoose/commit/4252897efcfff050513bca42df9d1b7cc2f9bc6e))
* **lint-staged:** upgrade to 13.0.4 ([31f082c](https://github.com/typegoose/typegoose/commit/31f082c870b87d74ee18a9640b392aa200467a23))
* **mongodb-memory-server:** upgrade to 8.10.1 ([287dda8](https://github.com/typegoose/typegoose/commit/287dda87acd6482b850fe700cc545e191b69d129))
* **mongoose:** upgrade to 6.7.3 ([f3870ff](https://github.com/typegoose/typegoose/commit/f3870ffddb89efa9e6eea3f676646b9585793047))
* **mongoose:** upgrade to 6.7.5 ([f68226e](https://github.com/typegoose/typegoose/commit/f68226e379cfaf35caa735b355a98da421b57aaf))
* **prettier:** upgrade to 2.8.0 ([9328043](https://github.com/typegoose/typegoose/commit/932804318f66c1f8b2de0b8f059bdff0f919c3ac))
* **semantic-release:** upgrade to 19.0.5 ([3d9175e](https://github.com/typegoose/typegoose/commit/3d9175ec2f257ca8f67f44b3e528003d8bc2936e))
* **typescript:** upgrade to 4.9.3 ([cfca616](https://github.com/typegoose/typegoose/commit/cfca61665838f0e565cdd946ef339c8e2c78644b))

### [9.13.2](https://github.com/typegoose/typegoose/compare/v9.13.1...v9.13.2) (2022-12-01)


### Fixes

* deprecate option "runSyncIndexes" ([40f6d30](https://github.com/typegoose/typegoose/commit/40f6d300aa35de2ebb01e8d2dd3e95a0c398fd75))

### [9.13.1](https://github.com/typegoose/typegoose/compare/v9.13.0...v9.13.1) (2022-11-24)


### Fixes

* **typeguards:** quick fix for typescript 4.9 ([df36c34](https://github.com/typegoose/typegoose/commit/df36c346006cb89e4d89c8d152c63b3b222bcfd5)), closes [#772](https://github.com/typegoose/typegoose/issues/772)

## [9.13.0](https://github.com/typegoose/typegoose/compare/v9.12.1...v9.13.0) (2022-11-22)


### Features

* fix non-nested discriminator hooks & plugins ([8cc7301](https://github.com/typegoose/typegoose/commit/8cc73018aaf538a698ac390bb3bb0d46628cabcc)), closes [#12472](https://github.com/typegoose/typegoose/issues/12472) [#12604](https://github.com/typegoose/typegoose/issues/12604) [#12613](https://github.com/typegoose/typegoose/issues/12613) [#12696](https://github.com/typegoose/typegoose/issues/12696) [typegoose/typegoose#768](https://github.com/typegoose/typegoose/issues/768)


### Dependencies

* **@types/lodash:** upgrade to 4.14.186 ([8367452](https://github.com/typegoose/typegoose/commit/836745224e5a167ab8a5cb6701fbe3335bc7b651))
* **@types/lodash:** upgrade to 4.14.189 ([6257223](https://github.com/typegoose/typegoose/commit/62572238e3cdbe2d7ce944da395f5f2ff7637593))
* **@types/semver:** upgrade to 7.3.13 ([9c7a151](https://github.com/typegoose/typegoose/commit/9c7a15182cafc3a59ff213b3e76a05b488b84ac2))
* **@typescript-eslint/*:** upgrade to 5.41.0 ([e10e53a](https://github.com/typegoose/typegoose/commit/e10e53aac461a0bb40890c15449db6ee29a6ff90))
* **@typescript-eslint/*:** upgrade to 5.43.0 ([851163f](https://github.com/typegoose/typegoose/commit/851163f33d75c0ec707ccc3e843a7cd222f1960b))
* **eslint:** upgrade to 8.26.0 ([187c843](https://github.com/typegoose/typegoose/commit/187c84337b1836b0243b17550b579307877f3667))
* **eslint:** upgrade to 8.27.0 ([436036a](https://github.com/typegoose/typegoose/commit/436036ab21352ef625007d2a46b9d677f4e99f90))
* **loglevel:** upgrade to 1.8.1 ([b017f76](https://github.com/typegoose/typegoose/commit/b017f76cdb55cbe257fbf02cad5e699d93102a77))
* **mongodb-memory-server:** upgrade to 8.10.0 ([79242e6](https://github.com/typegoose/typegoose/commit/79242e64588887e63a78b3866f600508e38af18d))
* **mongodb-memory-server:** upgrade to 8.9.3 ([1725f65](https://github.com/typegoose/typegoose/commit/1725f65af25c86fb89f3f1cbd5cb4795ce9e0edf))
* **mongoose:** upgrade to 6.7.0 ([d5fa0e0](https://github.com/typegoose/typegoose/commit/d5fa0e09d933e6132241c5d2c2159882dc6d8b91))
* **mongoose:** upgrade to 6.7.2 ([d1e83f7](https://github.com/typegoose/typegoose/commit/d1e83f7aa140a4c5fce605e80340d617a4fe5fe2))
* **semver:** upgrade to 7.3.8 ([7dc8138](https://github.com/typegoose/typegoose/commit/7dc813880df15ad9fc7fd4861661f8fb3d767a0d))
* **tslib:** upgrade to 2.4.1 ([9da2600](https://github.com/typegoose/typegoose/commit/9da260029f06bf5d34a789e09bd4c86a2f301273))
* **typescript:** upgrade to 4.8.4 ([6590961](https://github.com/typegoose/typegoose/commit/6590961e8736804fe17a1d0f9f82e19c1b0f09ff)), closes [#644](https://github.com/typegoose/typegoose/issues/644)


### Style

* **dbIndex.test:** remove unused imports ([7c1c7be](https://github.com/typegoose/typegoose/commit/7c1c7bee2a208c7d1e194319728504e9bd95d917))

## [9.13.0-beta.2](https://github.com/typegoose/typegoose/compare/v9.13.0-beta.1...v9.13.0-beta.2) (2022-11-17)


### Features

* fix non-nested discriminator hooks & plugins ([8cc7301](https://github.com/typegoose/typegoose/commit/8cc73018aaf538a698ac390bb3bb0d46628cabcc)), closes [#12472](https://github.com/typegoose/typegoose/issues/12472) [#12604](https://github.com/typegoose/typegoose/issues/12604) [#12613](https://github.com/typegoose/typegoose/issues/12613) [#12696](https://github.com/typegoose/typegoose/issues/12696) [typegoose/typegoose#768](https://github.com/typegoose/typegoose/issues/768)


### Dependencies

* **@types/lodash:** upgrade to 4.14.189 ([6257223](https://github.com/typegoose/typegoose/commit/62572238e3cdbe2d7ce944da395f5f2ff7637593))
* **@typescript-eslint/*:** upgrade to 5.43.0 ([851163f](https://github.com/typegoose/typegoose/commit/851163f33d75c0ec707ccc3e843a7cd222f1960b))
* **eslint:** upgrade to 8.27.0 ([436036a](https://github.com/typegoose/typegoose/commit/436036ab21352ef625007d2a46b9d677f4e99f90))
* **loglevel:** upgrade to 1.8.1 ([b017f76](https://github.com/typegoose/typegoose/commit/b017f76cdb55cbe257fbf02cad5e699d93102a77))
* **mongodb-memory-server:** upgrade to 8.10.0 ([79242e6](https://github.com/typegoose/typegoose/commit/79242e64588887e63a78b3866f600508e38af18d))
* **mongoose:** upgrade to 6.7.2 ([d1e83f7](https://github.com/typegoose/typegoose/commit/d1e83f7aa140a4c5fce605e80340d617a4fe5fe2))
* **tslib:** upgrade to 2.4.1 ([9da2600](https://github.com/typegoose/typegoose/commit/9da260029f06bf5d34a789e09bd4c86a2f301273))

## [9.13.0-beta.1](https://github.com/typegoose/typegoose/compare/v9.12.1...v9.13.0-beta.1) (2022-10-27)


### Dependencies

* **@types/lodash:** upgrade to 4.14.186 ([8367452](https://github.com/typegoose/typegoose/commit/836745224e5a167ab8a5cb6701fbe3335bc7b651))
* **@types/semver:** upgrade to 7.3.13 ([9c7a151](https://github.com/typegoose/typegoose/commit/9c7a15182cafc3a59ff213b3e76a05b488b84ac2))
* **@typescript-eslint/*:** upgrade to 5.41.0 ([e10e53a](https://github.com/typegoose/typegoose/commit/e10e53aac461a0bb40890c15449db6ee29a6ff90))
* **eslint:** upgrade to 8.26.0 ([187c843](https://github.com/typegoose/typegoose/commit/187c84337b1836b0243b17550b579307877f3667))
* **mongodb-memory-server:** upgrade to 8.9.3 ([1725f65](https://github.com/typegoose/typegoose/commit/1725f65af25c86fb89f3f1cbd5cb4795ce9e0edf))
* **mongoose:** upgrade to 6.7.0 ([d5fa0e0](https://github.com/typegoose/typegoose/commit/d5fa0e09d933e6132241c5d2c2159882dc6d8b91))
* **semver:** upgrade to 7.3.8 ([7dc8138](https://github.com/typegoose/typegoose/commit/7dc813880df15ad9fc7fd4861661f8fb3d767a0d))
* **typescript:** upgrade to 4.8.4 ([6590961](https://github.com/typegoose/typegoose/commit/6590961e8736804fe17a1d0f9f82e19c1b0f09ff)), closes [#644](https://github.com/typegoose/typegoose/issues/644)

### [9.12.1](https://github.com/typegoose/typegoose/compare/v9.12.0...v9.12.1) (2022-09-26)


### Fixes

* add option to skip applying plugins on discriminators ([f9cbc90](https://github.com/typegoose/typegoose/commit/f9cbc90044b715cf1f2d1b535daca754b5de8bf3))

## [9.12.0](https://github.com/typegoose/typegoose/compare/v9.11.2...v9.12.0) (2022-09-13)


### Dependencies

* **@types/jest:** upgrade to 28.1.8 ([cc0377f](https://github.com/typegoose/typegoose/commit/cc0377f02dff75daf20db379740719f504e4e612))
* **@types/lodash:** upgrade to 4.14.185 ([58bde50](https://github.com/typegoose/typegoose/commit/58bde50259219a401aeb0842941aa32461089029))
* **@types/semver:** upgrade to 7.3.12 ([570d6d2](https://github.com/typegoose/typegoose/commit/570d6d23d919e68b65fec583159ccb64983bdf1e))
* **@typescript-eslint/*:** upgrade to 5.37.0 ([0eb4fa6](https://github.com/typegoose/typegoose/commit/0eb4fa6c1cc9fb209e4c5501f578490199a71403))
* **eslint:** upgrade to 8.23.1 ([fe69e01](https://github.com/typegoose/typegoose/commit/fe69e01a628eac39f01332e597574d793085b083))
* **jest-runner-tsd:** upgrade to 3.1.1 ([28dfd2a](https://github.com/typegoose/typegoose/commit/28dfd2ad28adb242fd130dba0e8b35c0629db735))
* **mongodb-memory-server:** upgrade to 8.9.1 ([76b8ba9](https://github.com/typegoose/typegoose/commit/76b8ba9a57ffeaa5d1545e8b92232f26e940ae2d))
* **mongoose:** upgrade to 6.6.0 ([44fce67](https://github.com/typegoose/typegoose/commit/44fce673f7f6ff91a56168d5d8b96e5f0d91d1bd))
* **ts-jest:** upgrade to 28.0.8 ([7bfba67](https://github.com/typegoose/typegoose/commit/7bfba67b0acfdb083223c27ffd9144f25e74c998))

### [9.11.2](https://github.com/typegoose/typegoose/compare/v9.11.1...v9.11.2) (2022-08-25)


### Style

* fix some typos ([#754](https://github.com/typegoose/typegoose/issues/754)) ([12b7007](https://github.com/typegoose/typegoose/commit/12b7007b7b2ce0ff50314be5cafac839756696f9))

### [9.11.1](https://github.com/typegoose/typegoose/compare/v9.11.0...v9.11.1) (2022-08-25)


### Fixes

* **scripts:** use double quotes in lint file glob ([#755](https://github.com/typegoose/typegoose/issues/755)) ([e383d32](https://github.com/typegoose/typegoose/commit/e383d3260f0b445ff133de56466794937a84c545))

## [9.11.0](https://github.com/typegoose/typegoose/compare/v9.10.1...v9.11.0) (2022-07-28)


### Dependencies

* **@types/jest:** upgrade to 28.1.6 ([3d93a26](https://github.com/typegoose/typegoose/commit/3d93a26f72150f24f76264932fbcd8688f18cd7b))
* **@typescript-eslint/*:** upgrade to 5.31.0 ([8a10681](https://github.com/typegoose/typegoose/commit/8a106814b9bd9bac42dc74b22b5fec15d20176ac))
* **eslint:** upgrade to 8.20.0 ([eaf2af4](https://github.com/typegoose/typegoose/commit/eaf2af4d7e3ee0ba22caf0711f4e956f4a3c8617))
* **jest:** upgrade to 28.1.3 ([436eda7](https://github.com/typegoose/typegoose/commit/436eda7639df4af529c1ce577921ed584c75226e))
* **lint-staged:** upgrade to 12.5.0 ([f447011](https://github.com/typegoose/typegoose/commit/f4470115cf24a5c99bfb549f9675d0e4143f1f6f))
* **mongodb-memory-server:** upgrade to 8.8.0 ([f7b95d5](https://github.com/typegoose/typegoose/commit/f7b95d5dbf92bce1661c4be11fc05fcb4561db18))
* **mongoose:** upgrade to 6.5.0 ([5535fa8](https://github.com/typegoose/typegoose/commit/5535fa8246b0367e74af5aec2650e6c3a1f2014b))
* **ts-jest:** upgrade to 28.0.7 ([7dc67be](https://github.com/typegoose/typegoose/commit/7dc67be5e06f6e7c4cfbd65bccf41c3b0400c458))

## [9.11.0-beta.2](https://github.com/typegoose/typegoose/compare/v9.11.0-beta.1...v9.11.0-beta.2) (2022-07-28)


### Dependencies

* **lint-staged:** upgrade to 12.5.0 ([f447011](https://github.com/typegoose/typegoose/commit/f4470115cf24a5c99bfb549f9675d0e4143f1f6f))

## [9.11.0-beta.1](https://github.com/typegoose/typegoose/compare/v9.10.1...v9.11.0-beta.1) (2022-07-27)


### Dependencies

* **@types/jest:** upgrade to 28.1.6 ([3d93a26](https://github.com/typegoose/typegoose/commit/3d93a26f72150f24f76264932fbcd8688f18cd7b))
* **@typescript-eslint/*:** upgrade to 5.31.0 ([8a10681](https://github.com/typegoose/typegoose/commit/8a106814b9bd9bac42dc74b22b5fec15d20176ac))
* **eslint:** upgrade to 8.20.0 ([eaf2af4](https://github.com/typegoose/typegoose/commit/eaf2af4d7e3ee0ba22caf0711f4e956f4a3c8617))
* **jest:** upgrade to 28.1.3 ([436eda7](https://github.com/typegoose/typegoose/commit/436eda7639df4af529c1ce577921ed584c75226e))
* **mongodb-memory-server:** upgrade to 8.8.0 ([f7b95d5](https://github.com/typegoose/typegoose/commit/f7b95d5dbf92bce1661c4be11fc05fcb4561db18))
* **mongoose:** upgrade to 6.5.0 ([5535fa8](https://github.com/typegoose/typegoose/commit/5535fa8246b0367e74af5aec2650e6c3a1f2014b))
* **ts-jest:** upgrade to 28.0.7 ([7dc67be](https://github.com/typegoose/typegoose/commit/7dc67be5e06f6e7c4cfbd65bccf41c3b0400c458))

### [9.10.1](https://github.com/typegoose/typegoose/compare/v9.10.0...v9.10.1) (2022-07-03)


### Fixes

* update mongoose peer dependency ([ed9dd62](https://github.com/typegoose/typegoose/commit/ed9dd62dbda3398c1045070c93a873012453980b)), closes [typegoose/typegoose#733](https://github.com/typegoose/typegoose/issues/733)

## [9.10.0](https://github.com/typegoose/typegoose/compare/v9.9.0...v9.10.0) (2022-07-02)


### Features

* **utils:** allow setting warnMixed Severity as property option ([ff793d1](https://github.com/typegoose/typegoose/commit/ff793d1201682e54b19927a525cfcec1c11fc2ec)), closes [typegoose/typegoose#620](https://github.com/typegoose/typegoose/issues/620)


### Dependencies

* **@types/jest:** upgrade to 28.1.4 ([feb2ece](https://github.com/typegoose/typegoose/commit/feb2ece6d190ab28d9c918f16c3a29f6fea3b49b))
* **@types/node:** upgrade to 12.20.55 ([3e09201](https://github.com/typegoose/typegoose/commit/3e09201cfe18cab63c569c6aca1d66eea170e108))
* **@types/semver:** upgrade to 7.3.10 ([92288de](https://github.com/typegoose/typegoose/commit/92288de5a45cbab0c541b84caf86c4db2cadaf8e))
* **@typescript-eslint/*:** upgrade to 5.30.3 ([7a722e1](https://github.com/typegoose/typegoose/commit/7a722e13be77d15c1b2d8a93f1c347ec8952a74e))
* **eslint:** upgrade to 8.19.0 ([f5940b4](https://github.com/typegoose/typegoose/commit/f5940b45b7675f89738d1c0081f45570f7dfc4e5))
* **eslint-plugin-prettier:** upgrade to 4.2.1 ([b1acd20](https://github.com/typegoose/typegoose/commit/b1acd20eacfdbb75faaebb6a88c5e9c191268e19))
* **jest:** upgrade to 28.1.2 ([e8139e2](https://github.com/typegoose/typegoose/commit/e8139e2f3d3b6364031b7f7f9f31026e14236513))
* **mongodb-memory-server:** upgrade to 8.7.2 ([c81fb51](https://github.com/typegoose/typegoose/commit/c81fb5165fc4bebe26ae372d542c736ffdca9106))
* **mongoose:** upgrade to 6.4.2 ([1558851](https://github.com/typegoose/typegoose/commit/15588515b22cc8fd1733931f0ef624319063502e))
* **prettier:** upgrade to 2.7.1 ([8a47e33](https://github.com/typegoose/typegoose/commit/8a47e33016999dd88731473db53148ac3cdb5300))
* **ts-jest:** upgrade to 28.0.5 ([d663713](https://github.com/typegoose/typegoose/commit/d6637131ba124bc42fa59d82d7d9c997a620733c))


### Fixes

* **index:** change "fields" to use mongoose's "IndexDefinition" type ([38862e0](https://github.com/typegoose/typegoose/commit/38862e0463991df73a9d9532cf59c6b0cd981b3b))
* **typegoose:** re-export type "SubDocumentType" and "ArraySubDocumentType" ([16dadd5](https://github.com/typegoose/typegoose/commit/16dadd530b2255fe1e5519d339ff05ffa50d7732))
* **typegoose::getModelWithString:** allow specifying QueryHelpers for return model ([441113b](https://github.com/typegoose/typegoose/commit/441113b7037a816d41686fa1a4bd9ddbbddb34fe))
* **types::BasePropOptions:** update "enum" to use mongoose's types ([8c8a6e2](https://github.com/typegoose/typegoose/commit/8c8a6e27a5d4ed7e724c43908b1846be26d777e3))
* **types::DocumentType:** add correct generic for "toJSON" and "toObject" types ([026482d](https://github.com/typegoose/typegoose/commit/026482df5fd43775b6073ceb55e2bd0bffb0dbc5)), closes [typegoose/typegoose#732](https://github.com/typegoose/typegoose/issues/732)
* **types::DocumentType:** simplify conditional ([be59b7a](https://github.com/typegoose/typegoose/commit/be59b7ac195143887b927c113d9ee8f369cef778))
* **types::IIndexArray:** remove generic ([9983ce9](https://github.com/typegoose/typegoose/commit/9983ce9f81ceca9097aa6d4295a5f117c5687bc8))
* **types::IPluginsArray:** remove generic ([abff87e](https://github.com/typegoose/typegoose/commit/abff87e81134f2e4b60bd3187716b32dda61f4a9))
* **types::VirtualOptions:** update "match" to use mongoose's types ([dc6680f](https://github.com/typegoose/typegoose/commit/dc6680f207a82a7e8f2035925c40262523510feb))


### Style

* **typeguards:isRefType*:** add tsdoc for "refType" parameter ([c704bb6](https://github.com/typegoose/typegoose/commit/c704bb6c5e7ca399e04fecb4afd7a5fb63626846))
* **types:** add "SubDocumentType" and "ArraySubDocumentType" to supplement DocumentType ([72d49c1](https://github.com/typegoose/typegoose/commit/72d49c1a6e16440abb0050f1594280d54ccfd63c))
* **types::BeAnObject:** update tsdoc to explain difference with "KeyStringAny" ([3448fde](https://github.com/typegoose/typegoose/commit/3448fde733aee2d51558897e082894170b08b27c))
* **types::EmptyVoidFn:** fix typo in tsdoc ([93aab06](https://github.com/typegoose/typegoose/commit/93aab0660f4bed680fc91360378cd8e9013531dc))
* **types::IndexOptions:** add TODO for typegoose 10 ([edcd0c4](https://github.com/typegoose/typegoose/commit/edcd0c4af536d1787dd4fae4d7d9786c6e431e87))
* **types::IObjectWithTypegooseName:** deprecate interface and value ([89810b8](https://github.com/typegoose/typegoose/commit/89810b8e53c35a9cde407b1077487a16c945abe6))
* **types::KeyStringAny:** simplify type by using "Record" ([77c9502](https://github.com/typegoose/typegoose/commit/77c95022209c7bf3626af267b8fc8ccb2f1a45a4))
* **types::ReturnModelType:** update tsdoc ([bb66145](https://github.com/typegoose/typegoose/commit/bb661456c5d8fa5e9c0fc3bf022620d07d7c8b62))
* **types::VirtualPopulateMap:** change map type to not be coerced to "any" ([b3c43ac](https://github.com/typegoose/typegoose/commit/b3c43acbf5ad742068d2bf58570a6733474a3d3c))
* **utils::getClass:** update tsdoc to reflect current implementation ([51d2eba](https://github.com/typegoose/typegoose/commit/51d2eba4961b846f3938f281886380291be6e992))

## [9.10.0-beta.10](https://github.com/typegoose/typegoose/compare/v9.10.0-beta.9...v9.10.0-beta.10) (2022-07-02)


### Style

* **types::IndexOptions:** add TODO for typegoose 10 ([edcd0c4](https://github.com/typegoose/typegoose/commit/edcd0c4af536d1787dd4fae4d7d9786c6e431e87))

## [9.10.0-beta.9](https://github.com/typegoose/typegoose/compare/v9.10.0-beta.8...v9.10.0-beta.9) (2022-07-02)


### Dependencies

* **@types/jest:** upgrade to 28.1.4 ([feb2ece](https://github.com/typegoose/typegoose/commit/feb2ece6d190ab28d9c918f16c3a29f6fea3b49b))
* **@typescript-eslint/*:** upgrade to 5.30.3 ([7a722e1](https://github.com/typegoose/typegoose/commit/7a722e13be77d15c1b2d8a93f1c347ec8952a74e))
* **eslint:** upgrade to 8.19.0 ([f5940b4](https://github.com/typegoose/typegoose/commit/f5940b45b7675f89738d1c0081f45570f7dfc4e5))
* **eslint-plugin-prettier:** upgrade to 4.2.1 ([b1acd20](https://github.com/typegoose/typegoose/commit/b1acd20eacfdbb75faaebb6a88c5e9c191268e19))
* **jest:** upgrade to 28.1.2 ([e8139e2](https://github.com/typegoose/typegoose/commit/e8139e2f3d3b6364031b7f7f9f31026e14236513))
* **mongodb-memory-server:** upgrade to 8.7.2 ([c81fb51](https://github.com/typegoose/typegoose/commit/c81fb5165fc4bebe26ae372d542c736ffdca9106))
* **mongoose:** upgrade to 6.4.2 ([1558851](https://github.com/typegoose/typegoose/commit/15588515b22cc8fd1733931f0ef624319063502e))


### Fixes

* **types::BasePropOptions:** update "enum" to use mongoose's types ([8c8a6e2](https://github.com/typegoose/typegoose/commit/8c8a6e27a5d4ed7e724c43908b1846be26d777e3))
* **types::DocumentType:** add correct generic for "toJSON" and "toObject" types ([026482d](https://github.com/typegoose/typegoose/commit/026482df5fd43775b6073ceb55e2bd0bffb0dbc5)), closes [typegoose/typegoose#732](https://github.com/typegoose/typegoose/issues/732)
* **types::IIndexArray:** remove generic ([9983ce9](https://github.com/typegoose/typegoose/commit/9983ce9f81ceca9097aa6d4295a5f117c5687bc8))
* **types::IPluginsArray:** remove generic ([abff87e](https://github.com/typegoose/typegoose/commit/abff87e81134f2e4b60bd3187716b32dda61f4a9))
* **types::VirtualOptions:** update "match" to use mongoose's types ([dc6680f](https://github.com/typegoose/typegoose/commit/dc6680f207a82a7e8f2035925c40262523510feb))


### Style

* **types::BeAnObject:** update tsdoc to explain difference with "KeyStringAny" ([3448fde](https://github.com/typegoose/typegoose/commit/3448fde733aee2d51558897e082894170b08b27c))
* **types::EmptyVoidFn:** fix typo in tsdoc ([93aab06](https://github.com/typegoose/typegoose/commit/93aab0660f4bed680fc91360378cd8e9013531dc))
* **types::IObjectWithTypegooseName:** deprecate interface and value ([89810b8](https://github.com/typegoose/typegoose/commit/89810b8e53c35a9cde407b1077487a16c945abe6))
* **types::KeyStringAny:** simplify type by using "Record" ([77c9502](https://github.com/typegoose/typegoose/commit/77c95022209c7bf3626af267b8fc8ccb2f1a45a4))
* **types::ReturnModelType:** update tsdoc ([bb66145](https://github.com/typegoose/typegoose/commit/bb661456c5d8fa5e9c0fc3bf022620d07d7c8b62))
* **types::VirtualPopulateMap:** change map type to not be coerced to "any" ([b3c43ac](https://github.com/typegoose/typegoose/commit/b3c43acbf5ad742068d2bf58570a6733474a3d3c))

## [9.10.0-beta.8](https://github.com/typegoose/typegoose/compare/v9.10.0-beta.7...v9.10.0-beta.8) (2022-06-30)


### Fixes

* **types::DocumentType:** simplify conditional ([be59b7a](https://github.com/typegoose/typegoose/commit/be59b7ac195143887b927c113d9ee8f369cef778))

## [9.10.0-beta.7](https://github.com/typegoose/typegoose/compare/v9.10.0-beta.6...v9.10.0-beta.7) (2022-06-28)


### Dependencies

* **@types/jest:** upgrade to 28.1.3 ([86c9b8e](https://github.com/typegoose/typegoose/commit/86c9b8e444696dbd6a836c55c76d2340240bcb88))
* **@typescript-eslint/*:** upgrade to 5.30.0 ([e87dffd](https://github.com/typegoose/typegoose/commit/e87dffd81ea1b1734ba56f9e64c6cdd65af658fa))
* **eslint-plugin-prettier:** upgrade to 4.1.0 ([bde224a](https://github.com/typegoose/typegoose/commit/bde224ad9d238326a5c7219c41f6972c20c81216))
* **mongodb-memory-server:** upgrade to 8.7.1 ([2f382b6](https://github.com/typegoose/typegoose/commit/2f382b6d255880b3ee4f31bdf958cd5a943811f1))

## [9.10.0-beta.6](https://github.com/typegoose/typegoose/compare/v9.10.0-beta.5...v9.10.0-beta.6) (2022-06-26)


### Fixes

* **index:** change "fields" to use mongoose's "IndexDefinition" type ([38862e0](https://github.com/typegoose/typegoose/commit/38862e0463991df73a9d9532cf59c6b0cd981b3b))

## [9.10.0-beta.5](https://github.com/typegoose/typegoose/compare/v9.10.0-beta.4...v9.10.0-beta.5) (2022-06-24)


### Fixes

* **typegoose::getModelWithString:** allow specifying QueryHelpers for return model ([441113b](https://github.com/typegoose/typegoose/commit/441113b7037a816d41686fa1a4bd9ddbbddb34fe))


### Style

* **typeguards:isRefType*:** add tsdoc for "refType" parameter ([c704bb6](https://github.com/typegoose/typegoose/commit/c704bb6c5e7ca399e04fecb4afd7a5fb63626846))
* **utils::getClass:** update tsdoc to reflect current implementation ([51d2eba](https://github.com/typegoose/typegoose/commit/51d2eba4961b846f3938f281886380291be6e992))

## [9.10.0-beta.4](https://github.com/typegoose/typegoose/compare/v9.10.0-beta.3...v9.10.0-beta.4) (2022-06-20)


### Dependencies

* **@types/jest:** upgrade to 28.1.2 ([8fda636](https://github.com/typegoose/typegoose/commit/8fda636d1048c4d04c5224d3cc8f381789193ba2))
* **eslint:** upgrade to 8.18.0 ([4eb6b5a](https://github.com/typegoose/typegoose/commit/4eb6b5aecf1c484436e6e758351419aeb21b3150))
* **mongodb-memory-server:** upgrade to 8.7.0 ([7427db7](https://github.com/typegoose/typegoose/commit/7427db78e9c47f68e677e0d758bc92bb293ab3b2))

## [9.10.0-beta.3](https://github.com/typegoose/typegoose/compare/v9.10.0-beta.2...v9.10.0-beta.3) (2022-06-18)


### Style

* **types:** add "SubDocumentType" and "ArraySubDocumentType" to supplement DocumentType ([72d49c1](https://github.com/typegoose/typegoose/commit/72d49c1a6e16440abb0050f1594280d54ccfd63c))


### Fixes

* **typegoose:** re-export type "SubDocumentType" and "ArraySubDocumentType" ([16dadd5](https://github.com/typegoose/typegoose/commit/16dadd530b2255fe1e5519d339ff05ffa50d7732))

## [9.10.0-beta.2](https://github.com/typegoose/typegoose/compare/v9.10.0-beta.1...v9.10.0-beta.2) (2022-06-17)


### Dependencies

* **@types/node:** upgrade to 12.20.55 ([3e09201](https://github.com/typegoose/typegoose/commit/3e09201cfe18cab63c569c6aca1d66eea170e108))
* **@types/semver:** upgrade to 7.3.10 ([92288de](https://github.com/typegoose/typegoose/commit/92288de5a45cbab0c541b84caf86c4db2cadaf8e))
* **@typescript-eslint/*:** upgrade to 5.28.0 ([44f1388](https://github.com/typegoose/typegoose/commit/44f13882146aaea29ca2eabc0f0af92f98a8900e))
* **jest:** upgrade to 28.1.1 ([980ea20](https://github.com/typegoose/typegoose/commit/980ea20146eb395dbbacb04f55e97e252b6e18df))
* **mongodb-memory-server:** upgrade to 8.6.1 ([a5335f0](https://github.com/typegoose/typegoose/commit/a5335f0fe04f97105e322d8de9ba72b9e0ea1fbf))
* **prettier:** upgrade to 2.7.1 ([8a47e33](https://github.com/typegoose/typegoose/commit/8a47e33016999dd88731473db53148ac3cdb5300))
* **ts-jest:** upgrade to 28.0.5 ([d663713](https://github.com/typegoose/typegoose/commit/d6637131ba124bc42fa59d82d7d9c997a620733c))

## [9.10.0-beta.1](https://github.com/typegoose/typegoose/compare/v9.9.0...v9.10.0-beta.1) (2022-06-05)


### Features

* **utils:** allow setting warnMixed Severity as property option ([ff793d1](https://github.com/typegoose/typegoose/commit/ff793d1201682e54b19927a525cfcec1c11fc2ec)), closes [typegoose/typegoose#620](https://github.com/typegoose/typegoose/issues/620)


### Dependencies

* **@types/jest:** upgrade to 28.1.1 ([9521a04](https://github.com/typegoose/typegoose/commit/9521a04d5f500acb145eb7bca0f6a0fef87babe8))
* **@types/node:** upgrade to 12.20.54 ([2bf4bdd](https://github.com/typegoose/typegoose/commit/2bf4bdd4eabfaaaf2a2c2d726b4c3a8c857eb8b4))
* **eslint:** upgrade to 8.17.0 ([5dec6cc](https://github.com/typegoose/typegoose/commit/5dec6cc58105ed7fd868a8a433945d4ed35ea60c))
* **ts-jest:** upgrade to 28.0.4 ([aaf494b](https://github.com/typegoose/typegoose/commit/aaf494bc39abec1220e2aca41070265c758845bb))

## [9.9.0](https://github.com/typegoose/typegoose/compare/v9.8.1...v9.9.0) (2022-06-03)


### Features

* **typegoose::getDiscriminatorModelForClass:** add option to overwrite ModelOptions ([1c7460e](https://github.com/typegoose/typegoose/commit/1c7460e9c20821cb007a709ab25320904dac72d6)), closes [typegoose/typegoose#713](https://github.com/typegoose/typegoose/issues/713)


### Refactor

* **typegoose::getModelForClass:** assign options to new value instead of re-assigning ([2e2f304](https://github.com/typegoose/typegoose/commit/2e2f3044223854bed02556788e775bf31e0a0ba2))
* **typegoose::getModelForClass:** rename value to be more intuitive ([b504314](https://github.com/typegoose/typegoose/commit/b504314c0288e203bcf9564678973a0a6a05e657))
* **utils::getName:** rename a parameter to be more intuitive ([cbdf759](https://github.com/typegoose/typegoose/commit/cbdf75904439753def36d5a756c19178a1b122c1))


### Dependencies

* **@types/jest:** upgrade to 27.5.1 ([ef199ce](https://github.com/typegoose/typegoose/commit/ef199cee202ad3c833c7fbde91d8608a9a7b30cf))
* **@types/lodash:** upgrade to 4.14.182 ([b1f5cb1](https://github.com/typegoose/typegoose/commit/b1f5cb1d245b6710415ff8e1c73ceb28db0f6350))
* **@types/node:** upgrade to 12.20.52 ([72cb216](https://github.com/typegoose/typegoose/commit/72cb2161653f6dc84123108caedc88690aae7122))
* **@typescript-eslint/*:** upgrade to 5.26.0 ([5b25b23](https://github.com/typegoose/typegoose/commit/5b25b23bb7915d3b587ca71f027d62164a071f07))
* **commitlint:** upgrade to 16.3.0 ([dd7301e](https://github.com/typegoose/typegoose/commit/dd7301e9edfa389dc9a1e7a8ef328da5158a6bf5))
* **eslint:** upgrade to 8.16.0 ([2be72ac](https://github.com/typegoose/typegoose/commit/2be72ac054a2886b7e48aafd29b62019927a7036))
* **jest:** upgrade to 28.1.0 ([661b10b](https://github.com/typegoose/typegoose/commit/661b10b7c15a6faff0baf4a195090da4843005b3))
* **mongodb-memory-server:** upgrade to 8.6.0 ([47bfcc4](https://github.com/typegoose/typegoose/commit/47bfcc4325a6a08ae6921e69c5a85249a42cd253))
* **mongoose:** upgrade to 6.3.5 ([7f70529](https://github.com/typegoose/typegoose/commit/7f70529fa5bbcad3d767fdd1cf6bc40481c497f7))
* **tslib:** upgrade to 2.4.0 ([8417ba1](https://github.com/typegoose/typegoose/commit/8417ba17f5183d3e25e07d9160033e6ea7e67d65))


### Style

* **constants:** add tsdoc deprecate to backwards-compat Value ([0791807](https://github.com/typegoose/typegoose/commit/079180711d6dc829d7b70b8404446228c542c304))
* **errors::InvalidWhatIsItError:** add tsdoc deprecate to backwards-compat error ([eec2843](https://github.com/typegoose/typegoose/commit/eec2843a20348ffd73bc36787d43594273d697ef))
* **globalOptions:** update tsdoc ([c10271b](https://github.com/typegoose/typegoose/commit/c10271b0e40a2d50af7bdee5f9bbe0ac3142bc2f))
* **index:** update tsdoc ([3f3723a](https://github.com/typegoose/typegoose/commit/3f3723aab1bc476c9782dae573f0cf33b5fffd97))
* **modelOptions:** update tsdoc ([a95d0aa](https://github.com/typegoose/typegoose/commit/a95d0aa0b1c007900cc69b220f91723abeb1cf30))
* **plugin:** update tsdoc ([1753514](https://github.com/typegoose/typegoose/commit/175351457e961d72f9d60756442cbad69784bfb0))
* **prop:** update tsdoc ([619c7d7](https://github.com/typegoose/typegoose/commit/619c7d7f2acd6fb9842a43cb634a439ca6795dd2))
* **queryMethod:** update tsdoc ([c4e2632](https://github.com/typegoose/typegoose/commit/c4e26320af73d03e6900948ebbd5b4066b59c3f7))
* **schema::_buildSchema:** update tsdoc to current implementation ([082de9f](https://github.com/typegoose/typegoose/commit/082de9f3033abcf4e8fdc2be53e3db635cf60440))
* **typegoose:** add best-guess comment explaining why "rawOption" is used for "getName" ([89c4b1b](https://github.com/typegoose/typegoose/commit/89c4b1bfead50401ab71ad6987ab79522250c8ec))
* **typegoose:** fix missing and incorrect tsdoc ([1cb946f](https://github.com/typegoose/typegoose/commit/1cb946f04a76b5948a994d27458a1990f397db69))
* **typegoose:** update tsdoc ([07acb61](https://github.com/typegoose/typegoose/commit/07acb6166457e374a93d07fa146ddbb617a6cff5))
* **typeguards:** update tsdoc ([1c05684](https://github.com/typegoose/typegoose/commit/1c056843c50a854f1f787f2b089dc278d27c5070))
* **types:** update tsdoc ([15488e6](https://github.com/typegoose/typegoose/commit/15488e6dcc6e6143776a1c7c18cf369d839b2ca6))
* **utils:** update tsdoc to match current implementations ([f2a10d0](https://github.com/typegoose/typegoose/commit/f2a10d022e8142f6046ce7572fc7f4012dd1a360))
* **utils::getName:** change tsdoc to be more descriptive ([f10eb35](https://github.com/typegoose/typegoose/commit/f10eb35961ea0668ac2e5b4da267db82c340aac9))
* **utils::mergeMetadata:** add "returns" tsdoc ([109fb7d](https://github.com/typegoose/typegoose/commit/109fb7d5440acc86dc495caf58d2ffe9cbc7b496))


### Fixes

* **types::BasePropOptions:** replace "set" & "get" with upstream types ([51296f4](https://github.com/typegoose/typegoose/commit/51296f4b62cf9fec9bd55c02f61d1a338ac91983))
* **types::IndexOptions:** remove options that has been fixed upstream ([98c1918](https://github.com/typegoose/typegoose/commit/98c19183caade70d00f908d29c466abb09779c5f))
* **types::ValidateStringOptions:** replace "match" with upstream types ([f290fad](https://github.com/typegoose/typegoose/commit/f290fad470ce4bacd0b87fe3b04119a589f35cec))
* **types::VirtualOptions:** replace options with upstream types ([e2c721a](https://github.com/typegoose/typegoose/commit/e2c721a736ee07a4c3444d35ffc7e3c37ed6c6ab))

## [9.9.0-beta.3](https://github.com/typegoose/typegoose/compare/v9.9.0-beta.2...v9.9.0-beta.3) (2022-06-01)


### Style

* **constants:** add tsdoc deprecate to backwards-compat Value ([0791807](https://github.com/typegoose/typegoose/commit/079180711d6dc829d7b70b8404446228c542c304))
* **errors::InvalidWhatIsItError:** add tsdoc deprecate to backwards-compat error ([eec2843](https://github.com/typegoose/typegoose/commit/eec2843a20348ffd73bc36787d43594273d697ef))
* **globalOptions:** update tsdoc ([c10271b](https://github.com/typegoose/typegoose/commit/c10271b0e40a2d50af7bdee5f9bbe0ac3142bc2f))
* **index:** update tsdoc ([3f3723a](https://github.com/typegoose/typegoose/commit/3f3723aab1bc476c9782dae573f0cf33b5fffd97))
* **modelOptions:** update tsdoc ([a95d0aa](https://github.com/typegoose/typegoose/commit/a95d0aa0b1c007900cc69b220f91723abeb1cf30))
* **plugin:** update tsdoc ([1753514](https://github.com/typegoose/typegoose/commit/175351457e961d72f9d60756442cbad69784bfb0))
* **prop:** update tsdoc ([619c7d7](https://github.com/typegoose/typegoose/commit/619c7d7f2acd6fb9842a43cb634a439ca6795dd2))
* **queryMethod:** update tsdoc ([c4e2632](https://github.com/typegoose/typegoose/commit/c4e26320af73d03e6900948ebbd5b4066b59c3f7))
* **typegoose:** update tsdoc ([07acb61](https://github.com/typegoose/typegoose/commit/07acb6166457e374a93d07fa146ddbb617a6cff5))
* **typeguards:** update tsdoc ([1c05684](https://github.com/typegoose/typegoose/commit/1c056843c50a854f1f787f2b089dc278d27c5070))
* **types:** update tsdoc ([15488e6](https://github.com/typegoose/typegoose/commit/15488e6dcc6e6143776a1c7c18cf369d839b2ca6))
* **utils:** update tsdoc to match current implementations ([f2a10d0](https://github.com/typegoose/typegoose/commit/f2a10d022e8142f6046ce7572fc7f4012dd1a360))


### Fixes

* **types::BasePropOptions:** replace "set" & "get" with upstream types ([51296f4](https://github.com/typegoose/typegoose/commit/51296f4b62cf9fec9bd55c02f61d1a338ac91983))
* **types::IndexOptions:** remove options that has been fixed upstream ([98c1918](https://github.com/typegoose/typegoose/commit/98c19183caade70d00f908d29c466abb09779c5f))
* **types::ValidateStringOptions:** replace "match" with upstream types ([f290fad](https://github.com/typegoose/typegoose/commit/f290fad470ce4bacd0b87fe3b04119a589f35cec))
* **types::VirtualOptions:** replace options with upstream types ([e2c721a](https://github.com/typegoose/typegoose/commit/e2c721a736ee07a4c3444d35ffc7e3c37ed6c6ab))

## [9.9.0-beta.2](https://github.com/typegoose/typegoose/compare/v9.9.0-beta.1...v9.9.0-beta.2) (2022-05-30)


### Dependencies

* **mongoose:** upgrade to 6.3.5 ([7f70529](https://github.com/typegoose/typegoose/commit/7f70529fa5bbcad3d767fdd1cf6bc40481c497f7))

## [9.9.0-beta.1](https://github.com/typegoose/typegoose/compare/v9.8.1...v9.9.0-beta.1) (2022-05-28)


### Features

* **typegoose::getDiscriminatorModelForClass:** add option to overwrite ModelOptions ([1c7460e](https://github.com/typegoose/typegoose/commit/1c7460e9c20821cb007a709ab25320904dac72d6)), closes [typegoose/typegoose#713](https://github.com/typegoose/typegoose/issues/713)


### Style

* **schema::_buildSchema:** update tsdoc to current implementation ([082de9f](https://github.com/typegoose/typegoose/commit/082de9f3033abcf4e8fdc2be53e3db635cf60440))
* **typegoose:** add best-guess comment explaining why "rawOption" is used for "getName" ([89c4b1b](https://github.com/typegoose/typegoose/commit/89c4b1bfead50401ab71ad6987ab79522250c8ec))
* **typegoose:** fix missing and incorrect tsdoc ([1cb946f](https://github.com/typegoose/typegoose/commit/1cb946f04a76b5948a994d27458a1990f397db69))
* **utils::getName:** change tsdoc to be more descriptive ([f10eb35](https://github.com/typegoose/typegoose/commit/f10eb35961ea0668ac2e5b4da267db82c340aac9))
* **utils::mergeMetadata:** add "returns" tsdoc ([109fb7d](https://github.com/typegoose/typegoose/commit/109fb7d5440acc86dc495caf58d2ffe9cbc7b496))


### Refactor

* **typegoose::getModelForClass:** assign options to new value instead of re-assigning ([2e2f304](https://github.com/typegoose/typegoose/commit/2e2f3044223854bed02556788e775bf31e0a0ba2))
* **typegoose::getModelForClass:** rename value to be more intuitive ([b504314](https://github.com/typegoose/typegoose/commit/b504314c0288e203bcf9564678973a0a6a05e657))
* **utils::getName:** rename a parameter to be more intuitive ([cbdf759](https://github.com/typegoose/typegoose/commit/cbdf75904439753def36d5a756c19178a1b122c1))


### Dependencies

* **@types/jest:** upgrade to 27.5.1 ([ef199ce](https://github.com/typegoose/typegoose/commit/ef199cee202ad3c833c7fbde91d8608a9a7b30cf))
* **@types/lodash:** upgrade to 4.14.182 ([b1f5cb1](https://github.com/typegoose/typegoose/commit/b1f5cb1d245b6710415ff8e1c73ceb28db0f6350))
* **@types/node:** upgrade to 12.20.52 ([72cb216](https://github.com/typegoose/typegoose/commit/72cb2161653f6dc84123108caedc88690aae7122))
* **@typescript-eslint/*:** upgrade to 5.26.0 ([5b25b23](https://github.com/typegoose/typegoose/commit/5b25b23bb7915d3b587ca71f027d62164a071f07))
* **commitlint:** upgrade to 16.3.0 ([dd7301e](https://github.com/typegoose/typegoose/commit/dd7301e9edfa389dc9a1e7a8ef328da5158a6bf5))
* **eslint:** upgrade to 8.16.0 ([2be72ac](https://github.com/typegoose/typegoose/commit/2be72ac054a2886b7e48aafd29b62019927a7036))
* **jest:** upgrade to 28.1.0 ([661b10b](https://github.com/typegoose/typegoose/commit/661b10b7c15a6faff0baf4a195090da4843005b3))
* **mongodb-memory-server:** upgrade to 8.6.0 ([47bfcc4](https://github.com/typegoose/typegoose/commit/47bfcc4325a6a08ae6921e69c5a85249a42cd253))
* **tslib:** upgrade to 2.4.0 ([8417ba1](https://github.com/typegoose/typegoose/commit/8417ba17f5183d3e25e07d9160033e6ea7e67d65))

### [9.8.1](https://github.com/typegoose/typegoose/compare/v9.8.0...v9.8.1) (2022-04-21)

The Type change in this release may break some array post hooks and need to be separated

### Fixes

* **hooks:** add "this" typing for post-query hooks ([44ff1c1](https://github.com/typegoose/typegoose/commit/44ff1c120dccf2aaab78df0500484547244404f5)), closes [typegoose/typegoose#694](https://github.com/typegoose/typegoose/issues/694)

## [9.8.0](https://github.com/typegoose/typegoose/compare/v9.7.1...v9.8.0) (2022-04-16)


### Dependencies

* **@types/jest:** upgrade to 27.4.1 ([f1f1f7c](https://github.com/typegoose/typegoose/commit/f1f1f7cca9ba856847dcd5d48333769a049efc5f))
* **@types/lodash:** upgrade to 4.14.181 ([02b1aee](https://github.com/typegoose/typegoose/commit/02b1aee313c8464b729aec57219d1a12fb22c3fc))
* **@typescript-eslint/*:** upgrade to 5.19.0 ([c86c5c8](https://github.com/typegoose/typegoose/commit/c86c5c8b50b4078a8b0e542da06a223bb86f4cfd))
* **commitlint:** upgrade to 16.2.3 ([c486229](https://github.com/typegoose/typegoose/commit/c4862290629334e54af4e6b62f7e7884d981fa2d))
* **eslint:** upgrade to 8.13.0 ([c6b8038](https://github.com/typegoose/typegoose/commit/c6b80383432b5e78e6f3a47b07cec08210d55a03))
* **eslint-config-prettier:** upgrade to 8.5.0 ([0f62917](https://github.com/typegoose/typegoose/commit/0f629172b78f8dccf7d041794de9866428ab3885))
* **mongodb-memory-server:** upgrade to 8.5.0 ([7392b77](https://github.com/typegoose/typegoose/commit/7392b7747edd058660d6b257e0d99a491b44500d))
* **mongoose:** upgrade to 6.3.0 ([2419824](https://github.com/typegoose/typegoose/commit/2419824219e7907dd8f8788125594ff6809a41c6))
* **prettier:** upgrade to 2.6.2 ([f2adbc6](https://github.com/typegoose/typegoose/commit/f2adbc6d86ddea8db461d930c1970d5615213151))
* **semver:** upgrade to 7.3.7 ([367d797](https://github.com/typegoose/typegoose/commit/367d79793c303fe122e1e4059869e06d3b46ae54))
* **ts-jest:** upgrade to 27.1.4 ([4358ecc](https://github.com/typegoose/typegoose/commit/4358ecc1571d91aee443802506368d646c8bb031))


### Fixes

* **types::VirtualOptions:** fix "localField" and "foreignField" typings ([eb6521b](https://github.com/typegoose/typegoose/commit/eb6521be5086f919287ece15807116d5a9506ce3)), closes [typegoose/typegoose#674](https://github.com/typegoose/typegoose/issues/674)

### [9.7.1](https://github.com/typegoose/typegoose/compare/v9.7.0...v9.7.1) (2022-03-23)


### Style

* **utils::mapOptions:** add proper interface for return type ([3deb4ec](https://github.com/typegoose/typegoose/commit/3deb4ecc283145badb251b01974531f9f2896e87))


### Fixes

* **processProp:** fix handling map-array values ([36deb80](https://github.com/typegoose/typegoose/commit/36deb80cd9a63542eb16c0a0fcb5db84ce5db81e)), closes [typegoose/typegoose#682](https://github.com/typegoose/typegoose/issues/682)

## [9.7.0](https://github.com/typegoose/typegoose/compare/v9.6.2...v9.7.0) (2022-02-22)


### Fixes

* **types::QueryHelperThis:** fix missing QueryHelpers in DocumentType ([03a39de](https://github.com/typegoose/typegoose/commit/03a39de4754637b1f1fec4a9840b8c4c30901226))


### Dependencies

* **@typescript-eslint/*:** upgrade to 5.12.1 ([a59ed73](https://github.com/typegoose/typegoose/commit/a59ed73e719466cc1e347a9bc2b30493ad02917e))
* **commitlint:** upgrade to 16.2.1 ([c3005bf](https://github.com/typegoose/typegoose/commit/c3005bf9baf5f95fc52e112fef370816aa27c1b9))
* **eslint:** upgrade to 8.9.0 ([2cf59f0](https://github.com/typegoose/typegoose/commit/2cf59f074ebd062f0eeb04674e14ba483edadef0))
* **eslint-config-prettier:** upgrade to 8.4.0 ([9344989](https://github.com/typegoose/typegoose/commit/9344989d65ebcebc3bbd5a717782efef1c9ee7b7))
* **jest:** upgrade to 27.5.1 ([02670ca](https://github.com/typegoose/typegoose/commit/02670caf704c17bbbd54147c71159ef7911fd4ab))
* **mongodb-memory-server:** upgrade to 8.4.0 ([ccea634](https://github.com/typegoose/typegoose/commit/ccea634e966856eab795af84203ef42cb21c5e0d))
* **mongoose:** upgrade to 6.2.3 ([6044db0](https://github.com/typegoose/typegoose/commit/6044db07af45bea25b0489d6b54299b5918bc1eb))

### [9.6.2](https://github.com/typegoose/typegoose/compare/v9.6.1...v9.6.2) (2022-02-07)


### Fixes

* **dependencies:** fix mongoose peer-dependency requirement ([#669](https://github.com/typegoose/typegoose/issues/669)) ([80eefcd](https://github.com/typegoose/typegoose/commit/80eefcd9e74b4cf65070b6a890572c99a4303998))

### [9.6.1](https://github.com/typegoose/typegoose/compare/v9.6.0...v9.6.1) (2022-02-07)


### Fixes

* **typegoose::getDiscriminatorModelForClass:** try to fix webstorm inspection loop ([5d3e88e](https://github.com/typegoose/typegoose/commit/5d3e88eed2394f6dfb31bfc178cef42fe9980ded)), closes [typegoose/typegoose#664](https://github.com/typegoose/typegoose/issues/664)

## [9.6.0](https://github.com/typegoose/typegoose/compare/v9.5.0...v9.6.0) (2022-02-05)


### Features

* update queryMethod to use more correct type for "this" ([d121528](https://github.com/typegoose/typegoose/commit/d1215282eb761aabcfcfcb4f1d66808f1ab04cee)), closes [typegoose/typegoose#665](https://github.com/typegoose/typegoose/issues/665)


### Fixes

* **types:** change type of "foreignField" from "DeferredFunc" to "DynamicStringFunc" ([541aaf7](https://github.com/typegoose/typegoose/commit/541aaf76f16dddf177172b82eb29f0c9ee571ca2))
* **utils::warnMixed:** add debug log to show model-options on WARN ([31942cd](https://github.com/typegoose/typegoose/commit/31942cd7e66537148b53033415ca6e7e091414db))


### Dependencies

* **@types/node:** upgrade to 12.20.43 ([842072c](https://github.com/typegoose/typegoose/commit/842072c2a349bf27015d6bb73cd7de6ad04d1e6c)), closes [typegoose/typegoose#656](https://github.com/typegoose/typegoose/issues/656)
* **@typescript-eslint/*:** upgrade to 5.10.2 ([ceac979](https://github.com/typegoose/typegoose/commit/ceac9793f0499febe3e1fbe0c2438fe2226427a9))
* **commitlint:** upgrade to 16.1.0 ([d3382f9](https://github.com/typegoose/typegoose/commit/d3382f9241bc285e09fe649d7e978e4d5e05e0b2))
* **eslint:** upgrade to 8.8.0 ([4016c33](https://github.com/typegoose/typegoose/commit/4016c338eed6aa2493f97e4af4dc7477b6ffe82f))
* **jest:** upgrade to 27.5.0 ([3d3defa](https://github.com/typegoose/typegoose/commit/3d3defa8d126fbcd1f12ac94ccb7302b08b18696))
* **mongodb-memory-server:** upgrade to 8.3.0 ([47a283c](https://github.com/typegoose/typegoose/commit/47a283c4a8b1e099d9eeac4594df14f34142efa0))
* **mongoose:** upgrade to 6.2.0 ([b4e8ec8](https://github.com/typegoose/typegoose/commit/b4e8ec8f5cc788881c05f765e8a1695a157002d5))
* **ts-jest:** upgrade to 27.1.3 ([d6ec965](https://github.com/typegoose/typegoose/commit/d6ec965969d22f923e7badb81f188206d56119c9))

## [9.5.0](https://github.com/typegoose/typegoose/compare/v9.4.0...v9.5.0) (2022-01-14)


### Refactor

* rename enum "WhatIsIt" to "PropType" (with backwards-compat) ([6cfa6ca](https://github.com/typegoose/typegoose/commit/6cfa6ca98ad89f80de61ace4b41679767d857b9b)), closes [typegoose/typegoose#653](https://github.com/typegoose/typegoose/issues/653)


### Fixes

* **typegoose:** re-export "PropType" from main entry-point ([123d586](https://github.com/typegoose/typegoose/commit/123d586e9d2adf89b31b9916002fdb0588bdfb04)), closes [typegoose/typegoose#653](https://github.com/typegoose/typegoose/issues/653)


### Dependencies

* **@types/jest:** upgrade to 27.4.0 ([94516e9](https://github.com/typegoose/typegoose/commit/94516e9f50134788a9567dbb9d0eed051fd80361))
* **@types/node:** upgrade to 12.20.39 and lock version ([1175d35](https://github.com/typegoose/typegoose/commit/1175d35c2d540365d64d13ba80e68e1340db433e))
* **@typescript-eslint/*:** upgrade to 5.9.1 ([5c8cd82](https://github.com/typegoose/typegoose/commit/5c8cd82e4b1ce956112fabffbd571037b72d6dbf))
* **commitlint:** upgrade to 16.0.2 ([6060fc6](https://github.com/typegoose/typegoose/commit/6060fc6c64b105aeaa8ebe6bb8bca47bb41f18c8))
* **eslint:** upgrade to 8.6.0 ([92c7aa2](https://github.com/typegoose/typegoose/commit/92c7aa2b28b782cb234076eb539b5502ffdee37b))
* **jest:** upgrade to 27.4.7 ([3a74b2a](https://github.com/typegoose/typegoose/commit/3a74b2a4c2334556049712024dab0644d8c39fe3))
* **mongoose:** upgrade to 6.1.6 ([8a0404e](https://github.com/typegoose/typegoose/commit/8a0404e3840f73bb55d6629d9139ae6765f34159))

## [9.4.0](https://github.com/typegoose/typegoose/compare/v9.3.1...v9.4.0) (2021-12-22)


### Features

* **errors:** add custom Error "ExpectedTypeError" ([506d145](https://github.com/typegoose/typegoose/commit/506d1459de2aab9da16fe35cb8fb58b0c66268b0))
* **errors:** add Error "OptionDoesNotSupportOptionError", merge E020 and E021 into E027 ([04491ad](https://github.com/typegoose/typegoose/commit/04491adc69fe9668e4e9663cefeea76eaa22788e))
* **errors:** move Error E014 into custom Error "ResolveTypegooseNameError" ([3ca1a67](https://github.com/typegoose/typegoose/commit/3ca1a6731d09ec9e81c382eb401d5b09dbf00d9c))
* **errors::NoValidClassError:** add Error Code to Error and change message ([32db334](https://github.com/typegoose/typegoose/commit/32db334d45c61cad977b19d554e84db74b2eec2c))
* **globalOptions:** change to use custom Error "ExpectedTypeError" ([c6540a5](https://github.com/typegoose/typegoose/commit/c6540a5913c73d3cc8adeb69deef2fb849fd3b34))
* **hooks::addToHooks:** change to use "ExpectedTypeError" 1 ([b8d630f](https://github.com/typegoose/typegoose/commit/b8d630f464fb0b63297a3d01c3408b03479fb8fd))
* **hooks::addToHooks:** change to use "ExpectedTypeError" 2 ([4769658](https://github.com/typegoose/typegoose/commit/4769658ea6cfa0933cd5b0e2b1044ba56efeb22b))
* **processProp:** use custom Error "InvalidEnumTypeError" ([83f131b](https://github.com/typegoose/typegoose/commit/83f131bd6f087ce240ec9de6f91e04001fc58c0f))
* **schema:** use custom Error "NoDiscriminatorFunctionError" ([00de1cf](https://github.com/typegoose/typegoose/commit/00de1cfdc02fbb4b306d4e729adacd59120533fa))
* **schema:** use custom Error "PathNotInSchemaError" ([a897e0c](https://github.com/typegoose/typegoose/commit/a897e0caa3083dac8a12cb903daceaccaff0d8d2))
* **typegoose::deleteModel:** change to use custom Error "ExpectedTypeError" ([90268b9](https://github.com/typegoose/typegoose/commit/90268b9edd18cbaa9d4467e57d6d8cb086aef477))
* **typegoose::getModelWithString:** change to use custom Error "ExpectedTypeError" ([ebcab71](https://github.com/typegoose/typegoose/commit/ebcab71b56425e28753dd9f5fc06b41a48537a47))
* **typegoose:deleteModel:** change to not error when not existing ([fc30052](https://github.com/typegoose/typegoose/commit/fc300521ce4b96fc1372e45859664713351a6819))
* **utils::getName:** throw Error when "cl" cannot be resolved to a constructor ([7800289](https://github.com/typegoose/typegoose/commit/7800289899ddb04cebc629239aef000b72cd0e40))
* **utils::mapOptions:** use custom Error "InvalidOptionsConstructor" ([8199f2f](https://github.com/typegoose/typegoose/commit/8199f2f18c8ee24f38ee1a2f62882af78f32c1c1))


### Style

* add more Error REFACTOR and TODO comments ([108301e](https://github.com/typegoose/typegoose/commit/108301e4a13c3b6f32a987353a23c6eeb37e14d1))


### Dependencies

* **@types/lodash:** upgrade to 4.14.178 ([ea8ff31](https://github.com/typegoose/typegoose/commit/ea8ff310469e90140349466f36751ae405b8adc4))
* **@types/node:** upgrade to 12.20.38 ([35d9822](https://github.com/typegoose/typegoose/commit/35d9822a6eb8de897c3fa73dbbb1b7f84bbb3192))
* **@typescript-eslint/*:** upgrade to 5.7.0 ([0197ffe](https://github.com/typegoose/typegoose/commit/0197ffe86dd252ae568c8721c9b6dc613ceb0059))
* **@typescript-eslint/*:** upgrade to 5.8.0 ([d7fcad1](https://github.com/typegoose/typegoose/commit/d7fcad1040de81caf535492982f10aa2e0bd0485))
* **eslint:** upgrade to 8.4.1 ([aff4c54](https://github.com/typegoose/typegoose/commit/aff4c546c01098e47d8f599bcd3d6cc911bf19f9))
* **eslint:** upgrade to 8.5.0 ([93a8c07](https://github.com/typegoose/typegoose/commit/93a8c07541d7370d9bb6f9776009002d3bcf8629))
* **jest:** upgrade to 27.4.5 ([980f89c](https://github.com/typegoose/typegoose/commit/980f89c4b3356691ab9a6e3c0445a6fd5eb41e6d))
* **mongodb-memory-server:** upgrade to 8.1.0 ([24aac3d](https://github.com/typegoose/typegoose/commit/24aac3d04283014c6aac5cb67e9c7450d7cf5441))
* **mongoose:** upgrade to 6.1.3 ([46076cd](https://github.com/typegoose/typegoose/commit/46076cd8d04795559987bbd296f1d4f085e2272f)), closes [typegoose/typegoose#647](https://github.com/typegoose/typegoose/issues/647)
* **ts-jest:** upgrade to 27.1.1 ([6f537b5](https://github.com/typegoose/typegoose/commit/6f537b5f3192476b4a80e9c6f43176a94a9dd39d))
* **ts-jest:** upgrade to 27.1.2 ([fc486a6](https://github.com/typegoose/typegoose/commit/fc486a6a2263ba05d01d17175f551e82e0f6eac0))
* **typescript:** lock to minor version (use "~" instead of "^") ([e4e1565](https://github.com/typegoose/typegoose/commit/e4e156525c8b8c10384cbf6b27cef501924347c3))

## [9.4.0-beta.3](https://github.com/typegoose/typegoose/compare/v9.4.0-beta.2...v9.4.0-beta.3) (2021-12-22)


### Dependencies

* **mongodb-memory-server:** upgrade to 8.1.0 ([24aac3d](https://github.com/typegoose/typegoose/commit/24aac3d04283014c6aac5cb67e9c7450d7cf5441))
* **typescript:** lock to minor version (use "~" instead of "^") ([e4e1565](https://github.com/typegoose/typegoose/commit/e4e156525c8b8c10384cbf6b27cef501924347c3))

## [9.4.0-beta.2](https://github.com/typegoose/typegoose/compare/v9.4.0-beta.1...v9.4.0-beta.2) (2021-12-22)


### Dependencies

* **@types/node:** upgrade to 12.20.38 ([35d9822](https://github.com/typegoose/typegoose/commit/35d9822a6eb8de897c3fa73dbbb1b7f84bbb3192))
* **@typescript-eslint/*:** upgrade to 5.8.0 ([d7fcad1](https://github.com/typegoose/typegoose/commit/d7fcad1040de81caf535492982f10aa2e0bd0485))
* **eslint:** upgrade to 8.5.0 ([93a8c07](https://github.com/typegoose/typegoose/commit/93a8c07541d7370d9bb6f9776009002d3bcf8629))
* **mongoose:** upgrade to 6.1.3 ([46076cd](https://github.com/typegoose/typegoose/commit/46076cd8d04795559987bbd296f1d4f085e2272f)), closes [typegoose/typegoose#647](https://github.com/typegoose/typegoose/issues/647)
* **ts-jest:** upgrade to 27.1.2 ([fc486a6](https://github.com/typegoose/typegoose/commit/fc486a6a2263ba05d01d17175f551e82e0f6eac0))

## [9.4.0-beta.1](https://github.com/typegoose/typegoose/compare/v9.3.1...v9.4.0-beta.1) (2021-12-14)


### Features

* **errors:** add custom Error "ExpectedTypeError" ([506d145](https://github.com/typegoose/typegoose/commit/506d1459de2aab9da16fe35cb8fb58b0c66268b0))
* **errors:** add Error "OptionDoesNotSupportOptionError", merge E020 and E021 into E027 ([04491ad](https://github.com/typegoose/typegoose/commit/04491adc69fe9668e4e9663cefeea76eaa22788e))
* **errors:** move Error E014 into custom Error "ResolveTypegooseNameError" ([3ca1a67](https://github.com/typegoose/typegoose/commit/3ca1a6731d09ec9e81c382eb401d5b09dbf00d9c))
* **errors::NoValidClassError:** add Error Code to Error and change message ([32db334](https://github.com/typegoose/typegoose/commit/32db334d45c61cad977b19d554e84db74b2eec2c))
* **globalOptions:** change to use custom Error "ExpectedTypeError" ([c6540a5](https://github.com/typegoose/typegoose/commit/c6540a5913c73d3cc8adeb69deef2fb849fd3b34))
* **hooks::addToHooks:** change to use "ExpectedTypeError" 1 ([b8d630f](https://github.com/typegoose/typegoose/commit/b8d630f464fb0b63297a3d01c3408b03479fb8fd))
* **hooks::addToHooks:** change to use "ExpectedTypeError" 2 ([4769658](https://github.com/typegoose/typegoose/commit/4769658ea6cfa0933cd5b0e2b1044ba56efeb22b))
* **processProp:** use custom Error "InvalidEnumTypeError" ([83f131b](https://github.com/typegoose/typegoose/commit/83f131bd6f087ce240ec9de6f91e04001fc58c0f))
* **schema:** use custom Error "NoDiscriminatorFunctionError" ([00de1cf](https://github.com/typegoose/typegoose/commit/00de1cfdc02fbb4b306d4e729adacd59120533fa))
* **schema:** use custom Error "PathNotInSchemaError" ([a897e0c](https://github.com/typegoose/typegoose/commit/a897e0caa3083dac8a12cb903daceaccaff0d8d2))
* **typegoose::deleteModel:** change to use custom Error "ExpectedTypeError" ([90268b9](https://github.com/typegoose/typegoose/commit/90268b9edd18cbaa9d4467e57d6d8cb086aef477))
* **typegoose::getModelWithString:** change to use custom Error "ExpectedTypeError" ([ebcab71](https://github.com/typegoose/typegoose/commit/ebcab71b56425e28753dd9f5fc06b41a48537a47))
* **typegoose:deleteModel:** change to not error when not existing ([fc30052](https://github.com/typegoose/typegoose/commit/fc300521ce4b96fc1372e45859664713351a6819))
* **utils::getName:** throw Error when "cl" cannot be resolved to a constructor ([7800289](https://github.com/typegoose/typegoose/commit/7800289899ddb04cebc629239aef000b72cd0e40))
* **utils::mapOptions:** use custom Error "InvalidOptionsConstructor" ([8199f2f](https://github.com/typegoose/typegoose/commit/8199f2f18c8ee24f38ee1a2f62882af78f32c1c1))


### Style

* add more Error REFACTOR and TODO comments ([108301e](https://github.com/typegoose/typegoose/commit/108301e4a13c3b6f32a987353a23c6eeb37e14d1))


### Dependencies

* **@types/lodash:** upgrade to 4.14.178 ([ea8ff31](https://github.com/typegoose/typegoose/commit/ea8ff310469e90140349466f36751ae405b8adc4))
* **@typescript-eslint/*:** upgrade to 5.7.0 ([0197ffe](https://github.com/typegoose/typegoose/commit/0197ffe86dd252ae568c8721c9b6dc613ceb0059))
* **eslint:** upgrade to 8.4.1 ([aff4c54](https://github.com/typegoose/typegoose/commit/aff4c546c01098e47d8f599bcd3d6cc911bf19f9))
* **jest:** upgrade to 27.4.5 ([980f89c](https://github.com/typegoose/typegoose/commit/980f89c4b3356691ab9a6e3c0445a6fd5eb41e6d))
* **ts-jest:** upgrade to 27.1.1 ([6f537b5](https://github.com/typegoose/typegoose/commit/6f537b5f3192476b4a80e9c6f43176a94a9dd39d))

### [9.3.1](https://github.com/typegoose/typegoose/compare/v9.3.0...v9.3.1) (2021-12-06)


### Fixes

* change many assertions to use deferred functions for errors ([b7f00af](https://github.com/typegoose/typegoose/commit/b7f00afb31e6669108e69fb03bf73d72627a1fe4)), closes [typegoose/typegoose#641](https://github.com/typegoose/typegoose/issues/641)
* **utils::assertion:** allow arg2 (error) to be a function ([6151087](https://github.com/typegoose/typegoose/commit/61510872702cbb9f5e9ef175a52306c8cbbf76f1)), closes [typegoose/typegoose#641](https://github.com/typegoose/typegoose/issues/641)

## [9.3.0](https://github.com/typegoose/typegoose/compare/v9.2.0...v9.3.0) (2021-12-06)


### Features

* **utils:** add function "toStringNoFail" ([cf94c30](https://github.com/typegoose/typegoose/commit/cf94c302d3c283fdab09d216167c6cb31da9c708)), closes [typegoose/typegoose#642](https://github.com/typegoose/typegoose/issues/642)


### Fixes

* **errors:** change to use "utils.toStringNoFail" on "unknown" and "any" variables ([593ef93](https://github.com/typegoose/typegoose/commit/593ef93bdf1f6323fa7d47978241590c397c70da)), closes [typegoose/typegoose#642](https://github.com/typegoose/typegoose/issues/642) [typegoose/typegoose#638](https://github.com/typegoose/typegoose/issues/638)


### Dependencies

* **@types/jest:** upgrade to 27.0.3 ([3d7f4d9](https://github.com/typegoose/typegoose/commit/3d7f4d9d1060387e571ffa3ad2006960b6a01a0b))
* **@types/lodash:** upgrade to 4.14.177 ([96b883f](https://github.com/typegoose/typegoose/commit/96b883f222d016a33487b123c81930bcfcada473))
* **@types/node:** upgrade to 12.20.37 ([95a840f](https://github.com/typegoose/typegoose/commit/95a840f68f91c153994a3659100a2a311e026a96))
* **@types/semver:** upgrade to 7.3.9 ([7218046](https://github.com/typegoose/typegoose/commit/7218046667f2879a027d5f523fe954dfe213f100))
* **@typescript-eslint/*:** upgrade to 5.5.0 ([650d281](https://github.com/typegoose/typegoose/commit/650d2819bb1c2d8e7f1cbbe13b1f7d116f60979c))
* **class-transformer:** upgrade to 0.5.1 ([fc54396](https://github.com/typegoose/typegoose/commit/fc5439664ea097f7a299c9677900e26c3c0dc17e))
* **commitlint:** upgrade to 15.0.0 ([89f01bb](https://github.com/typegoose/typegoose/commit/89f01bb89ae6bd76bd17d84341669faf70ce3f22))
* **eslint:** upgrade to 8.4.0 ([d8a7827](https://github.com/typegoose/typegoose/commit/d8a7827630c0030e822f945d0a37ad07acb3d405))
* **husky:** upgrade to 7.0.4 ([f1f3827](https://github.com/typegoose/typegoose/commit/f1f382712b04997f503979492aec917ecff1a912))
* **jest:** upgrade to 27.4.3 ([3f55c10](https://github.com/typegoose/typegoose/commit/3f55c103085f4d9cc95a2f86b539af5c0d0c9c18))
* **lint-staged:** upgrade to 11.2.6 ([059325b](https://github.com/typegoose/typegoose/commit/059325b50960346a7545af059f7f2458ae73bf50))
* **loglevel:** upgrade to 1.8.0 ([aa7bffd](https://github.com/typegoose/typegoose/commit/aa7bffd3bdf23409c16a129f5a25b066339712b0))
* **mongodb-memory-server:** upgrade to 8.0.4 ([cbbfa26](https://github.com/typegoose/typegoose/commit/cbbfa265f615e1ebb6d83ed5aaa316f3030558f2))
* **mongoose:** upgrade to 6.0.14 ([737f2dd](https://github.com/typegoose/typegoose/commit/737f2dd9c001b100ace620b19ad3829f2ff3af8d))
* **prettier:** upgrade to 2.5.1 ([dfdadf7](https://github.com/typegoose/typegoose/commit/dfdadf7c34b3a1ae2365bb81219f1596908773f3))
* **ts-jest:** upgrade to 27.1.0 ([d5651bd](https://github.com/typegoose/typegoose/commit/d5651bde26514b61e24aa4f4af296f80fcbf41b5))


### Style

* **typegoose:** add note about some top-level types ([8ade62d](https://github.com/typegoose/typegoose/commit/8ade62dbfc18ddbc595f717dab6bdb11aa3d1b77)), closes [typegoose/typegoose#639](https://github.com/typegoose/typegoose/issues/639)

## [9.2.0](https://github.com/typegoose/typegoose/compare/v9.1.1...v9.2.0) (2021-10-16)


### Dependencies

* **@types/node:** upgrade to 12.20.33 ([1aec3ec](https://github.com/typegoose/typegoose/commit/1aec3ecfeb198aea8cf9937ecf7a7924c2837aa7))
* **@typescript-eslint:** upgrade to 5.0.0 ([52b89f0](https://github.com/typegoose/typegoose/commit/52b89f031394e9b6515b048166b348d6aef7a9ab))
* **commitlint:** upgrade to 13.2.1 ([1bb8acc](https://github.com/typegoose/typegoose/commit/1bb8acc92ef875f2101f1ee852dc0fd740a95782))
* **eslint:** upgrade to 8.0.1 ([bfcc3e1](https://github.com/typegoose/typegoose/commit/bfcc3e1ae27682ce815cfac028ea6b16b2a5693b))
* **jest:** upgrade to 27.2.5 ([e01430d](https://github.com/typegoose/typegoose/commit/e01430dd1dd6cf5ce42ee313391f18b038c50355))
* **lint-staged:** upgrade to 11.2.3 ([d7994a1](https://github.com/typegoose/typegoose/commit/d7994a15a9c36781f16dd1f1492f24c2670da82a))
* **mongodb-memory-server:** upgrade to 7.4.4 ([c1b069c](https://github.com/typegoose/typegoose/commit/c1b069c96887c46ad98702807d8025ddfb988715))
* **mongoose:** upgrade to 6.0.11 ([0ea2075](https://github.com/typegoose/typegoose/commit/0ea20757fb6c3208d6b1032ef15e18e5c38f2daa)), closes [typegoose/typegoose#623](https://github.com/typegoose/typegoose/issues/623)
* **ts-jest:** upgrade to 27.0.7 ([7e15d28](https://github.com/typegoose/typegoose/commit/7e15d28a2485934df603115d46f3fc688912ccc7))
* **typescript:** upgrade to 4.4.4 ([f5b56cb](https://github.com/typegoose/typegoose/commit/f5b56cb412b1af143ccbdb1a2d960cfb65a8d06a))

### [9.1.1](https://github.com/typegoose/typegoose/compare/v9.1.0...v9.1.1) (2021-10-16)


### Fixes

* lock mongoose to "6.0.9 - 6.0.10" for typegoose 6.1.x ([f45d9d4](https://github.com/typegoose/typegoose/commit/f45d9d43f351541d287fc0971ffb2493c41492b1)), closes [typegoose/typegoose#623](https://github.com/typegoose/typegoose/issues/623)

## [9.1.0](https://github.com/typegoose/typegoose/compare/v9.0.2...v9.1.0) (2021-10-05)


### Fixes

* **processProp:** remove warning for Passthrough being a array while being non-direct ([23c9cb0](https://github.com/typegoose/typegoose/commit/23c9cb0835cea0216a085194d10d1a429566f5d2))


### Dependencies

* **@deepkit/*:** upgrade to 1.0.1-alpha.58 ([4117a6b](https://github.com/typegoose/typegoose/commit/4117a6be1b3fc9400981c6da44e16f4f277ce09e))
* **@types/lodash:** upgrade to 4.14.175 ([30d17d5](https://github.com/typegoose/typegoose/commit/30d17d529d4e5e19a362f416e1e657992f57b15b))
* **@typescript-eslint/*:** upgrade to 4.33.0 ([dcaaa9e](https://github.com/typegoose/typegoose/commit/dcaaa9e8eba8bc4abea8d0948327e8d9f09733e5))
* **commitlint:** upgrade to 13.2.0 ([edd3229](https://github.com/typegoose/typegoose/commit/edd3229d29a8d079175ff2150fba6e0892b9bc9f))
* **jest:** upgrade to 27.2.4 ([17ba696](https://github.com/typegoose/typegoose/commit/17ba69621ebcf7491fad5db4ad1edd287bd07eb6))
* **lint-staged:** upgrade to 11.2.0 ([d196f2a](https://github.com/typegoose/typegoose/commit/d196f2a07d0b577489f0a41887da39494b937a66))
* **mongodb-memory-server:** upgrade to 7.4.3 ([2cfcbff](https://github.com/typegoose/typegoose/commit/2cfcbff78fbbbd153e7d63ada029d674177ad2ef))
* **mongoose:** upgrade to 6.0.9 ([6a6a825](https://github.com/typegoose/typegoose/commit/6a6a8258de26ac754dc1aae65b22a2ea24da1752))

### [9.0.2](https://github.com/typegoose/typegoose/compare/v9.0.1...v9.0.2) (2021-10-02)


### Style

* **utils::mapOptions:** add some comments ([c8c74bd](https://github.com/typegoose/typegoose/commit/c8c74bda1b9176c22eb80d52a8befb83fc698d12))

### [9.0.1](https://github.com/typegoose/typegoose/compare/v9.0.0...v9.0.1) (2021-09-23)


### Fixes

* **package.json:** fix "peerDependencies" mongoose version ([1f0b8de](https://github.com/typegoose/typegoose/commit/1f0b8de38d95b96a764c674064bc1bf2073d993b))

## [9.0.0](https://github.com/typegoose/typegoose/compare/v8.3.0...v9.0.0) (2021-09-22)


### ⚠ BREAKING CHANGES

* Build order for Classes to Schemas is changed to bottom-up, which can affect some environments

Co-authored-by: hasezoey <hasezoey@gmail.com>
* **mongoose:** Upgrade to Mongoose 6.0.0 (major version upgrade)

### Features

* **errors:** add error "E025", called "NotValidModelError" ([cd88aab](https://github.com/typegoose/typegoose/commit/cd88aab8b256dc3b76da1ff8708e158b574ece15))
* **errors:** add error "StringLengthExpectedError" as "E026", merge "E015" and "E022" into "E026" ([92be716](https://github.com/typegoose/typegoose/commit/92be71618f58d950fafbafcdcbe972e8bafd32c7))
* **errors:** create custom error for "E003", called "FunctionCalledMoreThanSupportedError" ([a93651e](https://github.com/typegoose/typegoose/commit/a93651e02ee19367e531f3908df44c8192fcdbdc))
* **errors:** create custom error for "E005", called "RefOptionIsUndefinedError" ([586c3f2](https://github.com/typegoose/typegoose/commit/586c3f29b93a163a3f58e592f192b9b6c5c851d5))
* **errors:** create custom error for "E021", called "OptionRefDoesNotSupportArraysError" ([eabadae](https://github.com/typegoose/typegoose/commit/eabadae6da522b0892d46717d8146b68199a9d33))
* **errors:** rename "CannotBeSymbol" to "CannotBeSymbolError" to match style ([454c23b](https://github.com/typegoose/typegoose/commit/454c23b0d4de4dc95dea48316339c33697ca0c5b))
* **processProp:** merge Error "E008" into "E026" ([3469a22](https://github.com/typegoose/typegoose/commit/3469a22e847d1ad4833b8bf263c759018e9a1224))
* **processProp:** remove Error E007 ([928f51d](https://github.com/typegoose/typegoose/commit/928f51df82d8ccc845ecb5bf0c67c66fa61347e7)), closes [typegoose/typegoose#599](https://github.com/typegoose/typegoose/issues/599)
* **typegoose:** add option to use "Passthrough" directly (no "type" property in between) ([7379810](https://github.com/typegoose/typegoose/commit/73798104c8865e80ababba1663946fda6fefdb11))
* **utils::mergeMetadata:** change custom error to use "StringLengthExpectedError" ([9ad3013](https://github.com/typegoose/typegoose/commit/9ad30133a5967fe2b889c00ad1e97314a03f6401))
* change build order to bottom-up (when extending classes) ([#243](https://github.com/typegoose/typegoose/issues/243)) ([79977ee](https://github.com/typegoose/typegoose/commit/79977ee675a48fda280be5a10bc9b962721cd5dc))
* merge errors "E023" into "E013" ([c8ce9b8](https://github.com/typegoose/typegoose/commit/c8ce9b8c36d82f9d23e66d4cdda86cb86567b4fa))


### Fixes

* **globalOptions:** export function "mapValueToSeverity" to be used in tests ([6b77dd7](https://github.com/typegoose/typegoose/commit/6b77dd7b80ec37a295c64e513d8a2b28203f7e9e))
* escape some error message "class.key" ([af9af27](https://github.com/typegoose/typegoose/commit/af9af275bd73de6a226f9b35807bd630b05bcd2e))
* **utils:** comment out the "deprecate" function, because unsued currently ([ccfbca0](https://github.com/typegoose/typegoose/commit/ccfbca0d12f0f3979bb5b4f77fc20059f1ede594))
* **utils::getName:** check if "cl" is null or undefined ([6e795e1](https://github.com/typegoose/typegoose/commit/6e795e187a6ac78a9ff790a1144a32b54ccce8df))
* rename "Schema.Types.Embedded" to "Schema.Types.Subdocument" ([bdbbc9c](https://github.com/typegoose/typegoose/commit/bdbbc9c4f5e7f3e0b0e64136cf63772cf4fca61e))


### Dependencies

* **@semantic-release/git:** upgrade to 9.0.1 ([d2caa84](https://github.com/typegoose/typegoose/commit/d2caa847f705d077ea6bdc0a4be409010f08071f))
* **@types/jest:** upgrade to 27.0.2 ([257ce66](https://github.com/typegoose/typegoose/commit/257ce667bfe8782f716230fece5365f03577b5ca))
* **@types/lodash:** upgrade to 4.14.173 ([43496aa](https://github.com/typegoose/typegoose/commit/43496aaf5e0d54f123370ed8e96db36b17e298f2))
* **@typescript-eslint/*:** upgrade to 4.30.0 ([85eb727](https://github.com/typegoose/typegoose/commit/85eb727a171033349c2156083b95dd236349def0))
* **@typescript-eslint/*:** upgrade to 4.31.1 ([214f825](https://github.com/typegoose/typegoose/commit/214f8253720e6152efd410d5b7562143faf56350))
* **@typescript-eslint/*:** upgrade to 4.31.2 ([b5e2bce](https://github.com/typegoose/typegoose/commit/b5e2bceb8b8bdc1429f988dda25089c6ef616f6b))
* **eslint-plugin-prettier:** upgrade to 4.0.0 ([643f4e0](https://github.com/typegoose/typegoose/commit/643f4e01cd440d85f40f4ed4c24c6772b3cb27d3))
* **husky:** upgrade to 7.0.2 ([1759907](https://github.com/typegoose/typegoose/commit/17599075436d4b3acf00c05d6598eb18a29a6b67))
* **jest:** upgrade to 27.1.0 ([ea94f98](https://github.com/typegoose/typegoose/commit/ea94f9821b38444989662f9dd85882c33b5448be))
* **jest:** upgrade to 27.2.0 ([b5572dd](https://github.com/typegoose/typegoose/commit/b5572dd33b7a2291043f50b0af8b254820e456c3))
* **jest:** upgrade to 27.2.1 ([5f0c7fd](https://github.com/typegoose/typegoose/commit/5f0c7fd2c29c30a522fe83c412b8fdb13fcbedc1))
* **mongodb-memory-server:** upgrade to 7.4.0 ([1b51547](https://github.com/typegoose/typegoose/commit/1b5154762409e4f58c77468f4d440265c8f2a856))
* **mongodb-memory-server:** upgrade to 7.4.1 ([41cee76](https://github.com/typegoose/typegoose/commit/41cee76945ea6e5549705cb6b726e9ea4c8e3152))
* **mongoose:** upgrade to 6.0.7 ([4cb5b2f](https://github.com/typegoose/typegoose/commit/4cb5b2f1523329499de36a47a09d6a1abd5c0f0c))
* **mongoose:** upgrade to version 6.0.1 ([bc6fa61](https://github.com/typegoose/typegoose/commit/bc6fa612bc7fe902140f6f6a8b05a306716fc372))
* **prettier:** upgrade to 2.4.1 ([7c08b76](https://github.com/typegoose/typegoose/commit/7c08b76987a19fe9143fade680b948d7248c501e))
* **semantic-release:** upgrade to 17.4.7 ([6e78e00](https://github.com/typegoose/typegoose/commit/6e78e009456e54a8fe0fe1cd8d6e1f5245d1ae4b))
* **tslib:** upgrade to 2.3.1 ([1b3d9f5](https://github.com/typegoose/typegoose/commit/1b3d9f5ae08f02ad00c59d6fcf389355e2076e87))
* **typescript:** upgrade to 4.4.2 ([6420bfd](https://github.com/typegoose/typegoose/commit/6420bfd639fb6da64f83bd64b56cea2fe4c012af))
* **typescript:** upgrade to 4.4.3 ([fed16aa](https://github.com/typegoose/typegoose/commit/fed16aaabc666821e825b25a226c556940cee76f))


### Refactor

* **processProp:** remove redundant code ([5575b97](https://github.com/typegoose/typegoose/commit/5575b97ab3789550db8069bcb1de0c65fe88a11e))
* **processProp:** remove unnecessary object creation & spreads ([1c36776](https://github.com/typegoose/typegoose/commit/1c36776912d3e752f8a1125e7108e11b20fde7aa))
* **utils:** remove removed options workaround ([e9996fd](https://github.com/typegoose/typegoose/commit/e9996fd50fec4542c0a61566908c0c3f8170cf3c))
* **utils::mapOptions:** reduce "getName" calls for the same object ([c68e415](https://github.com/typegoose/typegoose/commit/c68e41570066ebfa6bd977576c947e39f0aae7f7))


### Style

* **processProp:** add warning when using "Passthrough" on WhatIsIt.ARRAY ([0366fb8](https://github.com/typegoose/typegoose/commit/0366fb8785170ade951d01618b66f2d86d06d1f0))
* **processProp:** remove "istanbul-ignore" on tested lines ([967cb41](https://github.com/typegoose/typegoose/commit/967cb41066a20e22f71dc229a2ad90bb1b795003))
* **typegoose:** add comment for "for of Map" ([a4200b8](https://github.com/typegoose/typegoose/commit/a4200b8e9c2d59dd2922ec99f53be0c2359a14cf))
* **types:** remove TODO's that probably never happen ([e9926c0](https://github.com/typegoose/typegoose/commit/e9926c0dea8cc9a1addcc0a54536c67621fb2c66))
* **types:** use mongoose's types because mongoose issue 10529 got resolved ([176063f](https://github.com/typegoose/typegoose/commit/176063fcdd58a8120d7007622f0060270b52b39c))
* **utils:** remove "instanbul-ignore" ([ac5184a](https://github.com/typegoose/typegoose/commit/ac5184ad5f9851ab1eae30b9e567b9f6902f7003))
* **utils:** remove "instanbul-ignore" for tested path ([f1d9dc9](https://github.com/typegoose/typegoose/commit/f1d9dc99ffd8885a0afcd7e104775943a193277f))
* add more Error "REFACTOR" comments ([12ccf9e](https://github.com/typegoose/typegoose/commit/12ccf9e0f8b26fdf36eab24092d4159b5d2a8582))
* **utils::deprecate:** update tsdoc to be better readable ([9d49c43](https://github.com/typegoose/typegoose/commit/9d49c4353496ef829b0dd705a652aa8dd5528958))
* add REFACTOR comments for errors to be re-done ([32aa7ad](https://github.com/typegoose/typegoose/commit/32aa7ad6de6fa6b0107abcfb97e3fa11ff7177e5))
* apply eslint rules to top level and website js files ([c6aa5cc](https://github.com/typegoose/typegoose/commit/c6aa5cca8b8d5f307d38aa32f1b46f043a1f902e))
* update documentation about "Passthrough" class for mongoose 6.0 ([6a4393e](https://github.com/typegoose/typegoose/commit/6a4393ec386c3a22fae33cbf219da0add3d1ee9c))

## [9.0.0-beta.11](https://github.com/typegoose/typegoose/compare/v9.0.0-beta.10...v9.0.0-beta.11) (2021-09-21)


### Features

* **errors:** add error "StringLengthExpectedError" as "E026", merge "E015" and "E022" into "E026" ([92be716](https://github.com/typegoose/typegoose/commit/92be71618f58d950fafbafcdcbe972e8bafd32c7))
* **processProp:** merge Error "E008" into "E026" ([3469a22](https://github.com/typegoose/typegoose/commit/3469a22e847d1ad4833b8bf263c759018e9a1224))
* **utils::mergeMetadata:** change custom error to use "StringLengthExpectedError" ([9ad3013](https://github.com/typegoose/typegoose/commit/9ad30133a5967fe2b889c00ad1e97314a03f6401))


### Dependencies

* **@types/jest:** upgrade to 27.0.2 ([257ce66](https://github.com/typegoose/typegoose/commit/257ce667bfe8782f716230fece5365f03577b5ca))
* **@typescript-eslint/*:** upgrade to 4.31.2 ([b5e2bce](https://github.com/typegoose/typegoose/commit/b5e2bceb8b8bdc1429f988dda25089c6ef616f6b))
* **jest:** upgrade to 27.2.1 ([5f0c7fd](https://github.com/typegoose/typegoose/commit/5f0c7fd2c29c30a522fe83c412b8fdb13fcbedc1))
* **mongodb-memory-server:** upgrade to 7.4.1 ([41cee76](https://github.com/typegoose/typegoose/commit/41cee76945ea6e5549705cb6b726e9ea4c8e3152))
* **mongoose:** upgrade to 6.0.7 ([4cb5b2f](https://github.com/typegoose/typegoose/commit/4cb5b2f1523329499de36a47a09d6a1abd5c0f0c))


### Refactor

* **processProp:** remove unnecessary object creation & spreads ([1c36776](https://github.com/typegoose/typegoose/commit/1c36776912d3e752f8a1125e7108e11b20fde7aa))


### Style

* **types:** remove TODO's that probably never happen ([e9926c0](https://github.com/typegoose/typegoose/commit/e9926c0dea8cc9a1addcc0a54536c67621fb2c66))
* **utils:** remove "instanbul-ignore" for tested path ([f1d9dc9](https://github.com/typegoose/typegoose/commit/f1d9dc99ffd8885a0afcd7e104775943a193277f))

## [9.0.0-beta.10](https://github.com/typegoose/typegoose/compare/v9.0.0-beta.9...v9.0.0-beta.10) (2021-09-19)


### Features

* **typegoose:** add option to use "Passthrough" directly (no "type" property in between) ([7379810](https://github.com/typegoose/typegoose/commit/73798104c8865e80ababba1663946fda6fefdb11))


### Dependencies

* **@semantic-release/git:** upgrade to 9.0.1 ([d2caa84](https://github.com/typegoose/typegoose/commit/d2caa847f705d077ea6bdc0a4be409010f08071f))
* **@types/lodash:** upgrade to 4.14.173 ([43496aa](https://github.com/typegoose/typegoose/commit/43496aaf5e0d54f123370ed8e96db36b17e298f2))
* **@typescript-eslint/*:** upgrade to 4.31.1 ([214f825](https://github.com/typegoose/typegoose/commit/214f8253720e6152efd410d5b7562143faf56350))
* **jest:** upgrade to 27.2.0 ([b5572dd](https://github.com/typegoose/typegoose/commit/b5572dd33b7a2291043f50b0af8b254820e456c3))
* **prettier:** upgrade to 2.4.1 ([7c08b76](https://github.com/typegoose/typegoose/commit/7c08b76987a19fe9143fade680b948d7248c501e))
* **typescript:** upgrade to 4.4.3 ([fed16aa](https://github.com/typegoose/typegoose/commit/fed16aaabc666821e825b25a226c556940cee76f))


### Fixes

* **globalOptions:** export function "mapValueToSeverity" to be used in tests ([6b77dd7](https://github.com/typegoose/typegoose/commit/6b77dd7b80ec37a295c64e513d8a2b28203f7e9e))


### Style

* **processProp:** add warning when using "Passthrough" on WhatIsIt.ARRAY ([0366fb8](https://github.com/typegoose/typegoose/commit/0366fb8785170ade951d01618b66f2d86d06d1f0))
* **typegoose:** add comment for "for of Map" ([a4200b8](https://github.com/typegoose/typegoose/commit/a4200b8e9c2d59dd2922ec99f53be0c2359a14cf))
* **utils:** remove "instanbul-ignore" ([ac5184a](https://github.com/typegoose/typegoose/commit/ac5184ad5f9851ab1eae30b9e567b9f6902f7003))

## [9.0.0-beta.9](https://github.com/typegoose/typegoose/compare/v9.0.0-beta.8...v9.0.0-beta.9) (2021-09-18)


### Refactor

* **utils:** remove removed options workaround ([e9996fd](https://github.com/typegoose/typegoose/commit/e9996fd50fec4542c0a61566908c0c3f8170cf3c))


### Style

* **processProp:** remove "istanbul-ignore" on tested lines ([967cb41](https://github.com/typegoose/typegoose/commit/967cb41066a20e22f71dc229a2ad90bb1b795003))

## [9.0.0-beta.8](https://github.com/typegoose/typegoose/compare/v9.0.0-beta.7...v9.0.0-beta.8) (2021-09-16)


### Features

* merge errors "E023" into "E013" ([c8ce9b8](https://github.com/typegoose/typegoose/commit/c8ce9b8c36d82f9d23e66d4cdda86cb86567b4fa))
* **errors:** add error "E025", called "NotValidModelError" ([cd88aab](https://github.com/typegoose/typegoose/commit/cd88aab8b256dc3b76da1ff8708e158b574ece15))
* **errors:** create custom error for "E003", called "FunctionCalledMoreThanSupportedError" ([a93651e](https://github.com/typegoose/typegoose/commit/a93651e02ee19367e531f3908df44c8192fcdbdc))


### Style

* add more Error "REFACTOR" comments ([12ccf9e](https://github.com/typegoose/typegoose/commit/12ccf9e0f8b26fdf36eab24092d4159b5d2a8582))


### Refactor

* **utils::mapOptions:** reduce "getName" calls for the same object ([c68e415](https://github.com/typegoose/typegoose/commit/c68e41570066ebfa6bd977576c947e39f0aae7f7))


### Fixes

* escape some error message "class.key" ([af9af27](https://github.com/typegoose/typegoose/commit/af9af275bd73de6a226f9b35807bd630b05bcd2e))
* **utils::getName:** check if "cl" is null or undefined ([6e795e1](https://github.com/typegoose/typegoose/commit/6e795e187a6ac78a9ff790a1144a32b54ccce8df))

## [9.0.0-beta.7](https://github.com/typegoose/typegoose/compare/v9.0.0-beta.6...v9.0.0-beta.7) (2021-09-13)


### Features

* **processProp:** remove Error E007 ([928f51d](https://github.com/typegoose/typegoose/commit/928f51df82d8ccc845ecb5bf0c67c66fa61347e7)), closes [typegoose/typegoose#599](https://github.com/typegoose/typegoose/issues/599)


### Refactor

* **processProp:** remove redundant code ([5575b97](https://github.com/typegoose/typegoose/commit/5575b97ab3789550db8069bcb1de0c65fe88a11e))

## [9.0.0-beta.6](https://github.com/typegoose/typegoose/compare/v9.0.0-beta.5...v9.0.0-beta.6) (2021-09-12)


### Features

* **errors:** create custom error for "E005", called "RefOptionIsUndefinedError" ([586c3f2](https://github.com/typegoose/typegoose/commit/586c3f29b93a163a3f58e592f192b9b6c5c851d5))
* **errors:** create custom error for "E021", called "OptionRefDoesNotSupportArraysError" ([eabadae](https://github.com/typegoose/typegoose/commit/eabadae6da522b0892d46717d8146b68199a9d33))
* **errors:** rename "CannotBeSymbol" to "CannotBeSymbolError" to match style ([454c23b](https://github.com/typegoose/typegoose/commit/454c23b0d4de4dc95dea48316339c33697ca0c5b))


### Fixes

* **utils:** comment out the "deprecate" function, because unsued currently ([ccfbca0](https://github.com/typegoose/typegoose/commit/ccfbca0d12f0f3979bb5b4f77fc20059f1ede594))


### Style

* **utils::deprecate:** update tsdoc to be better readable ([9d49c43](https://github.com/typegoose/typegoose/commit/9d49c4353496ef829b0dd705a652aa8dd5528958))
* add REFACTOR comments for errors to be re-done ([32aa7ad](https://github.com/typegoose/typegoose/commit/32aa7ad6de6fa6b0107abcfb97e3fa11ff7177e5))

## [9.0.0-beta.5](https://github.com/typegoose/typegoose/compare/v9.0.0-beta.4...v9.0.0-beta.5) (2021-09-11)


### Features

* **hooks:** add ability to set hook options ([8b6c202](https://github.com/typegoose/typegoose/commit/8b6c202e64486875a65560b27ffe3012a56a7e2a)), closes [typegoose/typegoose#605](https://github.com/typegoose/typegoose/issues/605)


### Fixes

* **hooks::addToHooks:** add warning when "args" is over supported length ([c928d33](https://github.com/typegoose/typegoose/commit/c928d332074f4094dab5e303f7293aa13f0bd496))


### Style

* apply eslint rules to top level and website js files ([7404c44](https://github.com/typegoose/typegoose/commit/7404c44c844481888a358415be12099b48f19b7e))
* **types::IHooksArray:** add testdoc to all properties ([fa20dcc](https://github.com/typegoose/typegoose/commit/fa20dcc5ec459c4619e68be019e091f68cb6b6de))


### Dependencies

* **semantic-release:** upgrade to 17.4.7 ([0675c68](https://github.com/typegoose/typegoose/commit/0675c68bf1458e2c02e99a9059b51145a57f4188))

## [9.0.0-beta.4](https://github.com/typegoose/typegoose/compare/v9.0.0-beta.3...v9.0.0-beta.4) (2021-09-07)


### Style

* apply eslint rules to top level and website js files ([c6aa5cc](https://github.com/typegoose/typegoose/commit/c6aa5cca8b8d5f307d38aa32f1b46f043a1f902e))

## [9.0.0-beta.3](https://github.com/typegoose/typegoose/compare/v9.0.0-beta.2...v9.0.0-beta.3) (2021-09-02)


### Dependencies

* **@typescript-eslint/*:** upgrade to 4.30.0 ([85eb727](https://github.com/typegoose/typegoose/commit/85eb727a171033349c2156083b95dd236349def0))
* **eslint-plugin-prettier:** upgrade to 4.0.0 ([643f4e0](https://github.com/typegoose/typegoose/commit/643f4e01cd440d85f40f4ed4c24c6772b3cb27d3))
* **jest:** upgrade to 27.1.0 ([ea94f98](https://github.com/typegoose/typegoose/commit/ea94f9821b38444989662f9dd85882c33b5448be))
* **mongodb-memory-server:** upgrade to 7.4.0 ([1b51547](https://github.com/typegoose/typegoose/commit/1b5154762409e4f58c77468f4d440265c8f2a856))
* **typescript:** upgrade to 4.4.2 ([6420bfd](https://github.com/typegoose/typegoose/commit/6420bfd639fb6da64f83bd64b56cea2fe4c012af))

## [9.0.0-beta.2](https://github.com/typegoose/typegoose/compare/v9.0.0-beta.1...v9.0.0-beta.2) (2021-08-26)


### ⚠ BREAKING CHANGES

* Build order for Classes to Schemas is changed to bottom-up, which can affect some environments

### Features

* change build order to bottom-up (when extending classes) ([#243](https://github.com/typegoose/typegoose/issues/243)) ([79977ee](https://github.com/typegoose/typegoose/commit/79977ee675a48fda280be5a10bc9b962721cd5dc))

## [9.0.0-beta.1](https://github.com/typegoose/typegoose/compare/v8.2.0...v9.0.0-beta.1) (2021-08-26)


### ⚠ BREAKING CHANGES

* **mongoose:** Upgrade to Mongoose 6.0.0 (major version upgrade)

### Fixes

* rename "Schema.Types.Embedded" to "Schema.Types.Subdocument" ([bdbbc9c](https://github.com/typegoose/typegoose/commit/bdbbc9c4f5e7f3e0b0e64136cf63772cf4fca61e))


### Style

* **types:** use mongoose's types because mongoose issue 10529 got resolved ([176063f](https://github.com/typegoose/typegoose/commit/176063fcdd58a8120d7007622f0060270b52b39c))
* update documentation about "Passthrough" class for mongoose 6.0 ([6a4393e](https://github.com/typegoose/typegoose/commit/6a4393ec386c3a22fae33cbf219da0add3d1ee9c))


### Dependencies

* **husky:** upgrade to 7.0.2 ([1759907](https://github.com/typegoose/typegoose/commit/17599075436d4b3acf00c05d6598eb18a29a6b67))
* **mongoose:** upgrade to version 6.0.1 ([bc6fa61](https://github.com/typegoose/typegoose/commit/bc6fa612bc7fe902140f6f6a8b05a306716fc372))
* **semantic-release:** upgrade to 17.4.7 ([6e78e00](https://github.com/typegoose/typegoose/commit/6e78e009456e54a8fe0fe1cd8d6e1f5245d1ae4b))
* **tslib:** upgrade to 2.3.1 ([1b3d9f5](https://github.com/typegoose/typegoose/commit/1b3d9f5ae08f02ad00c59d6fcf389355e2076e87))

## [8.3.0](https://github.com/typegoose/typegoose/compare/v8.2.0...v8.3.0) (2021-09-11)


### Features

* **hooks:** add ability to set hook options ([8b6c202](https://github.com/typegoose/typegoose/commit/8b6c202e64486875a65560b27ffe3012a56a7e2a)), closes [typegoose/typegoose#605](https://github.com/typegoose/typegoose/issues/605)


### Fixes

* **hooks::addToHooks:** add warning when "args" is over supported length ([c928d33](https://github.com/typegoose/typegoose/commit/c928d332074f4094dab5e303f7293aa13f0bd496))


### Style

* apply eslint rules to top level and website js files ([7404c44](https://github.com/typegoose/typegoose/commit/7404c44c844481888a358415be12099b48f19b7e))
* **types::IHooksArray:** add testdoc to all properties ([fa20dcc](https://github.com/typegoose/typegoose/commit/fa20dcc5ec459c4619e68be019e091f68cb6b6de))


### Dependencies

* **semantic-release:** upgrade to 17.4.7 ([0675c68](https://github.com/typegoose/typegoose/commit/0675c68bf1458e2c02e99a9059b51145a57f4188))

## [8.2.0](https://github.com/typegoose/typegoose/compare/v8.1.1...v8.2.0) (2021-08-24)


### Style

* **utils:** change "SchemaTypeOpts" to "SchemaTypeOptions" ([402fe7a](https://github.com/typegoose/typegoose/commit/402fe7aef192454eda44ef402acde47492ec9fc1))


### Fixes

* **typegoose:** buildSchema: fix return type ([ce5bf45](https://github.com/typegoose/typegoose/commit/ce5bf456eb52283ea31084bde5c3819c452c98a3))
* **types:** change "IndexOptions" to extend from "mongoose.IndexOptions" ([968338e](https://github.com/typegoose/typegoose/commit/968338ee480c62038d007e7dbd555a3a08b2f1cf))
* apply changes for "Schema.get" returning "string | undefined" instead of any ([76b9799](https://github.com/typegoose/typegoose/commit/76b979920be32b6a407966062ee3004c282e1bf0))


### Dependencies

* **@types/jest:** upgrade to version 27.0.1 ([9b29aa7](https://github.com/typegoose/typegoose/commit/9b29aa7968684e0291224c289023347c82284bf4))
* **@types/lodash:** upgrade to version 4.14.172 ([316b56d](https://github.com/typegoose/typegoose/commit/316b56d05ab62e86352804d82a9bf2b26a09d396))
* **@typescript-eslint/*:** upgrade to version 4.29.3 ([352c90a](https://github.com/typegoose/typegoose/commit/352c90aa6daf9cd357ee1342644cf7bb40d15aec))
* **eslint-plugin-prettier:** upgrade to version 3.4.1 ([fc357fc](https://github.com/typegoose/typegoose/commit/fc357fc43aba928df49d8a5e58c178d645ef62a1))
* **lint-staged:** upgrade to version 11.1.2 ([82fca54](https://github.com/typegoose/typegoose/commit/82fca54b1f4b6351fe46d8becb6a68161b9f7d95))
* **mongodb-memory-server:** upgrade to version 7.3.6 ([096e0b6](https://github.com/typegoose/typegoose/commit/096e0b6ae1253195594ca45058ebd255a4671600))
* **mongoose:** upgrade to version 5.13.8 ([e2ae6f9](https://github.com/typegoose/typegoose/commit/e2ae6f94be8c81ee1603a7f496071e70318aa8f3))
* **semantic-release:** upgrade to version 17.4.6 ([297a9e7](https://github.com/typegoose/typegoose/commit/297a9e7f79a0a3c62dfb306c81b708f650ae0dd8))
* **ts-jest:** upgrade to version 27.0.5 ([7bccb36](https://github.com/typegoose/typegoose/commit/7bccb367acc35c45785abeff0f7d890b65c08d62))

### [8.1.1](https://github.com/typegoose/typegoose/compare/v8.1.0...v8.1.1) (2021-08-05)


### Fixes

* **processProp:** support Maps with SubDocument-Arrays ([94fb0b9](https://github.com/typegoose/typegoose/commit/94fb0b9a146722ee6368622061d8351fe9e28515))

## [8.1.0](https://github.com/typegoose/typegoose/compare/v8.0.1...v8.1.0) (2021-08-01)


### Features

* add error "CannotBeSymbol" to replace custom error ([f6754cb](https://github.com/typegoose/typegoose/commit/f6754cb39f3ab8ff59e7b2a28cdf60fb1bf12e12))
* add error "InvalidWhatIsItError" to replace custom error ([cc30146](https://github.com/typegoose/typegoose/commit/cc3014684738c63c8fcdf5cc295d71b84aad1956))
* add error "SelfContainingClassError" to replace custom error ([3a32dde](https://github.com/typegoose/typegoose/commit/3a32dde03545b5f398f95c4e5c3763e6bc6e59be))
* rename error "NoValidClass" to "NoValidClassError" ([2ec44af](https://github.com/typegoose/typegoose/commit/2ec44af01457e58b119c34d2b2345439709dd7b4))
* **types:** passthrough some mongoose option-types ([50370d1](https://github.com/typegoose/typegoose/commit/50370d13abc0097b1cba7e761023fb3330bf23d8)), closes [typegoose/typegoose#259](https://github.com/typegoose/typegoose/issues/259)


### Style

* **processProp:** change to "import type" from "../types" ([94b8046](https://github.com/typegoose/typegoose/commit/94b8046aa8b948ac1c3a82d6bc54600864f9b6c0))
* **types:** fix comment / tsdoc for "IndexOptions" ([75cbb27](https://github.com/typegoose/typegoose/commit/75cbb2754e0ceccd8960fd3070ad4fbb0eb35d93))


### Fixes

* **errors:** change parameter for "NoValidClassError" from "any" to "unknown" ([dbb95d8](https://github.com/typegoose/typegoose/commit/dbb95d8a9c093d7b51e81997abceda7cc06a06e2))


### Dependencies

* **eslint:** upgrade to version 7.32.0 ([cd56ce6](https://github.com/typegoose/typegoose/commit/cd56ce6706be4106194c92f78e1f09fb977e4d49))

### [8.0.1](https://github.com/typegoose/typegoose/compare/v8.0.0...v8.0.1) (2021-07-30)


### Style

* **typegoose:** add link to mongoose issue for "Passthrough" class ([3fd6f4f](https://github.com/typegoose/typegoose/commit/3fd6f4f3a61dc5e000e4d8726d18735bbe4f3303))

## [8.0.0](https://github.com/typegoose/typegoose/compare/v7.6.3...v8.0.0) (2021-07-28)


### ⚠ BREAKING CHANGES

* **typeguards:** `isRefType` now is way more stricter and requires an second parameter to work
* NodeJS 10 & 11 are now unsupported, lowest supported is now NodeJS 12
* **processProp:** "ref" and "refPath" now use "mapArrayOptions" that means that some options might be mapped differently
* Changing types from unofficial to official is an breaking change
* **prop:** Removing deprecated options "items", "of", "refType"
* **prop:** Removing deprecated function "mapProp"
* **prop:** Removing deprecated function "arrayProp"

### Features

* add class "Passthrough" and functionality ([e9ee628](https://github.com/typegoose/typegoose/commit/e9ee6286537549ff9bc54ac95e77abf4e610cf79)), closes [typegoose/typegoose#382](https://github.com/typegoose/typegoose/issues/382)
* **processProp:** allow & correctly map reference-maps ([581b6b3](https://github.com/typegoose/typegoose/commit/581b6b3b372922d6df9a84711958fac98332ca38))
* **processProp:** use "mapArrayOptions" for "ref" and "refPath" ([b39eff9](https://github.com/typegoose/typegoose/commit/b39eff9367e6910515944a140d7c939dddc532e3)), closes [typegoose/typegoose#513](https://github.com/typegoose/typegoose/issues/513)
* **prop:** remove "arrayProp" ([8a5b337](https://github.com/typegoose/typegoose/commit/8a5b337fdc4de282534ad2226e26cec65375f452)), closes [#258](https://github.com/typegoose/typegoose/issues/258)
* **prop:** remove "mapProp" ([9e913b8](https://github.com/typegoose/typegoose/commit/9e913b87bd7faa81cff2102c22b05b2230ea75a4)), closes [#258](https://github.com/typegoose/typegoose/issues/258)
* **prop:** remove deprecated options ([c27d2a0](https://github.com/typegoose/typegoose/commit/c27d2a0481d03e864803b912348061257228a8c3)), closes [#257](https://github.com/typegoose/typegoose/issues/257)
* **typeguards:** enhance "isRefType" checks ([e3a3bf7](https://github.com/typegoose/typegoose/commit/e3a3bf7150cd9569b974c7c4322d35f66ec03957)), closes [typegoose/typegoose#569](https://github.com/typegoose/typegoose/issues/569)
* **types:** add option prop option "castNonArrays" ([3a9e95a](https://github.com/typegoose/typegoose/commit/3a9e95aae4173e7b5e072ee70db470cf6b6cccf5)), closes [typegoose/typegoose#568](https://github.com/typegoose/typegoose/issues/568)
* unsupport nodejs 10 & 11 ([d24d6d7](https://github.com/typegoose/typegoose/commit/d24d6d7a86735603ea6bbe28503f90e0723cce8c))
* **utils:** move E019 Error into its own class to confuse less ([6ad5043](https://github.com/typegoose/typegoose/commit/6ad5043ac1a02281cc4215ba2cfaa4ce3421e28c))
* Update to work with mongoose 5.11 ([6cdfb0f](https://github.com/typegoose/typegoose/commit/6cdfb0fa889cbf6aea52e1bb8de9975f129e4136))


### Reverts

* "chore(workflow): tests: change "semantic-release" to be an dry-run" ([f0c0067](https://github.com/typegoose/typegoose/commit/f0c0067a2d20554d8b931ab29b53e972f5baa711))
* "release: v7.6.0-beta.1" ([8116a7d](https://github.com/typegoose/typegoose/commit/8116a7dd5db3c1e3680edd9b97f707c3b3513e7f))


### Fixes

* **defaultClasses:** convert "Base" into an interface ([2071aa7](https://github.com/typegoose/typegoose/commit/2071aa73ceb6d4894e251dc54232a5b8a5375be9))
* **hooks:** remove unused "done" callback ([4692976](https://github.com/typegoose/typegoose/commit/46929760d6568feff07a5a1ff1e87baccdcb00db)), closes [typegoose/typegoose#561](https://github.com/typegoose/typegoose/issues/561)
* **index:** extend typings of the index decorator ([#548](https://github.com/typegoose/typegoose/issues/548)) ([f24ee9d](https://github.com/typegoose/typegoose/commit/f24ee9d4b2f0d02d2652f5a895f7793a7eb3240c))
* **processProp:** add error code E023 for '"ref" is not supported for "${propKind}"!' ([63a5b31](https://github.com/typegoose/typegoose/commit/63a5b3199f33ca7ff28a7653314c46fc12fc3dac))
* **processProp:** set type to "Mixed" when type is still "*Map" ([e98d026](https://github.com/typegoose/typegoose/commit/e98d026dc4f231e4bf1841bbaba9df1cc705e83f))
* **typegoose:** fix lowest supported mongoose version ([90d2c2f](https://github.com/typegoose/typegoose/commit/90d2c2ffc56a2450b08158927d3f34becb13a9a8))
* **types:** add "QueryHelpers" to "DocumentType" ([f4dba22](https://github.com/typegoose/typegoose/commit/f4dba22ee4965a1c8afadf800ee4cdf8964445a1))
* **types:** re-enable QueryHelpers for official types ([99071b1](https://github.com/typegoose/typegoose/commit/99071b14a2b50128df6a6f3dc101194edcb27d24))


### Dependencies

* **@semantic-release/github:** upgrade to version "7.2.3" ([c52195c](https://github.com/typegoose/typegoose/commit/c52195cd7157b11c15031fc63211a273ef3611b3))
* **@semantic-release/npm:** upgrade to "7.1.3" ([a4fa9ce](https://github.com/typegoose/typegoose/commit/a4fa9cec4bd7456bbe5a29a1a4c45a15a60b49d3))
* **@semantic-release/npm:** upgrade to version "7.1.3" ([d58a074](https://github.com/typegoose/typegoose/commit/d58a07406c0cf3897b8b78bca67b02f62d2d9f13))
* **@semantic-release/release-notes-generator:** upgrade to version "9.0.2" ([c0b2a77](https://github.com/typegoose/typegoose/commit/c0b2a776c04be9c2d52bd977b7052e216208bed1))
* **@semantic-release/release-notes-generator:** upgrade to version "9.0.3" ([a8ba787](https://github.com/typegoose/typegoose/commit/a8ba787ac1eb833b1bb157b43e9d2ea3c5d59a2a))
* **@types/jest:** upgrade to version "26.0.22" ([e7d4ef1](https://github.com/typegoose/typegoose/commit/e7d4ef177c12dd9ba023e096d27d2a5b0a8e3bd9))
* **@types/jest:** upgrade to version "26.0.23" ([ab65cce](https://github.com/typegoose/typegoose/commit/ab65cce8d32c3969acfe0d47a4be42bcbd6e0074))
* **@types/jest:** upgrade to version 26.0.24 ([d9b1b69](https://github.com/typegoose/typegoose/commit/d9b1b69c8dd4ebc1a207fe5643778dddec07ebf9))
* **@types/lodash:** upgrade to version "4.14.170" ([96be5b4](https://github.com/typegoose/typegoose/commit/96be5b495de98b175b53cde5f42a94a09efe9248))
* **@types/lodash:** upgrade to version 4.14.171 ([d6036de](https://github.com/typegoose/typegoose/commit/d6036ded91f8e4bbe2664a0669c028224e2abd19))
* **@types/node:** upgrade to "10.17.56" ([cc23392](https://github.com/typegoose/typegoose/commit/cc2339276163be7b4130140b70a7798956a7f1db))
* **@types/node:** upgrade to version "12.12.6" ([0b91f99](https://github.com/typegoose/typegoose/commit/0b91f99f2ace3eb70903a3407ed9e50a90967743))
* **@types/semver:** upgrade to version "7.3.6" ([7e60b5c](https://github.com/typegoose/typegoose/commit/7e60b5c41eef15ea48004198f0dd74bb4179a0d1))
* **@types/semver:** upgrade to version 7.3.8 ([2f2d60e](https://github.com/typegoose/typegoose/commit/2f2d60ed6dd5f992ae04215b800e5dcdeabf7544))
* **@typescript-eslint/*:** upgrade to version "4.25.0" ([e768711](https://github.com/typegoose/typegoose/commit/e768711e817fb106dd5df10ed19981050c863139))
* **@typescript-eslint/*:** upgrade to version "4.28.0" ([7c8883b](https://github.com/typegoose/typegoose/commit/7c8883b68a8045321d093eaa59dcab6425aff183))
* **@typescript-eslint/*:** upgrade to version "4.28.1" ([49b1c11](https://github.com/typegoose/typegoose/commit/49b1c1189388b47f15790095169dbfcb6d5561ad))
* **@typescript-eslint/*:** upgrade to version 4.28.5 ([d7dcc92](https://github.com/typegoose/typegoose/commit/d7dcc925093e1155f3e7fdbb83066fb8861d3335))
* **commitlint:** upgrade to "12.1.1" ([6442141](https://github.com/typegoose/typegoose/commit/6442141963e919ad5c830c98027baff156faefe6))
* **commitlint:** upgrade to version "12.1.4" ([7e29e40](https://github.com/typegoose/typegoose/commit/7e29e4062e3d9285b113fba58d24d366242b7f56))
* **commitlint:** upgrade to version 13.1.0 ([62bbfb9](https://github.com/typegoose/typegoose/commit/62bbfb9e060ee90a751a0cccee9320d0b1afd7bd))
* **coveralls:** upgrade to version "3.1.1" ([0a3211a](https://github.com/typegoose/typegoose/commit/0a3211aa821fd3885d0d7221d4e376fdb1f0c5e4))
* **eslint:** upgrade to "7.26.0" ([601814d](https://github.com/typegoose/typegoose/commit/601814dfad2ae1620818c339a730f283956154df))
* **eslint:** upgrade to version "7.23.0" and plugins ([bf18717](https://github.com/typegoose/typegoose/commit/bf18717dc5187191ee70c9be4b8f6a07370cf618))
* **eslint:** upgrade to version "7.27.0" ([0db5b74](https://github.com/typegoose/typegoose/commit/0db5b74574fe34f5b9fabe954569cd145859a0b8))
* **eslint:** upgrade to version "7.29.0" ([525f1c0](https://github.com/typegoose/typegoose/commit/525f1c0055afcc94f0f4f5a6c944a2c78e7b7299))
* **eslint:** upgrade to version 7.31.0 ([e6ee83a](https://github.com/typegoose/typegoose/commit/e6ee83a7e6b676817f6869f0edb22e2137361d1f))
* **husky:** upgrade to version "6.0.0" ([e20983b](https://github.com/typegoose/typegoose/commit/e20983bf1f0889ee791ef3091a91019fc71d6b1c))
* **husky:** upgrade to version "7.0.0" ([5b58237](https://github.com/typegoose/typegoose/commit/5b58237be24c980f18050498edcdc940a47d1bfb))
* **husky:** upgrade to version 7.0.1 ([4decf83](https://github.com/typegoose/typegoose/commit/4decf83d22ffc9c3972bf3d1e22a12527f69c4cf))
* **jest:** upgrade to version "27.0.1" ([351ace3](https://github.com/typegoose/typegoose/commit/351ace32bede661b39ba5765fb2e3b6dec6c43ad))
* **jest:** upgrade to version "27.0.5" ([45e8e00](https://github.com/typegoose/typegoose/commit/45e8e0074d21ee15a44659234e85104378c59280))
* **jest:** upgrade to version "27.0.6" ([8eca711](https://github.com/typegoose/typegoose/commit/8eca71174e111c6fbc1de1ecad476b82ca64424c))
* **lint-staged:** upgrade to version "11.0.0" ([c8e6c13](https://github.com/typegoose/typegoose/commit/c8e6c1314f64f9d1b85ba1025dc3ded436cbef4a))
* **lint-staged:** upgrade to version 11.1.1 ([5f370ad](https://github.com/typegoose/typegoose/commit/5f370ad81faff038c1dad5997d018def79fc880c))
* **mongodb-memory-server:** upgrade to version "6.9.6" ([fb28d1d](https://github.com/typegoose/typegoose/commit/fb28d1d9c6bbf1d091baaa77f7225bd1ab199ab7))
* **mongodb-memory-server:** upgrade to version 7.0.0 ([6a5e914](https://github.com/typegoose/typegoose/commit/6a5e9142c198a0e8f787ff7f9e00a764644598b4))
* **mongodb-memory-server:** upgrade to version 7.3.4 ([460bdcb](https://github.com/typegoose/typegoose/commit/460bdcbc0a050c678c5eac42d8333558d07c72f5))
* **mongoose:** allow range "~5.12.14 || ~5.13.0" ([bcba9a2](https://github.com/typegoose/typegoose/commit/bcba9a274d03ac80c0c46ce5259a77d0294fb63a))
* **mongoose:** change from "^" to "~" until types are fixed ([b651113](https://github.com/typegoose/typegoose/commit/b651113314a24801c11fddb786444bcb09dfbe38))
* **mongoose:** upgrade to version "5.11.18" ([775f44e](https://github.com/typegoose/typegoose/commit/775f44e117f89f372b6d3f4b0e839a0f0a127d92))
* **mongoose:** upgrade to version "5.12.14" ([943d581](https://github.com/typegoose/typegoose/commit/943d5812732a4e0ec146e1302856023afec7c086))
* **mongoose:** upgrade to version "5.12.4" ([c3b7ce1](https://github.com/typegoose/typegoose/commit/c3b7ce179debaaac5c231fce029363c608133d6a))
* **mongoose:** upgrade to version "5.12.9" ([3cc88ae](https://github.com/typegoose/typegoose/commit/3cc88aeda1f1703e32605893a0ecf48f9656d1f6))
* **mongoose:** upgrade to version 5.13.3 ([c7414e6](https://github.com/typegoose/typegoose/commit/c7414e649369c0198b80fffc5004d6c014600cde))
* **prettier:** upgrade to "2.3.0" ([13058c1](https://github.com/typegoose/typegoose/commit/13058c133c5dd943267c77311276bd8b3a443220))
* **prettier:** upgrade to version "2.3.2" ([5e73507](https://github.com/typegoose/typegoose/commit/5e73507809282b5e66812d58182619ca51620484))
* **semantic-release:** upgrade to version "17.4.2" ([283afb1](https://github.com/typegoose/typegoose/commit/283afb15427650941236dce9583b4315152a6e36))
* **semantic-release:** upgrade to version "17.4.3" ([ed4cbfc](https://github.com/typegoose/typegoose/commit/ed4cbfce8a67e18692d2de1436ecaac72bbae773))
* **semantic-release:** upgrade to version "17.4.4" ([090d05f](https://github.com/typegoose/typegoose/commit/090d05f964f680767fc8321a1525e6fdf2a60078))
* **ts-jest:** upgrade eto version 27.0.4 ([e20fd0c](https://github.com/typegoose/typegoose/commit/e20fd0c7f0f01442591b8f604c8fab5a8be7fc43))
* **ts-jest:** upgrade to version "26.5.4" ([047051b](https://github.com/typegoose/typegoose/commit/047051bc0bb6c280c82914ae4a13e7e733faa02d))
* **ts-jest:** upgrade to version "27.0.3" ([dc0452f](https://github.com/typegoose/typegoose/commit/dc0452ffa5f5a58de24e4bd154119571d9d7fb96))
* **tslib:** upgrade to version "2.2.0" ([edd2581](https://github.com/typegoose/typegoose/commit/edd2581db6e572bbd7286a307ed3fcf7761ca140))
* **tslib:** upgrade to version "2.3.0" ([7a1ba2d](https://github.com/typegoose/typegoose/commit/7a1ba2d082c0dd581e54fd0d4d120c18a7694e87))
* **typescript:** upgrade to version "4.2.3" ([26a17a3](https://github.com/typegoose/typegoose/commit/26a17a3fd729cf70bc3fd56e59b8856bd6327246))
* **typescript:** upgrade to version "4.3.2" ([ee66bc6](https://github.com/typegoose/typegoose/commit/ee66bc689adc9c3b878ffd91f1ba203be495abea))
* **typescript:** upgrade to version "4.3.4" ([a2f4a5a](https://github.com/typegoose/typegoose/commit/a2f4a5ab1d06ea699d9bb3ff46c623ba81c52218))
* **typescript:** upgrade to version "4.3.5" ([4e87c03](https://github.com/typegoose/typegoose/commit/4e87c03221299ad2bb3a69bd0c121bae23dd079e))
* lockfile maintenance ([3486ae3](https://github.com/typegoose/typegoose/commit/3486ae35b21bc3cb2690a78e46f4f28b13c9480c))
* update yarn.lock ([fc17dc5](https://github.com/typegoose/typegoose/commit/fc17dc58c08bdce096ade6d58bc004a54b0784fd))


### Style

* **eslintrc:** disable rule "@typescript-eslint/no-non-null-assertion" ([38a69d2](https://github.com/typegoose/typegoose/commit/38a69d2ee4944ad62796360096cb35b79bfa7d2d))
* **hooks:** disable rule "@typescript-eslint/no-unused-vars" for file ([bf61ecb](https://github.com/typegoose/typegoose/commit/bf61ecb3938098f62479d340a61db212df4e1be4))
* **processProp:** disable function "optionDeprecation" ([90955ab](https://github.com/typegoose/typegoose/commit/90955ab4304d698c6951a93d646346dc3b51194b))
* **schema:** add comment on why an line is necessary ([d38aa5a](https://github.com/typegoose/typegoose/commit/d38aa5a521c178d91ecd3978b0868046f00327ec))
* **schema:** remove "as any" cast ([d9b2f24](https://github.com/typegoose/typegoose/commit/d9b2f247c84924b09f882d32ae7ec16b8c33e83b))
* **typegoose:** remove non-null assertion ([0413613](https://github.com/typegoose/typegoose/commit/0413613e28267d244f26f1477f712033c3fbbb35))
* **types:** fix lint ([087091c](https://github.com/typegoose/typegoose/commit/087091c029a776c504068bc917db658402f778b1))
* **types:** fix TODO (issue closed) ([20bd486](https://github.com/typegoose/typegoose/commit/20bd4868889953debb59ff71a8102e331865a090))
* **types:** remove unused comment ([23d9e2a](https://github.com/typegoose/typegoose/commit/23d9e2a17d9d07871501d5d7cf27e90903eff4f7))
* **types::IndexOptions:** simplify "weights" definition ([294cfff](https://github.com/typegoose/typegoose/commit/294cfffa5068b083431cde9a9d2691fc15280ef9))
* **utils:** remove "as any" for "SchemaTypeOptions" & "OptionsConstructor" ([7b5250a](https://github.com/typegoose/typegoose/commit/7b5250af7ebfdceafdbe8120bb6e0400cc562528))
* **utils:** remove unused parameters from "mergeWith" ([06df924](https://github.com/typegoose/typegoose/commit/06df924719abe0e287ddee7af892ba5fe3704ff3))
* **utils:** update comments for mongoose 5.11.19 ([74e1196](https://github.com/typegoose/typegoose/commit/74e119618e5d987bd952badb7de3a122511dfa39))

## [8.0.0-beta.24](https://github.com/typegoose/typegoose/compare/v8.0.0-beta.23...v8.0.0-beta.24) (2021-07-28)


### Style

* **types:** fix a typo (an -> a) ([#564](https://github.com/typegoose/typegoose/issues/564)) ([84e282c](https://github.com/typegoose/typegoose/commit/84e282c3db690877d5e01c5b20cae3e026f1e18f))


### Fixes

* **defaultClasses:** add missing 2nd parameter for findOrCreate() ([#573](https://github.com/typegoose/typegoose/issues/573)) ([8bd1254](https://github.com/typegoose/typegoose/commit/8bd1254f629400aed66a11cfcd75fb589101efcb))
* **dependencies:** lock "@types/mongoose" version to 5.10 minor in dev and peer dependencies ([#574](https://github.com/typegoose/typegoose/issues/574)) ([c7e49bb](https://github.com/typegoose/typegoose/commit/c7e49bb531c458a1adf0acecc495205de0451357))

## [8.0.0-beta.23](https://github.com/typegoose/typegoose/compare/v8.0.0-beta.22...v8.0.0-beta.23) (2021-07-28)


### Dependencies

* **@types/jest:** upgrade to version 26.0.24 ([d9b1b69](https://github.com/typegoose/typegoose/commit/d9b1b69c8dd4ebc1a207fe5643778dddec07ebf9))
* **@types/lodash:** upgrade to version 4.14.171 ([d6036de](https://github.com/typegoose/typegoose/commit/d6036ded91f8e4bbe2664a0669c028224e2abd19))
* **@types/semver:** upgrade to version 7.3.8 ([2f2d60e](https://github.com/typegoose/typegoose/commit/2f2d60ed6dd5f992ae04215b800e5dcdeabf7544))
* **@typescript-eslint/*:** upgrade to version 4.28.5 ([d7dcc92](https://github.com/typegoose/typegoose/commit/d7dcc925093e1155f3e7fdbb83066fb8861d3335))
* **commitlint:** upgrade to version 13.1.0 ([62bbfb9](https://github.com/typegoose/typegoose/commit/62bbfb9e060ee90a751a0cccee9320d0b1afd7bd))
* **eslint:** upgrade to version 7.31.0 ([e6ee83a](https://github.com/typegoose/typegoose/commit/e6ee83a7e6b676817f6869f0edb22e2137361d1f))
* **husky:** upgrade to version 7.0.1 ([4decf83](https://github.com/typegoose/typegoose/commit/4decf83d22ffc9c3972bf3d1e22a12527f69c4cf))
* **lint-staged:** upgrade to version 11.1.1 ([5f370ad](https://github.com/typegoose/typegoose/commit/5f370ad81faff038c1dad5997d018def79fc880c))
* **mongodb-memory-server:** upgrade to version 7.3.4 ([460bdcb](https://github.com/typegoose/typegoose/commit/460bdcbc0a050c678c5eac42d8333558d07c72f5))
* **mongoose:** upgrade to version 5.13.3 ([c7414e6](https://github.com/typegoose/typegoose/commit/c7414e649369c0198b80fffc5004d6c014600cde))
* **ts-jest:** upgrade eto version 27.0.4 ([e20fd0c](https://github.com/typegoose/typegoose/commit/e20fd0c7f0f01442591b8f604c8fab5a8be7fc43))


### Style

* **types:** fix TODO (issue closed) ([20bd486](https://github.com/typegoose/typegoose/commit/20bd4868889953debb59ff71a8102e331865a090))

## [8.0.0-beta.22](https://github.com/typegoose/typegoose/compare/v8.0.0-beta.21...v8.0.0-beta.22) (2021-07-21)


### Features

* add class "Passthrough" and functionality ([e9ee628](https://github.com/typegoose/typegoose/commit/e9ee6286537549ff9bc54ac95e77abf4e610cf79)), closes [typegoose/typegoose#382](https://github.com/typegoose/typegoose/issues/382)

## [8.0.0-beta.21](https://github.com/typegoose/typegoose/compare/v8.0.0-beta.20...v8.0.0-beta.21) (2021-07-01)


### Dependencies

* **husky:** upgrade to version "7.0.0" ([5b58237](https://github.com/typegoose/typegoose/commit/5b58237be24c980f18050498edcdc940a47d1bfb))
* **tslib:** upgrade to version "2.3.0" ([7a1ba2d](https://github.com/typegoose/typegoose/commit/7a1ba2d082c0dd581e54fd0d4d120c18a7694e87))
* **typescript:** upgrade to version "4.3.5" ([4e87c03](https://github.com/typegoose/typegoose/commit/4e87c03221299ad2bb3a69bd0c121bae23dd079e))

## [8.0.0-beta.20](https://github.com/typegoose/typegoose/compare/v8.0.0-beta.19...v8.0.0-beta.20) (2021-07-01)


### Dependencies

* **mongodb-memory-server:** upgrade to version 7.0.0 ([6a5e914](https://github.com/typegoose/typegoose/commit/6a5e9142c198a0e8f787ff7f9e00a764644598b4))

## [8.0.0-beta.19](https://github.com/typegoose/typegoose/compare/v8.0.0-beta.18...v8.0.0-beta.19) (2021-06-29)


### Dependencies

* **mongoose:** allow range "~5.12.14 || ~5.13.0" ([bcba9a2](https://github.com/typegoose/typegoose/commit/bcba9a274d03ac80c0c46ce5259a77d0294fb63a))

## [8.0.0-beta.18](https://github.com/typegoose/typegoose/compare/v8.0.0-beta.17...v8.0.0-beta.18) (2021-06-29)


### Features

* **types:** add option prop option "castNonArrays" ([3a9e95a](https://github.com/typegoose/typegoose/commit/3a9e95aae4173e7b5e072ee70db470cf6b6cccf5)), closes [typegoose/typegoose#568](https://github.com/typegoose/typegoose/issues/568)


### Dependencies

* **@typescript-eslint/*:** upgrade to version "4.28.1" ([49b1c11](https://github.com/typegoose/typegoose/commit/49b1c1189388b47f15790095169dbfcb6d5561ad))
* **coveralls:** upgrade to version "3.1.1" ([0a3211a](https://github.com/typegoose/typegoose/commit/0a3211aa821fd3885d0d7221d4e376fdb1f0c5e4))
* **jest:** upgrade to version "27.0.6" ([8eca711](https://github.com/typegoose/typegoose/commit/8eca71174e111c6fbc1de1ecad476b82ca64424c))

## [8.0.0-beta.17](https://github.com/typegoose/typegoose/compare/v8.0.0-beta.16...v8.0.0-beta.17) (2021-06-28)


### ⚠ BREAKING CHANGES

* **typeguards:** `isRefType` now is way more stricter and requires an second parameter to work

### Features

* **typeguards:** enhance "isRefType" checks ([e3a3bf7](https://github.com/typegoose/typegoose/commit/e3a3bf7150cd9569b974c7c4322d35f66ec03957)), closes [typegoose/typegoose#569](https://github.com/typegoose/typegoose/issues/569)


### Dependencies

* **@typescript-eslint/*:** upgrade to version "4.28.0" ([7c8883b](https://github.com/typegoose/typegoose/commit/7c8883b68a8045321d093eaa59dcab6425aff183))
* **eslint:** upgrade to version "7.29.0" ([525f1c0](https://github.com/typegoose/typegoose/commit/525f1c0055afcc94f0f4f5a6c944a2c78e7b7299))
* **jest:** upgrade to version "27.0.5" ([45e8e00](https://github.com/typegoose/typegoose/commit/45e8e0074d21ee15a44659234e85104378c59280))
* **prettier:** upgrade to version "2.3.2" ([5e73507](https://github.com/typegoose/typegoose/commit/5e73507809282b5e66812d58182619ca51620484))
* **ts-jest:** upgrade to version "27.0.3" ([dc0452f](https://github.com/typegoose/typegoose/commit/dc0452ffa5f5a58de24e4bd154119571d9d7fb96))
* **typescript:** upgrade to version "4.3.4" ([a2f4a5a](https://github.com/typegoose/typegoose/commit/a2f4a5ab1d06ea699d9bb3ff46c623ba81c52218))

## [8.0.0-beta.16](https://github.com/typegoose/typegoose/compare/v8.0.0-beta.15...v8.0.0-beta.16) (2021-06-17)


### Features

* **processProp:** allow & correctly map reference-maps ([581b6b3](https://github.com/typegoose/typegoose/commit/581b6b3b372922d6df9a84711958fac98332ca38))


### Fixes

* **processProp:** set type to "Mixed" when type is still "*Map" ([e98d026](https://github.com/typegoose/typegoose/commit/e98d026dc4f231e4bf1841bbaba9df1cc705e83f))


### Dependencies

* **mongoose:** upgrade to version "5.12.14" ([943d581](https://github.com/typegoose/typegoose/commit/943d5812732a4e0ec146e1302856023afec7c086))

## [8.0.0-beta.15](https://github.com/typegoose/typegoose/compare/v8.0.0-beta.14...v8.0.0-beta.15) (2021-06-17)


### Fixes

* **hooks:** remove unused "done" callback ([4692976](https://github.com/typegoose/typegoose/commit/46929760d6568feff07a5a1ff1e87baccdcb00db)), closes [typegoose/typegoose#561](https://github.com/typegoose/typegoose/issues/561)


### Dependencies

* **@semantic-release/release-notes-generator:** upgrade to version "9.0.3" ([a8ba787](https://github.com/typegoose/typegoose/commit/a8ba787ac1eb833b1bb157b43e9d2ea3c5d59a2a))
* **semantic-release:** upgrade to version "17.4.4" ([090d05f](https://github.com/typegoose/typegoose/commit/090d05f964f680767fc8321a1525e6fdf2a60078))

## [8.0.0-beta.14](https://github.com/typegoose/typegoose/compare/v8.0.0-beta.13...v8.0.0-beta.14) (2021-06-10)


### Fixes

* **index:** extend typings of the index decorator ([#548](https://github.com/typegoose/typegoose/issues/548)) ([f24ee9d](https://github.com/typegoose/typegoose/commit/f24ee9d4b2f0d02d2652f5a895f7793a7eb3240c))


### Style

* **types::IndexOptions:** simplify "weights" definition ([294cfff](https://github.com/typegoose/typegoose/commit/294cfffa5068b083431cde9a9d2691fc15280ef9))

## [8.0.0-beta.13](https://github.com/typegoose/typegoose/compare/v8.0.0-beta.12...v8.0.0-beta.13) (2021-06-02)


### Fixes

* **processProp:** add error code E023 for '"ref" is not supported for "${propKind}"!' ([8bdfcd7](https://github.com/typegoose/typegoose/commit/8bdfcd77267c219f9ee8a758526ccee20d701f77))

## [8.0.0-beta.12](https://github.com/typegoose/typegoose/compare/v8.0.0-beta.11...v8.0.0-beta.12) (2021-05-31)


### Fixes

* **processProp:** add error code E023 for '"ref" is not supported for "${propKind}"!' ([63a5b31](https://github.com/typegoose/typegoose/commit/63a5b3199f33ca7ff28a7653314c46fc12fc3dac))

## [8.0.0-beta.11](https://github.com/typegoose/typegoose/compare/v8.0.0-beta.10...v8.0.0-beta.11) (2021-05-29)


### ⚠ BREAKING CHANGES

* NodeJS 10 & 11 are now unsupported, lowest supported is now NodeJS 12

### Features

* unsupport nodejs 10 & 11 ([d24d6d7](https://github.com/typegoose/typegoose/commit/d24d6d7a86735603ea6bbe28503f90e0723cce8c))


### Dependencies

* **@semantic-release/github:** upgrade to version "7.2.3" ([c52195c](https://github.com/typegoose/typegoose/commit/c52195cd7157b11c15031fc63211a273ef3611b3))
* **@semantic-release/npm:** upgrade to version "7.1.3" ([d58a074](https://github.com/typegoose/typegoose/commit/d58a07406c0cf3897b8b78bca67b02f62d2d9f13))
* **@types/jest:** upgrade to version "26.0.23" ([ab65cce](https://github.com/typegoose/typegoose/commit/ab65cce8d32c3969acfe0d47a4be42bcbd6e0074))
* **@types/lodash:** upgrade to version "4.14.170" ([96be5b4](https://github.com/typegoose/typegoose/commit/96be5b495de98b175b53cde5f42a94a09efe9248))
* **@types/node:** upgrade to version "12.12.6" ([0b91f99](https://github.com/typegoose/typegoose/commit/0b91f99f2ace3eb70903a3407ed9e50a90967743))
* **@types/semver:** upgrade to version "7.3.6" ([7e60b5c](https://github.com/typegoose/typegoose/commit/7e60b5c41eef15ea48004198f0dd74bb4179a0d1))
* **@typescript-eslint/*:** upgrade to version "4.25.0" ([e768711](https://github.com/typegoose/typegoose/commit/e768711e817fb106dd5df10ed19981050c863139))
* **commitlint:** upgrade to version "12.1.4" ([7e29e40](https://github.com/typegoose/typegoose/commit/7e29e4062e3d9285b113fba58d24d366242b7f56))
* **eslint:** upgrade to version "7.27.0" ([0db5b74](https://github.com/typegoose/typegoose/commit/0db5b74574fe34f5b9fabe954569cd145859a0b8))
* **jest:** upgrade to version "27.0.1" ([351ace3](https://github.com/typegoose/typegoose/commit/351ace32bede661b39ba5765fb2e3b6dec6c43ad))
* **lint-staged:** upgrade to version "11.0.0" ([c8e6c13](https://github.com/typegoose/typegoose/commit/c8e6c1314f64f9d1b85ba1025dc3ded436cbef4a))
* **semantic-release:** upgrade to version "17.4.3" ([ed4cbfc](https://github.com/typegoose/typegoose/commit/ed4cbfce8a67e18692d2de1436ecaac72bbae773))
* **tslib:** upgrade to version "2.2.0" ([edd2581](https://github.com/typegoose/typegoose/commit/edd2581db6e572bbd7286a307ed3fcf7761ca140))
* **typescript:** upgrade to version "4.3.2" ([ee66bc6](https://github.com/typegoose/typegoose/commit/ee66bc689adc9c3b878ffd91f1ba203be495abea))


### Style

* **eslintrc:** disable rule "@typescript-eslint/no-non-null-assertion" ([38a69d2](https://github.com/typegoose/typegoose/commit/38a69d2ee4944ad62796360096cb35b79bfa7d2d))
* **hooks:** disable rule "@typescript-eslint/no-unused-vars" for file ([bf61ecb](https://github.com/typegoose/typegoose/commit/bf61ecb3938098f62479d340a61db212df4e1be4))
* **processProp:** disable function "optionDeprecation" ([90955ab](https://github.com/typegoose/typegoose/commit/90955ab4304d698c6951a93d646346dc3b51194b))
* **typegoose:** remove non-null assertion ([0413613](https://github.com/typegoose/typegoose/commit/0413613e28267d244f26f1477f712033c3fbbb35))
* **utils:** remove unused parameters from "mergeWith" ([06df924](https://github.com/typegoose/typegoose/commit/06df924719abe0e287ddee7af892ba5fe3704ff3))

## [8.0.0-beta.10](https://github.com/typegoose/typegoose/compare/v8.0.0-beta.9...v8.0.0-beta.10) (2021-05-29)


### Fixes

* **typegoose:** fix lowest supported mongoose version ([90d2c2f](https://github.com/typegoose/typegoose/commit/90d2c2ffc56a2450b08158927d3f34becb13a9a8))

## [8.0.0-beta.9](https://github.com/typegoose/typegoose/compare/v8.0.0-beta.8...v8.0.0-beta.9) (2021-05-14)


### Dependencies

* **mongoose:** upgrade to version "5.12.9" ([3cc88ae](https://github.com/typegoose/typegoose/commit/3cc88aeda1f1703e32605893a0ecf48f9656d1f6))

## [8.0.0-beta.8](https://github.com/typegoose/typegoose/compare/v8.0.0-beta.7...v8.0.0-beta.8) (2021-05-14)


### Features

* **utils:** move E019 Error into its own class to confuse less ([6ad5043](https://github.com/typegoose/typegoose/commit/6ad5043ac1a02281cc4215ba2cfaa4ce3421e28c))

## [8.0.0-beta.7](https://github.com/typegoose/typegoose/compare/v8.0.0-beta.6...v8.0.0-beta.7) (2021-05-11)


### Dependencies

* **@semantic-release/npm:** upgrade to "7.1.3" ([a4fa9ce](https://github.com/typegoose/typegoose/commit/a4fa9cec4bd7456bbe5a29a1a4c45a15a60b49d3))
* **commitlint:** upgrade to "12.1.1" ([6442141](https://github.com/typegoose/typegoose/commit/6442141963e919ad5c830c98027baff156faefe6))
* **eslint:** upgrade to "7.26.0" ([601814d](https://github.com/typegoose/typegoose/commit/601814dfad2ae1620818c339a730f283956154df))
* **prettier:** upgrade to "2.3.0" ([13058c1](https://github.com/typegoose/typegoose/commit/13058c133c5dd943267c77311276bd8b3a443220))

## [8.0.0-beta.6](https://github.com/typegoose/typegoose/compare/v8.0.0-beta.5...v8.0.0-beta.6) (2021-05-11)


### Style

* **schema:** add comment on why an line is necessary ([d38aa5a](https://github.com/typegoose/typegoose/commit/d38aa5a521c178d91ecd3978b0868046f00327ec))
* **schema:** remove "as any" cast ([d9b2f24](https://github.com/typegoose/typegoose/commit/d9b2f247c84924b09f882d32ae7ec16b8c33e83b))

## [8.0.0-beta.5](https://github.com/typegoose/typegoose/compare/v8.0.0-beta.4...v8.0.0-beta.5) (2021-04-16)


### Features

* use customName and automaticName from buildSchema ([#502](https://github.com/typegoose/typegoose/issues/502)) ([9eab528](https://github.com/typegoose/typegoose/commit/9eab528e5066c064effedb0c272b52607e7e826c))


### Dependencies

* **mongoose:** upgrade to version "5.12.4" ([c3b7ce1](https://github.com/typegoose/typegoose/commit/c3b7ce179debaaac5c231fce029363c608133d6a))


### Fixes

* **types:** add "QueryHelpers" to "DocumentType" ([f4dba22](https://github.com/typegoose/typegoose/commit/f4dba22ee4965a1c8afadf800ee4cdf8964445a1))


### Style

* **hooks:** update comment ([9302e62](https://github.com/typegoose/typegoose/commit/9302e6287e60f56fb9cf4cf37136064724fcce5f))
* **index:** update tsdoc ([f418ffa](https://github.com/typegoose/typegoose/commit/f418ffacd74d3b062656ae32fac6fa427dd8fdba))
* **modelOptions:** update tsdoc ([ae1f1da](https://github.com/typegoose/typegoose/commit/ae1f1da769340a03b45353612d81ede4cb081a6a))
* **plugin:** update tsdoc ([b984dc1](https://github.com/typegoose/typegoose/commit/b984dc195c4d9c4b78b6eb1e84d88d2918d0c032))
* **prop:** update tsdoc ([fff099b](https://github.com/typegoose/typegoose/commit/fff099b5eeac7c451c84d46c658ad2cbd5763471))
* **queryMethod:** update tsdoc ([e911c7b](https://github.com/typegoose/typegoose/commit/e911c7be3266e64898a6a47acf42d3b95c2de100))
* **typegoose:** update tsdoc ([c277d93](https://github.com/typegoose/typegoose/commit/c277d9371143c78e0a199ed1c9e94d3d483d3284))
* **types:** fix lint ([087091c](https://github.com/typegoose/typegoose/commit/087091c029a776c504068bc917db658402f778b1))
* **types:** update tsdoc ([0c91bb5](https://github.com/typegoose/typegoose/commit/0c91bb5a85fa2eac48ca7996a0734b94869fbdd7))
* **utils:** fix typos in comments ([6e8d2d0](https://github.com/typegoose/typegoose/commit/6e8d2d0da3aecfce98511fd54147a0d12a721130))
* **utils:** remove "as any" for "SchemaTypeOptions" & "OptionsConstructor" ([7b5250a](https://github.com/typegoose/typegoose/commit/7b5250af7ebfdceafdbe8120bb6e0400cc562528))

## [8.0.0-beta.4](https://github.com/typegoose/typegoose/compare/v8.0.0-beta.3...v8.0.0-beta.4) (2021-03-31)


### ⚠ BREAKING CHANGES

* **processProp:** "ref" and "refPath" now use "mapArrayOptions" that means that some options might be mapped differently

### Features

* **processProp:** use "mapArrayOptions" for "ref" and "refPath" ([b39eff9](https://github.com/typegoose/typegoose/commit/b39eff9367e6910515944a140d7c939dddc532e3)), closes [typegoose/typegoose#513](https://github.com/typegoose/typegoose/issues/513)

## [8.0.0-beta.3](https://github.com/typegoose/typegoose/compare/v8.0.0-beta.2...v8.0.0-beta.3) (2021-03-30)


### Dependencies

* lockfile maintenance ([3486ae3](https://github.com/typegoose/typegoose/commit/3486ae35b21bc3cb2690a78e46f4f28b13c9480c))
* **@semantic-release/release-notes-generator:** upgrade to version "9.0.2" ([c0b2a77](https://github.com/typegoose/typegoose/commit/c0b2a776c04be9c2d52bd977b7052e216208bed1))
* **@types/jest:** upgrade to version "26.0.22" ([e7d4ef1](https://github.com/typegoose/typegoose/commit/e7d4ef177c12dd9ba023e096d27d2a5b0a8e3bd9))
* **@types/node:** upgrade to "10.17.56" ([cc23392](https://github.com/typegoose/typegoose/commit/cc2339276163be7b4130140b70a7798956a7f1db))
* **eslint:** upgrade to version "7.23.0" and plugins ([bf18717](https://github.com/typegoose/typegoose/commit/bf18717dc5187191ee70c9be4b8f6a07370cf618))
* **husky:** upgrade to version "6.0.0" ([e20983b](https://github.com/typegoose/typegoose/commit/e20983bf1f0889ee791ef3091a91019fc71d6b1c))
* **mongodb-memory-server:** upgrade to version "6.9.6" ([fb28d1d](https://github.com/typegoose/typegoose/commit/fb28d1d9c6bbf1d091baaa77f7225bd1ab199ab7))
* **mongoose:** change from "^" to "~" until types are fixed ([b651113](https://github.com/typegoose/typegoose/commit/b651113314a24801c11fddb786444bcb09dfbe38))
* **semantic-release:** upgrade to version "17.4.2" ([283afb1](https://github.com/typegoose/typegoose/commit/283afb15427650941236dce9583b4315152a6e36))
* **ts-jest:** upgrade to version "26.5.4" ([047051b](https://github.com/typegoose/typegoose/commit/047051bc0bb6c280c82914ae4a13e7e733faa02d))
* **typescript:** upgrade to version "4.2.3" ([26a17a3](https://github.com/typegoose/typegoose/commit/26a17a3fd729cf70bc3fd56e59b8856bd6327246))

## [8.0.0-beta.2](https://github.com/typegoose/typegoose/compare/v8.0.0-beta.1...v8.0.0-beta.2) (2021-03-06)


### ⚠ BREAKING CHANGES

* Changing types from unofficial to official is an breaking change

### Features

* Update to work with mongoose 5.11 ([6cdfb0f](https://github.com/typegoose/typegoose/commit/6cdfb0fa889cbf6aea52e1bb8de9975f129e4136))


### Dependencies

* **mongoose:** upgrade to version "5.11.18" ([775f44e](https://github.com/typegoose/typegoose/commit/775f44e117f89f372b6d3f4b0e839a0f0a127d92))


### Fixes

* **defaultClasses:** convert "Base" into an interface ([2071aa7](https://github.com/typegoose/typegoose/commit/2071aa73ceb6d4894e251dc54232a5b8a5375be9))
* **types:** re-enable QueryHelpers for official types ([99071b1](https://github.com/typegoose/typegoose/commit/99071b14a2b50128df6a6f3dc101194edcb27d24))


### Style

* **types:** remove unused comment ([23d9e2a](https://github.com/typegoose/typegoose/commit/23d9e2a17d9d07871501d5d7cf27e90903eff4f7))
* **utils:** update comments for mongoose 5.11.19 ([74e1196](https://github.com/typegoose/typegoose/commit/74e119618e5d987bd952badb7de3a122511dfa39))

## [8.0.0-beta.1](https://github.com/typegoose/typegoose/compare/v7.5.0...v8.0.0-beta.1) (2021-03-03)


### ⚠ BREAKING CHANGES

* **prop:** Removing deprecated options "items", "of", "refType"
* **prop:** Removing deprecated function "mapProp"
* **prop:** Removing deprecated function "arrayProp"

### Features

* **prop:** remove "arrayProp" ([8a5b337](https://github.com/typegoose/typegoose/commit/8a5b337fdc4de282534ad2226e26cec65375f452)), closes [#258](https://github.com/typegoose/typegoose/issues/258)
* **prop:** remove "mapProp" ([9e913b8](https://github.com/typegoose/typegoose/commit/9e913b87bd7faa81cff2102c22b05b2230ea75a4)), closes [#258](https://github.com/typegoose/typegoose/issues/258)
* **prop:** remove deprecated options ([c27d2a0](https://github.com/typegoose/typegoose/commit/c27d2a0481d03e864803b912348061257228a8c3)), closes [#257](https://github.com/typegoose/typegoose/issues/257)


### Reverts

* "release: v7.6.0-beta.1" ([8116a7d](https://github.com/typegoose/typegoose/commit/8116a7dd5db3c1e3680edd9b97f707c3b3513e7f))


### Dependencies

* update yarn.lock ([fc17dc5](https://github.com/typegoose/typegoose/commit/fc17dc58c08bdce096ade6d58bc004a54b0784fd))

### [7.6.3](https://github.com/typegoose/typegoose/compare/v7.6.2...v7.6.3) (2021-07-10)


### Fixes

* **dependencies:** lock "@types/mongoose" version to 5.10 minor in dev and peer dependencies ([#574](https://github.com/typegoose/typegoose/issues/574)) ([c7e49bb](https://github.com/typegoose/typegoose/commit/c7e49bb531c458a1adf0acecc495205de0451357))

### [7.6.2](https://github.com/typegoose/typegoose/compare/v7.6.1...v7.6.2) (2021-07-07)


### Style

* **types:** fix a typo (an -> a) ([#564](https://github.com/typegoose/typegoose/issues/564)) ([84e282c](https://github.com/typegoose/typegoose/commit/84e282c3db690877d5e01c5b20cae3e026f1e18f))


### Fixes

* **defaultClasses:** add missing 2nd parameter for findOrCreate() ([#573](https://github.com/typegoose/typegoose/issues/573)) ([8bd1254](https://github.com/typegoose/typegoose/commit/8bd1254f629400aed66a11cfcd75fb589101efcb))

### [7.6.1](https://github.com/typegoose/typegoose/compare/v7.6.0...v7.6.1) (2021-05-31)


### Fixes

* **processProp:** add error code E023 for '"ref" is not supported for "${propKind}"!' ([8bdfcd7](https://github.com/typegoose/typegoose/commit/8bdfcd77267c219f9ee8a758526ccee20d701f77))

## [7.6.0](https://github.com/typegoose/typegoose/compare/v7.5.0...v7.6.0) (2021-03-08)


### Features

* use customName and automaticName from buildSchema ([#502](https://github.com/typegoose/typegoose/issues/502)) ([9eab528](https://github.com/typegoose/typegoose/commit/9eab528e5066c064effedb0c272b52607e7e826c))


### Style

* **hooks:** update comment ([9302e62](https://github.com/typegoose/typegoose/commit/9302e6287e60f56fb9cf4cf37136064724fcce5f))
* **index:** update tsdoc ([f418ffa](https://github.com/typegoose/typegoose/commit/f418ffacd74d3b062656ae32fac6fa427dd8fdba))
* **modelOptions:** update tsdoc ([ae1f1da](https://github.com/typegoose/typegoose/commit/ae1f1da769340a03b45353612d81ede4cb081a6a))
* **plugin:** update tsdoc ([b984dc1](https://github.com/typegoose/typegoose/commit/b984dc195c4d9c4b78b6eb1e84d88d2918d0c032))
* **prop:** update tsdoc ([fff099b](https://github.com/typegoose/typegoose/commit/fff099b5eeac7c451c84d46c658ad2cbd5763471))
* **queryMethod:** update tsdoc ([e911c7b](https://github.com/typegoose/typegoose/commit/e911c7be3266e64898a6a47acf42d3b95c2de100))
* **typegoose:** update tsdoc ([c277d93](https://github.com/typegoose/typegoose/commit/c277d9371143c78e0a199ed1c9e94d3d483d3284))
* **types:** update tsdoc ([0c91bb5](https://github.com/typegoose/typegoose/commit/0c91bb5a85fa2eac48ca7996a0734b94869fbdd7))
* **utils:** fix typos in comments ([6e8d2d0](https://github.com/typegoose/typegoose/commit/6e8d2d0da3aecfce98511fd54147a0d12a721130))


## [7.5.0](https://github.com/typegoose/typegoose/compare/v7.4.8...v7.5.0) (2021-03-01)


### Dependencies

* **class-transformer:** upgrade to version "0.4.0" ([ead6fea](https://github.com/typegoose/typegoose/commit/ead6fead41afca0c0079dec9dedd1ab64d3ec626))
* **commitlint:** upgrade to version "12.0.1" ([6657a0a](https://github.com/typegoose/typegoose/commit/6657a0af6cf8cf01b0a5a73890fcadc37c1d69be))
* **typescript:** upgrade to version "4.2.2" ([8b67ac3](https://github.com/typegoose/typegoose/commit/8b67ac31362f0ae4da3b7a9e6913b39a245d2f79))
* update dev dependencies ([922a507](https://github.com/typegoose/typegoose/commit/922a507d065762181826ec32a0a2a96b5e60236c))


### Style

* **lint:** fix lint ([64567e4](https://github.com/typegoose/typegoose/commit/64567e4c7f55d966cc8ff74c892fec7caa351643))


### Fixes

* **typegoose:** remove "non-null" assertion from "buildSchema" ([9d0a10b](https://github.com/typegoose/typegoose/commit/9d0a10b051585848b276650641c3820002d5075e))
* **utils:** apply grammar change to error message ([a0304e0](https://github.com/typegoose/typegoose/commit/a0304e0ce6afdd45afdab49ba3b69e296f573170))

---

Everything Below here is manually made:

## 7.4.8

- Fix when using `get/set` option to use the schema instead of the class [[typegoose#478](https://github.com/typegoose/typegoose/issues/478)]

## 7.4.7

- Renamed type `QueryMethod` to `AsQueryMethod` to not conflict with the PascalCase export for decorator `@queryMethod` [[typegoose#465](https://github.com/typegoose/typegoose/issues/465)]
- Add aggregate hook [[typegoose#471](https://github.com/typegoose/typegoose/issues/471)]

## 7.4.6

- add param for existingMongoose/existingConnection to addModelToTypegoose [[typegoose#436](https://github.com/typegoose/typegoose/issues/436)]
- add mongoose version diagnostic info [[typegoose#458](https://github.com/typegoose/typegoose/issues/458)]
- update mongoose version error to currently supported range (from `5.9.x` to `5.10.x`)
- add warning when using higher mongoose version than `5.10.18`

## 7.4.5

- Rename type `NDA` to `NumberOrDocumentOrDocumentArray` to be more understandable
- Fix `Argument of type 'string[]' is not assignable to parameter of type '"insertMany"'.ts(2769)` [[typegoose#362](https://github.com/typegoose/typegoose/issues/362)]

## 7.4.4

- Apply correct processing with WhatIsIt when options "get/set" are provided [[typegoose#422](https://github.com/typegoose/typegoose/issues/422)]

## 7.4.3

- constrain mongoose version to `5.10.0` to `5.10.18`, [read here for more](guides/faq.md#why-is-74x-constrained-to-mongoose-51018)

## 7.4.2

- Default to `mongoose.Schema.Types.Mixed` if Type is still `*Array` [[typegoose#300](https://github.com/typegoose/typegoose/issues/300)]

## 7.4.1

- Allow async functions in hooks [[typegoose#381](https://github.com/typegoose/typegoose/issues/381)]

## 7.4.0

- Update Dependencies
  - `mongoose` to 5.10.4
  - `lodash` to 4.17.20
  - `loglevel` to 1.7.0
  - `tslib` to 2.0.1
  - `@types/mongoose` to 5.7.36
- Add warning if `justOne` is defined, but no Virtual Populate Options
- Allow any argument to `DeferredFunc`
- Add Type `DynamicStringFunc`
- Allow definition of functions for `localField` & `foreignField`
- Allow returning an function in `ref` (`ref: () => (doc) => doc.someProp`)
- Allow the NestJS / Type-GraphQl way of defining arrays (`type: () => [String]` (and nested too))
- [IC] Fix that `dim` is included as an option in the schema [[typegoose#366](https://github.com/typegoose/typegoose/issues/366)]

## 7.3.5

- Add Error Codes [Errors & Warnings Details](guides/error-warnings-details.md)
- Remove never triggered Error `InvalidPropError`
- Change "Options-not-for-current-type" Errors into warnings (with actual information on what options are included) [[typegoose#363](https://github.com/typegoose/typegoose/issues/363)]
- [IC] Assigning `schemaOptions` in `src/internal/schema.ts` to a blank object [[typegoose#357](https://github.com/typegoose/typegoose/issues/357)]

## 7.3.4

- Improved Client-side check

## 7.3.3

- Don't assume that the plugin function has an name [[typegoose#353](https://github.com/typegoose/typegoose/issues/353)]
- Only check mongoose & nodejs version if `process` is defined
- [IC] replace all `util.format` with template strings [[typegoose#348](https://github.com/typegoose/typegoose/issues/348)]
- [IC] add wrapper & polyfill for `util.deprecate`[[typegoose#344](https://github.com/typegoose/typegoose/issues/344)]

## 7.3.2

- Update `@prop` tsdoc to show it supports Maps and Arrays
- Update dead documentation links
- Update enum-error to better reflect what the error is about

## 7.3.1

- Update Dependencies
  - `typescript` to 3.9.7
- Add hook-typings for `countDocuments`, `estimatedDocumentCount`, `deleteMany`, `findOneAndDelete`, `deleteOne`

## 7.3.0

- Update Dependencies
  - `mongoose` to 5.9.22
  - `lodash` to 4.17.19
  - `@types/mongoose` to 5.7.30
  - `@types/lodash` to 4.14.157
  - `@types/semver` to 7.3.1
  - `typescript` to 3.9.6
- `TimeStamps`'s (Default Class) properties are not marked as `Readonly` anymore
- All Typeguards now accept `undefined` as the first parameter too (if an type was OR with `undefined`, the function would give an type-error)
- Add option `discriminators` for embedded Discriminators [[typegoose#248](https://github.com/typegoose/typegoose/issues/248)]
- Set correct Decorator Return type (`ClassDecorator` & `PropertyDecorator`)
- Change warning message for `warnMixed`
- If an SchemaType doesn't extend `SchemaTypeOptions`, the options are now defaulted to the outer-layer
- `innerOptions` and `outerOptions` can now be used for Maps too
- Custom Validators now support `message` being an function
- Automatically convert `mongoose.Types.Buffer` to `mongoose.Schema.Types.Buffer`
- Fix Types when extending default class `Base` with other than `ObjectId` [[typegoose#316](https://github.com/typegoose/typegoose/issues/316)]
- [IC] `mapOptions` now always errors if the given type doesn't extend `mongoose.SchemaTypeOptions`
- [IC] Moved function `_buildPropMetadata` to its own file (`processProp`) and renamed it to `processProp` [[typegoose#286](https://github.com/typegoose/typegoose/issues/286)]
- [IC] Moved pre-processing in function `prop` into `processProp` [[typegoose#286](https://github.com/typegoose/typegoose/issues/286)]
- [IC] Removed error `NoMetadataError`
- [IC] Removed check that `Type` needs to be defined in `prop` / `processProp`

## 7.2.0

- Update Dependencies
  - `mongoose` to 5.9.17
  - `@types/mongoose` to 5.7.21
  - `typescript` to 3.9.3
- Remove type `RefSchemaType`
- Add `mongoose.Schema.Types.*` that are suitable for ref to `RefType`
- Runtime-Deprecate `@mapProp`(`TDEP0002`) & `@arrayProp`(`TDEP0001`)
- Runtime-Deprecate `type`-alias options, `items` & `of` & `refType`(`TDEP0003`)
- Handle `mongoose.Types.Array<Ref<>>` for Typeguards (`isDocumentArray` & `isRefTypeArray`) [[typegoose#278](https://github.com/typegoose/typegoose/issues/278)]

## 7.1.3

- Added an Error if option `ref` is set but is `undefined/null`
- Add `mongoose.Types.DocumentArray` and `mongoose.Schema.Types.DocumentArray` to `@prop` array-detection
- Change `if (!kind)` to `if (isNullOrUndefined(kind))`

## 7.1.2

- `@prop` options types now work again
- `BasePropOptions.type` is now `unknown` instead of `any`
- All aliases of `BasePropOptions.type` now inherit the types from there
- Fix bug where autopopulate (or any other plugin) wouldn't pick up on virtuals [[typegoose#274](https://github.com/typegoose/typegoose/issues/274)]
- [IC] `refType` is now moved to `prop`

## 7.1.1

- Remove empty interface `PropOptions`
- Remove type `PropOptionsWithValidate`
- Rename type `PropOptionsWithNumberValidate` to `PropOptionsForNumber`
- Rename type `PropOptionsWithStringValidate` to `PropOptionsForString`
- Add options `options` & `match` for `VirtualOptions`
- Add option `enum` for `ValidateNumberOptions`
- `arrayProp` & `mapProp` are now just an alias for `prop`
- Set TSDoc option `@deprecated` for `arrayProp` and `mapProp`
- Detect `mongoose.Types.Array` & `mongoose.Schema.Types.Array` as `Array` in `@prop`
- Detect `mongoose.Types.Map` & `mongoose.Schema.Types.Map` as `Map` in `@prop`
- Add Overloads to `@prop`
- PascalCased decorators now have the TSDoc of the original function
- Default class `Base`'s `__v` & `__t` are now optional (with `?`)
- Fix mentioned bug from [typegoose#181](https://github.com/typegoose/typegoose/issues/181), to allow `mongoose.Schema.Types.String` & `mongoose.Schema.Types.Number` as valid enum types
- Options `of` & `items` are now mapped to `type` and get called when `buildSchema` is called
- [IC] DeDuplicate code in `prop.ts`

## 7.1.0

- Update Dependencies
  - `mongoose` to 5.9.14
  - `@types/mongoose` to 5.7.19
  - `tslib` to 2.0.0
  - `typescript` to 3.9.2
- Fix duplicate hooks / virtuals / queryMethods / plugins / indices via inheritance [[typegoose#218](https://github.com/typegoose/typegoose/issues/218)]
- improve TSDoc of some functions
- Fix `queryMethod` reflection
- Set proper function type for `queryMethod`
- Added the ability to define option `ref` with an arrow-function [(`ref: () => type`)](guides/advanced/reference-other-classes.md#referencing-other-classes)
- All Decorators are now exported PascalCased & camelCased
- Actually export the `@queryMethod` decorator
- The `@queryMethod` decorator now has correct types [[typegoose#247](https://github.com/typegoose/typegoose/issues/247)]
- The functions `addModelToTypegoose`, `getModelForClass`, `buildSchema`, `deleteModelWithClass`, `getDiscriminatorModelForClass` now have the `T` generic removed (it was unnecessary)
- The functions `addModelToTypegoose`, `getModelForClass`, `getDiscriminatorModelForClass` now have an new optional generic `QueryHelpers`
- The Type `ReturnModelType` now has the `T` generic removed (it was unnecessary)
- The Type `ReturnModelType` now has an second optional generic `QueryHelpers`
- Fix bug where `ref: Class` didn't execute `getName` when Virtual-Populate was used
- Allow use of `@prop` for arrays & maps (In preparation for 8.0), it is now auto-detected based on `design:type`
- The Decorator `@plugin` now automatically infers the options if the plugin & function have typings and use options
- [IC] add some tslint rules & apply them
- [IC] enable "strictNullChecks" & fix accordingly

## 7.0.0

[To Migrate, please look at the migration guide](guides/migrate-to-7.md)

- Update Dependencies
  - `mongoose` to 5.9.10
  - `@types/mongoose` to 5.7.12
- Minimal NodeJS version is now 10.15
- Minimal Typescript version is now 3.8.3
- Typegoose class got completely removed
- All Deprecated `arrayProp` options got remove
  - `itemsRef` replaced with plain `ref`
  - `itemsRefPath` replaced with plain `refPath`
  - `itemsRefType` replaced with plain `refType`
- All enums got moved from `src/types` to `src/internal/constants`
- All things from `src/types` now get exported as `type`
- All Errors now get exported as `errors`
- All non-essential types get exported as `types`
- `utils`'s `getName` function now gets exported
- Add PropOption `addNullToEnum`
- Remove Deprecated value `overwrite` for `VirtualOptions`
- Remove instance properties from Model type (remove `& T` from `ModelType`)
- Add class decorator `queryMethod`
- [IC] rename file `optionsProp` to `modelOptions`
- [IC] Replace mocha & chai with jest
- [IC] Completely remove `TG_USE_NEW_ENUM` from documentation & code
- [IC] Replace almost all if-throw with the internal `assertion` function
- [IC] Move VirtualPopulate cache to Reflection
- [IC] Move Plugins cache to Reflection
- [IC] Move Hooks cache to Reflection
- [IC] All remaining test's models now get exported with an name (not being exported as `model` anymore)

## 6.5.0

- Update Dependencies
  - `semver` to 7.3.2
  - `tslib` to 1.11.1
  - `loglevel` to 1.6.8
- Remove `useNewEnum` type from `types`
- Add warning when value is an primitive and will result in an `Mixed` (fixes [typegoose#152](https://github.com/typegoose/typegoose/issues/152))
- Add option `language_override` to `IndexOptions`
- Fix spelling errors in documentation
- [IC] Replace deprecated arrayProp options with proper ones in all tests & test-models

## 6.4.0

- Update Dependencies
  - `mongoose` to 5.9.2
  - `@types/mongoose` to 5.7.1
  - `semver` to 7.1.3
  - `loglevel` to 1.6.7
  - `tslib` to 1.11.0
- Completely remove `__uniqueID`, because it was not used internally anymore

## 6.3.2

- Indexes: clone array instead of re-using it (fixes [typegoose#194](https://github.com/typegoose/typegoose/issues/194))

## 6.3.1

- Hopefully fix the Strictmode error of the new Ref-Type

## 6.3.0

- Update Dependencies
  - `mongoose` to 5.8.11
  - `@types/mongoose` to 5.7.0
  - `semver` to 7.1.2
- Add `@types/mongoose` to `peerDependencies`
- Add generic type to `@plugin` to set the type for the options
- Use a modified `Ref`-Type to automatically get the type (if the Ref'd type has `string` as `_id`, it automatically sets the `RefType` to `string`)

## 6.2.2

- Fix use of "rawOptions.type" after deletion (fixes [typegoose#178](https://github.com/typegoose/typegoose/issues/178))

## 6.2.1

- Fix functions `isString` and `isNumber` to check against their `mongoose.Schema.Types.*.name` equivalent (fixes [typegoose#149](https://github.com/typegoose/typegoose/issues/149))

## 6.2.0

This Update may break some code (mongoose upgrade, inline `_id` change, `enum` changes)

- Update Dependencies
  - Upgrade mongoose from 5.7.7 to 5.8.3
  - Upgrade @types/mongoose from 5.5.30 to 5.5.35
  - [IC] Upgrade Typescript from 3.7.2 to 3.7.4
  - [IC] Upgrade NYC from 14.1.1 to 15.0.0
- The option `useNewEnum` (and `TG_USE_NEW_ENUM`) got removed, because it would interfere with the number-enums
- Added the ability to use number-enums on number-type props
- Changed behaviour of string-enums to only work on string-type props
- Fix `PropOptions` type for `autopopulate`
- [IC] When the type is a `Schema`, it is now handled by `mapOptions` & `mapArrayOptions`
- [IC] fix tests not exiting after completion
- [IC] add tslint-plugin `tslint-consistent-codestyle`

## 6.1.8

- backport for:
  - fixes [typegoose#160](https://github.com/typegoose/typegoose/issues/160)
  - [IC] `mapArrayOptions` now uses `mapOptions`
  - [IC] adding function `mapOptions`

## 6.1.7

- add support for environment variables [here the new documentation](https://typegoose.github.io/typegoose/docs/api/environment-variables/)
- [IC] `warnMixed` now uses the right `target`
- [IC] add function `utils.getRightTarget`

## 6.1.6

- handle `_id: false/true`  better
- add function `getClass`
- [IC] fix using "name"-getter in `getName`

## 6.1.5

- Option merging is now properly done
- [IC] fix giving wrong key to customMerger
- [IC] remove the need to use "cloneDeepWith"

## 6.1.4

- Apply Global Options without needing @modelOptions
- [IC] add function "utils.assignGlobalModelOptions"

## 6.1.3

- fix bug when "buildSchema" didn't get called when overwriting the type in `@prop`
- [IC] add tests for Generic Discriminators

## 6.1.2

- Allow setting `_id: false` (and apply it) for `@mapProp`
- [IC] De-duplicate code for `_id` if subDocument

## 6.1.1

- `deleteModel` now deletes the model from the connection it is on [typegoose#119](https://github.com/typegoose/typegoose/issues/119)
- [IC] de-duplicate test code for connecting

## 6.1.0

- Update Dependencies
  - Upgrade mongoose from 5.7.1 to 5.7.7
  - [IC] Upgrade Typescript from 3.6.x to 3.7.2
- Completely remove `@staticMethod` & `@instanceMethod`, because they were completely obsolete
- README now has no documentation anymore
- `@prop({ validate })` now accepts `{ validator, message }` as an array
- Add function `deleteModel` & `deleteModelWithClass`
- allow Prop Option "type" to overwrite the inferred type [look here for an example](https://typegoose.github.io/typegoose/docs/api/decorators/prop/#type)
- integrate "Array Validators & Transform" tests [typegoose#29](https://github.com/typegoose/typegoose/issues/29)
- adding global options, with `setGlobalOptions`
- add modelOption `runSyncIndexes`
- add modelOption `allowMixed`
- add `text` to PropOptions
- deprecate ArrayPropOptions's `itemsRef`, `itemsRefPath` & `itemsRefType`
- `DocumentType` will now overwrite the type of `_id` if the class is extending `Base` (in TypeScript there is currently no other way)
- add `tslib` as dependency to minimize generated code
- fixing typo in (deprecated) `setModelForClass`
- Remake how Enums are handled, use `setGlobalOptions({ globalOptions: { useNewEnum: true } })` (to not break existing databases made with the old handling)
- add function `getModelWithString`
- [IC] tsconfig: add option "strictBindCallApply"
- [IC] tsconfig: add option "strictFunctionTypes"
- [IC] combine `initAsObject` and `initAsArray` into `initProperty`
- [IC] Use internal "isNullOrUndefined", needed because all "util.is*" functions got deprecated in node 4.0.0
- [IC] Replace all "isArray" with "Array.isArray", needed because all "util.is*" functions got deprecated in node 4.0.0
- [IC] adding many sanity `isNullOrUndefined` checks
- [IC] Re-done how the handling of `Mixed` is done
- [IC] Re-done how `IModelOptions` are merged (thanks to lodash `cloneDeepWith` & `mergeWith`)
- [IC] de-duplicate "ref" & "refPath" code
- [IC] added test for "Custom Types"
- [IC] typegoose now makes use of "importHelpers"(tsconfig) to save some space
- [IC] Refactor how "isPrimitive" works, some types like `Buffer` & `Decimal` now work
- [IC] Added more debug logs to `prop.ts`
- [IC] Move Decorator Cache to the class itself
- [IC] "baseProp" now uses one single arguments, with all the options
- [IC] "createUniqueID" now returns a boolean instead of the "initname"

## 6.0.4

This Release didn't change anything on the code, it was mostly tests & github-page
- Update Dependencies
  - Upgrade mongoose from 5.7.1 to 5.7.4
- Added soft warning when using "ref" in an "arrayProp"
- Added soft warning when using "refPath" in an "arrayProp"
- Add missing ")" to a deprecation message
- [IC] Fixed some Test's types
- [IC] internal variable renames to better reflect what they are for

## 6.0.3

- when using `@plugin`, options are now checked if they are an object, when not: make them an object
- Added many debug logs for `_buildSchema`
- Added Prop Option `autopopulate`, only has an effect if `mongoose-autopopulate` is used
- Added default class `FindOrCreate` which has the types for `mongoose-findorcreate`

## 6.0.2

- actually allow overwriting "_id" of "Base"
- [IC] add npm version script

## 6.0.1

- Add TSDoc for `refType` on PropOptions
- `refPath` now uses the right type (new uses `refType` instead of `itemsType`)
- Fix decorator options (rawOptions) mutating thanks to [typegoose#60](https://github.com/typegoose/typegoose/issues/60)
- Pre hook's function's `next` is now not marked as "optional" anymore, which caused `next()` to be `EmptyVoidFn | undefined`

## 6.0.0

[To Migrate, please look at the migration guide](guides/migrate-to-6.md)

- Project got moved to the new repo (typegoose/typegoose) and new package `@typegoose/typegoose`
- rename `InstanceType<T>` to `DocumentType<T>` [[szokodiakos#366](https://github.com/szokodiakos/typegoose/issues/366)]
- adding a migration guide from ~5.9 to 6.0.0
- adding missing "get" and "set" property options [[szokodiakos#260](https://github.com/szokodiakos/typegoose/issues/260)]
- adding `@modelOptions` and `getModelForClass` and `setModelForClass` will now override it
- `setModelForClass` is now deprecated [[typegoose#6](https://github.com/typegoose/typegoose/issues/6), [szokodiakos#186](https://github.com/szokodiakos/typegoose/issues/186)]
- setting the Typegoose Class to abstract
- deprecating the Typegoose Class because of making the functions outsourced [[szokodiakos#356](https://github.com/szokodiakos/typegoose/issues/356)]
- hook methods can now be arrays of methods [[szokodiakos#313](https://github.com/szokodiakos/typegoose/issues/313)]
- completely removed parallel from pre hook
- refactored the types of hooks
- adding support for any value in prop for plugins [[szokodiakos#374](https://github.com/szokodiakos/typegoose/issues/374)]
- `schema.loadClass` is now used instead of `@instanceMethod` and `@staticMethod` [[szokodiakos#48](https://github.com/szokodiakos/typegoose/issues/48), [szokodiakos#346](https://github.com/szokodiakos/typegoose/issues/346), [szokodiakos#182](https://github.com/szokodiakos/typegoose/issues/182)]
- method decorators are now deprecated
- schema generation got refactored (/reconstructed) multiple times
- adding `count` to VirtualOptions
- Updated Dependencies (^mongoose@5.7.1)
- adding discriminator support [[typegoose#11](https://github.com/typegoose/typegoose/issues/11)]
- adding default class for (schemaOptions) timestamps
- adding more docs to README & as tsdoc
- some changes that are probably forgot
- szokodiakos#363 got reverted in favor of mongoose@5.6.9
- fixes Custom Options not passed through to mongoose & plugins when using ref [[szokodiakos#379](https://github.com/szokodiakos/typegoose/issues/379)]
- Adding "immutable" prop option [[szokodiakos#320](https://github.com/szokodiakos/typegoose/issues/320)]
- adding Types to Ref (to allow not just ObjectID) [[szokodiakos#369](https://github.com/szokodiakos/typegoose/issues/369)]
- szokodiakos#54 seems to work now in 6.0.0 (added test in 6.0.0-21)
- because of the changes in 6.0.0 #235 got fixed
- Adding "InvalidTypeError" for the case that "undefined" or "null" is used as a type (or something other happens)
- Change Error text of "InvalidPropError"
- adding some "soft-errors" and traces with "loglevel"
- exposing settings for "loglevel"
- fixes Decorator Execution Order [[typegoose#23](https://github.com/typegoose/typegoose/issues/23), [typegoose#24](https://github.com/typegoose/typegoose/issues/24)]
- add support for custom discriminator properties
- add error if using a self-containing class
- add support for using multiple classes with the same name (`automaticName`, `customName`, `collection`)
- [IC] "NoParamConstructor" got renamed into "AnyParamConstructor" it now accepts any arguments
- [IC] Remake data.ts to use Maps [[typegoose#3](https://github.com/typegoose/typegoose/issues/3)]
- [IC] adding many tests and bumping coverage
- [IC] moving many Types to types.ts
- [IC] removing unneeded dependencies
- [IC] changed how travis runs jobs multiple times
- [IC] many tslint rule changes
- [IC] getting the name from "class.name" got outsourced into "utils.getName" (for future use)
- [IC] use switches instead of many if's
- [IC] adding some tests

## 5.9.2

- Change README examples & badges to the new repo
- use new travis.yml (from version 6.0.0)
- use new style of package.json (from version 6.0.0)

- Tags got deleted and added, please remove all local tags and re-download them

This Release did not change anything in the code, it is just there to update the NPM front

## 5.9.1

- fix accidentally added typeguards
- add a note that typegoose uses mongoose's strict by default
- add note that typegoose doesn't work with classes with the same name (at least in 5.x, working on it in 6.x)
- implemented a hack for ObjectId / ObjectID (mongoose some version fixed this)

## 5.9.0

- This should not be a breaking release
- Hooks now support Regular Expression for names, like mongoose
- Tests are split into their own files
- Fixing `itemsRefPath` & adding tests
- `itemsRef` now supports to be used with a string as model
- `@prop({ alias })` is now supported
- Index weights are now supported
- `isDocument` & `isDocumentArray` typeguards are now implemented
- Updated Dependencies
  Note worthy are:
  - mongoose 5.6 is now required instead of 5.5
  - this project should be used with TypeScript 3.5+
- `@mapProp()` is now implemented
- Fix for `@prop({ select })`
- A public version of `buildSchema` is now available
- Added more Documentation to README
- Added TSDOC to many functions and properties
- build target is now ES6 instead of ES5
