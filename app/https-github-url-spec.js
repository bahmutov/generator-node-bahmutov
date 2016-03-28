const la = require('lazy-ass')
const is = require('check-more-types')

/* global describe, it */
describe('https github url', () => {
  const httpsUrl = require('./https-github-url')

  it('is a function', () => {
    la(is.fn(httpsUrl))
  })

  it('leaves https url unchanged', () => {
    const url = 'https://github.com/bahmutov/test-node-generator.git'
    const result = httpsUrl(url)
    la(result === url, result)
  })

  it('changes SSH to HTTPS', () => {
    const url = 'git@github.com:bahmutov/test-node-generator.git'
    const result = httpsUrl(url)
    const expected = 'https://github.com/bahmutov/test-node-generator.git'
    la(result === expected, result)
  })
})
