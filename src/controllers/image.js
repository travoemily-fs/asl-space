const { Image } = require("../models");

// reminder: include NEXT because we are passing all of this onto a middleware

// CREATE method
const create = async (req, res, next) => {
  const image = await Image.create(req.body);
  req.imageId = image.id;
  next();
};

// UPDATE method
const update = async (req, res, next) => {
  const image = await Image.update(req.body, {
    where: { id: req.params.id },
  });
  req.imageId = req.params.id;
  next();
};

// placeholders so routing works
const index = (req, res) => res.send("view all images placeholder");
const form = (req, res) => res.send("image form placeholder");
const show = (req, res) => res.send("view one image by id placeholder");
const remove = (req, res) => res.send("delete image placeholder");

module.exports = {
  index,
  form,
  show,
  remove,
};
