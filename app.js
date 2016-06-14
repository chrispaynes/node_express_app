var express = require("express");
var app = express();

// app.set modifies expressJS application settings
// sets a variable for an expressJS app
app.set("view engine", "ejs");

// gets application root route (index.html)
// renders the default.ejs template and sends a HTML string to the client
// by default the app expects templates to be in the /views/ folder
// pass in data as a second parameter
// res.render(view [, locals] [, callback])
app.get("/", function(req, res) {
    res.render("default", {
      title: "Home",
      classname: "home",
      users: ["Tom", "Dick", "Harry"]
    });

    // to specify a template folder other than the default /views/ folder...
    // __dirname is a global variable indicating the app's entry point
    // res.render("views", __dirname + "/myCustomTemplateFolder");
});

app.get("/about", function(req, res) {
    res.render("default", {
      title: "About Us",
      classname: "about"
    });
});

// maps text added after the last URL slash as a request parameter
// sends the parameter to the page to be written 
  // app.get("/user/:name?", function(req, res) {
  //     let name = req.params.name;
  //     res.send(name + " was here");
  // });


// returns bad routes for pattern matching on nonexistant routes
app.get("*", function(req, res) {
    res.send("Bad Route");
});


var server = app.listen(4000, function(){
    console.log("Listening on http://localhost:4000");    
});