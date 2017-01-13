'use strict'

const debug = require('debug')('gen')
const Generator = require('yeoman-generator')
const fs = require('fs')
const exists = fs.existsSync
const join = require('path').join
const la = require('lazy-ass')
const is = require('check-more-types')

const g = class extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.pkgFilename = join(process.cwd(), 'package.json')
    const defaultOptions = {name: 'app'}
    const pkg = exists(this.pkgFilename)
      ? require(this.pkgFilename)
      : defaultOptions
    this.name = pkg.name
  }

  greeting () {
    console.log('Generating Dockerfile for Node service')
  }

  copyDockerfile () {
    debug('Copying Dockerfile for', this.name)
    const vars = {
      name: this.name
    }
    this.fs.copyTpl(
      this.templatePath('Dockerfile'),
      this.destinationPath('Dockerfile'),
      vars
    )
  }

  copyDockerignore () {
    debug('Copying .dockerignore file')
    this.fs.copy(
      this.templatePath('dockerignore'),
      this.destinationPath('.dockerignore')
    )
  }

  addPackageScriptCommands () {
    la(is.unemptyString(this.name), 'missing project name')

    if (exists(this.pkgFilename)) {
      debug('Adding docker script commands to package.json')
      const pkg = require(this.pkgFilename)
      let changed

      if (!pkg.scripts) {
        pkg.scripts = {}
      }

      const buildCommandName = 'docker-build'
      if (!pkg.scripts[buildCommandName]) {
        const cmd = `docker build -t ${this.name} .`
        pkg.scripts[buildCommandName] = cmd
        changed = true
        console.log('added %s command to package.json', buildCommandName)
      }

      const runCommandName = 'docker-run'
      if (!pkg.scripts[runCommandName]) {
        const cmd = `docker run --name ${this.name} -p 5000:1337 -d ${this.name}`
        pkg.scripts[runCommandName] = cmd
        changed = true
        console.log('added %s command to package.json', runCommandName)
      }

      const stopCommandName = 'docker-stop'
      if (!pkg.scripts[stopCommandName]) {
        const cmd = `docker stop ${this.name} && docker rm ${this.name} || true`
        pkg.scripts[stopCommandName] = cmd
        changed = true
        console.log('added %s command to package.json', stopCommandName)
      }

      if (changed) {
        const text = JSON.stringify(pkg, null, 2) + '\n'
        fs.writeFileSync(this.pkgFilename, text, 'utf8')
        console.log('saved package.json file')
      }
    } else {
      debug('Cannot find package.json, cannot add docker script commands')
    }
  }

  goodbye () {
    console.log('Generated default Dockerfile')
  }
}

module.exports = g
