module.exports = {
    extends: ['../../.eslintrc.json'],
    globals: {
      NodeJS: true,
    },
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: ['tsconfig.app.json', 'tsconfig.spec.json'],
      sourceType: 'module',
      requireConfigFile: false,
    },
    ignorePatterns: ['*.graphql'],
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  }
  