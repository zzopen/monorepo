module.exports = {
  extends: ['@zzopen/eslint-config-base', 'plugin:import/recommended', 'plugin:import/typescript', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.mjs', '.js', '.json', '.ts', '.d.ts'],
      },
    },
    'import/extensions': ['.js', '.mjs', '.ts', '.d.ts'],
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'ignorePackages',
        cjs: 'ignorePackages',
        mjs: 'ignorePackages',
        ts: 'never',
      },
    ],
  },
}
