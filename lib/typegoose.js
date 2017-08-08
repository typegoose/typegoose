"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var mongoose = require("mongoose");
var _ = require("lodash");
var data_1 = require("./data");
__export(require("./method"));
__export(require("./prop"));
__export(require("./hooks"));
__export(require("./plugin"));
var Typegoose = (function () {
    function Typegoose() {
    }
    Typegoose.prototype.getModelForClass = function (t, _a) {
        var _b = _a === void 0 ? {} : _a, existingMongoose = _b.existingMongoose, schemaOptions = _b.schemaOptions;
        var name = this.constructor.name;
        if (!data_1.models[name]) {
            var Schema = existingMongoose ?
                existingMongoose.Schema.bind(existingMongoose) :
                mongoose.Schema.bind(mongoose);
            var sch_1 = schemaOptions ?
                new Schema(data_1.schema[name], schemaOptions) :
                new Schema(data_1.schema[name]);
            var staticMethods = data_1.methods.staticMethods[name];
            sch_1.statics = staticMethods;
            var instanceMethods = data_1.methods.instanceMethods[name];
            sch_1.methods = instanceMethods || {};
            if (data_1.hooks[name]) {
                var preHooks = data_1.hooks[name].pre;
                preHooks.forEach(function (preHookArgs) {
                    sch_1.pre.apply(sch_1, preHookArgs);
                });
                var postHooks = data_1.hooks[name].post;
                postHooks.forEach(function (postHookArgs) {
                    sch_1.post.apply(sch_1, postHookArgs);
                });
            }
            if (data_1.plugins[name]) {
                _.forEach(data_1.plugins[name], function (plugin) {
                    sch_1.plugin(plugin.mongoosePlugin, plugin.options);
                });
            }
            var getterSetters = data_1.virtuals[name];
            _.forEach(getterSetters, function (value, key) {
                if (value.get) {
                    sch_1.virtual(key).get(value.get);
                }
                if (value.set) {
                    sch_1.virtual(key).set(value.set);
                }
            });
            var model = existingMongoose ?
                existingMongoose.model.bind(existingMongoose) :
                mongoose.model.bind(mongoose);
            data_1.models[name] = model(name, sch_1);
        }
        return data_1.models[name];
    };
    return Typegoose;
}());
exports.Typegoose = Typegoose;
//# sourceMappingURL=typegoose.js.map