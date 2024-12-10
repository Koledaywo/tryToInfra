export default {
  languageOptions: {
    globals: {
      process: 'readonly',
      __dirname: 'readonly',
    },
    parserOptions: {
      ecmaVersion: 2021,
    },
  },
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
  },
};
