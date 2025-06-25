const express = require("express");
const router = express.Router();

router.use("/", require("./masterMetaDataRoutes"));

module.exports = router;
