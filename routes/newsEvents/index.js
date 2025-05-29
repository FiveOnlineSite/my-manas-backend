const express = require("express");
const router = express.Router();

router.use("/", require("./newsEventRoutes"));

module.exports = router;
