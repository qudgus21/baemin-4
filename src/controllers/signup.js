//db연결

let signup = {
  page: (req, res) => {
    try {
      res.render("test3", { message: "test~" });
    } catch (error) {
      res.render("test3", { message: "error~" });
    }
  },
};

module.exports = signup;
