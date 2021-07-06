let express = require("express");
let main = require("../controllers/main");
let router = express.Router();

router.get("/", main.page);

module.exports = router;
