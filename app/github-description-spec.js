const la = require('lazy-ass')
const is = require('check-more-types')
const snapshot = require('snap-shot')

/* global describe, it */
describe.only('github repo description', () => {
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
})
