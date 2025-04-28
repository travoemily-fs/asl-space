// load in our express framework
const express = require("express");
// load in galaxy model
const { Galaxy } = require("./src/models");
// create a new express instance called "app"
const app = express();
// middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// load in our RESTful routers
const routers = require("./src/routers/index.js");
// load in twig template framework
app.set("views", __dirname + "/src/views");
app.set("view engine", "twig");

// homepage view
app.get("/", async (req, res) => {
  // sample pulling in API data
  const galaxy = await Galaxy.findByPk(2);
  // pass 200 status and inject dynamic title variable
  res
    .status(200)
    .render("home/home", { title: "Star Tracker Library", galaxy });
});

// register our RESTful routers with our "app"
app.use("/planets", routers.planet);
app.use("/stars", routers.star);
app.use("/galaxies", routers.galaxy);

// set our app to listen on port 3000
app.listen(3000);
