const la = require('lazy-ass')
const is = require('check-more-types')
const parse = require('parse-github-repo-url')

function formHttpsGithubUrl (domain, user, repo) {
  return `https://${domain}/${user}/${repo}.git`
}

function formHttpsGitlabUrl (domain, user, repo) {
  return `https://${domain}/${user}/${repo}.git`
}

const isGithub = url => url.includes('github')
const isGitlab = url => url.includes('gitlab')

function isGitAt (url) {
  return url.startsWith('git@')
}

// extracts domain from git@<domain>:...
function getDomain (url) {
  la(isGitAt(url), 'expected git@ remote url', url)
  const from = url.indexOf('@')
  const to = url.indexOf(':')
  return url.substr(from + 1, to - from - 1)
}

// transforms git ssh to https
function gitRemoteToHttps (url) {
  la(is.unemptyString(url), 'expected url string', url)
  if (is.https(url)) {
    return url
  }

  la(isGitAt(url), 'not git@ url', url)

  const parsed = parse(url)
  la(is.array(parsed), 'could not parse git url', url)
  const user = parsed[0]
  const repo = parsed[1]
  la(is.unemptyString(user), 'could not get user from url', url)
  la(is.unemptyString(repo), 'could not get repo from url', url)

  const domain = getDomain(url)
  la(is.unemptyString(domain), 'missing domain from url', url)

  if (isGithub(url)) {
    return formHttpsGithubUrl(domain, user, repo)
  }
  if (isGitlab(url)) {
    return formHttpsGitlabUrl(domain, user, repo)
  }

  const msg = `Could not transform remote url ${url} into https:`
  throw new Error(msg)
}

module.exports = {
  isGitAt,
  gitRemoteToHttps,
  getDomain
}
