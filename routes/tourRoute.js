const express = require('express');
const router = express.Router();

const Tour = require("../models/tour");
const User = require("../models/user");

const {isOperatorAuth} = require("../middleware/authenticateTourOperator");
const {isAuth, isAdmin} = require('../middleware/authenticateUser');

/////////////////////////////////////////////Deleting tour by Tour Operator/////////////////////////////////////////////

router.delete('/tourOrg/:id', isOperatorAuth, async (req,res)=>{
    try{
        const deletedTour = await Tour.findById(req.params.id);
        if(deletedTour){
            await deletedTour.remove();
            res.send({message: "Tour Deleted."})
        } else {
            res.send("Tour does not exist.")
        }
    } catch(err){
        return res.status(500).json({message: err.message})
    }
});

/////////////////////////////////////////////Deleting tour by Admin/////////////////////////////////////////////

router.delete('/:id', isAuth, isAdmin, async (req,res)=>{
    try{
        const deletedTour = await Tour.findById(req.params.id);
        if(deletedTour){
            await deletedTour.remove();
            res.send({message: "Tour Deleted."})
        } else {
            res.send("Tour does not exist.")
        }
    } catch(err){
        return res.status(500).json({message: err.message})
    }
});

///////////////////////////////////////////// Posting One Tour By Tour Operator /////////////////////////////////////////////

router.post("/", isOperatorAuth, async (req, res)=>{
    const tour = new Tour({
        title : req.body.title,
        profileImage : req.body.profileImage,
        destination: req.body.destination,
        district: req.body.district,
        governorate: req.body.governorate,
        tourType : req.body.tourType,
        date : req.body.date,
        departureTime:req.body.departureTime,
        returningTime: req.body.returningTime,
        meetingPoint: req.body.meetingPoint,
        hikingLevel: req.body.hikingLevel,
        hikingDistance: req.body.hikingDistance,
        uphillHeight: req.body.uphillHeight,
        downhillHeight: req.body.downhillHeight,
        price : req.body.price,
        includesGuides: req.body.includesGuides,
        includesBreakfast: req.body.includesBreakfast,
        includesSnacks: req.body.includesSnacks,
        includesInsurance: req.body.includesInsurance,
        tourOperator: req.tourOperator._id,
        distanceFromDeparturePoint : req.body.distanceFromDeparturePoint,    
        heightAboveSeaLevel : req.body.heightAboveSeaLevel,
        meetingVenueLink: req.body.meetingVenueLink,
        isFamilyFriendly: req.body.isFamilyFriendly,
        priceForMinors : req.body.priceForMinors,
        priceForUnivStudents : req.body.priceForUnivStudents,
        priceForGroups : req.body.priceForGroups,
        priceNoTransp : req.body.priceNoTransp,
        includesSnowshoes: req.body.includesSnowshoes,
        description:req.body.description,
        rules:req.body.rules,
        whatToBring:req.body.whatToBring,
        paymentTerms:req.body.paymentTerms,
        tourOperator: req.tourOperator._id
    })

    try{
        const newTour =await tour.save();
        res.status(201).send(newTour);
    }catch(err){
        res.status(400).send({ message: err.message });
    }
})


/////////////////////////////////////////////Posting One Tour By Admin /////////////////////////////////////////////

router.post("/", isAuth, isAdmin, async (req, res)=>{
    const tour = new Tour({
        title : req.body.title,
        profileImage : req.body.profileImage,
        destination: req.body.destination,
        district: req.body.district,
        governorate: req.body.governorate,
        tourType : req.body.tourType,
        date : req.body.date,
        departureTime:req.body.departureTime,
        returningTime: req.body.returningTime,
        meetingPoint: req.body.meetingPoint,
        hikingLevel: req.body.hikingLevel,
        hikingDistance: req.body.hikingDistance,
        uphillHeight: req.body.uphillHeight,
        downhillHeight: req.body.downhillHeight,
        price : req.body.price,
        includesGuides: req.body.includesGuides,
        includesBreakfast: req.body.includesBreakfast,
        includesSnacks: req.body.includesSnacks,
        includesInsurance: req.body.includesInsurance,
        tourOperator: req.tourOperator._id,
        distanceFromDeparturePoint : req.body.distanceFromDeparturePoint,    
        heightAboveSeaLevel : req.body.heightAboveSeaLevel,
        meetingVenueLink: req.body.meetingVenueLink,
        isFamilyFriendly: req.body.isFamilyFriendly,
        priceForMinors : req.body.priceForMinors,
        priceForUnivStudents : req.body.priceForUnivStudents,
        priceForGroups : req.body.priceForGroups,
        priceNoTransp : req.body.priceNoTransp,
        includesSnowshoes: req.body.includesSnowshoes,
        description:req.body.description,
        rules:req.body.rules,
        whatToBring:req.body.whatToBring,
        paymentTerms:req.body.paymentTerms,
    })

    try{
        const newTour =await tour.save();
        res.status(201).send(newTour);
    }catch(err){
        res.status(400).send({ message: err.message });
    }
})

