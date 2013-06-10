/**
 * Module dependencies.
 */
var mongoose;

mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Joins, @see http://mongoosejs.com/docs/populate.html

/* Schema definitions */
var schemaName = Schema({
    _relation: {type: Schema.Types.ObjectId, ref: 'Relation'},
    _car: {type: Schema.Types.ObjectId, ref: 'Car'},
    bid: {type: Number, required: true},
    modificationDate: {type: Date, "default": Date.now}
});

// Combined unique index on _relation and _product. A user can only do one bid on a car.
schemaName.index({_relation: 1, _product: 1}, {unique: true});

/*
 If collectionName is absent as third argument, than the modelName should always end with an -s.
 Mongoose pluralizes the model name. (This is not documented)
 */
var modelName = "Transaction";
var collectionName = "transactions"; // Naming convention is plural.
mongoose.model(modelName, schemaName, collectionName);