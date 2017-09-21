"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var data_1 = require("./data");
exports.isPrimitive = function (Type) { return _.includes(['String', 'Number', 'Boolean', 'Date'], Type.name); };
exports.isNumber = function (Type) { return Type.name === 'Number'; };
exports.isString = function (Type) { return Type.name === 'String'; };
exports.initAsObject = function (name, key) {
    if (!data_1.schema[name]) {
        data_1.schema[name] = {};
    }
    if (!data_1.schema[name][key]) {
        data_1.schema[name][key] = {};
    }
};
exports.initAsArray = function (name, key) {
    if (!data_1.schema[name]) {
        data_1.schema[name] = {};
    }
    if (!data_1.schema[name][key]) {
        data_1.schema[name][key] = [{}];
    }
};
//# sourceMappingURL=utils.js.map