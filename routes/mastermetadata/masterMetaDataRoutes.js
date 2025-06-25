const express = require("express");
const router = express.Router();
const controller = require("../../controllers/mastermetadata/masterMetaDataController");
const upload = require("../../middlewares/upload");

// router.post("/", controller.create);
router.post("/", upload.none(), controller.create);
router.get("/", controller.getAll);
router.get("/:page", controller.getByPage);
// router.put("/:id", controller.update);
router.put("/:id", upload.none(), controller.update); 
router.delete("/:id", controller.remove);

module.exports = router;
