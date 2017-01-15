const la = require('lazy-ass')
const is = require('check-more-types')

/* global describe, it */
describe('https git remote url', () => {
  const {getDomain, gitRemoteToHttps} = require('./https-remote-git-url')

  it('is a function', () => {
    la(is.fn(gitRemoteToHttps))
  })

  describe('get domain', () => {
    it('supports git@ url', () => {
      const url = 'git@github.com:bahmutov/test-node-generator.git'
      const domain = getDomain(url)
      la(domain === 'github.com', 'invalid domain', domain, 'from url', url)
    })

    it('supports https url', () => {
      const url = 'https://github.com/myuser/my-repository.git'
      const domain = getDomain(url)
      la(domain === 'github.com', 'invalid domain', domain, 'from url', url)
    })
  })

  describe('github remote', () => {
    it('leaves https url unchanged', () => {
      const url = 'https://github.com/bahmutov/test-node-generator.git'
      const result = gitRemoteToHttps(url)
      la(result === url, result)
    })

    it('changes SSH to HTTPS', () => {
      const url = 'git@github.com:bahmutov/test-node-generator.git'
      const result = gitRemoteToHttps(url)
      const expected = 'https://github.com/bahmutov/test-node-generator.git'
      la(result === expected, result)
    })
  })

  describe('gitlab remote', () => {
    it('converts company SSH to HTTPS', () => {
      const url = 'git@gitlab.company.com:user/test.git '
      const result = gitRemoteToHttps(url)
      const expected = 'https://gitlab.company.com/user/test.git'
      la(result === expected, result)
    })
  })
})
