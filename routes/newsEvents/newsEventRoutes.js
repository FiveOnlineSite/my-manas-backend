const express = require("express");
const router = express.Router();
const controller = require("../../controllers/newsEvents/newsEventController");
const upload = require("../../middlewares/upload");

router.post("/", upload.any(), controller.create);
router.get("/", controller.getAll);
// router.get("/:id", controller.getById);
// router.get("/by-title/:title", controller.getByTitle);
router.get("/page/:pageUrl", controller.getByPageUrl);



router.put("/:id", upload.any(), controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
