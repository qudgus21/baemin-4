import db from "../utils/nedb.js";
import { createHash } from "../utils/bcrypt.js";

const signupController = {
  registerView: (req, res) => {
    try {
      res.render("register");
    } catch (error) {
      res.render("register");
    }
  },

  register: async (req, res) => {
    const params = req.body;
    const hash = createHash(params.password);
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
    } catch (err) {
      console.error(err);
      res.render("terms");
    }
  },
  checkTerms: (req, res) => {
    try {
      res.json({
        message: "test",
        ...req.body,
      });
    } catch (err) {
      console.error(err);
    }
  },
};

export default signupController;
