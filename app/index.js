'use strict'

const debug = require('debug')('gen')
const generators = require('yeoman-generator')
const _ = require('lodash')
const g = generators.Base.extend({
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
      this.answers = answers
      debug('answers', answers)
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
