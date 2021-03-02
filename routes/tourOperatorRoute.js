const express = require('express');
const router = express.Router();

const TourOperator = require("../models/tourOperator");

const {getToken, isOperatorAuth} = require('../middleware/authenticateTourOperator');


// Register router

router.post('/register', async( req, res) => {
    const tourOperator = new TourOperator({
        name: req.body.name,
        email:req.body.email,
        password: req.body.password,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        ceoName: req.body.ceoName,
    })
    const newTourOperator = await tourOperator.save();

    if (newTourOperator){
        res.send({
            _id: newTourOperator.id,
            name: newTourOperator.name,
            email:newTourOperator.email,
            password: newTourOperator.password,
            address: newTourOperator.address,
            phoneNumber: newTourOperator.phoneNumber,
            ceoName: newTourOperator.ceoName,
            token: getToken(newTourOperator)
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
            _id: newTourOperator.id,
            name: newTourOperator.name,
            email:newTourOperator.email,
            password: newTourOperator.password,
            address: newTourOperator.address,
            phoneNumber: newTourOperator.phoneNumber,
            ceoName: newTourOperator.ceoName,
            token: getToken(newTourOperator)
        })
    } else {
        res.status(401).send({msg: "Invalid email or password"})
    }
})

//update user signin info

router.patch('/:id', isOperatorAuth, async (req,res) => {
    const tourOperatorId = req.params.id;
    const tourOperator = await TourOperator.findById(tourOperatorId);
    if(tourOperator){
        tourOperator.name = req.body.name || tourOperator.name;
        tourOperator.email = req.body.email || tourOperator.email;
        tourOperator.password = req.body.password || tourOperator.password;
        tourOperator.address = req.body.address || tourOperator.address;
        tourOperator.phoneNumber = req.body.phoneNumber || tourOperator.phoneNumber;
        tourOperator.ceoName = req.body.ceoName || tourOperator.ceoName;

    const updatedTourOperator = await tourOperator.save();
    res.send({
        _id: updatedTourOperator.id,
        name: updatedTourOperator.name,
        email:updatedTourOperator.email,
        password: updatedTourOperator.password,
        address: updatedTourOperator.address,
        phoneNumber: updatedTourOperator.phoneNumber,
        ceoName: updatedTourOperator.ceoName,
        token: getToken(updatedTourOperator)
    }) 
    } else {
        res.status(404).send({message:"Tour Operator Not Found"})
    }
})

module.exports= router;