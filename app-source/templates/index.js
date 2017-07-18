'use strict'

<% if (typescript) { %>
const foo = true
export default foo
<% } else { %>
module.exports = true
<% } %>
