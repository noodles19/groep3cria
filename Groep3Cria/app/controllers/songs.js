var mongoose = require('mongoose')
    , Song = mongoose.model('Song')
    , passwordHash = require('password-hash');


// CREATE
// save @ http://mongoosejs.com/docs/api.html#model_Model-save
exports.create = function (req, res) {
    console.log('and there was a new song');
    console.log(req.body);

    var doc = new Song(req.body);

    doc.save(function (err) {
        var retObj = {
            meta: {"action": "create", 'timestamp': new Date()},
            doc: doc,
            err: err
        };
        console.log(retObj.err);
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
        .populate('comments.UserID ratings.UserID author')
        .exec(function (err, doc) {
            var retObj = {
                songs: doc
            };

            return res.send(retObj);
        })
}

exports.listSingleSong = function (req, res) {
    var conditions, fields, options;

    console.log('list a single song');
    console.log(req.params.id);
    conditions = {
        _id: req.params.id
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
    var ObjectId = require('mongoose').Types.ObjectId;
    console.log("Saving song");

    console.log("Object");

    console.log(req.body.song._id);
    console.log(JSON.parse(req.body.song)._id);
    var condition = {_id: new ObjectId(JSON.parse(req.body.song)._id)};
    var replace = {
        instruments: JSON.parse(req.body.song).instruments,
        name: JSON.parse(req.body.song).name,
        author: JSON.parse(req.body.song).author,
        speed: JSON.parse(req.body.song).volume,
        volume: JSON.parse(req.body.song).speed,
        based_on: JSON.parse(req.body.song).based_on
    };

    var callback = function (err, doc) {
            var retObj = {
                err: err,
                doc: doc
            };
            return res.send(retObj);
        }
    Song.findOneAndUpdate(condition, replace, callback);
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