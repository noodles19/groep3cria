var mongoose = require('mongoose')
    , Transaction = mongoose.model('Transaction')
    , Relation = mongoose.model('Relation')
    , Car = mongoose.model('Car')
    , passwordHash = require('password-hash');


// CREATE


// save @ http://mongoosejs.com/docs/api.html#model_Model-save
function saveTransaction(transaction, cb) {
    var doc;

    doc = new Transaction(transaction);
    doc.save(function (err) {
        var retObj = {
            meta: {"action": "create transaction", 'timestamp': new Date()},
            doc: doc,
            err: err
        };
        console.log(retObj);
        return cb.send(retObj);
    });


}


function updateRelation(relationId, phone, transaction, cb) {
    var conditions, update, options, callback;

    conditions = {_id: relationId}
        , update = {phone: phone}
        , options = null
        , callback = function (err, doc) {
        console.log('updateRelation');
        console.log('err', err);
        console.log('doc', doc);
        saveTransaction(transaction, cb);
    };

    console.log('Updating...');
    console.log('conditions: ', conditions);
    console.log('update: ', update);
    Relation
        .findOneAndUpdate(conditions, update, options, callback);


}

function findOrCreateUser(name, transaction, phone, cb) {
    var conditions, fields, options;

    conditions = {name: name}
        , fields = {}
        , options = {'createdAt': -1};

    Relation
        .find(conditions, fields, options)
        .exec(function (err, doc) {
            if (doc.length === 0) {
                doc = new Relation({
                    name: name,
                    email: name.replace(/[\W|\s]/g, '').toLowerCase() + "@tezzt.nl",
                    phone: phone,
                    password: passwordHash.generate("admin")
                })
                doc.save(function (err) {
                    // Add property _relation to transaction
                    transaction._relation = doc._id;
                    // Save transaction
                    saveTransaction(transaction, cb);
                });
            } else {
                // Add property _relation to transaction
                transaction._relation = doc[0]._id;
                // Update relation with phonenumber
                updateRelation(doc[0]._id, phone, transaction, cb);
            }
        })
}


exports.create = function (req, res) {
    var name, phone, transaction;

    name = req.body.name;
    phone = req.body.phone;

    transaction = {
        _car: req.body.carId,
        bid: parseFloat(req.body.bid || 0)
    };
    findOrCreateUser(name, transaction, phone, res);
}

// RETRIEVE
// find @ http://mongoosejs.com/docs/api.html#model_Model.find
exports.list = function (req, res) {
    var conditions, fields, options;

    conditions = {};
    fields = {};
    options = {'createdAt': -1};

    Transaction
        .find(conditions, fields, options)
        .populate("_car _relation")
        .exec(function (err, doc) {
            var retObj = {
                meta: {"action": "list", 'timestamp': new Date()},
                doc: doc,
                err: err
            };
            return res.send(retObj);
        })
}


exports.detail = function (req, res) {
    var conditions, fields, options;

    console.log(req.params.id);

    conditions = {_id: req.params.id}
        , fields = {}
        , options = {'createdAt': -1};

    Transaction
        .findOne(conditions, fields, options)
        .populate("_relation")
        //.sort({'createdAt': -1})// sort by date
        .exec(function (err, doc) {
            //if (err) return handleError(err);
            console.log('vvvvvvvvvvvvvvvv detail');
            console.log(doc);
            console.log('^^^^^^^^^^^^^^^^ detail');


            var retObj = {
                meta: {"action": "detail", 'timestamp': new Date()},
                doc: doc,
                err: err
            };
            return res.send(retObj);
        })
}

exports.bidsPerCar = function (req, res) {
    var retObj;

    var o = {};
    o.map = function () {
        emit(this._car, 1);
    };
    o.reduce = function (_car, bids) {
        var result = 0;
        bids.forEach(function (bid) {
            result += bid;
        });
        return result;
    };
    o.out = {replace: "bidsPerCar"};
    o.verbose = true;
    o.query = {};
    Transaction
        .mapReduce(o, function (err, model, stats) {
            model
                .find()
                .populate({path: "_id", model: "Car"})
                .sort({bid: -1})
                .exec(function (err, doc) {
                    retObj = {
                        meta: {"action": "counts total records in collection", 'timestamp': new Date(), stats: stats },
                        doc: doc,
                        err: err
                    };
                    return res.send(retObj);
                });
        }
    );
}

exports.bidsPerMonth = function (req, res) {
    var retObj;

    var o = {};
    o.map = function () {
        emit(parseInt(this.modificationDate.getMonth(), 10) + 1, 1);
    };
    o.reduce = function (dates, bids) {
        var result = 0;
        bids.forEach(function (bid) {
            result += 1;
        });
        return result;
    };
    o.out = {replace: "bidsPerMonth"};
    o.verbose = true;
    o.query = {    };
    Transaction
        .mapReduce(o, function (err, model, stats) {
            model
                .find()
                .exec(function (err, doc) {
                    retObj = {
                        meta: {"action": "counts total records in collection", 'timestamp': new Date(), stats: stats },
                        doc: doc,
                        err: err
                    };
                    return res.send(retObj);
                });
        }
    );
}

// UPDATE
// findOneAndUpdate @ http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
exports.update = function (req, res) {

    var conditions =
        {email: req.params.email}
        , update = {
            name: req.body.name}
        , options = { multi: true }
        , callback = function (err, doc) {
            var retObj = {
                meta: {"action": "update", 'timestamp': new Date()},
                doc: doc,
                err: err
            };
            return res.send(retObj);
        }

    Transaction.findOneAndUpdate(conditions, update, options, callback);
}

// DELETE
// remove @ http://mongoosejs.com/docs/api.html#model_Model-remove
exports.delete = function (req, res) {
    var conditions, callback;

    conditions = {_id: req.params.id}
        , callback = function (err, doc) {
        var retObj = {
            meta: {"action": "delete", 'timestamp': new Date()},
            doc: doc,
            err: err
        };
        return res.send(retObj);
    }

    Transaction.remove(conditions, callback);
}