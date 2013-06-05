/**
 * Module dependencies.
 */
var mongoose;
mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Subdocuments @ http://mongoosejs.com/docs/subdocs.html

/* Sub Schema definitions */
var administratorSchemaName = Schema({
    isAdministrator: {type: Boolean}
});

/* Sub Schema definitions */
// Joins @ http://mongoosejs.com/docs/populate.html
var customerSchemaName = Schema({
    products: [
        {type: Schema.Types.ObjectId, ref: 'Product'}
    ],
    transactions: [
        {type: Schema.Types.ObjectId, ref: 'Transaction'}
    ]

});


/* Schema definitions */
var schemaName = Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String, required: false},
    customers: [customerSchemaName],
    administrators: [administratorSchemaName],
    modificationDate: {type: Date, "default": Date.now}
});

/* Custom server side validators
 * @see http://mongoosejs.com/docs/api.html#document_Document-validate
 * @see http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate
 * @see http://mongoosejs.com/docs/2.7.x/docs/validation.html
 * */
//schemaName.path('name').validate(function (val) {
//    return val.length < 8;
//}, 'Invalid name');

//schemaName.path('email').validate(function (val) {
//    var regexObj = /^06-\d{8}$/;
//    return val.regexObj;
//}, 'Invalid email');


/*
 If collectionName is absent as third argument, than the modelName should always end with an -s.
 Mongoose pluralizes the model name. (This is not documented)
 */
var modelName = "Relation";
var collectionName = "relations"; // Naming convention is plural.
mongoose.model(modelName, schemaName, collectionName);

