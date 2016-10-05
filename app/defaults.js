const defaults = {
  version: '1.0.0',
  main: 'src/',
  license: 'MIT',
  files: [
    'src/*.js',
    '!src/*-spec.js'
  ],
  engines: {
    node: '>=6'
  },
  scripts: {
    ban: 'ban',
    deps: 'deps-ok',
    issues: 'git-issues',
    license: 'license-checker --production --onlyunknown --csv',
    lint: 'standard --verbose --fix src/*.js',
    pretest: 'npm run lint',
    secure: 'nsp check',
    size: 't="$(npm pack .)"; wc -c "${t}"; tar tvf "${t}"; rm "${t}";',
    test: 'npm run unit',
    unit: 'mocha src/*-spec.js'
  },
  config: {
    'pre-git': {
      'commit-msg': 'simple',
      'pre-commit': [
        'npm prune',
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
  'publishConfig': {
    registry: 'http://registry.npmjs.org/'
  },
  homepage: '',
  bugs: ''
}

module.exports = defaults
