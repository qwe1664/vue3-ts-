module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 解决 vue.config.js 文件中用 require 导入报错的问题，讲那个eslint检查这个报错给关闭掉
    '@typescript-eslint/no-var-requires': 0,
    // 这个是关闭了命名规则的校验
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // 这个是关闭定义接口时的警告,让它自动类型推导
    '@typescript-eslint/no-unused-vars': 'off',
    // 'vue/no-mutating-props': 'off'
    'vue/no-mutating-props': 'off',
    '@typescript-eslint/no-non-null-assertion':'off'
  }
}