///////////////////////////////////////////// Updating A Tour By Tour Operator /////////////////////////////////////////////

router.patch('/:id', isOperatorAuth, async (req,res) => {
    const tourId = req.params.id;
    const tour= await Tour.findById(tourId);
    if(tour){
        tour.title = req.body.title || tour.title;
        tour.profileImage = req.body.profileImage || tour.profileImage;
        tour.destination= req.body.destination || tour.destination;
        tour.district= req.body.district || tour.district;
        tour.governorate= req.body.governorate || tour.governorate;
        tour.tourType = req.body.tourType || tour.tourType;
        tour.date = req.body.date || tour.date;
        tour.departureTime=req.body.departureTime || tour.departureTime;
        tour.returningTime= req.body.returningTime || tour.returningTime;
        tour.meetingPoint= req.body.meetingPoint || tour.meetingPoint;
        tour.hikingLevel= req.body.hikingLevel || tour.hikingLevel;
        tour.hikingDistance= req.body.hikingDistance || tour.hikingDistance;
        tour.uphillHeight= req.body.uphillHeight || tour.uphillHeight;
        tour.downhillHeight= req.body.downhillHeight || tour.downhillHeight;
        tour.price = req.body.price || tour.price;
        tour.includesGuides = req.body.includesGuides || tour.includesGuides;
        tour.includesBreakfast = req.body.includesBreakfast || tour.includesBreakfast;
        tour.includesSnacks = req.body.includesSnacks || tour.includesSnacks;
        tour.includesInsurance = req.body.includesInsurance || tour.includesInsurance;

        tour.distanceFromDeparturePoint = req.body.distanceFromDeparturePoint || tour.distanceFromDeparturePoint;    
        tour.heightAboveSeaLevel = req.body.heightAboveSeaLevel || tour.heightAboveSeaLevel;
        tour.meetingVenueLink= req.body.meetingVenueLink || tour.meetingVenueLink;
        tour.isFamilyFriendly= req.body.isFamilyFriendly || tour.isFamilyFriendly;
        tour.priceForMinors = req.body.priceForMinors || tour.priceForMinors;
        tour.priceForUnivStudents = req.body.priceForUnivStudents || tour.priceForUnivStudents;
        tour.priceForGroups = req.body.priceForGroups || tour.priceForGroups;
        tour.priceNoTransp = req.body.priceNoTransp || tour.priceNoTransp;
        tour.includesSnowshoes= req.body.includesSnowshoes || tour.includesSnowshoes;
        tour.description=req.body.description || tour.description;
        tour.rules=req.body.rules || tour.rules;
        tour.whatToBring=req.body.whatToBring || tour.whatToBring;
        tour.paymentTerms=req.body.paymentTerms || tour.paymentTerms;
        
      

        const updatedTour = await tour.save();
    
        res.send({
            title : updatedTour.title,
            profileImage : updatedTour.profileImage,
            destination: updatedTour.destination,
            district: updatedTour.district,
            governorate: updatedTour.governorate,
            tourType : updatedTour.tourType,
            date : updatedTour.date,
            departureTime:updatedTour.departureTime,
            returningTime: updatedTour.returningTime,
            meetingPoint: updatedTour.meetingPoint,
            hikingLevel: updatedTour.hikingLevel,
            hikingDistance: updatedTour.hikingDistance,
            uphillHeight: updatedTour.uphillHeight,
            downhillHeight: updatedTour.downhillHeight,
            price : updatedTour.price,
            includesGuides: updatedTour.includesGuides,
            includesBreakfast: updatedTour.includesBreakfast,
            includesSnacks: updatedTour.includesSnacks,
            includesInsurance: updatedTour.includesInsurance,

            distanceFromDeparturePoint : updatedTour.distanceFromDeparturePoint,    
            heightAboveSeaLevel : updatedTour.heightAboveSeaLevel,
            meetingVenueLink: updatedTour.meetingVenueLink,
            isFamilyFriendly: updatedTour.isFamilyFriendly,
            priceForMinors : updatedTour.priceForMinors,
            priceForUnivStudents : updatedTour.priceForUnivStudents,
            priceForGroups : updatedTour.priceForGroups,
            priceNoTransp : updatedTour.priceNoTransp,
            includesSnowshoes: updatedTour.includesSnowshoes,
            description:updatedTour.description,
            rules:updatedTour.rules,
            whatToBring:updatedTour.whatToBring,
            paymentTerms:updatedTour.paymentTerms,
    }) 
    } else {
        res.status(404).send({message:"Tour Not Found"})
    }
})


