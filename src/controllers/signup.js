let signup = {
  phone: (req, res) => {
    try {
      res.render("phone");
    } catch (error) {
      res.render("phone");
    }
  },

  userInfo: (req, res) => {
    try {
      res.render("userInfo");
    } catch (error) {
      res.render("userInfo");
    }
  },
};

module.exports = signup;