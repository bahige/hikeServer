const mongoose = require('mongoose');


const tourSchema = new mongoose.Schema({
    title : {type: String,required: true},
    profileImage : {type: String,required: true},
    destination : {type: String,required: true},
    district : {type: String,required: true},
    governorate : {type: String,required: true},
    tourType : {type: String,required: true},
    date : {type: Date,required: true},
    departureTime:{type: String, required: true},
    returningTime: {type: String, required: true},
    meetingPoint: {type:String, required: true},
    hikingLevel : {type: Number, required: true, min: 0, max:10 },
    hikingDistance : {type: Number, required: true, min: 0, default:0 },
    uphillHeight : {type: Number, required: true, min: 0, default:0},
    downhillHeight : {type: Number, required: true, min: 0, default:0},    
    price : {type: Number, required: true, min: 0, default: 0},
    includesGuides: {type: Boolean, default: false},
    includesBreakfast: {type: Boolean, default: false},
    includesSnacks: {type: Boolean, default: false},
    includesInsurance: {type: Boolean, default: false},
    tourOperator: {type: mongoose.Schema.Types.ObjectId, ref:"Tour Operator"},
    //required: true

    hikers: [{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
    distanceFromDeparturePoint : {type: Number, required: true, min: 0, default:0},    
    heightAboveSeaLevel : {type: Number, required: true, min: 0, default:0},
    meetingVenueLink: {type:String},
    isFamilyFriendly: {type: Boolean, required: true, default: false},
    priceForMinors : {type: Number, required: true, min: 0, default: 0},
    priceForUnivStudents : {type: Number, required: true, min: 0, default: 0},
    priceForGroups : {type: Number, required: true, min: 0, default: 0},
    priceNoTransp : {type: Number, required: true, min: 0, default: 0},
    includesSnowshoes: {type: Boolean, default: false},
    description:{type: String, required: true},
    rules:{type: String},
    whatToBring:{type: String},
    paymentTerms:{type: String},
}, 
{
    timestamps: true
})

module.exports = mongoose.model("Tour", tourSchema);

//Sort the tours according to:
// destination
//district
//governorate
//date (ascending order)
//hiking level