///////////////////////////////////////////// Updating A Tour By Tour Operator /////////////////////////////////////////////

router.patch('/:id/adminTours', isAuth, isAdmin, async (req,res) => {
    const tourId = req.params.id;
    const tour= await Tour.findById(tourId);
    if(tour){
        tour.title = req.body.title || tour.title;
        tour.profileImage = req.body.profileImage || tour.profileImage;
        tour.destination= req.body.destination || tour.destination;
        tour.district= req.body.district || tour.district;
        tour.governorate= req.body.governorate || tour.governorate;
        tour.tourType = req.body.tourType || tour.tourType;
        tour.date = req.body.date || tour.date;
        tour.departureTime=req.body.departureTime || tour.departureTime;
        tour.returningTime= req.body.returningTime || tour.returningTime;
        tour.meetingPoint= req.body.meetingPoint || tour.meetingPoint;
        tour.hikingLevel= req.body.hikingLevel || tour.hikingLevel;
        tour.hikingDistance= req.body.hikingDistance || tour.hikingDistance;
        tour.uphillHeight= req.body.uphillHeight || tour.uphillHeight;
        tour.downhillHeight= req.body.downhillHeight || tour.downhillHeight;
        tour.price = req.body.price || tour.price;
        tour.includesGuides = req.body.includesGuides || tour.includesGuides;
        tour.includesBreakfast = req.body.includesBreakfast || tour.includesBreakfast;
        tour.includesSnacks = req.body.includesSnacks || tour.includesSnacks;
        tour.includesInsurance = req.body.includesInsurance || tour.includesInsurance;

        tour.distanceFromDeparturePoint = req.body.distanceFromDeparturePoint || tour.distanceFromDeparturePoint;    
        tour.heightAboveSeaLevel = req.body.heightAboveSeaLevel || tour.heightAboveSeaLevel;
        tour.meetingVenueLink= req.body.meetingVenueLink || tour.meetingVenueLink;
        tour.isFamilyFriendly= req.body.isFamilyFriendly || tour.isFamilyFriendly;
        tour.priceForMinors = req.body.priceForMinors || tour.priceForMinors;
        tour.priceForUnivStudents = req.body.priceForUnivStudents || tour.priceForUnivStudents;
        tour.priceForGroups = req.body.priceForGroups || tour.priceForGroups;
        tour.priceNoTransp = req.body.priceNoTransp || tour.priceNoTransp;
        tour.includesSnowshoes= req.body.includesSnowshoes || tour.includesSnowshoes;
        tour.description=req.body.description || tour.description;
        tour.rules=req.body.rules || tour.rules;
        tour.whatToBring=req.body.whatToBring || tour.whatToBring;
        tour.paymentTerms=req.body.paymentTerms || tour.paymentTerms;

        const updatedTour = await tour.save();
    
        res.send({
            title : updatedTour.title,
            profileImage : updatedTour.profileImage,
            destination: updatedTour.destination,
            district: updatedTour.district,
            governorate: updatedTour.governorate,
            tourType : updatedTour.tourType,
            date : updatedTour.date,
            departureTime:updatedTour.departureTime,
            returningTime: updatedTour.returningTime,
            meetingPoint: updatedTour.meetingPoint,
            hikingLevel: updatedTour.hikingLevel,
            hikingDistance: updatedTour.hikingDistance,
            uphillHeight: updatedTour.uphillHeight,
            downhillHeight: updatedTour.downhillHeight,
            price : updatedTour.price,
            includesGuides: updatedTour.includesGuides,
            includesBreakfast: updatedTour.includesBreakfast,
            includesSnacks: updatedTour.includesSnacks,
            includesInsurance: updatedTour.includesInsurance,

            distanceFromDeparturePoint : updatedTour.distanceFromDeparturePoint,    
            heightAboveSeaLevel : updatedTour.heightAboveSeaLevel,
            meetingVenueLink: updatedTour.meetingVenueLink,
            isFamilyFriendly: updatedTour.isFamilyFriendly,
            priceForMinors : updatedTour.priceForMinors,
            priceForUnivStudents : updatedTour.priceForUnivStudents,
            priceForGroups : updatedTour.priceForGroups,
            priceNoTransp : updatedTour.priceNoTransp,
            includesSnowshoes: updatedTour.includesSnowshoes,
            description:updatedTour.description,
            rules:updatedTour.rules,
            whatToBring:updatedTour.whatToBring,
            paymentTerms:updatedTour.paymentTerms,
    }) 
    } else {
        res.status(404).send({message:"Tour Not Found"})
    }
})

