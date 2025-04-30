// Load in Express framework
const express = require(`express`);

// Load in our controller/action instances
const galaxyCtlr = require(`../controllers/galaxy.js`);

// Create a new Router instance and call it "router"
const router = new express.Router();

// RESTful resource mappings
router.get(`/`, galaxyCtlr.index);
router.post(`/`, galaxyCtlr.create);
router.get(`/:id`, galaxyCtlr.show);
router.patch(`/:id`, galaxyCtlr.update);
router.delete(`/:id`, galaxyCtlr.remove);

// HTML5 specific routes
router.get('/new', galaxyCtlr.form) // shows create form
router.get('/:id/edit', galaxyCtlr.form) // shows edt form
router.get('/:id/delete', galaxyCtlr.confirmDelete) // double checks delete
router.post('/:id/delete', galaxyCtlr.remove) // actually deletes
router.post('/:id', galaxyCtlr.update) // handles form editing

// export "router"
module.exports = router;
