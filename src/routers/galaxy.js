// Load in Express framework
const express = require(`express`);

// Load in our controller/action instances
const galaxyCtlr = require(`../controllers/galaxy.js`);

// Create a new Router instance and call it "router"
const router = new express.Router();

// RESTful resource mapping
router.get(`/`, galaxyCtlr.index); // read all
router.post(`/`, galaxyCtlr.create); // create handler
router.patch(`/:id(\d+)`, galaxyCtlr.update); // handles updates
router.delete(`/:id(\d+)`, galaxyCtlr.remove); // handles delete

// HTML5 specific routes
router.get("/new", galaxyCtlr.form); // create new
router.get("/:id(\\d+)/edit", galaxyCtlr.form); // shows edt form
router.get("/:id(\\d+)/delete", galaxyCtlr.confirmDelete); // double checks delete
router.post("/:id(\\d+)/delete", galaxyCtlr.remove); // actually deletes
router.post("/:id(\\d+)", galaxyCtlr.update); // handles updates

// RESTful mapping to show one
router.get(`/:id(\\d+)`, galaxyCtlr.show); // shows one

// export "router"
module.exports = router;
