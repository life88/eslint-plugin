import type { ParserOptions } from '@typescript-eslint/parser';

import type { IRule } from './interface';

const globals = require('globals');

const parser = require.resolve('@typescript-eslint/parser');
const parserInstance = require(parser);

const eslintPluginPrettier = require.resolve('eslint-plugin-prettier');
const pluginPrettier = require(eslintPluginPrettier);

const eslintConfigPrettier = require.resolve('eslint-config-prettier');
const configPrettier = require(eslintConfigPrettier);

const tsPlugin = require.resolve('@typescript-eslint/eslint-plugin');
const tsPluginInstance = require(tsPlugin);

export const createBaseConfig = (opts: {
  files: string[];
  tsPluginParserOptions?: ParserOptions;
}) => {
  const { files, tsPluginParserOptions } = opts;

  const base: IRule = {
    files,
    ignores: ['**/dist/**', '**/node_modules/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: parserInstance,
      globals: {
        ...globals.commonjs,
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
      parserOptions: { ecmaFeatures: { globalReturn: true } },
    },
    // plugins: ['prettier'] : eslint-plugin-prettier
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      // extends: ['prettier'] : eslint-config-prettier
      ...configPrettier.rules,
      // eslint-plugin-prettier overrides rules
      ...pluginPrettier.configs.recommended.rules,

      'prettier/prettier': 'warn',
      'no-unused-vars': 'off',

      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
  };

  if (tsPluginParserOptions) {
    // add plugins
    base.plugins!['@typescript-eslint'] = tsPluginInstance;

    // add rules
    base.rules = {
      ...base.rules,

      '@typescript-eslint/no-unused-vars': 'warn',
      // no floating promise
      '@typescript-eslint/no-floating-promises': 'warn',
    };

    base.languageOptions!.parserOptions = {
      ...base.languageOptions!.parserOptions,
      ...tsPluginParserOptions,
    };
  }

  return base;
};
