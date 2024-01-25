const CustomAPIError = require("./errorMiddleware");
const jwt = require("jsonwebtoken");
const protect = async (req, res, next) => {
    //console.log(req.headers.authorization);
    console.log(req.headers);
    console.log(req.cookies);
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")) {
        throw new CustomAPIError('No token', 401);
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const {_id:id, username} = decoded;
    req.user = {id, username}
    next();
}

module.exports = {protect}