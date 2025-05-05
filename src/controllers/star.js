// remember to bring in planet model too!
const { Star, Planet, Galaxy } = require("../models");

/* my notes
relationships to remember:
star > BELONGS TO > galaxy
star > HAS MANY > planets


order of functions:
1. index  (GET all)
2. show (GET by ID)
3. create (POST)
4. edit (PATCH)
5. delete confirmation
6. remove (DELETE)
7. form method

*/

// INDEX localhost:3000/stars
const index = async (req, res) => {
  const stars = await Star.findAll({
    include: Galaxy,
  });
  res.render("stars/index", { stars });
};

// SHOW localhost:3000/stars/ID
const show = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id, {
      include: [Galaxy, Planet],
    });
    if (!star) {
      // handles 404 not found error
      return res.status(404).render("error", {
        error: "Star not found.",
      });
    }
    res.render("stars/show", {
      star,
    });
  } catch (err) {
    // including console logs for debugging
    console.error("Error retrieving star by ID:", err);
    // handle 500 server side error
    res.status(500).render("error", {
      error: "Server error while retrieving star.",
    });
  }
};

// CREATE localhost:3000/stars
const create = async (req, res) => {
  try {
    const { name, size, description, GalaxyId } = req.body;
    const star = await Star.create({ name, size, description, GalaxyId });
    // pass star id to middleware
    req.imageId = star.id;
    // searches for available galaxies
    const galaxy = await Galaxy.findByPk(GalaxyId, { include: Planet });
    if (galaxy && galaxy.Planets && galaxy.Planets.length > 0) {
      // populates w/ planets depending on what galaxy is selected
      const planetIds = galaxy.Planets.map((planet) => planet.id);
      await star.addPlanets(planetIds);
    }
    res.redirect("/stars");
  } catch (err) {
    // including console logs for debugging
    console.error("Error creating star:", err);
    // handle 500 server side error
    res
      .status(500)
      .render("error", { error: "Server error while creating star." });
  }
};

// UPDATE localhost:3000/stars/ID
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, size, description, GalaxyId } = req.body;
    // pass star id to middleware
    req.imageId = id;
    await Star.update({ name, size, description, GalaxyId }, { where: { id } });
    res.redirect("/stars");
  } catch (err) {
    // including console logs for debugging
    console.error("Error updating star:", err);
    // handle 500 server side error
    res.status(500).render("error", {
      error: "Server error while updating star.",
    });
  }
};

// DELETE deletion confirmation localhost:3000/stars/:id/delete
const confirmDelete = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    if (!star) {
      // handle 404 not found error
      return res.status(404).render("error", { error: "Star not found" });
    }
    res.render("stars/confirm_delete", {
      title: "Confirm deletion",
      star,
    });
  } catch (err) {
    // including console logs for debugging
    console.error("Error loading delete confirmation:", err);
    // handle 500 server side error
    res.status(500).render("error", { error: "Server error encounter" });
  }
};

// DELETE localhost:3000/stars/ID
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Star.destroy({
      where: { id },
    });
    res.redirect("/stars");
  } catch (err) {
    // including console logs for debugging
    console.error("Error deleting star:", err);
    // handle 500 server side error
    res.status(500).json({
      error: "Server error while deleting star.",
    });
  }
};

// establish route for ADDING stars + planets association
const addPlanet = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.starId);
    const planet = await Planet.findByPk(req.body.planetId);
    // if star and planet associate
    if (star && planet) {
      await star.addPlanet(planet);
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
const removePlanet = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.starId);
    const planet = await Planet.findByPk(req.body.planetId);
    // if connection is there, remove it
    if (star && planet) {
      await star.removePlanet(planet);
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
const getPlanetsForStar = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.starId, {
      include: Planet,
    });
    // if star isn't found, handle 404 not found error
    if (!star) {
      return res.status(404).json({
        error: "Star not found",
      });
    }
    const planets = await star.getPlanets();
    // handles 200 success
    res.status(200).json(planets);
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
  let star = null;

  if (req.params.id !== undefined) {
    star = await Star.findByPk(req.params.id);
    return res.render("stars/edit", {
      star,
      galaxies,
    });
  }
  res.render("stars/create", {
    star,
    galaxies,
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  remove,
  addPlanet,
  removePlanet,
  getPlanetsForStar,
  confirmDelete,
  form,
};
