var mongoose = require('mongoose')
    , PrivateMessage = mongoose.model('PrivateMessage')
    , passwordHash = require('password-hash');


// CREATE MESSAGE
// save @ http://mongoosejs.com/docs/api.html#model_Model-save
exports.create = function (req, res) {

    console.log("and there was a new message");
    console.log(req.body.sender);
    console.log(req.body.receiver);
    console.log(req.body.title);
    console.log(req.body.text);

    var doc = new PrivateMessage(req.body);

    doc.save(function (err) {
        var retObj = {
            meta: {"action": "create", 'timestamp': new Date()},
            doc: doc,
            err: err
        };
        return res.send(retObj);
    });
}

// RETRIEVE MESSAGES BASED ON RECEIVER ID
// find @ http://mongoosejs.com/docs/api.html#model_Model.find
exports.list = function (req, res) {
    var conditions, fields, options;

    console.log('list message');

    conditions = {
        receiver: req.params.receiverid
    };
    fields = {};
    options = {};

    PrivateMessage
        .find(conditions, fields, options)
        .exec(function (err, doc) {
            var retObj = {
                privatemessages: doc
            };

            return res.send(retObj);
        })
}

//RETRIEVE A SINGLE MESSAGE
exports.listSingleMessage = function (req, res) {
    var conditions, fields, options;

    console.log('list a single message');
    conditions = {
        _id: req.params.id
    };
    fields = {};
    options = {};

    PrivateMessage
        .findOne(conditions, fields, options)
        .populate('sender receiver')
        .exec(function (err, doc) {
            var retObj = {
                privatemessages: doc
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
    PrivateMessage.findOneAndUpdate(conditions, update, options, callback);
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
    PrivateMessage.remove(conditions, callback);
}