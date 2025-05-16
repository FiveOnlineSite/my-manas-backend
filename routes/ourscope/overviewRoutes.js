const express = require("express");
const router = express.Router();
const controller = require("../../controllers/ourscope/overviewController");

router.post("/", controller.createOverview);
router.get("/", controller.getOverview);
router.put("/:id", controller.updateOverview);
router.delete("/:id", controller.deleteOverview);

module.exports = router;
