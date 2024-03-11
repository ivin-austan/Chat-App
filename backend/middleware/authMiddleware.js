const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');


const protect = asyncHandler(async(req,res,next)=>{
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try {
            token = req.headers.authorization.split(" ")[1];
            //bearer token (here we are spliting only the token)

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");

            next();

        } catch (error) {
            res.status(401);
            throw new Error("Not authorised, token failed");
            
        }
    }
    if(!token){
        res.status(401);
        throw new Error("Not authorised, no token");
    }
})
module.exports = { protect };