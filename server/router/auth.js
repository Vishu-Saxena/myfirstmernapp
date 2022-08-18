
const express = require('express');
const Router = express(); // express server is requires for routing in backend
Router.use(express.json()); // this line help to send you resposnse in json formate . if not written then res.json({"message": req.body}); would return undefined . It is a middleware function . 
const bcrypt = require('bcryptjs'); // package use to hash password
const user = require('../modals/userSchema');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
Router.use(cookieParser());

const authenticate = require('../Middleware/Authentication');

Router.post('/' , authenticate ,(req , res)=>{ 
    console.log("home page");
    // res.send(req.rootUser);
});

// backed code for registration

Router.post('/register' , async(req , res)=>{

    // res.send(req.body.name);
    // const name = req.body.name;
    // const email = req.body.email;

    const {name , email , phone , work , password , cpassword} = req.body; //destructuring . here name stores the value of req.body.name , when the key and value name are same then we can do like this

    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error : "plz fill all the field properly ."});
    }

    try {

        const userExist = await user.findOne({email : email}); //this returns the entire data of that particular user whose email matches to email passed in argument. 

        if(userExist){

            res.status(500).json({error:"user already exist . Plz go for loggin."});

        }else if(password!==cpassword){

            res.status(422).json({error : "password not matched"})
        }
        else{

            const newUser = new user({name , email , phone , work , password , cpassword}); // creating new user in database collection 
           const userRegister = await newUser.save();//save method would save the or we can say add the user to collection
            // if you print the userRegister you will get the data of newUser
            res.status(200).json({"message" :"registered"});
        } 
    } catch (error) {
        res.send(error);
        console.log(error);
        
    }
});


// backend code for login page.

Router.post('/login', async(req , res)=>{

    const {email , password} = req.body;

    if(!email || !password){

        return res.status(401).json({error:"invalid credentials"});

    }else{
        const checkUser = await user.findOne({email});

        if(checkUser){

            const isMatch = await bcrypt.compare(password , checkUser.password);//compare method would compare the unhashed password entered by user to hashed password saved during registration;
            const token = await checkUser.generateAuthToken();//you have to declare this function in userSchema 

            // sending cookies to browser or localhost .
            res.cookie("mycookies" , token , {expires : new Date(Date.now()+ 25892000000) , httpOnly : true});

            if(isMatch){
                res.status(201).json({message:"user login successfully."});
            }else{
                res.status(401).json({error:"invalid credentials ."});
            }
        }else{
            res.status(500).json({error : "invald credentials"});
        }
    }
});
Router.get('/about' , authenticate  , (req , res)=>{
    // res.send("about page ");
    res.send(req.rootUser);
    console.log("about us ka page");
});
Router.post('/contact' , authenticate , async(req , res)=>{
    try {
        console.log("contact page");
        const {name , email , phone , message} = req.body;
        if(!name || !email || !phone || !message){
        return res.status(401).json({error :"plz fill the form properly"});
        }
        const usersearch  = await user.findOne({_id: req.userId});
        if(usersearch){
            const msg = await usersearch.addMessage(name, email , phone , message);
            await usersearch.save();
            console.log("msg  :  " + msg);
            res.status(200).json({message : "msg sent successfuly"});
        }else{
            console.log("msg not sent");
        }
    } catch (error) {
        console.log(error);
    }
    
});

Router.post('/editProf' , async (req , res)=>{
    console.log('hlo editprof');
    const {name , work , id} = req.body;
    if(!name || !work){
        console.log("fill the profile");
    }else{
       const updt =  await user.updateOne({_id : id} , {
            $set :{
                name : name,
                work : work
            }
        } )
        if(updt){
            console.log("data updated");
            res.status(200).json({message : "updated"});
        }else{
            console.log("not updated");
            res.status(422).json({error : "not updated"});
        }
    }
    
})

Router.get('/getdata' , authenticate , (req , res)=>{
    console.log('hlo getdata');
    res.send(req.rootUser);
})

Router.get('/logout' , (req , res)=>{
    console.log("logout page");
    res.clearCookie("mycookies" , {path : "/"});
    window.alert("user logout");
})

Router.listen(5000 , ()=>{
    console.log("server is running on port 5000");
});

module.exports = Router;  //doing this would help us to export this file and import it in other file.

