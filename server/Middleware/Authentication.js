const jwt = require('jsonwebtoken');
const user = require('../modals/userSchema');

// declaring middleware fuction

const Authentication = async( req , res , next)=>{
    try{
        // getting the cookies stored in browser after login
        const token = req.cookies.mycookies;
        const verifyToken = jwt.verify(token , process.env.SECERET_KEY);
        // console.log(verifyToken);
        // console.log("verified");
        const rootUser = await user.findOne({_id : verifyToken._id , "tokens:token" : token});
        if(!rootUser){
            throw new Error("user not found");
        }
            req.token = token;
            req.rootUser = rootUser;
            req.userId = rootUser._id;
            next();
        
    }catch(error){
        res.status(401).send('unauthorised : NO token provided');
        console.log(error);
    }

}

module.exports = Authentication;