const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path : "./config.env"});//Loads .env file contents into process.env.

const userSchema = mongoose.Schema({  //Schema is method of mongodb to create schema
    name:{
        type : String,
        required : true
    },
    email :{
        type: String,
        required : true
    },
    phone :{
        type: Number,
        required : true
    },
    work :{
        type: String,
        required : true
    },
    password :{
        type: String,
        required : true
    },
    cpassword :{
        type: String,
        required : true
    },
    tokens:[
        {
          token:{
            type : String,
            required : true
          }  
        }
    ],
    messages :[
        {
            name:{
                type : String,
                required : true
            },
            email:{
                type : String,
                required : true
            },
            phone :{
                type : Number,
                required : true
            },
            message :{
                type : String,
                required : true
            }
        }
    ]
})



userSchema.pre('save' , async function(next){ // this pre method is sort of middleware and executed just before the save method (registration) .  in call back funtion we have use the simple funciton not fat arrow funciton because here we are supposed to use this keyword which is supported by fat arrow function
    console.log("this is save method");
    if(this.isModified('password')){ // return true is password is modified 
        this.password = await bcrypt.hash(this.password , 12); 
        // hash method would convert the normal password to hashed one of 12 characters
        console.log(this.password);
        this.cpassword = await bcrypt.hash(this.cpassword , 12);


    }
    next();
});

userSchema.methods.generateAuthToken = async function () {  // when you have to use this keyword you cannot use fat arrow funtion
    try {
        let newtoken = jwt.sign({_id:this._id} , process.env.SECERET_KEY);
        console.log(newtoken);
        this.tokens = this.tokens.concat({token : newtoken});
        await this.save();
        return newtoken;

    } catch (error) {
        console.log(error);
    }   
}

userSchema.methods.addMessage = async function(namevalue, email , phone , message){
    try{
        this.messages = this.messages.concat({
            name : namevalue , email : email , phone : phone, message : message
        });
        await this.save;
        return this.messages;
    }
    catch(error){
        console.log(error);
    }
    
}

const User = mongoose.model("USER" , userSchema); //The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example above, the model USER is for the users collection in the database.




module.exports = User;