///////////////////////////////////////////// Getting the Tours /////////////////////////////////////////////

router.get("/", async (req, res) => {

    const district = req.query.district ?  {district : req.query.district}  : {};
    const governorate = req.query.governorate ? {governorate : req.query.governorate} : {};
    const hikingLevel = req.query.hikingLevel ? {hikingLevel : req.query.hikingLevel} : {};
  
    const searchKeyword = req.query.searchKeyword
      ? {
          title: {
            $regex: req.query.searchKeyword,
            $options: "i",
          },
        }
      : {};

      const date = req.query.date ? { date: req.query.date } : {};
  
    const { page = 1, limit  } = req.query;
  
    try{
    const tours = await Tour.find({ ...district, ...governorate, ...hikingLevel,...searchKeyword, ...date  })
    .populate("tourOperator")
    .populate("hikers")
    .limit(limit * 1)
    .skip((page - 1) * limit);
  
    // get total documents in the Posts collection
    const count = await Tour.find({ ...district, ...governorate, ...hikingLevel,...searchKeyword, ...date })
                 .countDocuments();
  
     // return response with posts, total pages, and current page
    res.json({
      tours,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      limit:limit,
      count:count
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
      
  });
  

  ///////////////////////////////////////////// Getting list of tours  auth/////////////////////////////////////////////



router.get("/myTours", 
  isOperatorAuth, 
  async (req, res) => {
    const { page = 1, limit  } = req.query;

    const searchKeyword = req.query.searchKeyword
    ? {
        title: {
          $regex: req.query.searchKeyword,
          $options: "i",
        },
      }
    : {};


    const tours = await Tour.find({tourOperator: req.tourOperator._id, ...searchKeyword})
    .populate('tourOperator')
    .populate('hikers')
    .limit(limit * 1)
    .skip((page - 1) * limit);

    // get total documents in the Posts collection
    const count = await Tour.find({
        tourOperator: req.tourOperator._id, ...searchKeyword})
    .countDocuments();

    res.json({
      tours,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      limit:limit,
      count:count
      });

  });


 ///////////////////////////////////////////// Getting hikers' tours /////////////////////////////////////////////

  router.get("/hikersTours", isAuth, async (req, res) => {
    try{
    
    const { page = 1, limit  } = req.query;

    const tours = await Tour.find({hikers: req.user._id}).populate('tourOperator')
    .limit(limit * 1).skip((page - 1) * limit);

    const count = await Tour.find({hikers: req.user._id}).countDocuments();
    if (tours) {
            res.json({
                tours,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                limit:limit,
                count:count
                });
    } else {
      res.status(404).send({ message: "Tour Not Found" });
    }} catch(err){

    return res.status(500).json({message:err.message})
    }
});

  ///////////////////////////////////////////// Getting one tour /////////////////////////////////////////////

router.get("/:id", async(req,res)=>{
    try{
        const tour = await Tour.findOne({_id: req.params.id}).populate('tourOperator').populate('hikers');
        if(tour){
            res.json(tour)
        }
        else {
            res.status(404).send({message: "Tour Not Found."})
        }
    } catch(err){
            return res.status(500).json({message:err.message})
    }
})


///////////////////////////////Add Hikers to tour//////////////////////////

// router.post("/:id/hikers", isAuth, async (req, res) => {
//     const tour = await Tour.findById(req.params.id).populate('hikers');
//     if (tour) {
//       const hiker = await  User.findById(req.user._id);
//       tour.hikers.push(hiker);
//       console.log("hiker", hiker);
//       const updatedTour = await tour.save();
//       res.status(201).json({
//         hiker: updatedTour.hikers[updatedTour.hikers.length - 1],
//         message: "Hiker saved successfully.",
//         success: true
//       });
//     } else {
//       res.status(404).send({ message: "Tour Not Found" });
//     }
//   });


router.post("/:id/hikers", isAuth, async (req, res) => {

    const queriedTour = await Tour.findOne({_id: req.params.id, hikers : req.user._id});
    if (!queriedTour) {
      const tour = await Tour.findById(req.params.id);
      if(tour){     
      const hiker = await  User.findById(req.user._id);
      tour.hikers.push(hiker);
      console.log("hiker", hiker);
      const updatedTour = await tour.save();
      res.status(201).json({
        hiker: updatedTour.hikers[updatedTour.hikers.length - 1],
        message: "Hiker saved successfully.",
        success: true
      });
    } else {
      res.status(404).send({ message: "Tour Not Found" });
    }
    }
    else{
       res.status(406).send({ message: "Tour has been reserved." });
    }

  });



  ///////////////////////////////Add Hikers to tour//////////////////////////


module.exports = router;