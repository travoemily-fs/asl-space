// load in express framework
const express = require("express");

// create a new router instance and call it "router"
const router = new express.Router();

// load in our controller/action instances
const planetCtlr = require("../controllers/planet.js");

// RESTful resource mappings
router.get("/", planetCtlr.index); // show all
router.post("/", planetCtlr.create); // create new
router.get("/:id(\\d+)", planetCtlr.show); // show one by id
router.patch("/:id(\\d+)", planetCtlr.update); // edit one
router.delete("/:id(\\d+)", planetCtlr.remove); // delete one

// association routes
router.post("/:planetId(\\d+)/stars", planetCtlr.addStar);
router.get("/:planetId(\\d+)/stars", planetCtlr.getStarsforPlanet);
router.delete("/:planetId(\\d+)/stars", planetCtlr.removeStar);

// HTML5 specific routes
router.get("/new", planetCtlr.form); // shows create form
router.get("/:id(\\d+)/edit", planetCtlr.form); // shows edit form
router.get("/:id(\\d+)/delete", planetCtlr.confirmDelete); // double checks delete
router.post("/:id(\\d+)/delete", planetCtlr.remove); // actually deletes
router.post("/:id(\\d+)", planetCtlr.update); // handles form editing

// export "router"
module.exports = router;
