'use strict'

<% if (typescript) { %>
const foo = true
export default foo
<% } else { %>
<% if (immutable) { %>// eslint-disable-next-line immutable/no-mutation <% } %>
module.exports = true
<% } %>
