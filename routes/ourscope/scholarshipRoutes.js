const express = require("express");
const router = express.Router();
const controller = require("../../controllers/ourscope/scholarshipController");
const upload = require("../../middlewares/upload");
const authMiddleware = require("../../middlewares/authMiddleware");

router.post("/", upload.any(), controller.createScholarship);
router.get("/", controller.getScholarship);
router.put("/:id", upload.any(), controller.updateScholarship);
router.delete("/:id", controller.deleteScholarship);

module.exports = router;
