const express = require('express');
const mongoose = require('mongoose');
const logger = require ('morgan');
const cors = require ('cors');

const config = require('./config.js');

const {mongoUrl} = config;

// Creating the express app and allow it to use the cors, morgan and json features

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Initializing the port on which the server will be read

const PORT = process.env.PORT || 3200;

// Making the express app to be listened at the previously defined port:

app.listen( PORT, ()=>{
    console.log(`Server started`)
});

// Connecting the app to the database 

const db = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => {console.log("error: ", JSON.stringify(error.reason))});

db.once("open", ()=> console.log(`Server connected successfully at port ${PORT}`));

