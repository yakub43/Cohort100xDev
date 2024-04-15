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
        message: "Admin Created Successfully"
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
            msg:"Incorrect Email and Password"
        })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })

    res.json({
        message: 'Course created successfully', courseId: newCourse._id
    })
});

router.get('/courses', adminMiddleware,async (req, res) => {
    const response = await Course.find({});

    res.json({
        courses: response
    })
});

module.exports = router;