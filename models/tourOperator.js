const mongoose = require('mongoose');

const tourOperatorSchema = new mongoose.Schema({
    name: {type: String, required:true},
    email : {type: String, required: true},
    password : {type: String, required: true},
    address : {type: String, required: true},
    phoneNumber : {type: String, required: true},
    ceoName : {type: String, required: true},

}, {
    timestamps: true
})

module.exports =mongoose.model("Tour Operator", tourOperatorSchema);