'use strict'

const debug = require('debug')('gen')
const Generator = require('yeoman-generator')
const fs = require('fs')
const exists = fs.existsSync
const join = require('path').join
const la = require('lazy-ass')
const is = require('check-more-types')

// generator that sets up semantic release
const g = class extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.pkgFilename = join(process.cwd(), 'package.json')
    if (!exists(this.pkgFilename)) {
      const msg = `Cannot find ${this.pkgFilename}
      Run "yo node-bahmutov" first!`
      console.error(msg)
      throw new Error(msg)
    }
  }

  initializing () {
    console.log('📝  Setting up semantic release')
    console.log('using these semantic-release plugins:')
    console.log('* https://github.com/bahmutov/simple-commit-message')
    console.log('* https://github.com/bahmutov/github-post-release')
    console.log('* https://github.com/bahmutov/dont-crack')
  }

  setupSemanticRelease () {
    debug('setting up semantic-release')
    const done = this.async()
    const child = this.spawnCommand('semantic-release-cli', ['setup'])
    child.on('close', exitCode => {
      if (exitCode) {
        const msg = 'Could not setup semantic-release'
        console.error(msg)
        console.error('exit code', exitCode)
        return done(new Error(msg))
      }
      done()
    })
  }

  configureRelease () {
    console.log('Writing "release" object in package.json')
    la(is.unemptyString(this.pkgFilename), 'missing pkgFilename')
    const pkg = require(this.pkgFilename)
    pkg.release = {
      analyzeCommits: 'simple-commit-message',
      generateNotes: 'github-post-release',
      verifyRelease: {
        path: 'dont-crack',
        'test-against': []
      }
    }
    const text = JSON.stringify(pkg, null, 2) + '\n'
    fs.writeFileSync(this.pkgFilename, text, 'utf8')
    console.log('saved package.json file')
  }

  install () {
    const deps = [
      'semantic-release',
      'simple-commit-message',
      'github-post-release',
      'dont-crack'
    ]
    console.log('Installing useful plugin modules', deps)

    this.npmInstall(deps, {
      saveDev: true
    })
  }

  end () {
    console.log('✅  All done')
    console.log(`You should add dependent projects to test
    before each release to package.json
    release.verifyRelease.test-against list`)
  }
}

module.exports = g
