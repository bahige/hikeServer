const express = require('express');
const router = express.Router();

const TourOperator = require("../models/tourOperator");
const Tour = require("../models/tour");

const {getOrgToken, isOperatorAuth} = require('../middleware/authenticateTourOperator');

const {getToken, isAuth, isAdmin} = require('../middleware/authenticateUser');




// Register router

router.post('/register', async( req, res) => {
    const tourOperator = new TourOperator({
        name: req.body.name,
        image: req.body.image,
        email:req.body.email,
        password: req.body.password,
        street: req.body.street,
        city: req.body.city,
        district: req.body.district,
        governorate: req.body.governorate,
        phoneNumber: req.body.phoneNumber,
        contactName: req.body.contactName,
    })
    const newTourOperator = await tourOperator.save();

    if (newTourOperator){
        res.send({
            _id: newTourOperator.id,
            name: newTourOperator.name,
            image: newTourOperator.image,
            email:newTourOperator.email,
            password: newTourOperator.password,
            street: newTourOperator.street,
            city: newTourOperator.city,
            district: newTourOperator.district,
            governorate: newTourOperator.governorate,
            phoneNumber: newTourOperator.phoneNumber,
            contactName: newTourOperator.contactName,
            token: getOrgToken(newTourOperator)
        })
    } else {
        res.status(401).send({msg: "Invalid data"})
    }
})


// Signin router

router.post('/signin', async( req, res) => {
    const signinTourOperator = await TourOperator.findOne({
        email:req.body.email,
        password: req.body.password,
    })

    if (signinTourOperator){
        res.send({
            _id: signinTourOperator.id,
            name: signinTourOperator.name,
            image: signinTourOperator.image,
            email:signinTourOperator.email,
            password: signinTourOperator.password,
            street: signinTourOperator.street,
            city: signinTourOperator.city,
            district: signinTourOperator.district,
            governorate: signinTourOperator.governorate,
            phoneNumber: signinTourOperator.phoneNumber,
            contactName: signinTourOperator.contactName,
            token: getOrgToken(signinTourOperator)
        })
    } else {
        res.status(401).send({msg: "Invalid email or password"})
    }
})

//update user signin info

router.patch('/:id', async (req,res) => {
    const tourOperatorId = req.params.id;
    const tourOperator = await TourOperator.findById(tourOperatorId);
    if(tourOperator){
        tourOperator.name = req.body.name || tourOperator.name;
        tourOperator.image = req.body.image || tourOperator.image;
        tourOperator.email = req.body.email || tourOperator.email;
        tourOperator.password = req.body.password || tourOperator.password;
        tourOperator.street = req.body.street || tourOperator.street;
        tourOperator.city = req.body.city || tourOperator.city;
        tourOperator.district = req.body.district || tourOperator.district;
        tourOperator.governorate = req.body.governorate || tourOperator.governorate;
        tourOperator.phoneNumber = req.body.phoneNumber || tourOperator.phoneNumber;
        tourOperator.contactName = req.body.contactName || tourOperator.contactName;

    const updatedTourOperator = await tourOperator.save();
    res.send({
        _id: updatedTourOperator.id,
        name: updatedTourOperator.name,
        image: updatedTourOperator.image,
        email:updatedTourOperator.email,
        password: updatedTourOperator.password,
        street: updatedTourOperator.street,
        city: updatedTourOperator.city,
        district: updatedTourOperator.district,
        governorate: updatedTourOperator.governorate,        
        phoneNumber: updatedTourOperator.phoneNumber,
        contactName: updatedTourOperator.contactName,
        token: getOrgToken(updatedTourOperator)
    }) 
    } else {
        res.status(404).send({message:"Tour Operator Not Found"})
    }
})


///////////////////////////////Getting Tour Organizers for Authentication ////////////////////////////////

