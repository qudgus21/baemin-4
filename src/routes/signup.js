let express = require("express");
let signup = require("../controllers/signup");
let router = express.Router();

router.get("/", signup.page);

module.exports = router;
