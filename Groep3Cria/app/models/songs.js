var mongoose;
mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Schema definitions */
var schemaName = Schema({
    comments:[
        {
            UserID: {type: Schema.Types.ObjectId, ref: 'User'},
            comment:String
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
    name:String,
    ratings:[
        {
            UserID: {type: Schema.Types.ObjectId, ref: 'User'},
            rating:String
        }
    ],
    speed:Number,
    volume:Number,
    author:{type:Schema.Types.ObjectId, ref:'User'},
    based_on:{type:Schema.Types.ObjectId, ref:'Song'}
});

var modelName = "Song";
var collectionName = "songs"; // Naming convention is plural.
mongoose.model(modelName, schemaName, collectionName);

