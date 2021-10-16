module.exports = {
  name: 'fr-demo',
  testURL: 'http://localhost',
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '.*\\.(js)$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'vue'],
  moduleNameMapper: {
    '^@modules(.*)$': '<rootDir>/src/js/modules/$1',
    '^@components(.*)$': '<rootDir>/src/js/components/$1',
    '^@node_modules(.*)$': '<rootDir>/node_modules/$1',
  },
  maxConcurrency: 12,
  testEnvironment: '@jest-runner/electron/environment',
  runner: '@jest-runner/electron',
  reporters: [
    'default',
  ],
  modulePaths: [
    '<rootDir>/node_modules/',
  ],
  coverageDirectory: 'jest_coverage',
  setupFiles: [
    './test/utils/setup.js',
  ]
};
