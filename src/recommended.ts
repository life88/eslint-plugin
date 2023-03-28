import { createBaseConfig } from './base';
import type { ICreateConfigOptions, IRules } from './interface';
import { normalizeOptions } from './options';

function createRecommendedConfig(opts: ICreateConfigOptions = {}) {
  const options = normalizeOptions(opts);

  const config: IRules = [
    createBaseConfig({
      files: ['**/*.js', '**/*.jsx'],
    }),
    createBaseConfig({
      files: ['**/*.tsx'],
    }),
    createBaseConfig({
      files: ['**/*.ts'],
      tsPluginParserOptions: options,
    }),
  ];

  return config;
}

export = createRecommendedConfig;
