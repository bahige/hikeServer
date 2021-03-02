const express = require('express');
const mongoose = require('mongoose');
const logger = require ('morgan');
const cors = require ('cors');

const config = require('./config.js');

const {mongoUrl} = config;

//Routers 
const userRoute = require('./routes/userRoute');
const tourOperatorRoute = require('./routes/tourOperatorRoute');
const toursRoute = require('./routes/tourRoute');

// Creating the express app and allow it to use the cors, morgan and json features

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Initializing the port on which the server will be read

const PORT = process.env.PORT || 3200;


// Connecting the app to the database 

const connect = mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => {console.log("error: ", JSON.stringify(error.reason))});

connect.then((db)=>{
    console.log("Connected correctly to the server");
  }, (err) => {
    console.log(err);
  });



// Using the routes
app.use('/users', userRoute);
app.use('/tourOperators', tourOperatorRoute);
app.use('/tours', toursRoute);


// Making the express app to be listened at the previously defined port:

app.listen( PORT, ()=>{
    console.log(`Server started`)
});