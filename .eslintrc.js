module.exports = {
  env: {
    node: true,
    commonjs: true,
  },
  extends: [
    // add more generic rulesets here, such as:
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    'vue/no-unused-vars': 'warn',
    'vue/require-v-for-key': 'warn',
    'vue/valid-v-bind': 'warn',
    'vue/no-deprecated-v-on-native-modifier': 'warn',
  }
}
