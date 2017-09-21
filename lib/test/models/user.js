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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var findOrCreate = require("mongoose-findorcreate");
var job_1 = require("./job");
var car_1 = require("./car");
var genders_1 = require("../enums/genders");
var role_1 = require("../enums/role");
var typegoose_1 = require("../../typegoose");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User_1 = User;
    Object.defineProperty(User.prototype, "fullName", {
        get: function () {
            return this.firstName + " " + this.lastName;
        },
        set: function (full) {
            var split = full.split(' ');
            this.firstName = split[0];
            this.lastName = split[1];
        },
        enumerable: true,
        configurable: true
    });
    User.findByAge = function (age) {
        return this.findOne({ age: age });
    };
    User.prototype.incrementAge = function () {
        var age = this.age || 1;
        this.age = age + 1;
        return this.save();
    };
    User.prototype.addLanguage = function () {
        this.languages.push('Hungarian');
        return this.save();
    };
    User.prototype.addJob = function (job) {
        if (job === void 0) { job = {}; }
        this.previousJobs.push(job);
        return this.save();
    };
    __decorate([
        typegoose_1.prop({ required: true }),
        __metadata("design:type", String)
    ], User.prototype, "firstName", void 0);
    __decorate([
        typegoose_1.prop({ required: true }),
        __metadata("design:type", String)
    ], User.prototype, "lastName", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], User.prototype, "fullName", null);
    __decorate([
        typegoose_1.prop({ default: 'Nothing' }),
        __metadata("design:type", String)
    ], User.prototype, "nick", void 0);
    __decorate([
        typegoose_1.prop({ index: true, unique: true }),
        __metadata("design:type", String)
    ], User.prototype, "uniqueId", void 0);
    __decorate([
        typegoose_1.prop({ min: 10, max: 21 }),
        __metadata("design:type", Number)
    ], User.prototype, "age", void 0);
    __decorate([
        typegoose_1.prop({ enum: _.values(genders_1.Genders), required: true }),
        __metadata("design:type", String)
    ], User.prototype, "gender", void 0);
    __decorate([
        typegoose_1.prop({ enum: role_1.Role }),
        __metadata("design:type", String)
    ], User.prototype, "role", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", job_1.Job)
    ], User.prototype, "job", void 0);
    __decorate([
        typegoose_1.prop({ ref: car_1.Car }),
        __metadata("design:type", Object)
    ], User.prototype, "car", void 0);
    __decorate([
        typegoose_1.arrayProp({ items: String, required: true }),
        __metadata("design:type", Array)
    ], User.prototype, "languages", void 0);
    __decorate([
        typegoose_1.arrayProp({ items: job_1.Job }),
        __metadata("design:type", Array)
    ], User.prototype, "previousJobs", void 0);
    __decorate([
        typegoose_1.arrayProp({ itemsRef: car_1.Car }),
        __metadata("design:type", Array)
    ], User.prototype, "previousCars", void 0);
    __decorate([
        typegoose_1.instanceMethod,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], User.prototype, "incrementAge", null);
    __decorate([
        typegoose_1.instanceMethod,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], User.prototype, "addLanguage", null);
    __decorate([
        typegoose_1.instanceMethod,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], User.prototype, "addJob", null);
    __decorate([
        typegoose_1.staticMethod,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], User, "findByAge", null);
    User = User_1 = __decorate([
        typegoose_1.plugin(findOrCreate)
    ], User);
    return User;
    var User_1;
}(typegoose_1.Typegoose));
exports.User = User;
exports.model = new User().getModelForClass(User);
//# sourceMappingURL=user.js.map