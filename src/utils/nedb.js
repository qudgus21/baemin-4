const Nedb = require("nedb");

const db = new Nedb({
  filename: "database/user.db", // DB 파일의 위치 및 이름
  autoload: true,
});

module.exports = db;
