'use strict'

const generators = require('yeoman-generator')
const _ = require('lodash')
const g = generators.Base.extend({
  method1: function () {
    console.log('method1 running')
  },
  method2: function () {
    console.log('method2 running')
  },
  prompting: function () {
    const done = this.async()
    this.prompt({
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : _.kebabCase(this.appname)
    }, (answers) => {
      this.log(answers.name)
      done()
    })
  },
  installTestFramework: function () {
    const done = this.async()
    this.prompt({
      type    : 'rawlist',
      name    : 'tester',
      message : 'Pick test framework',
      choices : ['mocha', 'rocha', 'ava', 'no testing'],
      default : 0
    }, function (answers) {
      this.log('you picked', answers.tester)
      if (answers.tester !== 'no testing') {
        let deps = [answers.tester]
        console.log('installing', deps)
        this.npmInstall(deps, { 'saveDev': true }, function () {
          console.log('callback')
          done()
        })
      } else {
        done()
      }
    }.bind(this))
  },
  installDeps: function () {
    const deps = ['pre-git', 'standard', 'standard-format']
    this.log('Installing dev dependencies', deps)
    this.npmInstall(deps, { 'saveDev': true })
  }
})
// console.log('extended generator')
// console.log(g)
module.exports = g
