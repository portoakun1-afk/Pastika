const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  getPengambilan,
  ambilBarang,
} = require("../controllers/pengambilanController");

router.get("/", auth, getPengambilan);
router.post("/", auth, ambilBarang);

module.exports = router;