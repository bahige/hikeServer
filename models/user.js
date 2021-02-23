const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    email: {type:String, required: true},
    password : {type: String,required: true},
    firstName : {type: String,required: true},
    lastName : {type: String,required: true},
    age : {type: Number,required: true, min:18},
    isAdmin: {type: Boolean, required: true, default: false}
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema);