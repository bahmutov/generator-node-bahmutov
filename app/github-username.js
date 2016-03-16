// parses url like git@github.com:bahmutov/test-node-generator.git
// to get the username
function usernameFromGithubUrl (url) {
  const matches = /github\.com:(\w+)\//.exec(url)
  if (!matches) {
    return
  }
  return matches[1]
}

module.exports = usernameFromGithubUrl
