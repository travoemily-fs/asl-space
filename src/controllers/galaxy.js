const { Galaxy, Star, Planet } = require("../models");

/* my notes
relationships to remember:
galaxy > HAS MANY > stars

order of functions:
1. index  (GET all)
2. show (GET by ID)
3. create (POST)
4. edit (PATCH)
5. delete confirmation
6. remove (DELETE)
7. form method 
*/

// INDEX localhost:3000/galaxies
const index = async (req, res) => {
  const galaxies = await Galaxy.findAll({
    include: [Star, Planet],
  });
  res.render("galaxies/index", { galaxies });
};

// SHOW localhost:3000/galaxies/:id
const show = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id, {
      include: [Star, Planet],
    });
    if (!galaxy) {
      // handle 404 not found error
      return res.status(404).render("error", { error: "Galaxy not found" });
    }
    res.render("galaxies/show", { galaxy });
  } catch (err) {
    // including console log for debugging
    console.error("Error retrieving galaxy by ID:", err);
    // handle 500 server side error
    res
      .status(500)
      .render("error", { error: "Server error while retrieving galaxy." });
  }
};

// CREATE(POST) localhost:3000/galaxies/create
const create = async (req, res) => {
  try {
    const { name, size, description } = req.body;
    const galaxy = await Galaxy.create({ name, size, description });
    // pass the galaxy id for middleware use
    req.imageId = galaxy.id;
    // manually invoke upload middleware
    if (req.files && req.files.image) {
      const { uploadImage } = require("../middlewares");
      await uploadImage(req, res, () => {});
    }
    res.redirect("/galaxies");
  } catch (err) {
    // including console logs for debugging
    console.error("Error creating galaxy:", err);
    // handle 500 server side error
    res.status(500).render("error", { error: "Failed to create galaxy" });
  }
};

// EDIT(PATCH) localhost:3000/galaxies/:id/edit
const update = async (req, res) => {
  try {
    const { name, size, description } = req.body;
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (!galaxy) {
      // handle 404 not found error
      return res.status(404).render("error", { error: "Galaxy not found" });
    }
    // pass the galaxy id for middleware use
    req.imageId = galaxy.id;
    await galaxy.update({ name, size, description });
    // manually invoke upload middleware
    if (req.files && req.files.image) {
      const { uploadImage } = require("../middlewares");
      await uploadImage(req, res, () => {});
    }
    res.redirect("/galaxies");
  } catch (err) {
    // including console logs for debugging
    console.error("Error updating galaxy:", err);
    // handle 500 server side error
    res.status(500).render("error", { error: "Failed to update galaxy" });
  }
};

// DELETE deletion confirmation localhost:3000/galaxies/:id/delete
const confirmDelete = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (!galaxy) {
      // handle 404 not found error
      return res.status(404).render("error", { error: "Galaxy not found" });
    }
    res.render("galaxies/confirm_delete", {
      title: "Confirm deletion",
      galaxy,
    });
  } catch (err) {
    // including console logs for debugging
    console.error("Error loading delete confirmation:", err);
    // handle 500 server side error
    res.status(500).render("error", { error: "Server error encounter" });
  }
};

// DELETE localhost:3000/galaxies/:id
const remove = async (req, res) => {
  try {
    const deleted = await Galaxy.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleted) {
      // handles 404 not found error
      return res.status(404).render("error", {
        error: "Galaxy not found.",
      });
    }
    res.redirect("/galaxies");
  } catch (err) {
    // including console logs for debugging
    console.error("Error deleting galaxy:", err);
    // handle 500 server side error
    res.status(500).render("error", {
      error: "Server error encountered",
    });
  }
};

// FORM controller
const form = async (req, res) => {
  if (typeof req.params.id !== "undefined") {
    const galaxy = await Galaxy.findByPk(req.params.id);
    return res.render("galaxies/edit", { galaxy });
  } else {
    return res.render("galaxies/create", { galaxy: {} });
  }
};

module.exports = {
  index,
  show,
  create,
  update,
  remove,
  confirmDelete,
  form,
};
