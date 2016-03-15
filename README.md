# generator-node-bahmutov

Goal: replace the questions and answers from `npm init` with values collected from
the environment.

Following [the instructions](http://yeoman.io/authoring/index.html)

## Test

Change into an empty folder, for example

    cd /tmp
    mkdir test-generator
    cd test-generator
    yo node-bahmutov

## Debugging

Run the generator with environment variable DEBUG set to "gen"

    DEBUG=gen yo node-bahmutov

## Development

## Goal

Trying to recreate all the information asked for during `npm init` command (plus a few good
defaults)

```json
{
  "name": "test-generator",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {},
  "devDependencies": {},
  "scripts": {
    "test": "mocha"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
