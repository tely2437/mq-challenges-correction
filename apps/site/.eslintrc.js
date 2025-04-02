module.exports = {
  extends: ['../../.eslintrc.json'],
  parserOptions: {
    requireConfigFile: false,
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  root: true,
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
}
