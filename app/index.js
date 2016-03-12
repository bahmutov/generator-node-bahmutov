const generators = require('yeoman-generator')
const g = generators.Base.extend()
console.log('extended generator')
console.log(g)
module.exports = g
