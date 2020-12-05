const Handlebars = require("handlebars");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8555;
const handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});
app.use(express.json());
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(cors());

const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "classmysql.engr.oregonstate.edu",
  user: "cs290_sharpkel",
  password: "8555",
  database: "cs290_sharpkel",
});

// DUMMY TEST DATA
// const workouts = [
//   {
//     name: "arm-thingy",
//     reps: 2,
//     weight: 25,
//     date: new Date(),
//     unit: "lbs",
//     id: 1,
//   },
//   { name: "squats", reps: 12, weight: 8, date: new Date(), unit: "lbs", id: 2 },
// ];

// rendering the single page app handlebars page
app.get("/", function (req, res, next) {
  pool.query("SELECT * FROM workouts", function (err, rows, fields) {
    if (err) {
      res.render("home", { workouts: [] });
    }
    res.render("home", { workouts: rows });
  });
});

// create a new workout
app.post("/workouts", function (req, res, next) {
  const workout = req.body;
  pool.query(
    "INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (? ? ? ? ?)",
    [
      req.body.name,
      req.body.reps,
      req.body.weight,
      req.body.date,
      req.body.unit === "lbs",
    ],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.status(201).json({
        workout: result[0],
      });
    }
  );
});

// edit a workout given the ID
app.put("/workouts/:id", function (req, res, next) {
  const workoutId = req.params.id;
  const workout = req.body;
  pool.query(
    "UPDATE workouts SET name=?, reps=?, weight=? date=? lbs=? WHERE id=? ",
    [
      req.body.name,
      req.body.reps,
      req.body.weight,
      req.body.date,
      req.body.unit === "lbs",
      workoutId,
    ],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.json({
        workout: result[0],
      });
    }
  );
});

// destroy a workout given the ID
app.delete("/workouts/:id", function (req, res, next) {
  const workoutId = req.params.id;
  pool.query(
    "DELETE FROM workouts WHERE id=?",
    [workoutId],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.json({
        success: true,
      });
    }
  );
});

app.get("/reset-table", function (req, res, next) {
  pool.query("DROP TABLE IF EXISTS workouts", function (err) {
    //replace your connection pool with the your variable containing the connection pool
    const createString =
      "CREATE TABLE workouts(" +
      "id INT PRIMARY KEY AUTO_INCREMENT," +
      "name VARCHAR(255) NOT NULL," +
      "reps INT," +
      "weight INT," +
      "date DATE," +
      "lbs BOOLEAN)";
    pool.query(createString, function (err) {
      res.render("home", { workouts: [] });
    });
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
