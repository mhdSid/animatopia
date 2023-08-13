module.exports = {
	roots: ['<rootDir>'],
	moduleFileExtensions: ['js'],
  testMatch: [
    '<rootDir>/src/**/*.js'
  ],
  testPathIgnorePatterns: [
    '/dist/',
    '/node_modules/',
    '/coverage/',
    '/jest-html-reporters-attach'
  ],
  runner: 'jest-runner-eslint',
  watchPlugins: ['jest-runner-eslint/watch-fix']
}
