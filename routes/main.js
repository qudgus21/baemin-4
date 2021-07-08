let express = require("express");
let home = require("../controllers/home.js");
let router = express.Router();

router.get("/", home.page);

module.exports = router;
