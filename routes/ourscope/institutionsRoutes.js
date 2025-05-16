const express = require("express");
const router = express.Router();
const controller = require("../../controllers/ourscope/institutionsController");
const upload = require("../../middlewares/upload");

router.post("/", upload.any(), controller.createInstitution);
router.get("/", controller.getInstitutions);
router.put("/:id", upload.any(), controller.updateInstitution);
router.delete("/:id", controller.deleteInstitution);

module.exports = router;
