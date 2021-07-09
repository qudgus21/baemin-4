import path from "path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import headerMiddleware from "./middlewares/header-middleware.js";
import homeRouter from "./routes/home.js";
import loginRouter from "./routes/login.js";
import signupRouter from "./routes/signup.js";

const srcPath = path.join(path.resolve(), "src");
const serverPort = process.env.PORT || 8080;
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(srcPath, "views"));

app.use("/static", express.static(path.join(srcPath, "static")));
app.use("/images", express.static(path.join(srcPath, "static/images")));
app.use("/js", express.static(path.join(srcPath, "js")));
app.use("/css", express.static(path.join(srcPath, "css")));

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(headerMiddleware.setEncodingGzip);

app.use("/", homeRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);

app.listen(serverPort, (req, res) => {
  console.log(`Sever is running on port ${serverPort}!`);
});
