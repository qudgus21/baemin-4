let express = require('express')
let login = require('../controllers/login')
let router = express.Router()

router.get('/', login.page);

// router.post('/test', login.test)

module.exports = router