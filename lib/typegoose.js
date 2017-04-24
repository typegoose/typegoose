"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var mongoose_1 = require("mongoose");
var _ = require("lodash");
var data_1 = require("./data");
__export(require("./method"));
__export(require("./prop"));
var Typegoose = (function () {
    function Typegoose() {
    }
    Typegoose.prototype.getModelForClass = function (t) {
        var name = this.constructor.name;
        if (!data_1.models[name]) {
            var sch_1 = new mongoose_1.Schema(data_1.schema[name]);
            var staticMethods = data_1.methods.staticMethods[name];
            sch_1.statics = staticMethods;
            var instanceMethods = data_1.methods.instanceMethods[name];
            sch_1.methods = instanceMethods;
            var getterSetters = data_1.virtuals[name];
            _.forEach(getterSetters, function (value, key) {
                if (value.get) {
                    sch_1.virtual(key).get(value.get);
                }
                if (value.set) {
                    sch_1.virtual(key).set(value.set);
                }
            });
            data_1.models[name] = mongoose_1.model(name, sch_1);
        }
        return data_1.models[name];
    };
    return Typegoose;
}());
exports.Typegoose = Typegoose;
//# sourceMappingURL=typegoose.js.map