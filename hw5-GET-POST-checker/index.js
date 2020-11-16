var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require("body-parser");
var handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.get("/", function (req, res, next) {
  res.render("get", {
    message: "GET Request Received",
    parameters: req.query,
  });
});

app.post("/", function (req, res, next) {
  res.render("post", {
    message: "POST Request Received",
    parameters: req.query,
    body: req.body,
  });
});

app.use(function (req, res) {
  res.status(404);
  res.render("404");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type("plain/text");
  res.status(500);
  res.render("500");
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
