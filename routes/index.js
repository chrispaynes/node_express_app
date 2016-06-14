
// gets application root route (index.html)
// renders the default.ejs template and sends a HTML string to the client
// by default the app expects templates to be in the /views/ folder
// pass in data to a template within the "locals" parameter
// res.render(view [, locals] [, callback])
exports.index = function(req, res) {
    res.render("default", {
      title: "Home",
      classname: "home",
      users: ["Tom", "Dick", "Harry"]
    });

    // to specify a template folder other than the default /views/ folder...
    // __dirname is a global variable indicating the app's entry point
    // res.render("views", __dirname + "/myCustomTemplateFolder");
};

exports.about = function(req, res) {
    res.render("default", {
      title: "About Us",
      classname: "about"
    });
};