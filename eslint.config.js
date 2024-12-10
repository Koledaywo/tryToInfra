import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  env: {
    node: true,
    es2021: true,
  },
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
  },
});
