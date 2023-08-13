module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2020
  },
  env: {
    jest: true
  },
  extends: [
    'standard'
  ],
  rules: {
    indent: ['error', 2],
    'no-async-promise-executor': 'off'
  }
}
