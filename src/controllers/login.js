import { verifyPassword } from "../utils/bcrypt.js";
import { findOneUserByEmail } from "../repository/user-repository.js";

const loginController = {
  renderView: (req, res) => {
    try {
      res.render("login", { message: "test~" });
    } catch (error) {
      res.render("login", { message: "error~" });
    }
  },
  login: async (req, res) => {
    res.setHeader("Content-Type", "application/json");

    try {
      const { email, password } = req.body;

      const user = await findOneUserByEmail(email);

      if (user === null) {
        res.status(400);
        res.json({
          message: "Incorrect email or password",
        });
      }

      const isEqualPassword = verifyPassword({ password, hash: user.password });

      if (isEqualPassword) {
        res.status(200);
        res.json({
          message: "Login success",
          ...user,
        });
      } else {
        res.status(400);
        res.json({
          message: "Incorrect email or password",
        });
      }
    } catch (err) {
      console.error(err);

      res.status(500);
      res.json({
        message: err.message,
      });
    }
  },
};

export default loginController;
