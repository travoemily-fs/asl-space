const { Planet, Galaxy } = require("../models");

/* my notes
relationships to remember:
planet > BELONGS TO MANY > stars
*/

// GET localhost:3000/planets
const index = async (req, res) => {
  try {
    const planets = await Planet.findAll({
      include: Galaxy,
    });
    // handle 200 success status
    res.status(200).render("planets/index", {
      title: "All planets",
      planets,
    });
  } catch (err) {
    console.error("Error fetching planets", err);
    res.status(500).render("error", { error: "Failed to fetch planets" });
  }
};

// GET localhost:3000/planets/ID
const show = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (planet) {
      // handle 200 success status
      res.status(200).json({
        id: planet.id,
        name: planet.name,
        size: planet.size,
        description: planet.description,
        GalaxyId: planet.GalaxyId,
      });
    } else {
      // handle 404 not found error
      res.status(404).json({ error: "Planet not found" });
    }
  } catch (err) {
    // including console logs for debugging
    console.error("Error fetching planet by ID:", err);
    // handle 500 server side error
    res.status(500).json({ error: "Server error while retrieving planet" });
  }
};

// POST localhost:3000/planets
const create = async (req, res) => {
  try {
    const { name, size, description, GalaxyId } = req.body;
    // handle no name or empty entries
    if (!name || name.trim() === "") {
      return res.status(400).json({
        error: "Planet name is required.",
      });
    }
    // create new planet instance
    const planet = await Planet.create({ name, size, description, GalaxyId });
    // handle 201 successful new instance
    res.status(201).json(planet);
  } catch (err) {
    // including console logs for debugging
    console.error("Error creating planet:", err);
    // handle 500 server side error
    res.status(500).json({
      error: "Server error while creating planet.",
    });
  }
};

// PUT localhost:3000/planets/ID
const update = async (req, res) => {
  try {
    const { name, size, description, GalaxyId } = req.body;
    const { id } = req.params;
    const [updated] = await Planet.update(
      { name, size, description, GalaxyId },
      {
        where: { id },
      }
    );
    if (updated) {
      // handle 200 success status
      res.status(200).json({
        message: "Planet updated successfully!",
      });
    } else {
      // handle 404 not found error
      res.status(404).json({ error: "Planet not found." });
    }
  } catch (err) {
    // including console logs for debugging
    console.error("Error updating planet:", err);
    // handle 500 server side error
    res.status(500).json({
      error: "Server error while updating planet.",
    });
  }
};

// DELETE localhost:3000/planets/ID
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Planet.destroy({
      where: { id },
    });
    // handle 200 successful removal of resource
    res.status(200).json({
      deleted,
    });
  } catch (err) {
    // including console logs for debugging
    console.error("Error deleting planet:", err);
    // handle 500 server side error
    res.status(500).json({
      error: "Server error while deleting planet.",
    });
  }
};

module.exports = { index, show, create, update, remove };
