const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  createCMS,
  getCMS,
  updateCMS,
  deleteImage,
  deleteCMS,
} = require("../controllers/cmsController");

// CREATE
router.post(
  "/",
  upload.array("images", 20),
  createCMS
);

// READ
router.get("/", getCMS);

// UPDATE
router.put(
  "/:id",
  upload.array("images", 20),
  updateCMS
);

// DELETE IMAGE
router.delete("/:id/image/:index", deleteImage);

// DELETE CMS
router.delete("/:id", deleteCMS);

module.exports = router;