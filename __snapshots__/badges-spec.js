exports['getBadgesUrls gets main badges urls 1'] = `
[npm-icon]: https://nodei.co/npm/test-example.svg?downloads=true
[npm-url]: https://npmjs.org/package/test-example
[ci-image]: https://travis-ci.org/bahmutov/test-repo.svg?branch=master
[ci-url]: https://travis-ci.org/bahmutov/test-repo
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
`

exports['getBadgesUrls can include renovate app 1'] = `
[npm-icon]: https://nodei.co/npm/test-example.svg?downloads=true
[npm-url]: https://npmjs.org/package/test-example
[ci-image]: https://travis-ci.org/bahmutov/test-repo.svg?branch=master
[ci-url]: https://travis-ci.org/bahmutov/test-repo
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
`

exports['getBadges gets main badges 1'] = `
[![NPM][with-package-icon]][with-package-url]

[![Build status][ci-image]][ci-url]
[![semantic-release][semantic-image]][semantic-url]
[![standard][standard-image]][standard-url]
`

exports['getBadges can include renovate app 1'] = `
[![NPM][with-package-icon]][with-package-url]

[![Build status][ci-image]][ci-url]
[![semantic-release][semantic-image]][semantic-url]
[![standard][standard-image]][standard-url]
[![renovate-app badge][renovate-badge]][renovate-app]
`
