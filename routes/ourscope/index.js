const express = require("express");
const router = express.Router();

const bannerRoutes = require("./bannerRoutes");
const overviewRoutes = require("./overviewRoutes");
const scholarshipRoutes = require("./scholarshipRoutes");
const institutionsRoutes = require("./institutionsRoutes");

router.use("/banner", bannerRoutes);
router.use("/overview", overviewRoutes);
router.use("/scholarship", scholarshipRoutes);
router.use("/institutions", institutionsRoutes);

module.exports = router;
