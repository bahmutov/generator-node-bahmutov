const la = require('lazy-ass')
const is = require('check-more-types')

/* global describe, it */
describe('https git remote url', () => {
  const httpsUrl = require('./https-remote-git-url').gitRemoteToHttps

  it('is a function', () => {
    la(is.fn(httpsUrl))
  })

  describe('github remote', () => {
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

  describe('gitlab remote', () => {
    it('converts company SSH to HTTPS', () => {
      const url = 'git@gitlab.company.com:user/test.git '
      const result = httpsUrl(url)
      const expected = 'https://gitlab.company.com/user/test.git'
      la(result === expected, result)
    })
  })
})
