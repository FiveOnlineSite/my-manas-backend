const express = require("express");
const router = express.Router();
const controller = require("../../controllers/about/ourInspirationController");
const upload = require("../../middlewares/upload");

router.post("/", upload.any(), controller.createInspiration);
router.get("/", controller.getInspiration);
router.put("/:id", upload.any(), controller.updateInspiration);
router.delete("/:id", controller.deleteInspiration);

module.exports = router;
