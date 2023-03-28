"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBaseConfig = void 0;
var globals = require('globals');
var parser = require.resolve('@typescript-eslint/parser');
var parserInstance = require(parser);
var eslintPluginPrettier = require.resolve('eslint-plugin-prettier');
var pluginPrettier = require(eslintPluginPrettier);
var eslintConfigPrettier = require.resolve('eslint-config-prettier');
var configPrettier = require(eslintConfigPrettier);
var tsPlugin = require.resolve('@typescript-eslint/eslint-plugin');
var tsPluginInstance = require(tsPlugin);
var createBaseConfig = function (opts) {
    var files = opts.files, tsPluginParserOptions = opts.tsPluginParserOptions;
    var base = {
        files: files,
        ignores: ['**/dist/**', '**/node_modules/**'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: parserInstance,
            globals: __assign(__assign(__assign(__assign({}, globals.commonjs), globals.browser), globals.es2021), globals.node),
            parserOptions: { ecmaFeatures: { globalReturn: true } },
        },
        // plugins: ['prettier'] : eslint-plugin-prettier
        plugins: {
            prettier: pluginPrettier,
        },
        rules: __assign(__assign(__assign({}, configPrettier.rules), pluginPrettier.configs.recommended.rules), { 'prettier/prettier': 'warn', 'no-unused-vars': 'off', 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off' }),
    };
    if (tsPluginParserOptions) {
        // add plugins
        base.plugins['@typescript-eslint'] = tsPluginInstance;
        // add rules
        base.rules = __assign(__assign({}, base.rules), { '@typescript-eslint/no-unused-vars': 'warn', 
            // no floating promise
            '@typescript-eslint/no-floating-promises': 'warn' });
        base.languageOptions.parserOptions = __assign(__assign({}, base.languageOptions.parserOptions), tsPluginParserOptions);
    }
    return base;
};
exports.createBaseConfig = createBaseConfig;
