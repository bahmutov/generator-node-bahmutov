const la = require('lazy-ass')
const is = require('check-more-types')
const snapshot = require('snap-shot')

/* global describe, it, beforeEach, afterEach */
describe('github repo description', () => {
  const repoDescription = require('./github-description')

  it('is a function', () => {
    la(is.fn(repoDescription))
  })

  it('returns description', () => {
    const url = 'git@github.com:bahmutov/test-node-generator.git'
    return snapshot(repoDescription(url))
  })

  it('returns description from HTTPS url', () => {
    const url = 'https://github.com/bahmutov/test-node-generator.git'
    return snapshot(repoDescription(url))
  })

  it('resolves with undefined if there is an error', () => {
    const url = 'git@github.com:no-such-user/does-not-exist.git'
    return repoDescription(url).then(description => {
      la(description === undefined)
    })
  })

  // TODO finish mocking? or find good HTTP interceptor mocking lib
  describe.skip('https mock', () => {
    const sinon = require('sinon')
    const https = require('https')

    beforeEach(() => {
      sinon
        .stub(https, 'request')
        .callsArgWith(1, {
          statusCode: 200,
          headers: {}
        })
        .returns({
          once: () => {},
          end: () => {}
        })
    })

    afterEach(() => {
      https.request.restore()
    })

    it('can mock non-existent repo', () => {
      const url = 'git@github.com:no-such-user/does-not-exist.git'
      return repoDescription(url).then(console.log)
    })
  })
})
