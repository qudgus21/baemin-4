import db from "../utils/nedb.js";
import { createHash } from "../utils/bcrypt.js";

const signupController = {
  renderView: (req, res) => {
    try {
      res.render("signup");
    } catch (error) {
      res.render("signup");
    }
  },

  register: async (req, res) => {
    try {
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
    } catch (err) {
      console.error(err);

      res.status(500);
      res.json({
        message: "server error",
      });
    }
  },
};

export default signupController;
