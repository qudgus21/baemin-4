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
};

module.exports = signup;