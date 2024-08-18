import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Using ECMAScript 2024 (15)
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2024,
      },
      ecmaVersion: 15,
      sourceType: 'module',
    },
    rules: {
      indent: [
        'error',
        2,
        {
          SwitchCase: 1,
        },
      ],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/explicit-module-boundary-types': 0,
    },
  }
);
