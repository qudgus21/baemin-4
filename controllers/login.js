//db연결

let login = {
  page: (req, res) => {
    try {
      res.render("login", { message: "test~" });
    } catch (error) {
      res.render("login", { message: "error~" });
    }
  },
};

module.exports = login;
