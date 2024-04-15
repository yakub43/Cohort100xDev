const jwt = require("jsonwebtoken")
const express = require("express")
const JWT_SECRET = "MySecretToken"


// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. 
    // Check readme for the exact headers to be expected
    const token = req.Headers.Authorization;
    const words = token.split(" ");
    const jwtToken = words[1];

    try{
        const decodedToken = jwt.verify(jwtToken, JWT_SECRET);
        if(decodedToken.username){
            next();
        }
        else{
            res.status(403).json({
                msg:"User Not Authenticated"
            })
        }
    }catch(e){
        res.json({
            msg:"Incorrect Details"
        })
    }
    
}

module.exports = adminMiddleware;