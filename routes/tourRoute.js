const express = require('express');
const router = express.Router();

const Tour = require("../models/tour");

const {isOperatorAuth} = require("../middleware/authenticateTourOperator");
const {isAuth, isAdmin} = require('../middleware/authenticateUser');

///////////////////////////////////////////// Getting one tour /////////////////////////////////////////////

router.get("/:id", async(req,res)=>{
    try{
        const tour = await Tour.findOne({_id: req.params.id});
        if(tour){
            res.send(tour)
        }
        else {
            res.status(404).send({message: "Tour Not Found."})
        }
    } catch(err){
            return res.status(500).json({message:err.message})
    }
})

/////////////////////////////////////////////Deleting tour by Tour Operator/////////////////////////////////////////////

router.delete('/:id', isOperatorAuth, async (req,res)=>{
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
        town: req.body.town,
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
        inclusions: req.body.inclusions,
        tourOperator: req.tourOperator._id,
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
        town: req.body.town,
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
        inclusions: req.body.inclusions,
        tourOperator: req.tourOperator._id,
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
        tour.town= req.body.town || tour.town;
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
        tour.inclusions= req.body.inclusions || tour.inclusions;

        const updatedTour = await tour.save();
    
        res.send({
            title : updatedTour.title,
            profileImage : updatedTour.profileImage,
            town: updatedTour.town,
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
            inclusions: updatedTour.inclusions,
    }) 
    } else {
        res.status(404).send({message:"Tour Not Found"})
    }
})


///////////////////////////////////////////// Updating A Tour By Tour Operator /////////////////////////////////////////////

router.patch('/:id', isAuth, isAdmin, async (req,res) => {
    const tourId = req.params.id;
    const tour= await Tour.findById(tourId);
    if(tour){
        tour.title = req.body.title || tour.title;
        tour.profileImage = req.body.profileImage || tour.profileImage;
        tour.destination= req.body.destination || tour.destination;
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
        tour.inclusions= req.body.inclusions || tour.inclusions;

        const updatedTour = await tour.save();
    
        res.send({
            title : updatedTour.title,
            profileImage : updatedTour.profileImage,
            destination: updatedTour.destination,
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
            inclusions: updatedTour.inclusions,
    }) 
    } else {
        res.status(404).send({message:"Tour Not Found"})
    }
})

///////////////////////////////////////////// Getting the Tours /////////////////////////////////////////////

router.get("/", async (req, res) => {

    const district = req.query.district ?  {district : req.query.district}  : {};
    const governorate = req.query.governorate ? {district : req.query.governorate} : {};
    const hikingLevel = req.query.hikingLevel ? {hikingLevel : req.query.hikingLevel} : {};
  
    const searchKeyword = req.query.searchKeyword
      ? {
          title: {
            $regex: req.query.searchKeyword,
            $options: "i",
          },
        }
      : {};
  
    // const sortOrder = req.query.sortOrder
    //   ? req.query.sortOrder === "lowest"
    //     ? { price: 1 }
    //     : { price: -1 }
    //   : { _id: -1 };
  
    const { page = 1, limit  } = req.query;
  
    try{
    const tours = await Tour.find({ ...district, ...governorate, ...hikingLevel,...searchKeyword  })
 //   .sort(sortOrder)
    .limit(limit * 1)
    .skip((page - 1) * limit);
  
    // get total documents in the Posts collection
    const count = await Tour.find({ ...district, ...governorate, ...hikingLevel,...searchKeyword })
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
module.exports = router;