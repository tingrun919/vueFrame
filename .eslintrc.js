module.exports = {
  root: true,
  extends: ['plugin:vue/recommended'],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 禁止出现重复的属性
    'vue/no-duplicate-attributes': 'error',
    // 禁止出现语法错误
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    "vue/no-unused-vars": "off",
    // prop 必须有类型限制
    // @off 没必要限制
    'vue/require-prop-types': 'off',
    // prop 必须有默认值限制
    // @off 没必要限制
    'vue/require-default-prop': 'off',
    // 限制每行允许的最多属性数量
    'vue/max-attributes-per-line': 'off',
    "vue/html-indent": 'off',
    "vue/script-indent": ["error", 2, { "baseIndent": 1 }],
    "vue/html-closing-bracket-newline": "off",
    "spellChecker": "off",
    'no-undef': 'off'
  }
}
