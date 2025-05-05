const util = require("util");
const path = require("path");
const { Image } = require("../models");

const uploadImage = async (req, res, next) => {
  let uploadPath = `${__dirname}/../public/images/%s%s`;

  // if there's no imageId, exit early
  if (!req.imageId) return next();

  // prevent crash if req.files or image is undefined
  if (!req.files || !req.files.image) return next();

  if (Object.keys(req.files).length > 0) {
    const extension = path.extname(req.files.image.name);
    // remember that we are passing 2 params here, the image Id and extension
    uploadPath = util.format(uploadPath, req.imageId, extension);

    return await req.files.image
      .mv(uploadPath)
      .then(async () => {
        await Image.update(
          { extension },
          { where: { id: Number(req.imageId) } }
        );
        // pass to middleware
        next();
      })
      .catch((err) => {
        // including console logs for debugging
        console.error("Error moving file:", err);
        // handle 500 server side error
        res.status(500).render("error", { error: "Upload failed." });
      });
  } else {
    next();
  }
};

module.exports = { uploadImage };
