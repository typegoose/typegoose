"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("./data");
exports.plugin = function (mongoosePlugin, options) { return function (constructor) {
    var name = constructor.name;
    if (!data_1.plugins[name]) {
        data_1.plugins[name] = [];
    }
    data_1.plugins[name].push({ mongoosePlugin: mongoosePlugin, options: options });
}; };
//# sourceMappingURL=plugin.js.map