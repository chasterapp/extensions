module.exports = {
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
  parserOptions: {
    project: ['tsconfig.json'],
  },
  ignorePatterns: ['src/lib/prisma/client/**/*'],
  rules: {
    'prefer-template': 'error',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parser: '@typescript-eslint/parser',
      rules: {
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            prefer: 'type-imports',
            fixStyle: 'separate-type-imports',
            disallowTypeAnnotations: false,
          },
        ],
        '@typescript-eslint/no-misused-promises': [
          'error',
          { checksVoidReturn: false },
        ],
        '@next/next/no-img-element': 'off',
      },
    },
  ],
}
