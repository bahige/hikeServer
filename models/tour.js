const mongoose = require('mongoose');

const destination ={
    town : {type: String,required: true},
    district : {type: String,required: true},
    governorate : {type: String,required: true},
}

const hikingDetails = {
    hikingLevel : {type: Number, required: true, min: 0, max:10 },
    hikingDistance : {type: Number, required: true, min: 0 },
    uphillHeight : {type: Number, required: true, min: 0},
    downhillHeight : {type: Number, required: true, min: 0},
}

const inclusions ={
    includesTransportation: {type: Boolean, required: true, default: false},
    includesGuides: {type: Boolean, required: true, default: false},
    includesBreakfast: {type: Boolean, required: true, default: false},
    includesSnacks: {type: Boolean, required: true, default: false},
    includesInsurance: {type: Boolean, required: true, default: false},
}


const tourSchema = new mongoose.Schema({
    title : {type: String,required: true},
    profileImage : {type: String,required: true},
    destination: destination,
    tourType : {type: String,required: true},
    date : {type: Date,required: true},
    departureTime:{type: String, required: true},
    returningTime: {type: String, required: true},
    meetingPoint: {type:String, required: true},
    hikingDetails: hikingDetails,
    price : {type: Number, required: true, min: 0},
    inclusions: inclusions,
    tourOperator: {type: mongoose.Schema.Types.ObjectId, ref:"Tour Operator", required: true},
    hikers: [{type: mongoose.Schema.Types.ObjectId, ref:"User"}]
}, {
    timestamps: true
})

module.exports = mongoose.model("Tour", tourSchema);