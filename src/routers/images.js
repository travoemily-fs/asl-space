// express and router imports
const express = require("express");
const router = express.Router();

// load in image controller
const imageCtlr = require("../controllers/image");

// define basic image routes
router.get("/", imageCtlr.index); // shows all images (placeholder)
router.get("/new", imageCtlr.form); // shows upload form (placeholder)
router.get("/:id(\\d+)", imageCtlr.show); // show one image (placeholder)
router.delete("/:id(\\d+)", imageCtlr.remove); // delete image 

// export the router
module.exports = router;
