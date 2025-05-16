const express = require("express");
const router = express.Router();

router.use("/", require("./socialMediaRoutes"));

module.exports = router;
