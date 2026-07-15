const express = require("express");

const router = express.Router();

const {
    dashboardAdmin,
} = require("../controllers/dashboardController");

router.get("/", dashboardAdmin);

module.exports = router;