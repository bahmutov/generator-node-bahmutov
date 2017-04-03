const repo = 'https://github.com/bahmutov/generator-node-bahmutov'

function lastMessage (msg) {
  console.error(msg)
  process.exit(-1)
}

function onGitOriginError (err) {
  const gitOriginErrorMessage = `
🔥  This generator assumes there is already a remote Git
(probably GitHub or GitLab) repository where all code will live.
Please set it up before running generator

    git init
    git remote add origin <remote git>

See more details at ${repo}#remote
`
  console.error(err)
  lastMessage(gitOriginErrorMessage)
}

function onMissingDescription () {
  const msg = `
🔥  Please provide a meaningful module description.
A project without description is of no use to anyone.
`
  lastMessage(msg)
}

function onMissingKeywords () {
  const msg = `
🔥  Please provide a few comma-separated keywords.
Good keywords make finding your module so much easier.
`
  lastMessage(msg)
}

module.exports = {onGitOriginError, onMissingDescription, onMissingKeywords}
