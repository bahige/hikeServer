const mongoose = require ('mongoose');


const userSchema = new mongoose.Schema({
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    firstName : {type: String,required: true},
    lastName : {type: String,required: true},
    age : {type: Number,required: true, min:18},
    gender : {type: String,required: true},
    isAdmin: {type: Boolean, required: true, default: false},
    // tours: [{type: mongoose.Schema.Types.ObjectId, ref:"Tour"}]
}, {
    timestamps: true
})


module.exports = mongoose.model("User", userSchema);