const express = require("express");
const router = express.Router();
const controller = require("../../controllers/about/futureLeadersController");
const upload = require("../../middlewares/upload");

router.post("/", upload.any(), controller.createLeader);
router.get("/", controller.getLeaders);
router.put("/:id", upload.any(), controller.updateLeader);
router.delete("/:id", controller.deleteLeader);

module.exports = router;
