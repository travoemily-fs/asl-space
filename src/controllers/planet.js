const { Planet, Galaxy, Star } = require("../models");

/* my notes
relationships to remember:
planet > BELONGS TO MANY > stars
planet > BELONGS TO > galaxy

order of functions:
1. index  (GET all)
2. show (GET by ID)
3. create (POST)
4. edit (PATCH)
5. delete confirmation
6. remove (DELETE)
7. form method

association functions:
1. add star association (POST)
2. remove star association (DELETE)

*/

// INDEX localhost:3000/planets
const index = async (req, res) => {
  const planets = await Planet.findAll({
    include: [Galaxy, Star],
  });
  res.render("planets/index", { planets });
};

// SHOW localhost:3000/planets/ID
const show = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id, {
      include: [Galaxy, Star],
    });
    if (!planet) {
      // handles 404 not found error
      return res.status(404).render("error", {
        error: "Planet not found.",
      });
    }
    res.render("planets/show", {
      planet,
    });
  } catch (err) {
    // including console logs for debugging
    console.error("Error retrieving planet by ID:", err);
    // handle 500 server side error
    res.status(500).render("error", {
      error: "Server error while retrieving planet.",
    });
  }
};

// CREATE localhost:3000/planets
const create = async (req, res) => {
  try {
    const { name, size, description, GalaxyId } = req.body;
    const planet = await Planet.create({ name, size, description, GalaxyId });
    // pass planet id to middleware
    req.imageId = planet.id;
    // find associated stars by galaxy assigned to planet
    const galaxy = await Galaxy.findByPk(GalaxyId, { include: Star });
    if (galaxy && galaxy.Stars && galaxy.Stars.length > 0) {
      const starIds = galaxy.Stars.map((star) => star.id);
      await planet.addStars(starIds);
    }
    res.redirect("/planets");
  } catch (err) {
    // including console logs for debugging
    console.error("Error creating planet:", err);
    // handle 500 server side error
    res.status(500).render("error", {
      error: "Server error while creating planet.",
    });
  }
};

// UPDATE localhost:3000/planets/:id
const update = async (req, res) => {
  try {
    const { name, size, description, GalaxyId } = req.body;
    const planet = await Planet.findByPk(req.params.id);
    // pass planet id to middleware
    req.imageId = planet.id;
    if (!planet) {
      // handle 404 not found error
      return res.status(404).render("error", { error: "Planet not found" });
    }
    // update planet info
    await planet.update({ name, size, description, GalaxyId });
    // checks for galaxie associations
    const galaxy = await Galaxy.findByPk(GalaxyId, { include: Star });
    // if galaxy was updated, replace with new stars, if not then print out existing star associations
    if (galaxy && galaxy.Stars && galaxy.Stars.length > 0) {
      const starIds = galaxy.Stars.map((star) => star.id);
      await planet.setStars(starIds);
    }
    res.redirect("/planets");
  } catch (err) {
    // including console logs for debugging
    console.error("Error updating planet:", err);
    // handle 500 server side error
    res.status(500).render("error", { error: "Failed to update planet" });
  }
};

// DELETE deletion confirmation localhost:3000/planets/:id/delete
const confirmDelete = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (!planet) {
      // handle 404 not found error
      return res.status(404).render("error", { error: "Planet not found" });
    }
    res.render("planets/confirm_delete", {
      title: "Confirm deletion",
      planet,
    });
  } catch (err) {
    // including console logs for debugging
    console.error("Error loading delete confirmation:", err);
    // handle 500 server side error
    res.status(500).render("error", { error: "Server error encounter" });
  }
};

// DELETE localhost:3000/planets/ID
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Planet.destroy({
      where: { id },
    });
    res.redirect("/planets");
  } catch (err) {
    // including console logs for debugging
    console.error("Error deleting planet:", err);
    // handle 500 server side error
    res.status(500).render("error", {
      error: "Server error while deleting planet.",
    });
  }
};

// establish route for ADDING stars + planets association
const addStar = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.planetId);
    const star = await Star.findByPk(req.body.starId);
    // if star and planet associate
    if (planet && star) {
      await planet.addStar(star);
      // handles 200 successful association
      res.status(200).json({
        message: "Association successfully established.",
      });
    } else {
      // handles 404 not found error
      res.status(404).json({
        error: "Star or planet not found.",
      });
    }
  } catch (err) {
    // including error for debugging
    console.error("Error associating planet to star:", err);
    // handle 500 server side error
    res.status(500).json({
      error: "Failed to associate planet with star",
    });
  }
};

// establish route for DELETING stars + planets association
const removeStar = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.planetId);
    const star = await Star.findByPk(req.body.starId);
    // if connection is there, remove it
    if (planet && star) {
      await planet.removeStar(star);
      // handles 200 successful deletion
      res.status(200).json({
        message: "Association successfully deleted.",
      });
    } else {
      // handles 404 not found error
      res.status(404).json({
        error: "Star or planet not found.",
      });
    }
  } catch (err) {
    // including error for debugging
    console.error("Error disassociating planet from star:", err);
    // handle 500 server side error
    res.status(500).json({
      error: "Failed to disassociate planet with star",
    });
  }
};

// establish route for GET ALL stars + planet associations
const getStarsforPlanet = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.planetId, {
      include: Star,
    });
    // if star isn't found, handle 404 not found error
    if (!planet) {
      return res.status(404).json({
        error: "Star not found",
      });
    }
    const stars = await planet.getStars();
    // handles 200 success
    res.status(200).json(stars);
  } catch (err) {
    // including error for debugging
    console.error("Error fetching planets for star:", err);
    // handles 500 server side error
    res.status(500).json({
      error: "Failed to fetch planets for star.",
    });
  }
};

// FORM controller
const form = async (req, res) => {
  const galaxies = await Galaxy.findAll();
  const stars = await Star.findAll();
  let planet = null;

  if (req.params.id !== undefined) {
    planet = await Planet.findByPk(req.params.id, {
      include: Star,
    });
    res.render("planets/edit", {
      planet,
      galaxies,
      stars,
    });
  } else {
    res.render("planets/create", {
      planet,
      galaxies,
      stars,
    });
  }
};

module.exports = {
  index,
  show,
  create,
  update,
  remove,
  confirmDelete,
  addStar,
  removeStar,
  getStarsforPlanet,
  form,
};
