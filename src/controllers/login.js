//db연결

let login = {
    page : (req,res) => {
        try {
            res.render("test2", { message: "test~" });
        } catch (error) {
            res.render("test2", { message: "error~"});
        }
    },

    // test : (req,res) => {
    //     try {
    //         res.render("test2", { message: "test~" });
    //     } catch (error) {
    //         res.render("test2", { message: "error~"});
    //     }
    // },
};

module.exports = login;
