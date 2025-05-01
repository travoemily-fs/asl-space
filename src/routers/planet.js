// Load in Express framework
const express = require(`express`);

// Load in our controller/action instances
const planetCtlr = require(`../controllers/planet.js`);

// Create a new Router instance and call it "router"
const router = new express.Router();

// RESTful resource mappings
router.get(`/`, planetCtlr.index);
router.post(`/`, planetCtlr.create);
router.get(`/:id(\d+)`, planetCtlr.show);
router.patch(`/:id(\d+)`, planetCtlr.update);
router.delete(`/:id(\d+)`, planetCtlr.remove);
// association routes
router.post("/:planetId(\\d+)/stars", planetCtlr.addStar);
router.get("/:planetId(\\d+)/stars", planetCtlr.getStarsforPlanet);
router.delete("/:planetId(\\d+)/stars", planetCtlr.removeStar);

// HTML5 specific routes
router.get("/new", planetCtlr.form); // shows create form
router.get("/:id(\d+)/edit", planetCtlr.form); // shows edt form
router.get("/:id(\d+)/delete", planetCtlr.confirmDelete); // double checks delete
router.post("/:id(\d+)/delete", planetCtlr.remove); // actually deletes
router.post("/:id(\d+)", planetCtlr.update); // handles form editing

// export "router"
module.exports = router;
