let db = require('../utils/nedb');
let crypto = require('../utils/crypto')

let signup = {

  registerView: (req, res) => {
    try {
      res.render("register");
    } catch (error) {
      res.render("register");
    }
  },


  register: async (req, res) => {
    let params = req.body
    const { password, salt } = await crypto(params.pwd);

    let userData = {
      ...params
    }
    userData.pwd = password;
    userData.salt = salt;


    db.insert(userData, (err, row) => {
      if (err !== null) {
        console.log(err);
        return;
      }
      res.json({
        status: 200,
      })
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
