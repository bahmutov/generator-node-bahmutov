'use strict'

const debug = require('debug')('gen')
const Generator = require('yeoman-generator')
const _ = require('lodash')
const originUrl = require('git-remote-origin-url')
const fs = require('fs')
const exists = fs.existsSync
const path = require('path')
const fixpack = require('fixpack')
const packageFilename = 'package.json'
const usernameFromGithubUrl = require('./github-username')
const defaults = require('./defaults')
const la = require('lazy-ass')
const is = require('check-more-types')
const withoutScope = require('./without-scope')
const remoteGitUtils = require('./https-remote-git-url')

function isEmpty (x) {
  return x
}

function _printVersion () {
  const myPackageFilename = path.join(__dirname, '../package.json')
  const myPackage = require(myPackageFilename)
  console.log('using %s@%s', myPackage.name, myPackage.version)
}

const g = class extends Generator {
  printVersion () {
    _printVersion()
  }

  setDefaults () {
    this.answers = defaults
  }

  copyNpmrc () {
    debug('Copying .npmrc file')
    this.fs.copy(
      this.templatePath('npmrc'),
      this.destinationPath('.npmrc')
    )
  }

  copyGitignore () {
    debug('Copying .gitignore file')
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    )
  }

  git () {
    debug('Looking for .git folder')
    if (!exists('.git')) {
      console.error('Cannot find .git folder, please initialize the Git repo first')
      console.error('git init')
      console.error('git remote add origin ...')
      process.exit(-1)
    }
  }

  gitOrigin () {
    debug('Getting Git origin url')
    const done = this.async()
    originUrl().then((url) => {
      la(is.unemptyString(url), 'could not get github origin url')
      debug('got remote origin url', url)
      this.repoDomain = remoteGitUtils.getDomain(url)
      debug('repo domain', this.repoDomain)
      this.originUrl = remoteGitUtils.gitRemoteToHttps(url)
      debug('git origin HTTPS url', this.originUrl)
      done()
    }).catch((err) => {
      console.error('Git origin error')
      console.error(err)
      process.exit(-1)
    })
  }

  author () {
    this.answers = _.extend(this.answers, {
      author: this.user.git.name() + ' <' + this.user.git.email() + '>'
    })
  }

  githubUsername () {
    // HACK, cannot get github username reliably from email
    // hitting api rate limits
    // parse github url instead
    this.githubUsername = usernameFromGithubUrl(this.originUrl)
    debug('got github username', this.githubUsername)
    console.assert(this.githubUsername,
      'Could not get github username from url ' + this.originUrl)
  }

  _recordAnswers (answers) {
    la(is.unemptyString(answers.name), 'missing name', answers)
    la(is.maybe.unemptyString(answers.description),
      'invalid description', answers)
    la(is.maybe.unemptyString(answers.keywords),
      'invalid keywords', answers)

    answers.keywords = answers.keywords.split(',').filter(isEmpty)
    this.answers = _.extend(defaults, answers)
    la(is.unemptyString(this.answers.name), 'missing full name', this.answers.name)
    this.answers.noScopeName = withoutScope(this.answers.name)
    la(is.unemptyString(this.answers.noScopeName),
      'could not compute name without scope from', this.answers.name)
    debug('got answers to my questions')
  }

  _readAnswersFromFile (filename) {
    la(is.unemptyString(filename), 'missing answers filename', filename)
    la(exists(filename), 'cannot find file', filename)
    la(is.isJson(filename), 'answers file should be JSON', filename)
    const answers = require(filename)
    return Promise.resolve(answers)
  }

  projectName () {
    debug('getting project name and other details')
    const recordAnswers = this._recordAnswers.bind(this)

    const answersFilename = path.join(process.cwd(), 'answers.json')
    if (exists(answersFilename)) {
      debug('reading answers from file', answersFilename)
      return this._readAnswersFromFile(answersFilename)
        .then(recordAnswers)
    }

    const questions = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: _.kebabCase(this.appname),
      store: false
    }, {
      type: 'input',
      name: 'description',
      message: 'Project description',
      store: false
    }, {
      type: 'input',
      name: 'keywords',
      message: 'Comma separated keywords',
      store: false
    }]
    return this.prompt(questions)
      .then(recordAnswers)
  }

  repo () {
    debug('getting repo details')
    this.answers = _.extend(this.answers, {
      repository: {
        type: 'git',
        url: this.originUrl
      }
    })
  }

  homepage () {
    const domain = this.repoDomain
    const user = this.githubUsername
    const name = this.answers.noScopeName
    this.answers.homepage = `https://${domain}/${user}/${name}#readme`
    la(is.strings([domain, user, name]),
      'missing information to construct homepage url', this.answers.homepage)
    debug('home is', this.answers.homepage)
  }

  bugs () {
    const domain = this.repoDomain
    const user = this.githubUsername
    const name = this.answers.noScopeName
    this.answers.bugs = `https://${domain}/${user}/${name}/issues`
    la(is.strings([domain, user, name]),
      'missing information to construct bugs url', this.answers.bugs)
    debug('bugs url is', this.answers.bugs)
  }

  copyReadme () {
    debug('copying readme')
    const readmeContext = {
      name: this.answers.name,
      repoName: this.answers.noScopeName,
      description: this.answers.description,
      author: this.answers.author,
      year: (new Date()).getFullYear(),
      username: this.githubUsername
    }
    debug('Copying readme template with values', readmeContext)
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      readmeContext
    )
  }

  copySourceFiles () {
    debug('copying source files')
    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath('src/index.js')
    )
    const name = _.kebabCase(this.answers.noScopeName)
    const specFilename = path.join('src', name + '-spec.js')
    this.fs.copy(
      this.templatePath('spec.js'),
      this.destinationPath(specFilename)
    )
    debug('copied index.js and', specFilename)
  }

  report () {
    debug('all values')
    debug(JSON.stringify(this.answers, null, 2))
  }

  writePackage () {
    debug('writing package.json file')
    const clean = _.omit(this.answers, ['noScopeName', 'repoDomain'])
    const str = JSON.stringify(clean, null, 2) + '\n'
    fs.writeFileSync(packageFilename, str, 'utf8')
  }

  fixpack () {
    debug('fixing package.json')
    fixpack(packageFilename)
  }

  installDeps () {
    debug('installing dependencies')
    const devDependencies = [
      'ban-sensitive-files',
      'dependency-check',
      'deps-ok',
      'git-issues',
      'license-checker',
      'mocha',
      'nsp',
      'pre-git',
      'standard'
    ]
    const installOptions = {
      saveDev: true
    }
    this.npmInstall(devDependencies, installOptions)
  }
}

module.exports = g
