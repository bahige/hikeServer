const express = require('express');
const router = express.Router();

const User = require("../models/user");

const {getToken, isAuth, isAdmin} = require('../middleware/authenticateUser');

// Writing the function that creates an admin

router.get('/createAdmin', async (req, res) => {
    try{
        const user = new User({
            firstName: "Bahige",
            lastName: "Saab",
            email:"bis@bis.com",
            password: "1234",
            age: 37,
            gender:"Male",
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
        gender: req.body.gender,
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
            gender: newUser.gender,
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
            gender: signinUser.gender,
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
        user.gender = req.body.gender || user.gender;

    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      password: updatedUser.password,
      age: updatedUser.age,
      gender: updatedUser.gender,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser)
    }) 
    } else {
        res.status(404).send({message:"User Not Found"})
    }
})


//Get user info

router.get("/", isAuth, isAdmin, async (req, res) => {

 
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
    const users = await User.find({...searchKeyword  })
 //   .sort(sortOrder)
    .limit(limit * 1)
    .skip((page - 1) * limit);
  
    // get total documents in the Posts collection
    const count = await User.find({...searchKeyword }).countDocuments();
  
     // return response with posts, total pages, and current page
    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      limit:limit,
      count:count
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
      
  });


// user.firstName = req.body.firstName || user.firstName; 
//If req.body.firstName exists, it will be assigned to user.firstName; 
//Otherwise user.firstName will be assigned to it.

/////////////////////////////////////////////Deleting tour by Admin/////////////////////////////////////////////

router.delete('/:id', isAuth, isAdmin, async (req,res)=>{
    try{
        const deletedUser = await User.findById(req.params.id);
        if(deletedUser){
            await deletedUser.remove();
            res.send({message: "User Deleted."})
        } else {
            res.send("User does not exist.")
        }
    } catch(err){
        return res.status(500).json({message: err.message})
    }
});


///////////////////////////////Get User/////////////////////////////


  router.get("/:id", isAuth, async(req,res)=>{
    try{
        const user = await User.findOne({_id: req.params.id});
        if(user){
            res.json(user)
        }
        else {
            res.status(404).send({message: "User Not Found."})
        }
    } catch(err){
            return res.status(500).json({message:err.message})
    }
})



module.exports= router;