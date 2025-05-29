const express = require("express");
const router = express.Router();

router.use("/", require("./testimonialRoutes"));

module.exports = router;
