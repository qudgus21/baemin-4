const db = require("../utils/nedb.js");

const findOneUserByEmail = (email) =>
  new Promise((resolve, reject) => {
    db.findOne({ email }, (err, user) => {
      if (err) {
        reject(new Error("db error"));
      } else {
        resolve(user);
      }
    });
  });

module.exports = {
  findOneUserByEmail,
};
