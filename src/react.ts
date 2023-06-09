import type { ICreateConfigOptions, IRule } from './interface';
import createRecommendedConfig from './recommended';

const reactHooks = require.resolve('eslint-plugin-react-hooks');
const reactHooksPlugin = require(reactHooks);

function createReactConfig(opts: ICreateConfigOptions = {}) {
  const baseConfig = createRecommendedConfig(opts);

  const reactConfig: IRule = {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };

  return [...baseConfig, reactConfig];
}

export = createReactConfig;
