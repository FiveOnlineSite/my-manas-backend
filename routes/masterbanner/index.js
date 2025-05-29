const express = require("express");
const router = express.Router();

router.use("/", require("./masterBannerRoutes"));

module.exports = router;
