const express = require("express"),
      app = express(),
      routes = require("./routes"),
      livereload = require("express-livereload"),
      helpers = require("express-helpers")(app),
      morgan = require("morgan");

// app.set modifies expressJS application settings
// sets a variable for an expressJS app
app.set("view engine", "ejs");

/*
app.use([path,] function [, function...])
mounts middleware functions at a specified path.
each server request will run through these functions
mounting static image and css files from the "public" directory
mounting logger() to displays log information to the console
*/
app.use(express.static(__dirname + '/public'),
        morgan("common", {date: "web"})
);

/*
app.locals{} properties specify variables that persist throughout the app
app.locals makes data available across all app routes and templates
*/
app.locals = {
  pagetitle: "node_express_app",
  app_routes: ["home", "about", "contact"],
  link_to: helpers.link_to
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

// sends text error to the browser when a user requests a nonexistant route
app.get("*", (req, res) => res.status(404).send("Bad Route"));

const server = app.listen(4000, (err, res) =>
  err => console.log("Server error"),
  res => console.log("Listening on http://localhost:4000"));

livereload(app, config={
  watchDir: __dirname + "/"
});
