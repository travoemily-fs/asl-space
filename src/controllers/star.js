const Star = require("../models").Star;

/* my notes
relationships to remember:
star > BELONGS TO > galaxy
star > HAS MANY > planets
*/

// GET localhost:3000/stars
const index = async (req, res) => {
  try {
    const stars = await Star.findAll();
    // handle 200 success status
    res.status(200).json(
      stars.map((s) => ({
        id: s.id,
        name: s.name,
      }))
    );
  } catch (err) {
    // including console logs for debugging
    console.error("Error fetching stars:", err);
    // handles 500 server-side error
    res.status(500).json({ error: "Failed to fetch stars" });
  }
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
    const { name } = req.body;
    // handle no name or empty entries
    if (!name || name.trim() === "") {
      return res.status(400).json({
        error: "Star name is required.",
      });
    }
    // create new star instance
    const star = await Star.create({ name });
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
    const { name } = req.body;
    const { id } = req.params;
    const [updated] = await Star.update(
      { name },
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

module.exports = { index, show, create, update, remove };
