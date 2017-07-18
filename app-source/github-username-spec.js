const la = require('lazy-ass')
const is = require('check-more-types')

/* global describe, it */
describe('github username', () => {
  const getUsername = require('./github-username')

  it('is a function', () => {
    la(is.fn(getUsername))
  })

  it('gets user from SSH url', () => {
    const url = 'git@github.com:bahmutov/test-node-generator.git'
    const user = getUsername(url)
    la(user === 'bahmutov', 'wrong user', user, 'from', url)
  })

  it('gets user from HTTPS url', () => {
    const url = 'https://github.com/bahmutov/test-node-generator.git'
    const user = getUsername(url)
    la(user === 'bahmutov', 'wrong user', user, 'from', url)
  })
})
