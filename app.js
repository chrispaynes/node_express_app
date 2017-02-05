const express = require("express"),
  app = express(),
  routes = require("./routes"),
  errors = require("./lib/errors/errors.js"),
  path = require("path"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  credentials = require("./credentials.js"),
  formidable = require("formidable"),
  helmet = require('helmet'),
  livereload = require("express-livereload"),
  helpers = require("express-helpers")(app),
  morgan = require("morgan"),
  session = require("express-session"),
  parseurl = require("parseurl"),
  fs = require("fs"),
  about = require("./lib/about/index.js"),
  contact = require("./lib/contact/index.js"),
  thankyou = require("./lib/thankyou/index.js"),
  upload = require("./lib/upload/index.js");

app_routes = ["home", "about", "contact", "file-upload", "readfile", "writefile"];



// Disables the X-Powered-By header.
app.disable("x-powered-by");

// app.set configures expressJS app settings.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// app.set('view options', { layout: false });

/*
app.use([path,] function [, function...])
mounts middleware functions at a specified path.
each server request will run through these functions
mounting static image and css files from the "public" directory
mounting logger() to displays log information to the console
*/
app.use(helmet());
app.use(express.static(__dirname + '/public'),
  express.static(__dirname + '/bower_components'),
  morgan("common", { date: "web" }),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  cookieParser(credentials.cookieSecret),
  session({
    resave: false,
    saveUninitialized: true,
    secret: credentials.cookieSecret
  }),
  function(req, res, next) {
    var views = req.session.views;
    var pathname = parseurl(req).pathname;

    if (!views) {
      views = req.session.views = {};
    }

    views[pathname] = (views[pathname] || 0) + 1;

    next();
  }
);


/*
app.locals{} properties specify variables that persist throughout the app.
app.locals makes data available across all app routes and templates.
*/
app.locals = {
  pagetitle: "node_express_app",
  app_routes: ["home", "about", "contact", "file-upload", "readfile", "writefile"],
  link_to: helpers.link_to,
  users: [{ id: 1, name: "Tom" },
    { id: 2, name: "Dick" },
    { id: 3, name: "Harry" }
          ]
};

app.use(about);
app.use(contact);
app.use(upload);
app.use(thankyou);
console.log(errors.code404);

// maps text added after the last URL slash as a request parameter
// sends the parameter to the page to be written 
// app.get("/user/:name?", function(req, res) {
//     let name = req.params.name;
//     res.send(name + " was here");
// });

// app.get(path, callback [, callback ...])
// specifies HTTP GET requests.
app.get(["/", "/index", "/home"], routes.index);
// app.get("/thankyou", routes.thankyou, routes.index);
// app.get("/file-upload", routes.fileUpload);
app.get("/error", errors.error);
app.get("/cookie", routes.cookie);
app.get("/listcookies", routes.listcookies);
app.get("/deletecookies", routes.deletecookies);
app.get("/viewcount", routes.viewcount);
app.get("/readfile", routes.readfile);
app.get("/writefile", routes.writefile);

// app.post(path, callback [, callback ...])
// specifies HTTP POST requests.
app.post("/add", (req, res) => {
  let newItem = req.body.newItem;
  app.locals.users.push({
    id: app.locals.users.length + 1,
    name: newItem
  });
  res.redirect("/");
});

/*
logs user submission from contact page
redirects user to thankyou page
*/
app.post("/process", (req, res) => {
  console.log("Form : " + req.query.form);
  console.log("CSRF token : " + req.body._csrf);
  console.log("Email : " + req.body.email);
  console.log("Question : " + req.body.ques);
  res.redirect(303, "/thankyou");
});


// *** THESE MUST BE PLACED AT THE END OF THE PIPELINE ***
// sends HTTP Status response and text to browser for 404 and 500 errors
app.use(errors.code404);
app.use(errors.code500);

const server = app.listen(4000, (err, res) =>
  err => console.log("Server error"),
  res => console.log("Listening on http://localhost:4000"));

livereload(app, config = {
  watchDir: __dirname + "/"
});
