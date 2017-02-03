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

exports.about = (req, res) => {
  res.render("about", {
    title: "About",
    classname: "about"
  });
};

exports.contact = (req, res) => {
  res.render("contact", {
    title: "Contact",
    classname: "contact",
    csrf: "CSRF token here"
  });
};

exports.thankyou = (req, res) => res.render("thankyou");

// renders view for /file-upload page
exports.fileUpload = (req, res) => {
  let now = new Date()
  res.render("file_upload", {
    title: "File Upload",
    year: now.getFullYear(),
    month: now.getMonth()
  })
};

// parses file upload and redirects upon error or success
exports.fileUploadYD = (req, res) => {
  new formidable.IncomingForm().parse(req, (err, fields, file) => {
    if (err) {
      return res.redirect(303, "/error")
    } else {
      console.log("received file");
    }

    console.log(file);
    res.redirect(303, "/thankyou")
  })
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
