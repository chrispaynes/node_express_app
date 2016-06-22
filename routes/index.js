const formidable = require("formidable")

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
  })};

// parses file upload and redirects upon error or success
exports.fileUploadYD = (req, res) => {
  formidable.IncomingForm().parse(req, (err, fields, file) => {
    if(err) {
      return res.redirect(303, "/error")         
    }else {
      console.log("received file"); 
    }

    console.log(file);
    res.redirect(303, "/thankyou")
  })
};