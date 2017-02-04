const express = require("express");
const app = module.exports = express();
const helpers = require("express-helpers")(app);
const routes = require("../../routes/index.js");

contact = (req, res) => {
  res.render("../lib/contact/contact", {
    title: "Contact",
    classname: "contact",
    csrf: "CSRF token here"
  });
};

app.get("/contact", contact);
