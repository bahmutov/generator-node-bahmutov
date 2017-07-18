const la = require('lazy-ass')
const is = require('check-more-types')

/* global describe, it */
describe('scoped package name', () => {
  const withoutScope = require('./without-scope')

  it('is a function', () => {
    la(is.fn(withoutScope))
  })

  it('gets project name if just project name', () => {
    const name = 'test-node-generator'
    const result = withoutScope(name)
    la(result === name, 'should be just the name', result, name)
  })

  it('removes scrope from package name', () => {
    const name = '@user/test-project'
    const result = withoutScope(name)
    const expected = 'test-project'
    la(result === expected, 'got', result, 'expected', expected)
  })
})
