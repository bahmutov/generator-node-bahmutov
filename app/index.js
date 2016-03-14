const generators = require('yeoman-generator')
const g = generators.Base.extend({
  method1: function () {
    console.log('method1 running')
  },
  method2: function () {
    console.log('method2 running')
  }
})
console.log('extended generator')
console.log(g)
module.exports = g
