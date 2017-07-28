'use strict'

<% if (!typescript) { %>
/* eslint-env mocha */
const <%= nameVar %> = require('.')
<% } else { %>
import <%= nameVar %> from '.'
<% } %>
describe('<%= name %>', () => {
  it('write this test', () => {
    console.assert(<%= nameVar %>, 'should export something')
  })
})
