var mongoose = require('mongoose')
    , User = mongoose.model('User')
    , passwordHash = require('password-hash');


// CREATE
// save @ http://mongoosejs.com/docs/api.html#model_Model-save
exports.create = function (req, res) {

    // Encrypt password
    console.log('req.body.password ', req.body)
    req.body.password = passwordHash.generate(req.body.password || "admin");
    console.log('CREATE USER');
    console.log(req.body);

    var doc = new User(req.body);

    doc.save(function (err) {
        var retObj = {
            meta: {"action": "create", 'timestamp': new Date()},
            doc: doc,
            err: err
        };
        return res.send(retObj);
    });

}

// RETRIEVE
// find @ http://mongoosejs.com/docs/api.html#model_Model.find
exports.list = function (req, res) {
    var conditions, fields, options;

    console.log('list users');

    conditions = {};
    fields = {};
    options = {'createdAt': -1};

    User
        .find(conditions, fields, options)
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

    conditions = {}// example: {displayName:req.body.displayName}
        , fields = {}
        , options = {'createdAt': -1};

    User
        .find(conditions, fields, options)
        //.sort({'createdAt': -1})// sort by date
        .exec(function (err, doc) {
            console.log(doc);

            var retObj = {
                meta: {"action": "detail", 'timestamp': new Date()},
                doc: doc,
                err: err
            };
            return res.send(retObj);
        })
}

exports.login = function (req, res) {
    var conditions, fields, options;

    conditions = {
        loginName: req.body.name
    }
        , fields = {}
        , options = {'createdAt': -1};


    User
        .find(conditions, fields, options)
        .exec(function (err, doc) {
            var retObj = {

                meta: {"action": "login", 'timestamp': new Date(), conditions:conditions},
                doc: {"isVerified":doc.length != 0},
                err: err
            };
            return res.send(retObj);
        })
}

// UPDATE
// findOneAndUpdate @ http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
exports.update = function (req, res) {

    var conditions =
        {email: req.params.email}
        , update = {
            loginName: req.body.loginName}
        , options = { multi: true }
        , callback = function (err, doc) {
            var retObj = {
                meta: {"action": "update", 'timestamp': new Date()},
                doc: doc,
                err: err
            };
            return res.send(retObj);
        }

    User.findOneAndUpdate(conditions, update, options, callback);
}

// DELETE
// remove @ http://mongoosejs.com/docs/api.html#model_Model-remove
exports.delete = function (req, res) {
    var conditions, callback, retObj;

    conditions = {_id: req.params.id}
        , callback = function (err, doc) {
        retObj = {
            meta: {"action": "delete", 'timestamp': new Date()},
            doc: doc,
            err: err
        };
        return res.send(retObj);
    }

    User.remove(conditions, callback);
}