router.get("/admin",  isAuth, isAdmin, async (req, res) => {

 
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
    const tourOrganizers = await TourOperator.find({...searchKeyword  })
 //   .sort(sortOrder)
    .limit(limit * 1)
    .skip((page - 1) * limit);
  
    // get total documents in the Posts collection
    const count = await TourOperator.find({...searchKeyword }).countDocuments();
  
     // return response with posts, total pages, and current page
    res.json({
      tourOrganizers,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      limit:limit,
      count:count
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
      
  });


///////////////////////////////Getting Tour Organizers  ////////////////////////////////

router.get("/",  async (req, res) => {

 
    const searchKeyword = req.query.searchKeyword
      ? {
          name: {
            $regex: req.query.searchKeyword,
            $options: "i",
          },
      }
      : {};
  

    const { page = 1, limit  } = req.query;
  
    try{
    const tourOrganizers = await TourOperator.find({...searchKeyword  })
 //   .sort(sortOrder)
    .limit(limit * 1)
    .skip((page - 1) * limit);
  
    // get total documents in the Posts collection
    const count = await TourOperator.find({...searchKeyword }).countDocuments();
  
     // return response with posts, total pages, and current page
    res.json({
      tourOrganizers,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      limit:limit,
      count:count
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
      
  });

  /////////////////////////////////////////////Deleting tour operator by Admin/////////////////////////////////////////////

router.delete('/:id', isAuth, isAdmin, async (req,res)=>{
  try{
      const deletedTourOperator = await TourOperator.findById(req.params.id);
      if(deletedTourOperator){
          await deletedTourOperator.remove();
          res.send({message: "Tour Operator Deleted."})
      } else {
          res.send("Tour Operator does not exist.")
      }
  } catch(err){
      return res.status(500).json({message: err.message})
  }
});

///////////////////////////////////////////// Getting one tour operator /////////////////////////////////////////////

router.get("/:id",  async(req,res)=>{
  try{
      const tourOperator = await TourOperator.findOne({_id: req.params.id});
      if(tourOperator){
          res.json(tourOperator)
      }
      else {
          res.status(404).send({message: "Tour Not Found."})
      }
  } catch(err){
          return res.status(500).json({message:err.message})
  }
})


///////////////////////////////////////////// Getting one tour operator /////////////////////////////////////////////

router.get("/mine/:authOrgId", isOperatorAuth,  async(req,res)=>{
  try{
      const tourOperator = await TourOperator.findOne({_id: req.params.authOrgId});
      if(tourOperator){
          res.json(tourOperator)
      }
      else {
          res.status(404).send({message: "Tour Operator Not Found."})
      }
  } catch(err){
          return res.status(500).json({message:err.message})
  }
})

///////////////////////////////////////////// Getting tours of one tour operator /////////////////////////////////////////////

router.get("/:orgId/tours",  async(req,res)=>{

    try{
        const governorate = req.query.governorate ? {governorate : req.query.governorate} : {};
        const hikingLevel = req.query.hikingLevel ? {hikingLevel : req.query.hikingLevel} : {};
        const date = req.query.date ? {date : req.query.date} : {};
      
        const searchKeyword = req.query.searchKeyword
          ? {
              title: {
                $regex: req.query.searchKeyword,
                $options: "i",
              },
            }
          : {};
          
        const { page = 1, limit  } = req.query;

        const tours = await Tour.find({tourOperator: req.params.orgId, ...governorate, ...hikingLevel,...searchKeyword, ...date})
        .populate('tourOperator')
        .limit(limit * 1)
        .skip((page - 1) * limit);

        const count = await Tour.find({tourOperator: req.params.orgId, ...governorate, ...hikingLevel,...searchKeyword, ...date})
        .countDocuments();

        if(tours){
            res.json({
                tours: tours,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                limit:limit,
                count:count})
        }
        else {
            res.status(404).send({message: "Tours Not Found."})
        }
    } catch(err){
            return res.status(500).json({message:err.message})
    }
  })



module.exports= router;