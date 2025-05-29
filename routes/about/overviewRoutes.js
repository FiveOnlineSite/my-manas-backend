const express = require("express");
const router = express.Router();
const controller = require("../../controllers/about/overviewController");
const upload = require("../../middlewares/upload");
const authMiddleware = require("../../middlewares/authMiddleware");

router.post("/", upload.any(), controller.createOverview);
router.get("/", controller.getOverview);
router.put("/:id", upload.any(), controller.updateOverview);
router.delete("/:id", controller.deleteOverview);

module.exports = router;
