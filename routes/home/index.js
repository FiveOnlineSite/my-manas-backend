const express = require("express");
const router = express.Router();

const bannerRoutes = require("./bannerRoutes");
const aboutUsRoutes = require("./aboutUsRoutes");
const galleryRoutes = require("./galleryRoutes");
const missionRoutes = require("./missionRoutes");

router.use("/banner", bannerRoutes);
router.use("/aboutus", aboutUsRoutes);
router.use("/gallery", galleryRoutes);
router.use("/mission", missionRoutes);

module.exports = router;
