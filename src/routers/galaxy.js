// Load in Express framework
const express = require(`express`);

// Load in our controller/action instances
const galaxyCtlr = require(`../controllers/galaxy.js`);

// Create a new Router instance and call it "router"
const router = new express.Router();

// RESTful resource mappings
router.get(`/`, galaxyCtlr.index);
router.post(`/`, galaxyCtlr.create);
router.get(`/:id(\d+)`, galaxyCtlr.show);
router.patch(`/:id(\d+)`, galaxyCtlr.update);
router.delete(`/:id(\d+)`, galaxyCtlr.remove);

// HTML5 specific routes
router.get('/new', galaxyCtlr.form) // shows create form
router.get('/:id(\d+)/edit', galaxyCtlr.form) // shows edt form
router.get('/:id(\d+)/delete', galaxyCtlr.confirmDelete) // double checks delete
router.post('/:id(\d+)/delete', galaxyCtlr.remove) // actually deletes
router.post('/:id(\d+)', galaxyCtlr.update) // handles form editing

// export "router"
module.exports = router;
