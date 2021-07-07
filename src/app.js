let express = require("express");
let cors = require("cors");
let cookieParser = require("cookie-parser");

const serverPort = 8000;
const app = express();

app.set("view engine", "pug");

app.use("/images", express.static("static/images"));
app.use("/js", express.static("js"));
app.use("/static", express.static("static"));
app.use("/css", express.static("css"));

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/main"));
app.use("/login", require("./routes/login"));
app.use("/signup", require("./routes/signup"));

app.listen(serverPort, (req, res) => {
  console.log(`Sever is running on port ${serverPort}!`);
});

