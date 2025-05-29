const express = require("express");
const router = express.Router();
const controller = require("../../controllers/about/ourvaluesController");
const upload = require("../../middlewares/upload");
const authMiddleware = require("../../middlewares/authMiddleware");

router.post("/", upload.any(), controller.createValues);
router.get("/", controller.getValues);
router.put("/:id", upload.any(), controller.updateValues);
router.delete("/:id", controller.deleteValues);

module.exports = router;
