module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2021,
    plugins: ['@typescript-eslint'],
    sourceType: 'module',
  },
  rules: {
    // override/add rules settings here, such as:
    // 'vue/script-setup-uses-vars': 'error',
  },
}
