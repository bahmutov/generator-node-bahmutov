'use strict'

const debug = require('debug')('gen')
const generators = require('yeoman-generator')
const _ = require('lodash')
const originUrl = require('git-remote-origin-url')
const fs = require('fs')
const path = require('path')
const fixpack = require('fixpack')
const packageFilename = 'package.json'
const usernameFromGithubUrl = require('./github-username')
const defaults = require('./defaults')
const la = require('lazy-ass')
const is = require('check-more-types')
const withoutScope = require('./without-scope')

function isEmpty (x) {
  return x
}

function printVersion () {
  const myPackageFilename = path.join(__dirname, '../package.json')
  const myPackage = require(myPackageFilename)
  console.log('using %s@%s', myPackage.name, myPackage.version)
}

const g = generators.Base.extend({
  printVersion: printVersion,
  setDefaults: function () {
    this.answers = defaults
  },
  copyNpmrc: function () {
    this.fs.copy(
      this.templatePath('npmrc'),
      this.destinationPath('.npmrc')
    )
  },
  copyGitignore: function () {
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    )
  },
  git: function git () {
    const exists = require('fs').existsSync
    if (!exists('.git')) {
      console.error('Cannot find .git folder, please initialize the Git repo first')
      console.error('git init')
      console.error('git remote add origin ...')
      process.exit(-1)
    }
  },
  gitOrigin: function gitOrigin () {
    const toHttps = require('./https-github-url')
    const done = this.async()
    originUrl().then((url) => {
      la(is.unemptyString(url), 'could not get github origin url')
      this.originUrl = toHttps(url)
      debug('github origin HTTPS url', this.originUrl)
      done()
    }).catch((err) => {
      console.error('Git origin error')
      console.error(err)
      process.exit(-1)
    })
  },
  author: function author () {
    this.answers = _.extend(this.answers, {
      author: this.user.git.name() + ' <' + this.user.git.email() + '>'
    })
  },
  githubUsername: function githubUsername () {
    // HACK, cannot get github username reliably from email
    // hitting api rate limits
    // parse github url instead
    this.githubUsername = usernameFromGithubUrl(this.originUrl)
    debug('got github username', this.githubUsername)
    console.assert(this.githubUsername,
      'Could not get github username from url ' + this.originUrl)
  },
  projectName: function () {
    const done = this.async()
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
    this.prompt(questions, (answers) => {
      answers.keywords = answers.keywords.split(',').filter(isEmpty)
      this.answers = _.extend(defaults, answers)
      la(is.unemptyString(this.answers.name), 'missing full name', this.answers.name)
      this.answers.noScopeName = withoutScope(this.answers.name)
      la(is.unemptyString(this.answers.noScopeName),
        'could not compute name without scope from', this.answers.name)
      done()
    })
  },
  repo: function repo () {
    this.answers = _.extend(this.answers, {
      repository: {
        type: 'git',
        url: this.originUrl
      }
    })
  },
  homepage: function () {
    this.answers.homepage = 'https://github.com/' + this.githubUsername +
      '/' + this.answers.noScopeName + '#readme'
  },
  bugs: function () {
    this.answers.bugs = 'https://github.com/' + this.githubUsername +
      '/' + this.answers.noScopeName + '/issues'
  },
  copyReadme: function () {
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
  },
  copySourceFiles: function () {
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
  },
  report: function () {
    debug('all values')
    debug(JSON.stringify(this.answers, null, 2))
  },
  writePackage: function writePackage () {
    debug('writing package.json file')
    const str = JSON.stringify(this.answers, null, 2) + '\n'
    fs.writeFileSync(packageFilename, str, 'utf8')
  },
  fixpack: function () {
    debug('fixing package.json')
    fixpack(packageFilename)
  },
  installDeps: function () {
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
    this.npmInstall(devDependencies, { saveDev: true })
  }
})
module.exports = g
