const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const serverPort = 3000;
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use("/static", express.static("static"));
app.use("/images", express.static(path.join(__dirname, "static/images")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/css", express.static(path.join(__dirname, "css")));

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
s