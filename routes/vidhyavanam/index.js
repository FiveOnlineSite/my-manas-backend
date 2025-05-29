const express = require("express");
const router = express.Router();

router.use("/history", require("./historyRoutes"));
router.use("/leadership-team", require("./leadershipteamRoutes"));
router.use("/achievements", require("./achievementsRoutes"));
router.use("/grade-levels", require("./gradelevelsRoutes"));
router.use("/how-to-apply", require("./howtoapplyRoutes"));
router.use("/facilities", require("./facilitiesRoutes"));
router.use("/contact-info", require("./contactinfoRoutes"));

module.exports = router;
