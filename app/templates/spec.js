'use strict'

/* global describe, it */
describe('<%= name %>', () => {
  const <%= nameVar %> = require('.')
  it('write this test', () => {
    console.assert(<%= nameVar %>, 'should export something')
  })
})
