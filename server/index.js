const express = require('express');// express server is requires for routing in backend
const app = express();// doing this would import the express funtionalities into app 
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // need to import it using npm i dotenv 
dotenv.config({path : "./config.env"});//Loads .env file contents into process.env.

app.use(require('./router/auth')); // importing auth.js or we can say our router

// connecting to mongo db
const DB = process.env.DATABASE;  //connection string that is stored in config.env file
mongoose.connect(DB).then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
    console.log("not connected");
});
