const express = require("express");
const router = express.Router();
const controller = require("../../controllers/scholarships/applicationcontentController");
const upload = require("../../middlewares/upload");

router.post("/", upload.any(), controller.create);
router.get("/", controller.getAll);
router.put("/:id", upload.any(), controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
