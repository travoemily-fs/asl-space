const Galaxy = require("../models").Galaxy;

/* my notes
relationships to remember:
galaxy > HAS MANY > stars
*/

// GET localhost:3000/galaxies
const index = async (req, res) => {
  try {
    const galaxies = await Galaxy.findAll();
    // handle 200 success status
    res.status(200).render("galaxies/index", {
      title: "All Galaxies",
      galaxies,
    });
  } catch (err) {
    console.error("Error fetching galaxies", err);
    res.status(500).render("error", { error: "Failed to fetch galaxies" });
  }
};

// GET localhost:3000/galaxies/ID
const show = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (galaxy) {
      // handle 200 success status
      res.status(200).json({
        id: galaxy.id,
        name: galaxy.name,
        size: galaxy.size,
        description: galaxy.description,
      });
    } else {
      // handle 404 not found error
      res.status(404).json({ error: "Galaxy not found" });
    }
  } catch (err) {
    // including console logs for debugging
    console.error("Error fetching galaxy by ID:", err);
    // handle 500 server side error
    res.status(500).json({ error: "Server error while retrieving galaxy" });
  }
};

// POST localhost:3000/galaxies
const create = async (req, res) => {
  try {
    const { name, size, description } = req.body;
    // handle no name or empty entries
    if (!name || name.trim() === "") {
      return res.status(400).json({
        error: "Galaxy name is required.",
      });
    }
    // create new galaxy instance
    const galaxy = await Galaxy.create({ name, size, description });
    // handle 201 successful new instance
    res.status(201).json(galaxy);
  } catch (err) {
    // including console logs for debugging
    console.error("Error creating galaxy:", err);
    // handle 500 server side error
    res.status(500).json({
      error: "Server error while creating galaxy.",
    });
  }
};

// PUT localhost:3000/galaxies/ID
const update = async (req, res) => {
  try {
    const { name, size, description } = req.body;
    const { id } = req.params;
    const [updated] = await Galaxy.update(
      { name, size, description },
      {
        where: { id },
      }
    );
    if (updated) {
      // handle 200 success status
      res.status(200).json({
        message: "Galaxy updated successfully!",
      });
    } else {
      // handle 404 not found error
      res.status(404).json({ error: "Galaxy not found." });
    }
  } catch (err) {
    // including console logs for debugging
    console.error("Error updating galaxy:", err);
    // handle 500 server side error
    res.status(500).json({
      error: "Server error while updating galaxy.",
    });
  }
};

// DELETE localhost:3000/galaxies/ID
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Galaxy.destroy({
      where: { id },
    });
    // handle 200 successful removal of resource
    res.status(200).json({
      deleted,
    });
  } catch (err) {
    // including console logs for debugging
    console.error("Error deleting galaxy:", err);
    // handle 500 server side error
    res.status(500).json({
      error: "Server error while deleting galaxy.",
    });
  }
};

module.exports = { index, show, create, update, remove };
