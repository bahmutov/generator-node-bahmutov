const la = require('lazy-ass')
const is = require('check-more-types')
const snapshot = require('snap-shot-it')

/* eslint-env mocha */
describe('getBadgesUrls', () => {
  const getBadgesUrls = require('./badges').getBadgesUrls

  it('is a function', () => {
    la(is.fn(getBadgesUrls))
  })

  it('gets main badges urls', () => {
    const options = {
      name: 'test-example',
      repoName: 'test-repo',
      username: 'bahmutov',
      npmBadge: true,
      travisBadge: true,
      semanticReleaseBadge: true,
      standardBadge: true
    }
    const urls = getBadgesUrls(options)
    snapshot(urls)
  })

  it('can include renovate app', () => {
    const options = {
      name: 'test-example',
      repoName: 'test-repo',
      username: 'bahmutov',
      npmBadge: true,
      travisBadge: true,
      semanticReleaseBadge: true,
      standardBadge: true,
      renovateBadge: true
    }
    const urls = getBadgesUrls(options)
    snapshot(urls)
  })
})

describe('getBadges', () => {
  const getBadges = require('./badges').getBadges

  it('is a function', () => {
    la(is.fn(getBadges))
  })

  it('gets main badges', () => {
    const options = {
      name: 'test-example',
      repoName: 'test-repo',
      username: 'bahmutov',
      npmBadge: true,
      travisBadge: true,
      semanticReleaseBadge: true,
      standardBadge: true
    }
    const urls = getBadges(options)
    snapshot(urls)
  })

  it('can include renovate app', () => {
    const options = {
      name: 'test-example',
      repoName: 'test-repo',
      username: 'bahmutov',
      npmBadge: true,
      travisBadge: true,
      semanticReleaseBadge: true,
      standardBadge: true,
      renovateBadge: true
    }
    const urls = getBadges(options)
    snapshot(urls)
  })
})
