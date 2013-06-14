var mongoose = require('mongoose')
    , Song = mongoose.model('Song')
    , passwordHash = require('password-hash');


// CREATE SONG
// save @ http://mongoosejs.com/docs/api.html#model_Model-save
exports.create = function (req, res) {

    console.log("and there was a new song");
    console.log(req.body.name);
    console.log(req.body.speed);

    var doc = new Song(req.body);

    doc.based_on = null;
    doc.volume = 100;

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

    console.log('list songs');

    conditions = {
    };
    fields = {};
    options = {};

    Song
        .find(conditions, fields, options)
        .exec(function (err, doc) {
            var retObj = {
                songs: doc
            };

            return res.send(retObj);
        })
}

//RETRIEVE A SINGLE SONG
exports.listSingleSong = function (req, res) {
    console.log("Do we get in here at all?");

    var conditions, fields, options;

    console.log('list a single song');
    console.log(req.params.name);
    conditions = {
        name: req.params.name
    };
    fields = {};
    options = {};

    Song
        .findOne(conditions, fields, options)
        .populate('based_on comments.UserID ratings.UserID author')
        .exec(function (err, doc) {
            var retObj = {
                songs: doc
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

    Song.findOneAndUpdate(conditions, update, options, callback);
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

    Song.remove(conditions, callback);
}