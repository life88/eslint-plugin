"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var recommended_1 = __importDefault(require("./recommended"));
var reactHooks = require.resolve('eslint-plugin-react-hooks');
var reactHooksPlugin = require(reactHooks);
function createReactConfig(opts) {
    if (opts === void 0) { opts = {}; }
    var baseConfig = (0, recommended_1.default)(opts);
    var reactConfig = {
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
    return __spreadArray(__spreadArray([], baseConfig, true), [reactConfig], false);
}
module.exports = createReactConfig;
