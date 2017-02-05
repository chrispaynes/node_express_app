  const express = require("express");
  const app = module.exports = express();
  const helpers = require("express-helpers")(app);

  module.exports = {
    error: (err, req, res, next) => {
      console.error(err.stack);
      res.render("../lib/errors/error", {
        title: "Error Something Went Wrong"
      });
    },

    code404: (req, res) => {
      res.type("text/html").status(404)
      res.render("../lib/errors/404", {
        title: "404 : Not Found"
      });
    },

    code500: (err, req, res, next) => {
      console.error(err.stack);
      res.status(500)
      res.render("../lib/errors/500", {
        title: "500: Internal Server Error"
      });
    }
  };
