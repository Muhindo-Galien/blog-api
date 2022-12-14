const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


const auth = async(req,res,next)=>{
    // check header

    const authHeader = req.headers.authorization;
     if (!authHeader || !authHeader.startsWith("Bearer")) {
       throw new UnauthenticatedError("Invalid authentication ");
     }
     const token = authHeader.split(' ')[1];

     try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // attach the user to post routes
        const user = await User.findById(payload.userId).select(-"-password");
         req.user = user;

         req.user = { userId: payload.userId, name: payload.name };
         next();
         
     } catch (error) {
        throw new UnauthenticatedError("Invalid authentication ");
     }
}
module.exports = auth;