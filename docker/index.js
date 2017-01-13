'use strict'

const debug = require('debug')('gen')
const Generator = require('yeoman-generator')
const fs = require('fs')
const exists = fs.existsSync
const join = require('path').join
const la = require('lazy-ass')
const is = require('check-more-types')

function addCommand (scripts, name, cmd) {
  la(is.object(scripts), 'missing package scripts object', scripts)
  la(is.unemptyString(cmd), 'missing command to add', cmd)

  if (!scripts[name]) {
    scripts[name] = cmd
    console.log('added %s command to package.json', name)
    return 1
  }
  return 0
}

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

    if (!exists(this.pkgFilename)) {
      debug('Cannot find package.json, cannot add docker script commands')
      return
    }

    debug('Adding docker script commands to package.json')
    const pkg = require(this.pkgFilename)

    if (!pkg.scripts) {
      pkg.scripts = {}
    }

    const add = addCommand.bind(null, pkg.scripts)

    let changes = 0
    changes += add('docker-build', `docker build -t ${this.name} .`)
    changes += add('docker-run',
      `docker run --name ${this.name} -p 5000:1337 -d ${this.name}`)
    changes += add('docker-stop',
      `docker stop ${this.name} && docker rm ${this.name} || true`)
    changes += add('docker-full-restart',
      'npm run docker-stop && npm run docker-build && npm run docker-run')

    if (changes) {
      const text = JSON.stringify(pkg, null, 2) + '\n'
      fs.writeFileSync(this.pkgFilename, text, 'utf8')
      console.log('saved package.json file')
    }
  }

  goodbye () {
    console.log('Generated default Dockerfile')
  }
}

module.exports = g
