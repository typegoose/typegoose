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
var mongoose = require("mongoose");
var _ = require("lodash");
var data_1 = require("./data");
var utils_1 = require("./utils");
var errors_1 = require("./errors");
var isWithStringValidate = function (options) {
    return (options.minlength || options.maxlength || options.match);
};
var isWithNumberValidate = function (options) {
    return (options.min || options.max);
};
var baseProp = function (rawOptions, Type, target, key, isArray) {
    if (isArray === void 0) { isArray = false; }
    var name = target.constructor.name;
    var isGetterSetter = Object.getOwnPropertyDescriptor(target, key);
    if (isGetterSetter) {
        if (isGetterSetter.get) {
            if (!data_1.virtuals[name]) {
                data_1.virtuals[name] = {};
            }
            if (!data_1.virtuals[name][key]) {
                data_1.virtuals[name][key] = {};
            }
            data_1.virtuals[name][key] = __assign({}, data_1.virtuals[name][key], { get: isGetterSetter.get });
        }
        if (isGetterSetter.set) {
            if (!data_1.virtuals[name]) {
                data_1.virtuals[name] = {};
            }
            if (!data_1.virtuals[name][key]) {
                data_1.virtuals[name][key] = {};
            }
            data_1.virtuals[name][key] = __assign({}, data_1.virtuals[name][key], { set: isGetterSetter.set });
        }
        return;
    }
    if (isArray) {
        utils_1.initAsArray(name, key);
    }
    else {
        utils_1.initAsObject(name, key);
    }
    var ref = rawOptions.ref;
    if (ref) {
        return data_1.schema[name][key] = __assign({}, data_1.schema[name][key], { type: mongoose.Schema.Types.ObjectId, ref: ref.name });
    }
    var itemsRef = rawOptions.itemsRef;
    if (itemsRef) {
        return data_1.schema[name][key][0] = __assign({}, data_1.schema[name][key][0], { type: mongoose.Schema.Types.ObjectId, ref: itemsRef.name });
    }
    // check for validation inconsistencies
    if (isWithStringValidate(rawOptions) && !utils_1.isString(Type)) {
        throw new errors_1.NotStringTypeError(key);
    }
    if (isWithNumberValidate(rawOptions) && !utils_1.isNumber(Type)) {
        throw new errors_1.NotNumberTypeError(key);
    }
    var instance = new Type();
    var subSchema = data_1.schema[instance.constructor.name];
    if (!subSchema && !utils_1.isPrimitive(Type)) {
        throw new errors_1.InvalidPropError(Type.name, key);
    }
    var options = _.omit(rawOptions, ['ref', 'items']);
    if (utils_1.isPrimitive(Type)) {
        if (isArray) {
            return data_1.schema[name][key][0] = __assign({}, data_1.schema[name][key][0], options, { type: Type });
        }
        return data_1.schema[name][key] = __assign({}, data_1.schema[name][key], options, { type: Type });
    }
    if (isArray) {
        return data_1.schema[name][key][0] = __assign({}, data_1.schema[name][key][0], options, subSchema);
    }
    return data_1.schema[name][key] = __assign({}, data_1.schema[name][key], options, subSchema);
};
exports.prop = function (options) {
    if (options === void 0) { options = {}; }
    return function (target, key) {
        var Type = Reflect.getMetadata('design:type', target, key);
        if (!Type) {
            throw new Error("There is no metadata for the \"" + key + "\" property. " +
                'Check if emitDecoratorMetadata is enable in tsconfig.json');
        }
        return baseProp(options, Type, target, key);
    };
};
exports.arrayProp = function (options) { return function (target, key) {
    var Type = options.items;
    return baseProp(options, Type, target, key, true);
}; };
//# sourceMappingURL=prop.js.map