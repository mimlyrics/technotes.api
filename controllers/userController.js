const {asyncWrapper} = require("../middleware/errorMiddleware");
const {createCustomError} = require("../middleware/errorMiddleware");
const CustomAPIError = require("../middleware/errorMiddleware");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const registerUser  = (req, res) => {
    console.log("yepxx");
    const {username, password} = req.body;
    console.log(username, password);
    if(!username || !password) {
        throw new CustomAPIError('Provide email and password', 400);
    }
    const _id = new mongoose.mongo.ObjectId();
    console.log(_id);
    const token = jwt.sign({_id, username}, process.env.JWT_SECRET ,{'expiresIn': '30d'});
    //console.log(token);
    //res.cookie('token', token);
    return res.status(201).json({username, password, secret:token});
}

const authUser = asyncWrapper( (req, res) => {
    res.send("Fake Login/Register/SignUP Route ");
})

const dashBoard = asyncWrapper(async (req, res) => {
    console.log("start");
    console.log(req.user);
    const luckyNumber = Math.floor(Math.random()*100);
    return res.status(200).json({msg: `Hello, ${req.user.username}`, secret: `Here is your authorized data, you're lucky number is ${luckyNumber}`});
})

const getUsers = (req, res) => {
 
}

module.exports = {registerUser, dashBoard, authUser, getUsers}