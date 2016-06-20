exports.code404 = (req, res) => {
  res.type("text/html").status(404).render("404");
};

exports.code500 = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500");
};