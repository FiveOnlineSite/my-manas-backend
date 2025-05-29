const express = require("express");
const router = express.Router();
const controller = require("../../controllers/ourscope/bannerController");
const upload = require("../../middlewares/upload");
const authMiddleware = require("../../middlewares/authMiddleware");

router.post("/", upload.any(), controller.createBanner);
router.get("/", controller.getBanner);
router.put("/:id", upload.any(), controller.updateBanner);
router.delete("/:id", controller.deleteBanner);

module.exports = router;
