const router = require("express").Router();
const {protect} = require("../middleware/authMiddleware");
const {registerUser, authUser, dashBoard, getUsers} = require("../controllers/userController");

router.route("/").post(registerUser).get(getUsers);
router.route("/users").get(protect, dashBoard); 
router.route("/user/auth").post(authUser)
module.exports = router;