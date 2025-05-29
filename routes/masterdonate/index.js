const express = require("express");
const router = express.Router();

router.use("/", require("./masterDonateRoutes"));

module.exports = router;
