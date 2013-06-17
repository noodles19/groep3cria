var mongoose;
mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Schema definitions */
var schemaName = Schema({
    sender: {type:Schema.Types.ObjectId, ref:'User'},
    receiver: {type:Schema.Types.ObjectId, ref:'User'},
    title: String,
    text: String
});

var modelName = "PrivateMessage";
var collectionName = "privatemessages"; // Naming convention is plural.
mongoose.model(modelName, schemaName, collectionName);

