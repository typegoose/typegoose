"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("./data");
var baseMethod = function (target, key, descriptor, methodType) {
    if (descriptor === undefined) {
        descriptor = Object.getOwnPropertyDescriptor(target, key);
    }
    var name;
    if (methodType === 'instanceMethods') {
        name = target.constructor.name;
    }
    if (methodType === 'staticMethods') {
        name = target.name;
    }
    if (!data_1.methods[methodType][name]) {
        data_1.methods[methodType][name] = {};
    }
    var method = descriptor.value;
    data_1.methods[methodType][name] = __assign({}, data_1.methods[methodType][name], (_a = {}, _a[key] = method, _a));
    var _a;
};
exports.staticMethod = function (target, key, descriptor) {
    return baseMethod(target, key, descriptor, 'staticMethods');
};
exports.instanceMethod = function (target, key, descriptor) {
    return baseMethod(target, key, descriptor, 'instanceMethods');
};
//# sourceMappingURL=method.js.map