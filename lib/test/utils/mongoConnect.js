"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.config();
var mongoose = require("mongoose");
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
exports.initDatabase = function () {
    return connect().then(function () { return mongoose.connection.db.dropDatabase(); });
};
//# sourceMappingURL=mongoConnect.js.map