const express = require("express");
const app = module.exports = express();
const helpers = require("express-helpers")(app);

about = (req, res) => {
  res.render("../lib/about/about", {
    title: "About",
    classname: "about"
  });
};

app.get("/about", about);
