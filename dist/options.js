"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOptions = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var normalizeOptions = function (opts) {
    var _a, _b;
    if (opts === void 0) { opts = {}; }
    var cwd = process.cwd();
    var root;
    var tsconfig;
    if ((_a = opts.root) === null || _a === void 0 ? void 0 : _a.length) {
        root = opts.root;
    }
    else {
        root = cwd;
    }
    if ((_b = opts.tsconfig) === null || _b === void 0 ? void 0 : _b.length) {
        tsconfig = opts.tsconfig;
    }
    else {
        var rootTsconfigPath = (0, path_1.join)(cwd, 'tsconfig.json');
        if ((0, fs_1.existsSync)(rootTsconfigPath)) {
            tsconfig = rootTsconfigPath;
        }
        else {
            tsconfig = true;
        }
    }
    return {
        project: tsconfig,
        tsconfigRootDir: root,
    };
};
exports.normalizeOptions = normalizeOptions;
