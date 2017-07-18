const la = require('lazy-ass')
const is = require('check-more-types')
const parse = require('parse-github-repo-url')

// parses url like git@github.com:bahmutov/test-node-generator.git
// to get the username
function usernameFromGithubUrl (url) {
  la(is.unemptyString(url), 'expected url string', url)

  const parsed = parse(url)
  la(is.array(parsed), 'could not parse github url', url)
  return parsed[0]
}

module.exports = usernameFromGithubUrl
