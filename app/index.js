'use strict'

const debug = require('debug')('gen')
const generators = require('yeoman-generator')
const _ = require('lodash')
const originUrl = require('git-remote-origin-url')
const fs = require('fs')
const fixpack = require('fixpack')
const packageFilename = 'package.json'
const usernameFromGithubUrl = require('./github-username')

const defaults = {
  version: '1.0.0',
  main: 'index.js',
  license: 'MIT',
  files: [
    'index.js',
    'src/*.js',
    '!src/*-spec.js'
  ],
  scripts: {
    test: 'npm run unit',
    unit: 'mocha index.js src/*.js',
    pretest: 'npm run format && npm run lint',
    lint: 'standard --verbose index.js src/*.js',
    format: 'standard-format -w index.js src/*.js',
    size: 't="$(npm pack .)"; wc -c "${t}"; tar tvf "${t}"; rm "${t}";',
    issues: 'git-issues'
  },
  config: {
    'pre-git': {
      'commit-msg': 'simple',
      'pre-commit': ['npm test'],
      'pre-push': [
        'npm run size'
      ],
      'post-commit': [],
      'post-merge': []
    }
  },
  homepage: '',
  bugs: ''
}

function isEmpty (x) {
  return x
}

const g = generators.Base.extend({
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
    const done = this.async()
    originUrl().then((url) => {
      this.originUrl = url
      debug('git origin url', url)
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
      store: true
    }, {
      type: 'input',
      name: 'description',
      message: 'Project description',
      store: true
    }, {
      type: 'input',
      name: 'keywords',
      message: 'Comma separated keywords',
      store: true
    }]
    this.prompt(questions, (answers) => {
      answers.keywords = answers.keywords.split(',').filter(isEmpty)
      this.answers = _.extend(defaults, answers)
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
      '/' + this.answers.name + '#readme'
  },
  bugs: function () {
    this.answers.bugs = 'https://github.com/' + this.githubUsername +
      '/' + this.answers.name + '/issues'
  },
  copyReadme: function () {
    const readmeContext = {
      name: this.answers.name,
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
    const deps = ['pre-git', 'standard', 'standard-format', 'mocha', 'git-issues']
    this.npmInstall(deps, { 'saveDev': true })
  }
})
module.exports = g
