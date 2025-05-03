// load in our express framework
const express = require("express");
// load in galaxy model
const { Galaxy } = require("./src/models");
// create a new express instance called "app"
const app = express();
// middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// enable file uploads framework
const fileUpload = require("express-fileupload");
app.use(fileUpload());
// load in our RESTful routers
const routers = require("./src/routers/index.js");
// image upload framework
const imagesRouter = require("./src/routers/images.js");
// load in twig template framework
const twig = require("twig");
app.set("views", __dirname + "/src/views");
app.set("view engine", "twig");
app.set("twig options", { async: true });

// homepage view
app.get("/", async (req, res) => {
  // sample pulling in API data
  const galaxy = await Galaxy.findByPk(2);
  // pass 200 status and inject dynamic title variable
  res
    .status(200)
    .render("home/home", { title: "Star Tracker Library", galaxy });
});

// incorporate css
app.use(express.static("public"));

// register our RESTful routers with our "app"
app.use("/planets", routers.planet);
app.use("/stars", routers.star);
app.use("/galaxies", routers.galaxy);
app.use("/images", imagesRouter);

// set our app to listen on port 3000
app.listen(3000);
