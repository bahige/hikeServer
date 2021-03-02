const express = require('express');
const router = express.Router();

const User = require("../models/user");

const {getToken, isAuth} = require('../middleware/authenticateUser');

// Writing the function that creates an admin

router.get('/createAdmin', async (req, res) => {
    try{
        const user = new User({
            firstName: "Bahige",
            lastName: "Saab",
            email:"bis@bis.com",
            password: "1234",
            age: 37,
            isAdmin:true
        });
        const newUser = await user.save();
        res.send(newUser);
        } catch (error){
            res.send({message:error.message})
        }
})

// Register router

router.post('/register', async( req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email:req.body.email,
        password: req.body.password,
        age: req.body.age,
    })
    const newUser = await user.save();

    if (newUser){
        res.send({
            _id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email:newUser.email,
            password: newUser.password,
            age: newUser.age,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        })
    } else {
        res.status(401).send({msg: "Invalid user data"})
    }
})


// Signin router

router.post('/signin', async( req, res) => {
    const signinUser = await User.findOne({
        email:req.body.email,
        password: req.body.password,
    })

    if (signinUser){
        res.send({
            _id: signinUser.id,
            firstName: signinUser.firstName,
            lastName: signinUser.lastName,
            email:signinUser.email,
            password: signinUser.password,
            age: signinUser.age,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
        })
    } else {
        res.status(401).send({msg: "Invalid email or data"})
    }
})

//update user signin info

router.patch('/:id', isAuth, async (req,res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if(user){
        user.firstName = req.body.firstName || user.firstName; //If req.body.firstName exists, it will be assigned 
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        user.age = req.body.age || user.age;

    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      password: updatedUser.password,
      age: updatedUser.age,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser)
    }) 
    } else {
        res.status(404).send({message:"User Not Found"})
    }
})

// user.firstName = req.body.firstName || user.firstName; 
//If req.body.firstName exists, it will be assigned to user.firstName; 
//Otherwise user.firstName will be assigned to it.


module.exports= router;