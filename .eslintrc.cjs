module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['import', '@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  env: {
    node: true,
    browser: true,
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    quotes: [2, 'single', { avoidEscape: true }],
    'import/extensions': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 'off',
    'import/newline-after-import': ['error', { count: 1 }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', 'ts', 'tsx'] },
    ],
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'unknown',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern:
              '{react,react-dom/**,react-router,react-router-dom,react-query,react-virtualized,react-virtualized/**,react-**}',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '{next,next/router,next/image,next/**}',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '{next-auth,next-auth/**}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '{uuid,clsx,@types/**,react-toastify,react-toastify/**,}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '**/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: './**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['@/*'],
      },
    },
  },
};
