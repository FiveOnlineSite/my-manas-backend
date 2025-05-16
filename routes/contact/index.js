const express = require("express");
const router = express.Router();

router.use("/page", require("./contactPageRoutes"));

module.exports = router;
