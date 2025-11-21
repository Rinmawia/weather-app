import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    ignores: ['dist/**'],
  },
  {
    files: ['**/*.js', '**/*.vue'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'indent': ['error', 2],
      'vue/html-indent': ['error', 2],
      'vue/script-indent': ['error', 2, { 'baseIndent': 0 }],
      'vue/multi-word-component-names': 'off', // Optional: often annoying in small projects
    },
  },
];
