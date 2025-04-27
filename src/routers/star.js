// Load in Express framework
const express = require(`express`);

// Load in our controller/action instances
const starCtlr = require(`../controllers/star.js`);

// Create a new Router instance and call it "router"
const router = new express.Router();

// RESTful resource mappings
router.get(`/`, starCtlr.index);
router.post(`/`, starCtlr.create);
router.get(`/:id`, starCtlr.show);
router.patch(`/:id`, starCtlr.update);
router.delete(`/:id`, starCtlr.remove);
// association routes
router.post("/:starId/planets", starCtlr.addPlanet);
router.get("/:starId/planets", starCtlr.getPlanetsForStar);
router.delete("/:starId/planets", starCtlr.removePlanet);

// export "router"
module.exports = router;
