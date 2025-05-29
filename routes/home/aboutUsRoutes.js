const express = require("express");
const router = express.Router();
const controller = require("../../controllers/home/aboutUsController");
const upload = require("../../middlewares/upload");
const authMiddleware = require("../../middlewares/authMiddleware");

router.post("/", upload.any(), controller.createAboutUs);
router.get("/", controller.getAllAboutUs);
router.put("/:id", upload.any(), controller.updateAboutUs);
router.delete("/:id", controller.deleteAboutUs);

module.exports = router;
