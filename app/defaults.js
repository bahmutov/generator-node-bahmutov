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
    test: 'npm run unit',
    unit: 'mocha src/*-spec.js',
    pretest: 'npm run format && npm run lint',
    lint: 'standard --verbose index.js src/*.js',
    format: 'standard-format -w index.js src/*.js',
    size: 't="$(npm pack .)"; wc -c "${t}"; tar tvf "${t}"; rm "${t}";',
    issues: 'git-issues',
    secure: 'nsp check',
    ban: 'ban',
    license: 'license-checker --production --onlyunknown --csv'
  },
  config: {
    'pre-git': {
      'commit-msg': 'simple',
      'pre-commit': [
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
