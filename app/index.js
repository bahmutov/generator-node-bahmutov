'use strict'

const debug = require('debug')('gen')
const generators = require('yeoman-generator')
const _ = require('lodash')
const originUrl = require('git-remote-origin-url')

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
    size: 't=\"$(npm pack .)\"; wc -c \"${t}\"; tar tvf \"${t}\"; rm \"${t}\";',
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
  }
}

const g = generators.Base.extend({
  setDefaults: function () {
    this.answers = defaults
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
  projectName: function () {
    const done = this.async()
    const questions = [{
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : _.kebabCase(this.appname),
      store: true
    }, {
      type    : 'input',
      name    : 'description',
      message : 'Project description',
      store: true
    }]
    this.prompt(questions, (answers) => {
      this.answers = _.extend(defaults, answers)
      debug('extended answers', this.answers)
      done()
    })
  },
  repo: function repo () {
    this.answers = _.extend(this.answers, {
      repository: {
        type: 'git',
        url: 'git+https://github.com/' + this.user.github.username(this.user.git.name()) +
          '/' + this.answers.name + '.git'
      }
    })
  },
  installDeps: function () {
    // const deps = ['pre-git', 'standard', 'standard-format', 'mocha', 'git-issues']
    // this.npmInstall(deps, { 'saveDev': true })
  }
})
// console.log('extended generator')
// console.log(g)
module.exports = g
