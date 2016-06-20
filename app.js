const express = require("express"),
      app = express(),
      routes = require("./routes"),
      errors = require("./errors/errors"),
      path = require("path"),
      bodyParser = require("body-parser")
      livereload = require("express-livereload"),
      helpers = require("express-helpers")(app),
      morgan = require("morgan");

app.disable("x-powered-by");

// app.set(name, value) configures expressJS app settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/*
app.use([path,] function [, function...])
mounts middleware functions at a specified path.
each server request will run through these functions
mounting static image and css files from the "public" directory
mounting logger() to displays log information to the console
*/
app.use(express.static(__dirname + '/public'),
        express.static(__dirname + '/bower_components'),
        morgan("common", {date: "web"}),
        bodyParser.urlencoded({ extended: false }),
        bodyParser.json()
);

/*
app.locals{} properties specify variables that persist throughout the app
app.locals makes data available across all app routes and templates
*/
app.locals = {
  pagetitle: "node_express_app",
  app_routes: ["home", "about", "contact"],
  link_to: helpers.link_to,
  users: [{id: 1, name: "Tom"},
          {id: 2, name: "Dick"},
          {id: 3, name: "Harry"}
          ]
};

// maps text added after the last URL slash as a request parameter
// sends the parameter to the page to be written 
  // app.get("/user/:name?", function(req, res) {
  //     let name = req.params.name;
  //     res.send(name + " was here");
  // });

// app.get(path, callback [, callback ...])
// specifies actions when a user requests a route
app.get(["/", "/index", "/home"], routes.index);
app.get("/about", routes.about);
app.get("/contact", routes.contact);

// sends HTTP Status response and text to browser for 404 and 500 errors
app.use(errors.code404);
app.use(errors.code500);

// app.post(path, callback [, callback ...])
// posts new name to list of user names
app.post("/add", (req, res) => {
    let newItem = req.body.newItem;
    app.locals.users.push({
        id: app.locals.users.length + 1,
        name: newItem
    });
    res.redirect("/");
  });

const server = app.listen(4000, (err, res) =>
  err => console.log("Server error"),
  res => console.log("Listening on http://localhost:4000"));

livereload(app, config={
  watchDir: __dirname + "/"
});
