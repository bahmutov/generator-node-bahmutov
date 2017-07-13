const la = require('lazy-ass')
const is = require('check-more-types')
const parse = require('parse-github-repo-url')
const got = require('got')
const debug = require('debug')('gen')

function isGitHub (url) {
  return url.indexOf('github.com') !== -1
}

// parses url like git@github.com:bahmutov/test-node-generator.git
// and fetched repo description
// if cannot, then resolves with undefined
function repoDescription (url) {
  la(is.unemptyString(url), 'expected url string', url)

  debug('fetching repo description for', url)
  if (!isGitHub(url)) {
    debug('not a github url', url)
    return Promise.resolve()
  }

  const parsed = parse(url)
  la(is.array(parsed), 'could not parse github url', url)
  const [owner, repo] = parsed

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}`
  return got(apiUrl, {json: true})
    .then(response => response.body)
    .then(info => info.description)
    .catch(err => {
      debug('could not fetch repo description using', apiUrl)
      debug(err)
    })
}

module.exports = repoDescription
