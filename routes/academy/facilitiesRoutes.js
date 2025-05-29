const express = require("express");
const router = express.Router();
const controller = require("../../controllers/academy/facilitiesController");
const upload = require("../../middlewares/upload");
const authMiddleware = require("../../middlewares/authMiddleware");

router.post(
  "/",
  (req, res, next) => {
    upload.any()(req, res, function (err) {
      if (err) {
        console.error("Multer upload error:", err);
        return res.status(400).json({
          success: false,
          message: "File upload error",
          error: err.message,
        });
      }
      next();
    });
  },
  controller.create
);

router.get("/", controller.getAll);
router.put("/:id", upload.any(), controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
