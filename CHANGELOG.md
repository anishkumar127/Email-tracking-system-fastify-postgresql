# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.4.5](https://github.com/anishkumar127/email-tracking/compare/v1.4.4...v1.4.5) (2024-10-07)


### Bug Fixes

* ALTER table back to notNull email ([fef6a96](https://github.com/anishkumar127/email-tracking/commit/fef6a96937adf5172448fcc32acdbee3f6654d34))
* Email migration was causing issue bcz email was SET as notNull ([f4009a3](https://github.com/anishkumar127/email-tracking/commit/f4009a38797076a7dd996f957920fd7b693166fc))
* Schema field name changed & new added ([414c1c8](https://github.com/anishkumar127/email-tracking/commit/414c1c8bf47c09975ee505b17a17b6312561b50b))

### [1.4.4](https://github.com/anishkumar127/email-tracking/compare/v1.4.3...v1.4.4) (2024-10-04)

### [1.4.3](https://github.com/anishkumar127/email-tracking/compare/v1.4.2...v1.4.3) (2024-10-04)


### Bug Fixes

* Ping api changed PUT to GET ([1d649ff](https://github.com/anishkumar127/email-tracking/commit/1d649ff7b10a5f65b0eafcc21f7a2bfa3d1cdbb6))

### [1.4.2](https://github.com/anishkumar127/email-tracking/compare/v1.4.1...v1.4.2) (2024-10-04)

### [1.4.1](https://github.com/anishkumar127/email-tracking/compare/v1.4.0...v1.4.1) (2024-10-04)


### Bug Fixes

* Ping email based on emailId only removed userId ([d44f774](https://github.com/anishkumar127/email-tracking/commit/d44f774cbde61cec5f19eca3870603aec9d95735))

## [1.4.0](https://github.com/anishkumar127/email-tracking/compare/v1.3.0...v1.4.0) (2024-10-04)


### Features

* **alltickets:** Show all the tickets ([b77f818](https://github.com/anishkumar127/email-tracking/commit/b77f81866a8c7a36037e01710a745ec57386fb9a))
* Delete all the tickets ([7ffb494](https://github.com/anishkumar127/email-tracking/commit/7ffb49402876390a63a9f9d30f315dc6981c6311))
* Drizzle migration files ([c9f1623](https://github.com/anishkumar127/email-tracking/commit/c9f162328875e90abfad8a3a528ee7a9ebe5817e))


### Bug Fixes

* Database connection check ([03d52c1](https://github.com/anishkumar127/email-tracking/commit/03d52c1a04ff2e88797390bb7d70935f52ffffa4))
* GET tickets by emailId instead of with userId ([a353348](https://github.com/anishkumar127/email-tracking/commit/a3533486af63bca18b3d7c583db7207522d6a31f))
* Removed fields read_counts and send_date from database ([e9f8b3f](https://github.com/anishkumar127/email-tracking/commit/e9f8b3fc9402bc0eaa3cc1c48f3fada5ae4a4a2f))
* Removed readCounts fields from isEmailRead api ([a94cbb5](https://github.com/anishkumar127/email-tracking/commit/a94cbb52447cb97c68f1a1b4e3c40e2c60776ac3))
* Summary based on only emailId instead of userId ([ee0cd0e](https://github.com/anishkumar127/email-tracking/commit/ee0cd0e0dd2aa71bbc94351fbba8308aea1aff52))

## [1.3.0](https://github.com/anishkumar127/email-tracking/compare/v1.1.2...v1.3.0) (2024-09-25)


### Features

* Created how much mail read api ([fe9ed94](https://github.com/anishkumar127/email-tracking/commit/fe9ed944df3138ec66e7bc5c20866f596500b5a9))
* Now every read create the new entries ([86f8ef0](https://github.com/anishkumar127/email-tracking/commit/86f8ef0584294ae33ac10cc4f1e46771dab68a2a))


### Bug Fixes

* Env to edge run ([33bc581](https://github.com/anishkumar127/email-tracking/commit/33bc581f4ee8a985cb73a8a58a7a3bed4e206a9d))
* Exclude the test on production ([28b6be5](https://github.com/anishkumar127/email-tracking/commit/28b6be5d1fe6f628a161f641e2fcc588d6f44e03))
* Exclude the test on production ([78d793e](https://github.com/anishkumar127/email-tracking/commit/78d793e4c653dbd25ef535e89925d0b672152e7b))
* Exclude the test on production ([111186a](https://github.com/anishkumar127/email-tracking/commit/111186afeb855673b4bc6ec497e00bffa90dc487))
* Exclude the test on production ([520cfc4](https://github.com/anishkumar127/email-tracking/commit/520cfc47eae8a2e9d735e02b0338210017ec7693))
* Exclude the test on production ([7c62536](https://github.com/anishkumar127/email-tracking/commit/7c625362593bcbe806aba8575251bdc9ae6938d2))
* First time readAt was empty so update that ([eba411d](https://github.com/anishkumar127/email-tracking/commit/eba411d46b1f8efdc5500a0e90476e629a55f36d))
* Test removed form the includes ts ([c68520f](https://github.com/anishkumar127/email-tracking/commit/c68520ffe99a0f66d9c2e72a20cea161565166fa))
* Test removed form the includes ts ([7f88dc3](https://github.com/anishkumar127/email-tracking/commit/7f88dc377f134f2b234459a01ef42cb41fbab933))
* Test removed form the includes ts ([2b58880](https://github.com/anishkumar127/email-tracking/commit/2b58880c076639f165b8916a25f846d93eca5f24))
* Test removed form the includes ts ([f5c8f5c](https://github.com/anishkumar127/email-tracking/commit/f5c8f5cb0faf440a37de76e38de794e374c415ed))
* Test removed form the includes ts ([391858e](https://github.com/anishkumar127/email-tracking/commit/391858e7ed10b8539c4a6a98f878aaa58c6779cc))

## [1.2.0](https://github.com/anishkumar127/email-tracking/compare/v1.1.2...v1.2.0) (2024-09-24)


### Features

* Now every read create the new entries ([86f8ef0](https://github.com/anishkumar127/email-tracking/commit/86f8ef0584294ae33ac10cc4f1e46771dab68a2a))


### Bug Fixes

* Env to edge run ([33bc581](https://github.com/anishkumar127/email-tracking/commit/33bc581f4ee8a985cb73a8a58a7a3bed4e206a9d))
* Exclude the test on production ([28b6be5](https://github.com/anishkumar127/email-tracking/commit/28b6be5d1fe6f628a161f641e2fcc588d6f44e03))
* Exclude the test on production ([78d793e](https://github.com/anishkumar127/email-tracking/commit/78d793e4c653dbd25ef535e89925d0b672152e7b))
* Exclude the test on production ([111186a](https://github.com/anishkumar127/email-tracking/commit/111186afeb855673b4bc6ec497e00bffa90dc487))
* Exclude the test on production ([520cfc4](https://github.com/anishkumar127/email-tracking/commit/520cfc47eae8a2e9d735e02b0338210017ec7693))
* Exclude the test on production ([7c62536](https://github.com/anishkumar127/email-tracking/commit/7c625362593bcbe806aba8575251bdc9ae6938d2))
* First time readAt was empty so update that ([eba411d](https://github.com/anishkumar127/email-tracking/commit/eba411d46b1f8efdc5500a0e90476e629a55f36d))
* Test removed form the includes ts ([c68520f](https://github.com/anishkumar127/email-tracking/commit/c68520ffe99a0f66d9c2e72a20cea161565166fa))
* Test removed form the includes ts ([7f88dc3](https://github.com/anishkumar127/email-tracking/commit/7f88dc377f134f2b234459a01ef42cb41fbab933))
* Test removed form the includes ts ([2b58880](https://github.com/anishkumar127/email-tracking/commit/2b58880c076639f165b8916a25f846d93eca5f24))
* Test removed form the includes ts ([f5c8f5c](https://github.com/anishkumar127/email-tracking/commit/f5c8f5cb0faf440a37de76e38de794e374c415ed))
* Test removed form the includes ts ([391858e](https://github.com/anishkumar127/email-tracking/commit/391858e7ed10b8539c4a6a98f878aaa58c6779cc))

### [1.1.2](https://github.com/anishkumar127/email-tracking/compare/v1.1.1...v1.1.2) (2024-09-23)

### [1.1.1](https://github.com/anishkumar127/email-tracking/compare/v1.1.0...v1.1.1) (2024-09-23)

## 1.1.0 (2024-09-23)


### Features

* Create user & more fastify friendly ecosystem ([4f3d5df](https://github.com/anishkumar127/email-tracking/commit/4f3d5df402a723f03b050eb6e7a723289d8f9c77))
* Create user & more fastify friendly ecosystem ([a7a2021](https://github.com/anishkumar127/email-tracking/commit/a7a202113a478066d4f84f7a78974c911265b279))
* Drizzle ([08493e2](https://github.com/anishkumar127/email-tracking/commit/08493e2d39904a09eb9a0301651fcb36811636c9))
* Drizzle added & may typescript issue will remain ( resolve as of now by schema payload ) ([ee99d17](https://github.com/anishkumar127/email-tracking/commit/ee99d17c972ad32ef3c28c2a5efac540065d29b3))
* Email tracking ([e929efa](https://github.com/anishkumar127/email-tracking/commit/e929efaf6854a0822e1d883524eb2ff600779a8e))
* IP and device info tracking ([5c8cec6](https://github.com/anishkumar127/email-tracking/commit/5c8cec603e40ee681deff01072af89b8646f522a))
* Prisma ([039afb4](https://github.com/anishkumar127/email-tracking/commit/039afb420cbedefac764e0e809015f673a3f8a2f))
* Specific user data get api ([57aede1](https://github.com/anishkumar127/email-tracking/commit/57aede1a09cdafcb833a87070b9f8658953eb813))
* Test cases added ([b1ee76c](https://github.com/anishkumar127/email-tracking/commit/b1ee76c8bbb3fb372572c7ac30d43551d1887c02))
* Tickets ([59748f4](https://github.com/anishkumar127/email-tracking/commit/59748f47aba1560618fc40a8a5a874c05757b236))


### Bug Fixes

* Build run command ([2d8d3fe](https://github.com/anishkumar127/email-tracking/commit/2d8d3fe453f2d6685be885cb81e0ce9b89cf1c62))
* Isread api ([8cfbf44](https://github.com/anishkumar127/email-tracking/commit/8cfbf44884fce6fe98ceb103436827315e784eec))
* Test cases was not working ([40548ed](https://github.com/anishkumar127/email-tracking/commit/40548ed6625066872660b3a8865d77aece1f3c46))
* userId was missing in GET call ([e2a8fd0](https://github.com/anishkumar127/email-tracking/commit/e2a8fd06175cb119b64764a5ca5d4a8b30d84559))
