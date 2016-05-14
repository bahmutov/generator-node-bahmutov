'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')

function stripScope (packageName) {
  const sep = packageName.indexOf('/')
  la(is.found(sep), 'could not find / in scoped name', packageName)
  return packageName.substr(sep + 1)
}

function withoutScope (packageName) {
  la(is.unemptyString(packageName), 'expected package name', packageName)
  if (packageName[0] === '@') {
    return stripScope(packageName)
  }
  return packageName
}

module.exports = withoutScope
