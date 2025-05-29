const express = require("express");
const router = express.Router();
const controller = require("../../controllers/user/userController");
router.post("/login", controller.login);
router.post("/register", controller.register); // for initial use only

module.exports = router;
