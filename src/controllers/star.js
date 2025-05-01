// remember to bring in planet model too!
const { Star, Planet, Galaxy } = require("../models");

/* my notes
relationships to remember:
star > BELONGS TO > galaxy
star > HAS MANY > planets

  try {
    const stars = await Star.findAll({
      include: Galaxy,
    });
    // handle 200 success status
    res.status(200).render("stars/index", {
      title: "All stars",
      stars,
    });
  } catch (err) {
    console.error("Error fetching stars", err);
    res.status(500).render("error", { error: "Failed to fetch stars" });
  }
*/

// GET localhost:3000/stars
const index = async (req, res) => {
  const stars = await Star.findAll({
    include: Galaxy,
  });
  res.render("stars/index", { stars });
};

// GET localhost:3000/stars/ID
const show = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    if (star) {
      // handle 200 success status
      res.status(200).json({
        id: star.id,
        name: star.name,
        size: star.size,
        description: star.description,
        GalaxyId: star.GalaxyId,
      });
    } else {
      // handle 404 not found error
      res.status(404).json({ error: "Star not found" });
    }
  } catch (err) {
    // including console logs for debugging
    console.error("Error fetching star by ID:", err);
    // handle 500 server side error
    res.status(500).json({ error: "Server error while retrieving star" });
  }
};

// POST localhost:3000/stars
const create = async (req, res) => {
  try {
    const { name, size, description, GalaxyId } = req.body;
    // handle no name or empty entries
    if (!name || name.trim() === "") {
      return res.status(400).json({
        error: "Star name is required.",
      });
    }
    // create new star instance
    const star = await Star.create({ name, size, description, GalaxyId });
    // handle 201 successful new instance
    res.status(201).json(star);
  } catch (err) {
    // including console logs for debugging
    console.error("Error creating star:", err);
    // handle 500 server side error
    res.status(500).json({
      error: "Server error while creating star.",
    });
  }
};

// PUT localhost:3000/stars/ID
const update = async (req, res) => {
  try {
    const { name, size, description, GalaxyId } = req.body;
    const { id } = req.params;
    const [updated] = await Star.update(
      { name, size, description, GalaxyId },
      {
        where: { id },
      }
    );
    if (updated) {
      // handle 200 success status
      res.status(200).json({
        message: "Star updated successfully!",
      });
    } else {
      // handle 404 not found error
      res.status(404).json({ error: "Star not found." });
    }
  } catch (err) {
    // including console logs for debugging
    console.error("Error updating star:", err);
    // handle 500 server side error
    res.status(500).json({
      error: "Server error while updating star.",
    });
  }
};

// GET deletion confirmation localhost:3000/stars/:id/delete
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
    // handle 200 successful removal of resource
    res.status(200).json({
      deleted,
    });
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

// form controller
const form = async (req, res) => {
  // set up associations
  const galaxies = await Galaxy.findAll();
  let star = null;
  if (`undefined` !== typeof req.params.id) {
    star = await Star.findByPk(req.params.id);
    res.render("stars/_form", {
      star,
      galaxies,
    });
  } else {
    res.render("stars/_form");
  }
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
