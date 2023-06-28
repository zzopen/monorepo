module.exports = {
    root: true,
  extends: ["plugin:@typescript-eslint/recommended"],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint"],
  env: {
    es6: true,
    node: true
  },
  rules: {},
  overrides: []
};
