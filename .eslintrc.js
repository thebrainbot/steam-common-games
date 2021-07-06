/* eslint-disable import/no-extraneous-dependencies */
const typescriptEslintRecommended = require('@typescript-eslint/eslint-plugin')
  .configs.recommended;

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
    'prettier',
  ],
  rules: {
    'no-console': 0,
    'no-param-reassign': 0,
    'no-useless-catch': 0,
    'import/order': 0,
    'import/prefer-default-export': 0,
    'global-require': 0,
  },
  env: {
    node: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['src/**/*.test.js', 'tests/*.test.js'],
      rules: {
        'padded-blocks': 0,
        'no-undef': 0,
        'jest/expect-expect': 0,
      },
    },
    {
      files: ['src/components/graphql/*/index.js'],
      rules: {
        'import/no-unresolved': 0,
      },
    },
    {
      files: ['src/components/*/hapi.js', 'src/components/*/*.routes.js'],
      rules: {
        'global-require': 0,
        'no-unused-vars': 0,
      },
    },
    {
      files: ['src/**/*.ts', '**/*.ts', '**/*.tsx', '*.ts'],
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
          react: {
            version: 'detect',
          },
        },
      },
      parser: '@typescript-eslint/parser',
      extends: [
        'airbnb-base', // Uses the recommended rules from airbnb
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:react/recommended',
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
      ],
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      rules: Object.assign(typescriptEslintRecommended.rules, {
        '@typescript-eslint/no-unused-vars': 1,
        '@typescript-eslint/no-explicit-any': 0,
        'no-console': 0,
        'import/prefer-default-export': 0,
        'no-underscore-dangle': 0,
        'react/forbid-prop-types': 0,
        'react/prop-types': 0,
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
          },
        ],
        camelcase: 0,
        '@typescript-eslint/ban-types': 0,
      }),
    },
  ],
};
