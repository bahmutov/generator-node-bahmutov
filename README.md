# generator-node-bahmutov

> Creates good package.json for new Node projects

[![NPM][generator-node-bahmutov-icon] ][generator-node-bahmutov-url]

[![Build status][generator-node-bahmutov-ci-image] ][generator-node-bahmutov-ci-url]
[![semantic-release][semantic-image] ][semantic-url]
![no sudden unpublish](https://img.shields.io/badge/no%20sudden-unpublish%20%E2%9A%93-ff69b4.svg)

## Install and use

    npm install -g yo generator-node-bahmutov

In a new project folder

    git init
    git remote add origin <remote git>
    yo node-bahmutov

Answer a few questions and you should be all set.

## Features

* Targeted at public github repos
* Assumes single `index.js` and `src` folder
* Default `.npmrc` and `.gitignore` files
* Git hooks and message validation using [pre-git](https://github.com/bahmutov/pre-git)
* Linting and auto formatting using [standard](http://standardjs.com/) and
  [standard-format](https://github.com/maxogden/standard-format) using `npm run lint`
* Showing open Git issues via
  [git-issues](https://github.com/softwarescales/git-issues) using `npm run issues`
* Unit testing with [Mocha](http://mochajs.org/) using `npm run unit`
* Packaged [size reporting on pre-push hook][size] using `npm run size`
* Running [Node Security Project](https://github.com/nodesecurity/nsp) check on `pre-push`
* Checking if you are trying to commit
  [sensitive files](https://github.com/bahmutov/ban-sensitive-files)
  using `npm run ban`
* License check of production dependencies with
  [license-checker](https://www.npmjs.com/package/license-checker) using `npm run license`
* Outdated and missing local dependencies check with
  [deps-ok](https://github.com/bahmutov/deps-ok) and
  [dependency-check](https://www.npmjs.com/package/dependency-check)
  using `npm run deps`

See `npm run` output for the full list of scripts.

[size]: https://glebbahmutov.com/blog/smaller-published-NPM-modules/

## Recommended

I recommend installing [semantic release](https://github.com/semantic-release/semantic-release)
right away after bootstrapping the project, it will work nicely with the commit message format.
We already include the semantic release badge in the generated README file, so you have no
excuse

    npm i -g semantic-release-cli
    semantic-release-cli setup

Add version back into `package.json`, I recommend

    "version": "0.0.0-semantic-release"

## Test

Change into an empty folder, for example

    cd /tmp
    mkdir test-generator
    cd test-generator
    yo node-bahmutov

Or just run `npm run e2e` (assumes global `yo` install)

## Debugging

Run the generator with environment variable DEBUG set to "gen"

    DEBUG=gen yo node-bahmutov

## Development

Following [the instructions](http://yeoman.io/authoring/index.html).
This module also reads answers to user questions from file `answers.json`
if found in the current working directory. An example file is
[test/answers.json](test/answers.json).

### Small print

Author: Gleb Bahmutov &copy; 2016

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/generator-node-bahmutov/issues) on Github

## MIT License

Copyright (c) 2016 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[generator-node-bahmutov-icon]: https://nodei.co/npm/generator-node-bahmutov.svg?downloads=true
[generator-node-bahmutov-url]: https://npmjs.org/package/generator-node-bahmutov
[generator-node-bahmutov-ci-image]: https://travis-ci.org/bahmutov/generator-node-bahmutov.svg?branch=master
[generator-node-bahmutov-ci-url]: https://travis-ci.org/bahmutov/generator-node-bahmutov
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
