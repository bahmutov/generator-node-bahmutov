const la = require('lazy-ass')
const is = require('check-more-types')
const parse = require('parse-github-repo-url')

function formHttpsGithubUrl (user, repo) {
  return `https://github.com/${user}/${repo}.git`
}

// transforms git ssh to https
function usernameFromGithubUrl (url) {
  la(is.unemptyString(url), 'expected url string', url)
  if (is.https(url)) {
    return url
  }

  la (/^git@/.test(url), 'not git@ url', url)
  const parsed = parse(url)
  la(is.array(parsed), 'could not parse git url', url)
  const user = parsed[0]
  const repo = parsed[1]
  return formHttpsGithubUrl(user, repo)
}

module.exports = usernameFromGithubUrl
