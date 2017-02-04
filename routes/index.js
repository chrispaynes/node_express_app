const formidable = require("formidable"),
  fs = require("fs");

/*
gets application root route (index.html)
renders the default.ejs template and sends a HTML string to the client
by default the app expects templates to be in the /views/ folder
pass in data to a template within the "locals" parameter
res.render(view [, locals] [, callback])
*/
exports.index = (req, res) => {
  res.render("index", {
    title: "Index",
    classname: "home"
  });

  // to specify a template folder other than the default /views/ folder...
  // __dirname is a global variable indicating the app's entry point
  // res.render("views", __dirname + "/myCustomTemplateFolder");
};

// sets and displays the cookie names
exports.cookie = (req, res) => {
  res.cookie("username", "User Name", { expire: new Date() + 9999 });
  res.send("Username has a value of User Name;")
};

// outputs all cookies to the console
exports.listcookies = (req, res) => {
  console.log("Cookies:", req.cookies);
  res.send("Look in the console to view cookies");
};

// deletes cookies
exports.deletecookies = (req, res) => {
  res.clearCookie("username").send("username cookie deleted");
};

// counts the number of times a user views the /viewcounts page
exports.viewcount = (req, res, next) => {
  res.send("You viewed this page " + req.session.views["/viewcount"] + " times")
};

// reads the contents of a file
exports.readfile = (req, res, next) => {
  fs.readFile("./public/readtext.txt", (err, data) => {
    err => console.error(err);
    res.send("The File: " + data.toString());
  });
};

// writes the contents of a file then reads it
exports.writefile = (req, res, next) => {
  fs.writeFile("./public/newWriteFile.txt",
    "The newly written text is here", (err) => {
      err => console.error(err)
    });

  fs.readFile("./public/newWriteFile.txt", (err, data) => {
    err => console.error(err);
    res.send("The File: " + data.toString());
  });
};
