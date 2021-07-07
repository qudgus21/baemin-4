
let express = require("express");
let signup = require("../controllers/signup");
let router = express.Router();


router.get("/phone", signup.phone);

router.get("/userInfo", signup.userInfo);


module.exports = router;