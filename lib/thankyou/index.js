const express = require("express");
const app = module.exports = express();
const helpers = require("express-helpers")(app);

thankyou = (req, res) => {
  res.render("../lib/thankyou/thankyou")
};

app.get("/thankyou", thankyou);
