//db연결

let main = {
    page : (req,res) => {
        try {
            res.render("test", { message: "test~" });
        } catch (error) {
            res.render("test", { message: "error~"});
        }
    },


    // test: (req, res) => { 
    //     try {
    //         res.render("test", { pageTitle: "home", videos });
    //     } catch (error) {
    //         res.render("test", { pageTitle: "home", videos: [] });
    //     }
    // }
};

module.exports = main;




  