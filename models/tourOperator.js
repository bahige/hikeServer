const mongoose = require('mongoose');

const tourOperatorSchema = new mongoose.Schema({
    name: {type: String, required:true},
    image: {type: String, required:true},
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    street : {type: String, required: true},
    city : {type: String, required: true},
    district : {type: String, required: true},
    governorate : {type: String, required: true},
    phoneNumber : {type: String, required: true},
    contactName : {type: String, required: true},

}, {
    timestamps: true
})

module.exports =mongoose.model("Tour Operator", tourOperatorSchema);