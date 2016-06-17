const express = require("express"),
      app = express(),
      routes = require("./routes"),
      livereload = require("express-livereload"),
      helpers = require('express-helpers')(app);

// app.set modifies expressJS application settings
// sets a variable for an expressJS app
app.set("view engine", "ejs");

// Mount the middleware at "/static" to serve static content only when their request path is prefixed with "/static".

// GET /style.css etc
app.use(express.static(__dirname + '/public'));

// app.locals properties persist throughout an application's life
// makes data available across all routes and templates


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

// specifies actions when a user requests a route
app.get(["/", "/index", "/home"], routes.index);
app.get("/about", routes.about);
app.get("/contact", routes.contact);

// returns bad routes for pattern matching on nonexistant routes
app.get("*", function(req, res) {
    res.send("Bad Route");
});

const server = app.listen(4000, function(){
    console.log("Listening on http://localhost:4000"); 
});

livereload(app, config={
  watchDir: __dirname + "/"
});
