import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

const base = [
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential']
];

// Relax some rules project-wide to avoid blocking builds with stylistic issues.
// These are intentionally permissive for now; consider tightening later.
const relaxed = {
  ignores: ['dist/', 'node_modules/'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-prototype-builtins': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/valid-v-slot': 'off',
    'vue/no-unused-components': 'off',
    'no-empty': 'off',
    'no-undef': 'off'
  }
};

export default [...base, relaxed];
