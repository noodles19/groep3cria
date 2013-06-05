var mongoose;
mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Schema definitions */
var schemaName = Schema({
    displayName: {type: String, required: true},
    loginName: {type: String, required: false, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    modificationDate: {type: Date, "default": Date.now}
});

var modelName = "User";
var collectionName = "users"; // Naming convention is plural.
mongoose.model(modelName, schemaName, collectionName);

