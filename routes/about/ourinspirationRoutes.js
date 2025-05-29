const express = require("express");
const router = express.Router();
const controller = require("../../controllers/about/ourinspirationController");
const upload = require("../../middlewares/upload");
const authMiddleware = require("../../middlewares/authMiddleware");

router.post("/", upload.any(), controller.createInspiration);
router.get("/", controller.getInspiration);
router.put("/:id", upload.any(), controller.updateInspiration);
router.delete("/:id", controller.deleteInspiration);

module.exports = router;
