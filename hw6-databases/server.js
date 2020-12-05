const Handlebars = require("handlebars");
const express = require("express");
const app = express();
const port = 3000;
const handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});
app.use(express.json());
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.use(express.static("public"));

const workouts = [
  {
    name: "arm-thingy",
    reps: 2,
    weight: 25,
    date: new Date(),
    unit: "lbs",
    id: 1,
  },
  { name: "squats", reps: 12, weight: 8, date: new Date(), unit: "lbs", id: 2 },
];

// rendering the single page app handlebars page
app.get("/", function (req, res) {
  res.render("home", { workouts });
});

// create a new workout
app.post("/workouts", function (req, res) {
  const workout = req.body;
  res.status(201).json({
    workout,
  });
});

// edit a workout given the ID
app.put("/workouts/:id", function (req, res) {
  const workoutId = req.params.id;
  const workout = req.body;
  res.json({
    workout,
  });
});

// destroy a workout given the ID
app.delete("/workouts/:id", function (req, res) {
  const workoutId = req.params.id;
  res.json({
    success: true,
  });
});

app.use(function (req, res) {
  res.status(404).json({ error: "Route not found " + req.route });
});

app.use(function (err, req, res, next) {
  res.status(500).json({
    error: err.message,
  });
});

app.listen(port, () => console.log(`App listening to port ${port}`));
