const mongoose = require("mongoose");


const favoriteSchema = new mongoose.Schema({
    "user":{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    "tours":{
        type:[{ type: Schema.Types.ObjectId, ref: 'Tour' }],
    } 
},{
        timestamps:true
    }
)

module.exports = mongoose.model("Favorite", favoriteSchema);