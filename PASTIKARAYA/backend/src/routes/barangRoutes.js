const express = require("express");

const router = express.Router();

const {
  getBarang,
  createBarang,
  updateBarang,
  deleteBarang,
  tambahStok,
} = require("../controllers/barangController");

router.get("/", getBarang);

router.post("/", createBarang);

router.put("/:id", updateBarang);

router.put("/tambah-stok/:id", tambahStok);

router.delete("/:id", deleteBarang);

module.exports = router;