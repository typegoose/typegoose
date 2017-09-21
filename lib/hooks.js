"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("./data");
var hooks = {
    pre: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return function (constructor) {
            addToHooks(constructor.name, 'pre', args);
        };
    },
    post: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return function (constructor) {
            addToHooks(constructor.name, 'post', args);
        };
    },
};
var addToHooks = function (name, hookType, args) {
    if (!data_1.hooks[name]) {
        data_1.hooks[name] = { pre: [], post: [] };
    }
    data_1.hooks[name][hookType].push(args);
};
exports.pre = hooks.pre;
exports.post = hooks.post;
//# sourceMappingURL=hooks.js.map