module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['plugin:vue/recommended'],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    "vue/no-unused-vars": "off",
    'no-undef': 'off'
  }
}
