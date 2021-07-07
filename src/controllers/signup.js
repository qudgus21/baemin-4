let signup = {
  phone: (req, res) => {
    try {
      res.render("phone");
    } catch (error) {
      res.render("phone");
    }
  },

  register: (req, res) => {
    try {
      res.render("register");
    } catch (error) {
      res.render("register");
    }
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
