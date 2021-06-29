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
- [IC] Assing `schemaOptions` in `src/internal/schema.ts` to an black object [[typegoose#357](https://github.com/typegoose/typegoose/issues/357)]

## 7.3.4

- Improved Client-side check

## 7.3.3

- Dont assume that the plugin function has an name [[typegoose#353](https://github.com/typegoose/typegoose/issues/353)]
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
- If an SchemaType dosnt extend `SchemaTypeOptions`, the options are now defaulted to the outer-layer
- `innerOptions` and `outerOptions` can now be used for Maps too
- Custom Validators now support `message` being an function
- Automatically convert `mongoose.Types.Buffer` to `mongoose.Schema.Types.Buffer`
- Fix Types when extending default class `Base` with other than `ObjectId` [[typegoose#316](https://github.com/typegoose/typegoose/issues/316)]
- [IC] `mapOptions` now always errors if the given type dosnt extend `mongoose.SchemaTypeOptions`
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
- `BasePropOptions.type` is now `unkown` instead of `any`
- All aliases of `BasePropOptions.type` now inherit the types from there
- Fix bug where autopopulate (or any other plugin) wouldnt pick up on virtuals [[typegoose#274](https://github.com/typegoose/typegoose/issues/274)]
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
- Fix bug where `ref: Class` didnt execute `getName` when Virtual-Populate was used
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
- Typegoose class got completly removed
- All Deprecated `arrayProp` options got remove
  - `itemsRef` replaced with plain `ref`
  - `itemsRefPath` replaced with plain `refPath`
  - `itemsRefType` replaced with plain `refType`
- All enums got moved from `src/types` to `src/internal/constants`
- All things from `src/types` now get exported as `type`
- All Errors now get exported as `errors`
- All non-essentail types get exported as `types`
- `utils`'s `getName` function now gets exported
- Add PropOption `addNullToEnum`
- Remove Deprecated value `overwrite` for `VirtualOptions`
- Remove instance properties from Model type (remove `& T` from `ModelType`)
- Add class decorator `queryMethod`
- [IC] rename file `optionsProp` to `modelOptions`
- [IC] Replace mocha & chai with jest
- [IC] Completly remove `TG_USE_NEW_ENUM` from documentation & code
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
- Completly remove `__uniqueID`, because it was not used internally anymore

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
- Use a modified `Ref`-Type to automatically get the type (if the Ref'd type has `string` as `_id`, it automaticly sets the `RefType` to `string`)

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
- The option `useNewEnum` (and `TG_USE_NEW_ENUM`) got removed, because it would interfer with the number-enums
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

- fix bug when "buildSchema" didnt get called when overwriting the type in `@prop`
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
- Completly remove `@staticMethod` & `@instanceMethod`, because they were completly obsolete
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
- [IC] "baseProp" now uses one single arguments, whith all the options
- [IC] "createUniqueID" now returns a boolean instead of the "initname"

## 6.0.4

This Release didnt change anything on the code, it was mostly tests & github-page
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
- Adding "InvalidTypeError" for the case that "undefined" or "null" is used as a type (or something other happenes)
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
- Tests are splitted into their own files
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
