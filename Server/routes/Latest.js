const express = require("express");
const router = express.Router();

const {getDashboardData,getDashboardStats} = require("../controllers/latestOfAll");

router.get("/", getDashboardData);
router.get("/stats", getDashboardStats);

module.exports = router;