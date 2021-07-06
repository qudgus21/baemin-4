//db연결

let main = {
  page: (req, res) => {
    try {
      res.render("test", { message: "test~" });
    } catch (error) {
      res.render("test", { message: "error~" });
    }
  },
};

module.exports = main;
