module.exports = {
  extends: [
    './rules/airbnb-base',
  ].map(require.resolve),
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};
