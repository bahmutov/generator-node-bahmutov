'use strict'

const debug = require('debug')('gen')
const generators = require('yeoman-generator')
const _ = require('lodash')

const defaults = {
  version: '1.0.0',
  main: 'index.js',
  license: 'MIT'
}

const g = generators.Base.extend({
  gitSetting: function () {
    console.log('the git email', this.user.git.email())
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
  installDeps: function () {
    // const deps = ['pre-git', 'standard', 'standard-format', 'mocha']
    // this.npmInstall(deps, { 'saveDev': true })
  }
})
// console.log('extended generator')
// console.log(g)
module.exports = g
