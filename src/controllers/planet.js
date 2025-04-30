const { Planet, Galaxy, Star } = require("../models");

/* my notes
relationships to remember:
planet > BELONGS TO MANY > stars

  try {
    const planets = await Planet.findAll({
      include: [{ model: Galaxy }, { model: Star }],
    });
    // handle 200 success status
    res.status(200).render("planets/index", {
      title: "All planets",
      planets,
    });
  } catch (err) {
    console.error("Error fetching planets", err.message);
    res.status(500).render("error", { error: err.message });
  }
*/

// GET localhost:3000/planets
const index = async (req, res) => {
  res.render('planets.index')
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

// GET deletion confirmation localhost:3000/planets/:id/delete
const confirmDelete = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (!planet) {
      // handle 404 not found error
      return res.status(404).render("error", { error: "Planet not found" });
    }
    res.render("planet/confirm_delete", {
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

// form controller
const form = (req,res) => {
  res.status(200).json(`Galaxy#form(:id)`)
}


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
  form
};
