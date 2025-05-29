const express = require("express");
const router = express.Router();
const controller = require("../../controllers/academy/gradelevelsController");
const upload = require("../../middlewares/upload");
const authMiddleware = require("../../middlewares/authMiddleware");

router.post("/", upload.any(), controller.create);
router.get("/", controller.getAll);
router.put("/:id", upload.any(), controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
