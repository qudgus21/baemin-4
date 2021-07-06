let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')
let  cookieParser = require('cookie-parser');


const serverPort = 8000
const app = express()

app.set("view engine", "pug");

app.use(cookieParser());
app.use(cors()) 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', require('./routes/main'))
app.use('/login', require('./routes/login'))
app.use('/signup', require('./routes/signup'))

app.listen(serverPort, (req, res) => {
    console.log(`Sever is running on port ${serverPort}!`)
})

