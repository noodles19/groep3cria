var mongoose;
mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Schema definitions */
var schemaName = Schema({
    name:String,
    speed:Number,
    ratings:[
        {
            UserID: {type: Schema.Types.ObjectId, ref: 'User'},
            rating:String
        }
    ],
    instruments:
        [
            {
                instrumenttype:String,
                notes:[
                    {pitch:Number, position:Number, duration:Number, volume:Number}
                ]
            }
        ],

    comments:[
        {
            UserID: {type: Schema.Types.ObjectId, ref: 'User'},
            comment:String
        }
    ],
    based_on:{type:Schema.Types.ObjectId, ref:'Song'},
    author:{type:Schema.Types.ObjectId, ref:'User'},
    volume:Number
});

var modelName = "Song";
var collectionName = "songs"; // Naming convention is plural.
mongoose.model(modelName, schemaName, collectionName);

