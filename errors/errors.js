exports.code404 = (req, res) => {
  res.type("text/html").status(404)
  res.render("404", {
    title: "404 : Not Found"
  });
};

exports.code500 = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500)
  res.render("500", {
    title: "500: Internal Server Error"
  });
};
