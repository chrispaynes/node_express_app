const express = require("express");
const app = module.exports = express();
const helpers = require("express-helpers")(app);
const formidable = require("formidable");

upload = (req, res) => {
  let now = new Date();

  res.render("../lib/upload/upload", {
    title: "File Upload",
    year: now.getFullYear(),
    month: now.getMonth()
  })
};

// parses file upload and redirects upon error or success
fileUploadYD = (req, res) => {
  new formidable.IncomingForm().parse(req, (err, fields, file) => {
    return err ? res.redirect(303, "/error") : res.redirect(303, "/thankyou");
  })
};

app.get("/file-upload", upload);
// app.post(path, callback [, callback ...])
// specifies HTTP POST requests.
app.post("/file-upload/:year/:month", fileUploadYD);
