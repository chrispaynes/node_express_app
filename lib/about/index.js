const express = require("express");
const app = module.exports = express();
const helpers = require("express-helpers")(app);
const routes = require("../../routes/index.js");
pagetitle = app.locals.pagetitle;
app_routes = ["home", "about", "contact", "file-upload", "readfile", "writefile"];

about = (req, res) => {
  res.render("../lib/about/about", {
    pagetitle: "Node Express App",
    title: "About",
    classname: "about"
  });
};

app.get("/about", about);
