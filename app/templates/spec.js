'use strict'

<% if (!typescript) { %>
/* global describe, it */
const <%= nameVar %> = require('.')
<% } else { %>
import <%= nameVar %> from '.'
<% } %>
describe('<%= name %>', () => {
  it('write this test', () => {
    console.assert(<%= nameVar %>, 'should export something')
  })
})
