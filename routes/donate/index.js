const express = require("express");
const router = express.Router();

router.use("/about-us", require("./aboutusRoutes"));
router.use("/contribution", require("./contributionRoutes"));
router.use("/achievements", require("./achievementsRoutes"));

module.exports = router;
