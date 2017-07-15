"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.config();
var mongoose = require("mongoose");
var _ = require("lodash");
var chai_1 = require("chai");
var user_1 = require("./models/user");
var car_1 = require("./models/car");
var genders_1 = require("./enums/genders");
mongoose.Promise = Promise;
var MONGO_PORT = process.env.MONGO_PORT || 27017;
var connectionOptions = { useMongoClient: true };
var connect = function () {
    return new Promise(function (resolve, reject) {
        return mongoose.connect("mongodb://localhost:" + MONGO_PORT + "/typegoosetest", connectionOptions, function (err) {
            return err ? reject(err) : resolve();
        });
    });
};
var initDatabase = function () {
    return connect().then(function () { return mongoose.connection.db.dropDatabase(); });
};
describe('Typegoose', function () {
    before(function () { return initDatabase(); });
    it('should create a User with connections', function () { return __awaiter(_this, void 0, void 0, function () {
        var car, _a, trabant, zastava, user, foundUser, _b, janitor, manager, _c, foundTrabant, foundZastava, foundUser;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, car_1.model.create({
                        model: 'Tesla',
                    })];
                case 1:
                    car = _d.sent();
                    return [4 /*yield*/, car_1.model.create([{
                                model: 'Trabant',
                            }, {
                                model: 'Zastava',
                            }])];
                case 2:
                    _a = _d.sent(), trabant = _a[0], zastava = _a[1];
                    return [4 /*yield*/, user_1.model.create({
                            firstName: 'John',
                            lastName: 'Doe',
                            age: 20,
                            gender: genders_1.Genders.MALE,
                            job: {
                                title: 'Developer',
                                position: 'Lead',
                            },
                            car: car.id,
                            languages: ['english', 'typescript'],
                            previousJobs: [{
                                    title: 'Janitor',
                                }, {
                                    title: 'Manager',
                                }],
                            previousCars: [trabant.id, zastava.id],
                        })];
                case 3:
                    user = _d.sent();
                    return [4 /*yield*/, user_1.model
                            .findById(user.id)
                            .populate('car previousCars')
                            .exec()];
                case 4:
                    foundUser = _d.sent();
                    chai_1.expect(foundUser).to.have.property('nick', 'Nothing');
                    chai_1.expect(foundUser).to.have.property('firstName', 'John');
                    chai_1.expect(foundUser).to.have.property('lastName', 'Doe');
                    chai_1.expect(foundUser).to.have.property('age', 20);
                    chai_1.expect(foundUser).to.have.property('gender', genders_1.Genders.MALE);
                    chai_1.expect(foundUser).to.have.property('job');
                    chai_1.expect(foundUser).to.have.property('car');
                    chai_1.expect(foundUser).to.have.property('languages').to.have.length(2).to.include('english').to.include('typescript');
                    chai_1.expect(foundUser.job).to.have.property('title', 'Developer');
                    chai_1.expect(foundUser.job).to.have.property('position', 'Lead');
                    chai_1.expect(foundUser.job).to.have.property('startedAt').to.be.instanceof(Date);
                    chai_1.expect(foundUser.car).to.have.property('model', 'Tesla');
                    chai_1.expect(foundUser).to.have.property('previousJobs').to.have.length(2);
                    chai_1.expect(foundUser).to.have.property('fullName', 'John Doe');
                    _b = _.sortBy(foundUser.previousJobs, (function (job) { return job.title; })), janitor = _b[0], manager = _b[1];
                    chai_1.expect(janitor).to.have.property('title', 'Janitor');
                    chai_1.expect(manager).to.have.property('title', 'Manager');
                    chai_1.expect(foundUser).to.have.property('previousCars').to.have.length(2);
                    _c = _.sortBy(foundUser.previousCars, function (previousCar) { return previousCar.model; }), foundTrabant = _c[0], foundZastava = _c[1];
                    chai_1.expect(foundTrabant).to.have.property('model', 'Trabant');
                    chai_1.expect(foundTrabant).to.have.property('isSedan', true);
                    chai_1.expect(foundZastava).to.have.property('model', 'Zastava');
                    chai_1.expect(foundZastava).to.have.property('isSedan', undefined);
                    foundUser.fullName = 'Sherlock Holmes';
                    chai_1.expect(foundUser).to.have.property('firstName', 'Sherlock');
                    chai_1.expect(foundUser).to.have.property('lastName', 'Holmes');
                    return [4 /*yield*/, foundUser.incrementAge()];
                case 5:
                    _d.sent();
                    chai_1.expect(foundUser).to.have.property('age', 21);
                    return [4 /*yield*/, user_1.model.findByAge(21)];
                case 6:
                    foundUser = _d.sent();
                    chai_1.expect(foundUser).to.have.property('firstName', 'Sherlock');
                    chai_1.expect(foundUser).to.have.property('lastName', 'Holmes');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=index.test.js.map