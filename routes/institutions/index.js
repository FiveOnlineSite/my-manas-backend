const express = require("express");
const router = express.Router();

router.use("/about-us", require("./aboutusRoutes"));
router.use("/our-model", require("./ourmodelRoutes"));
router.use("/our-institutions", require("./ourinstitutionsRoutes"));

module.exports = router;
