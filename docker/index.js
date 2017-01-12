'use strict'

const debug = require('debug')('gen')
const Generator = require('yeoman-generator')
const exists = require('fs').existsSync
const join = require('path').join

const g = class extends Generator {
  constructor (args, opts) {
    super(args, opts)

    const pkgFilename = join(process.cwd(), 'package.json')
    const pkg = exists(pkgFilename) ? require(pkgFilename) : {name: 'app'}
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

  goodbye () {
    console.log('Generated default Dockerfile')
  }
}

module.exports = g
