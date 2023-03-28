import type { ParserOptions } from '@typescript-eslint/parser';
import type { IRule } from './interface';
export declare const createBaseConfig: (opts: {
    files: string[];
    tsPluginParserOptions?: ParserOptions | undefined;
}) => IRule;
