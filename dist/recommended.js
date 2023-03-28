"use strict";
var base_1 = require("./base");
var options_1 = require("./options");
function createRecommendedConfig(opts) {
    if (opts === void 0) { opts = {}; }
    var options = (0, options_1.normalizeOptions)(opts);
    var config = [
        (0, base_1.createBaseConfig)({
            files: ['**/*.js', '**/*.jsx'],
        }),
        (0, base_1.createBaseConfig)({
            files: ['**/*.tsx'],
        }),
        (0, base_1.createBaseConfig)({
            files: ['**/*.ts'],
            tsPluginParserOptions: options,
        }),
    ];
    return config;
}
module.exports = createRecommendedConfig;
