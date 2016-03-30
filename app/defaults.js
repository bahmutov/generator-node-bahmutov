const defaults = {
  version: '1.0.0',
  main: 'index.js',
  license: 'MIT',
  files: [
    'index.js',
    'src/*.js',
    '!src/*-spec.js'
  ],
  scripts: {
    ban: 'ban',
    deps: 'deps-ok',
    format: 'standard-format -w index.js src/*.js',
    issues: 'git-issues',
    license: 'license-checker --production --onlyunknown --csv',
    lint: 'standard --verbose index.js src/*.js',
    pretest: 'npm run format && npm run lint',
    secure: 'nsp check',
    size: 't="$(npm pack .)"; wc -c "${t}"; tar tvf "${t}"; rm "${t}";',
    test: 'npm run unit',
    unit: 'mocha src/*-spec.js'
  },
  config: {
    'pre-git': {
      'commit-msg': 'simple',
      'pre-commit': [
        'npm run deps',
        'npm test',
        'npm run ban'
      ],
      'pre-push': [
        'npm run secure',
        'npm run license',
        'npm run ban -- --all',
        'npm run size'
      ],
      'post-commit': [],
      'post-merge': []
    }
  },
  homepage: '',
  bugs: ''
}

module.exports = defaults
