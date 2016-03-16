const la = require('lazy-ass')
const is = require('check-more-types')

/* global describe, it */
describe('github username', () => {
  const getUsername = require('./github-username')

  it('is a function', () => {
    la(is.fn(getUsername))
  })

  it('gets user', () => {
    const user = getUsername('git@github.com:bahmutov/test-node-generator.git')
    la(user === 'bahmutov', 'wrong user', user)
  })
})
