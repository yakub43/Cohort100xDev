const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, User, Course } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "MySecretToken";

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

   await Admin.create({
        username: username,
        password: password
    })

    res.json({
        message: "Admin Created Successfully";
    })
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = User.find({
        username,
        password
    })

    if(user){
        const token = jwt.sign({
            username
        },JWT_SECRET);

        return res.status(200).json({token});
    }
    else{
        res.status(403).json({
            msg:"Incorrect Email and Password";
        })
    }
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;