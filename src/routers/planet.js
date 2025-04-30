// Load in Express framework
const express = require(`express`);

// Load in our controller/action instances
const planetCtlr = require(`../controllers/planet.js`);

// Create a new Router instance and call it "router"
const router = new express.Router();

// RESTful resource mappings
router.get(`/`, planetCtlr.index);
router.post(`/`, planetCtlr.create);
router.get(`/:id`, planetCtlr.show);
router.patch(`/:id`, planetCtlr.update);
router.delete(`/:id`, planetCtlr.remove);
// association routes 
router.post("/:planetId/stars", planetCtlr.addStar);
router.get("/:planetId/stars", planetCtlr.getStarsForPlanet);
router.delete("/:planetId/stars", planetCtlr.removeStar);

// HTML5 specific routes
router.get("/new", planetCtlr.form); // shows create form
router.get("/:id/edit", planetCtlr.form); // shows edt form
router.get("/:id/delete", planetCtlr.confirmDelete); // double checks delete
router.post("/:id/delete", planetCtlr.remove); // actually deletes
router.post("/:id", planetCtlr.update); // handles form editing

// export "router"
module.exports = router;
