export default {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true // 会自动设置 ecmaVersion 解析器选项为
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true // 启用 JSX
    }
  },
  // eslint-plugin-vue
  extends: ['plugin:vue/vue3-recommended'],
  /**
   * "off" 或 0 - 关闭该规则
   * "warn" 或 1 - 启用并警告（不影响现有代码）
   * "error" 或 2 - 启用并报错（错误代码 1）
   */
  rules: {
    // vue (https://eslint.vuejs.org/rules)
    // 'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用，此规则仅在启用该 no-unused-vars 规则时有效
    // 'vue/v-slot-style': 'error', // 强制执行 v-slot 指令样式
    // 'vue/no-mutating-props': 'error', // 不允许改变组件 prop
    // 'vue/custom-event-name-casing': 'error', // 为自定义事件名称强制使用特定大小写
    // 'vue/html-closing-bracket-newline': 'error', // 在标签的右括号之前要求或禁止换行
    // 'vue/attribute-hyphenation': 'error', // 对模板中的自定义组件强制执行属性命名样式：my-prop="prop"
    // 'vue/attributes-order': 'off', // vue api使用顺序，强制执行属性顺序
    // 'vue/no-v-html': 'off', // 禁止使用 v-html
    // 'vue/require-default-prop': 'off', // 此规则要求为每个 prop 为必填时，必须提供默认值
    // 'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
    // 'vue/no-setup-props-destructure': 'off' // 禁止解构 props 传递给 setup
  }
}
