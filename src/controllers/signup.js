const db = require("../utils/nedb.js");
const bcrypt = require("../utils/bcrypt.js");

let signup = {
  registerView: (req, res) => {
    try {
      res.render("register");
    } catch (error) {
      res.render("register");
    }
  },

  register: async (req, res) => {
    const params = req.body;
    const hash = bcrypt.createHash(params.password);
    const userData = {
      ...params,
    };

    userData.password = hash;

    db.insert(userData, (err, row) => {
      if (err !== null) {
        console.log(err);
        return;
      }
      res.json({
        status: 200,
      });
    });
  },

  terms: (req, res) => {
    try {
      res.render("terms");
    } catch {
      res.render("terms");
    }
  },
};

module.exports = signup;
