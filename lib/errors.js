"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var InvalidPropError = (function (_super) {
    __extends(InvalidPropError, _super);
    function InvalidPropError(typeName, key) {
        return _super.call(this, "In property " + key + ": " + typeName + " is not a primitive type nor a Typegoose schema (Not extending it).") || this;
    }
    return InvalidPropError;
}(Error));
exports.InvalidPropError = InvalidPropError;
var NotNumberTypeError = (function (_super) {
    __extends(NotNumberTypeError, _super);
    function NotNumberTypeError(key) {
        return _super.call(this, "Type of " + key + " property is not a number.") || this;
    }
    return NotNumberTypeError;
}(Error));
exports.NotNumberTypeError = NotNumberTypeError;
var NotStringTypeError = (function (_super) {
    __extends(NotStringTypeError, _super);
    function NotStringTypeError(key) {
        return _super.call(this, "Type of " + key + " property is not a string.") || this;
    }
    return NotStringTypeError;
}(Error));
exports.NotStringTypeError = NotStringTypeError;
//# sourceMappingURL=errors.js.map