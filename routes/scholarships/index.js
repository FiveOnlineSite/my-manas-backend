const express = require("express");
const router = express.Router();

router.use("/overview", require("./overviewRoutes"));
router.use("/application-process", require("./applicationprocessRoutes"));
router.use("/application-timeline", require("./applicationtimelineRoutes"));
router.use("/application-content", require("./applicationcontentRoutes"));
router.use("/documents", require("./documentsRoutes"));
router.use("/notification", require("./notificationRoutes"));
router.use("/scholarship-awardees", require("./scholarshipawardeesRoutes"));
router.use("/our-goal", require("./ourgoalRoutes"));

module.exports = router;
