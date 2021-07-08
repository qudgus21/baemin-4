let express = require("express");
let signup = require("../controllers/signup");
let router = express.Router();


router.get("/register", signup.registerView);

router.post("/register", signup.register);

router.get("/terms", signup.terms);

module.exports = router;