// Load in Express framework
const express = require(`express`);

// Load in our controller/action instances
const starCtlr = require(`../controllers/star.js`);

// Create a new Router instance and call it "router"
const router = new express.Router();

// RESTful resource mappings
router.get(`/`, starCtlr.index);
router.post(`/`, starCtlr.create);
router.get(`/:id(\d+)`, starCtlr.show);
router.patch(`/:id(\d+)`, starCtlr.update);
router.delete(`/:id(\d+)`, starCtlr.remove);
// association routes
router.post("/:starId(\\d+)/planets", starCtlr.addPlanet);
router.get("/:starId(\\d+)/planets", starCtlr.getPlanetsForStar);
router.delete("/:starId(\\d+)/planets", starCtlr.removePlanet);

// HTML5 specific routes
router.get("/new", starCtlr.form); // shows create form
router.get("/:id(d+)/edit", starCtlr.form); // shows edt form
router.get("/:id(d+)/delete", starCtlr.confirmDelete); // double checks delete
router.post("/:id(d+)/delete", starCtlr.remove); // actually deletes
router.post("/:id(d+)", starCtlr.update); // handles form editing

// export "router"
module.exports = router;
