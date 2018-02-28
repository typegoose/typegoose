/*!
 * Mongoose findOrCreate Plugin
 * Copyright(c) 2012 Nicholas Penree <nick@penree.com>
 * MIT Licensed
 */

// Inlined mongoose-findorcreat until this fixed is merged: https://github.com/drudge/mongoose-findorcreate/pull/18
/* tslint:disable */
function findOrCreatePlugin(schema, options) {
    schema.statics.findOrCreate = function findOrCreate(conditions, doc, options, callback) {
        var self = this;
        var Promise = self.base.Promise.ES6 ? self.base.Promise.ES6 : self.base.Promise;
        if (arguments.length < 4) {
            if (typeof options === 'function') {
                // Scenario: findOrCreate(conditions, doc, callback)
                callback = options;
                options = {};
            } else if (typeof doc === 'function') {
                // Scenario: findOrCreate(conditions, callback);
                callback = doc;
                doc = {};
                options = {};
            } else {
                // Scenario: findOrCreate(conditions[, doc[, options]])
                return new Promise(function (resolve, reject) {
                    self.findOrCreate(conditions, doc, options, function (ex, result, created) {
                        if (ex) {
                            reject(ex);
                        } else {
                            resolve({
                                doc: result,
                                created: created,
                            });
                        }
                    });
                });
            }
        }
        this.findOne(conditions, function (err, result) {
            if (err || result) {
                if (options && options.upsert && !err) {
                    self.update(conditions, doc, function (err, count) {
                        self.findById(result._id, function (err, result) {
                            callback(err, result, false);
                        });
                    });
                } else {
                    callback(err, result, false);
                }
            } else {
                for (var key in doc) {
                    conditions[key] = doc[key];
                }

                // If the value contain `$` remove the key value pair
                var keys = Object.keys(conditions);

                for (var z = 0; z < keys.length; z++) {
                    var value = JSON.stringify(conditions[keys[z]]);
                    if (value && value.indexOf('$') !== -1) {
                        delete conditions[keys[z]];
                    }
                }

                var obj = new self(conditions);
                obj.save(function (err) {
                    callback(err, obj, true);
                });
            }
        });
    };
}

/**
 * Expose `findOrCreatePlugin`.
 */

module.exports = findOrCreatePlugin;