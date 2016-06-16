const express = require("express"),
      app = express(),
      routes = require("./routes")
      livereload = require("express-livereload");


// app.set modifies expressJS application settings
// sets a variable for an expressJS app
app.set("view engine", "ejs");

// app.locals properties persist throughout an application's life
// makes data available across all routes and templates
app.locals = {
  pagetitle: "Global Page Title"
};

// maps text added after the last URL slash as a request parameter
// sends the parameter to the page to be written 
  // app.get("/user/:name?", function(req, res) {
  //     let name = req.params.name;
  //     res.send(name + " was here");
  // });

// specifies actions when a user requests a route
app.get("/", routes.index);
app.get("/about", routes.about);

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
