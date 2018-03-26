const la = require('lazy-ass')
const is = require('check-more-types')

// returns the badges themselves
// like "[npm][npm-url]""
function getBadges (options) {
  const badges = []
  if (options.npmBadge) {
    badges.push('[![NPM][npm-icon]][npm-url]')
    badges.push('')
  }
  if (options.travisBadge) {
    badges.push('[![Build status][ci-image]][ci-url]')
  }
  if (options.semanticReleaseBadge) {
    badges.push('[![semantic-release][semantic-image]][semantic-url]')
  }
  if (options.standardBadge) {
    badges.push('[![standard][standard-image]][standard-url]')
  }
  if (options.renovateBadge) {
    badges.push('[![renovate-app badge][renovate-badge]][renovate-app]')
  }
  const markdown = badges.join('\n')
  return markdown
}

// returns badge url references, usually placed at the bottom of README
function getBadgesUrls (options) {
  const badges = []
  if (options.npmBadge) {
    la(is.unemptyString(options.name), 'missing package name', options)
    badges.push(
      `[npm-icon]: https://nodei.co/npm/${options.name}.svg?downloads=true`
    )
    badges.push(`[npm-url]: https://npmjs.org/package/${options.name}`)
  }
  if (options.travisBadge) {
    la(is.unemptyString(options.username), 'missing username', options)
    la(is.unemptyString(options.repoName), 'missing repo name', options)
    const u = options.username
    const r = options.repoName
    badges.push(`[ci-image]: https://travis-ci.org/${u}/${r}.svg?branch=master`)
    badges.push(`[ci-url]: https://travis-ci.org/${u}/${r}`)
  }
  if (options.semanticReleaseBadge) {
    badges.push(
      '[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg'
    )
    badges.push(
      '[semantic-url]: https://github.com/semantic-release/semantic-release'
    )
  }
  if (options.standardBadge) {
    badges.push(
      '[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg'
    )
    badges.push('[standard-url]: http://standardjs.com/')
  }
  if (options.renovateBadge) {
    badges.push(
      '[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg'
    )
    badges.push('[renovate-app]: https://renovateapp.com/')
  }

  const markdown = badges.join('\n')
  return markdown
}

module.exports = {
  getBadges,
  getBadgesUrls
}
