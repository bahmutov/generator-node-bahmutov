const la = require('lazy-ass')
const is = require('check-more-types')
const snapshot = require('snap-shot')
const nock = require('nock')

/* global describe, it, beforeEach */
describe('github repo description', () => {
  const repoDescription = require('./github-description')

  it('is a function', () => {
    la(is.fn(repoDescription))
  })

  it('returns description', () => {
    const description = 'Test project for testing https://github.com/bahmutov/generator-node-bahmutov'

    nock('https://api.github.com')
      .get('/repos/bahmutov/test-node-generator')
      .reply(200, { description })

    const url = 'git@github.com:bahmutov/test-node-generator.git'
    return snapshot(repoDescription(url))
  })

  it('returns description from HTTPS url', () => {
    const description = 'Test project for testing https://github.com/bahmutov/generator-node-bahmutov'

    nock('https://api.github.com')
      .get('/repos/bahmutov/test-node-generator')
      .reply(200, { description })

    const url = 'https://github.com/bahmutov/test-node-generator.git'
    return snapshot(repoDescription(url))
  })

  it('resolves with undefined if there is an error', () => {
    nock('https://api.github.com')
      .get('/repos/no-such-user/does-not-exist')
      .reply(404)

    const url = 'git@github.com:no-such-user/does-not-exist.git'
    return repoDescription(url).then(description => {
      la(description === undefined)
    })
  })

  describe('https mock', () => {
    const description = 'cool project, bro'

    beforeEach(() => {
      nock('https://api.github.com')
        .get('/repos/no-such-user/does-not-exist')
        .reply(200, { description })
    })

    it('can mock non-existent repo', () => {
      const url = 'git@github.com:no-such-user/does-not-exist.git'
      return repoDescription(url).then(text => {
        la(description === text, 'wrong description returned', text)
      })
    })
  })
})
