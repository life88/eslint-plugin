import type { ParserOptions } from '@typescript-eslint/parser';
import { existsSync } from 'fs';
import { join } from 'path';

import type { ICreateConfigOptions } from './interface';

export const normalizeOptions = (
  opts: ICreateConfigOptions = {},
): ParserOptions => {
  const cwd = process.cwd();
  let root: ICreateConfigOptions['root'];
  let tsconfig: ICreateConfigOptions['tsconfig'] | true;

  if (opts.root?.length) {
    root = opts.root;
  } else {
    root = cwd;
  }

  if (opts.tsconfig?.length) {
    tsconfig = opts.tsconfig;
  } else {
    const rootTsconfigPath = join(cwd, 'tsconfig.json');
    if (existsSync(rootTsconfigPath)) {
      tsconfig = rootTsconfigPath;
    } else {
      tsconfig = true;
    }
  }

  return {
    project: tsconfig,
    tsconfigRootDir: root,
  };
};
