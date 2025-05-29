const express = require("express");
const router = express.Router();

router.use("/", require("./masterContactRoutes"));

module.exports = router;
