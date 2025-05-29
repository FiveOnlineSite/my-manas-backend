const express = require("express");
const router = express.Router();

const overviewRoutes = require("./overviewRoutes");
const ourValuesRoutes = require("./ourvaluesRoutes");
const ourInspirationRoutes = require("./ourinspirationRoutes");
const futureLeadersRoutes = require("./futureleadersRoutes");

router.use("/overview", overviewRoutes);
router.use("/our-values", ourValuesRoutes);
router.use("/our-inspiration", ourInspirationRoutes);
router.use("/future-leaders", futureLeadersRoutes);

module.exports = router;
