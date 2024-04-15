const jwt = require("jsonwebtoken")
const JWT_SECRET = "MySecretToken"

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. 
    // Check readme for the exact headers to be expected
    const token = req.Headers.Authorization;
    const words = token.split(" ");
    const theToken = words[1];
    const decodedValue = jwt.verify(theToken, JWT_SECRET);


        if(decodedValue.username){
            req.username = decodedValue.username;
            next();
        }
        else{
            res.status(403).json({
                msg:"Incorrect Details"
            })
        }

}

module.exports = userMiddleware;