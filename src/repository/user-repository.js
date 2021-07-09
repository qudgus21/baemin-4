import db from "../utils/nedb.js";

export const findOneUserByEmail = (email) =>
  new Promise((resolve, reject) => {
    db.findOne({ email }, (err, user) => {
      if (err) {
        reject(new Error("db error"));
      } else {
        resolve(user);
      }
    });
  });
