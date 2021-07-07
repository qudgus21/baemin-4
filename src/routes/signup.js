
let express = require("express");
let signup = require("../controllers/signup");
let router = express.Router();


router.get("/phone", signup.phone);

router.get("/register", signup.register);


module.exports = router;