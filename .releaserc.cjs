module.exports = {
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        releaseRules: [
          {breaking: true, release: 'major'},
          {type: 'feat', release: 'minor'},
          {type: 'fix', release: 'patch'},
          {type: 'docs', release: false},
          {type: 'style', release: false},
          {type: 'refactor', release: 'patch'},
          {type: 'perf', release: 'patch'},
          {type: 'test', release: false},
          {type: 'chore', release: false},
          {type: 'deps', release: 'minor'},
          {type: 'devdeps', release: false},
          {type: 'revert', release: 'patch'},
          // don't trigger another release on release commit
          {type: 'release', release: false}
        ],
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES']
        }
      }
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: [
            {type: 'feat', section: 'Features'},
            {type: 'fix', section: 'Fixes'},
            {type: 'docs', hidden: true},
            {type: 'style', section: 'Style'},
            {type: 'refactor', section: 'Refactor'},
            {type: 'perf', section: 'Performance'},
            {type: 'test', hidden: true},
            {type: 'chore', hidden: true},
            {type: 'deps', section: 'Dependencies'},
            {type: 'devdeps', section: 'Dev-Dependencies'},
            {type: 'revert', section: 'Reverts'},
            {type: 'release', hidden: true}
          ]
        }
      }
    ],
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        npmPublish: true,
        pkgRoot: './',
      },
    ],
    [
      '@semantic-release/git', {
        assets: ['package.json', 'CHANGELOG.md'],
        message: 'release: v${nextRelease.version}'
      }
    ],
    '@semantic-release/github'
  ],
  branches: [
    // from what I read in the semantic-release configuration and in some issues, the order has to be like this:
    // other branches
    // main / upstream branch
    // prerelease branches
    { name: "old\\/(\\d+)(\\.x)", range: "${name.replace(/^old\\//g, '')}", prerelease: false },
    "master",
    { name: "beta", prerelease: true }
  ]
};
