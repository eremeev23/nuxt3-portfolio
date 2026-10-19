// @ts-nocheck
import antfu from '@antfu/eslint-config'
import nuxt from './.nuxt/eslint.config.mjs'

/*
 * Same setup as the easy-lesson and NRIZ projects: @antfu/eslint-config wrapped
 * in the Nuxt config, with ESLint as the only formatter (no Prettier).
 */

const STRICT_CONSOLE = process.env.LINT_CONFIG_STRICT_CONSOLE === 'true'

export default nuxt(
  antfu(
    {
      typescript: true,
      unocss: true,
      formatters: true,
    },
  ),
)
  .append({
    rules: {
      'style/max-len': ['warn', {
        code: 120,
        tabWidth: 2,
        ignoreComments: false,
        ignoreStrings: false,
        ignoreTemplateLiterals: false,
        ignoreUrls: true,
        ignorePattern: '^import .*',
      }],
      'vue/max-len': ['warn', {
        code: 120,
        template: 120,
        tabWidth: 2,
        ignoreComments: false,
        ignoreStrings: false,
        ignoreTemplateLiterals: false,
        ignoreUrls: true,
        ignorePattern: '^import .*',
      }],
    },
  })
  .append({
    files: ['**/*.ts', '**/*.tsx', '**/*.vue', '**/*.mts', '**/*.cts'],
    rules: {
      'ts/consistent-type-imports': ['warn', { prefer: 'type-imports', fixStyle: 'separate-type-imports' }],
    },
  })
  .append({
    files: ['**/*.ts', '**/*.tsx', '**/*.vue', '**/*.mts', '**/*.cts', '**/*.js', '**/*.mjs'],
    rules: {
      // Multiline comments must use `/* */` (starred block), never consecutive `//` lines.
      'style/multiline-comment-style': ['warn', 'starred-block'],
    },
  })
  /*
   * Disable max-len for JSON files, as we can't have multiline strings in JSON and
   * some JSON files are generated or are config/data files with long lines.
   */
  .append({
    files: ['**/*.json'],
    rules: {
      'style/max-len': 'off',
      'vue/max-len': 'off',
    },
  })
  /*
   * console log rules:
   * 1. Allow console logs in scripts (in all env).
   * 2. Allow console logs by default, disallow them when LINT_CONFIG_STRICT_CONSOLE=true (stage/prod).
   */
  .append({
    files: ['**/*.ts', '**/*.tsx', '**/*.vue', '**/*.mts', '**/*.cts', '**/*.js', '**/*.mjs'],
    rules: {
      'no-console': STRICT_CONSOLE ? 'error' : 'off',
    },
  })
  .append({
    files: ['scripts/**/*.ts'],
    rules: {
      'no-console': 'off',
    },
  })
  .overrideRules({
    'vue/max-attributes-per-line': ['warn', { singleline: 1, multiline: { max: 1 } }],
    'ts/consistent-type-definitions': ['warn', 'type'],
    'curly': ['error', 'all'],

    'style/brace-style': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-v-text-v-html-on-component': 'error',
    'node/prefer-global/process': ['warn', 'always'],
    'ts/no-use-before-define': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'ts/ban-ts-comment': ['error', {
      'ts-expect-error': 'allow-with-description',
      'ts-ignore': 'allow-with-description',
      'ts-nocheck': 'allow-with-description',
      'ts-check': false,
      'minimumDescriptionLength': 3,
    }],
    'unocss/order-attributify': 'off',
    'unocss/order': 'off',

    'style/arrow-parens': ['warn', 'as-needed'],
    'vue/custom-event-name-casing': 'off',

    'style/quotes': ['warn', 'single', { avoidEscape: true }],
    'perfectionist/sort-imports': ['off'],
    'unicorn/consistent-function-scoping': 'off',
    'perfectionist/sort-objects': 'off',
    'ts/no-unsafe-function-type': 'off',
  })
  /*
   * Fully ignore files that are generated or not relevant for linting
   * At the end so that it can override any previous rules if needed
   */
  .append({
    ignores: [
      // markdown files
      '**/*.md',
    ],
  })
