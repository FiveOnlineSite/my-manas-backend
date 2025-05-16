const express = require('express');
const router = express.Router();
const controller = require('../../controllers/home/missionController');
const upload = require('../../middlewares/upload');

router.post('/', upload.any(), controller.createMission);
router.get('/', controller.getAllMissions);
router.put('/:id', upload.any(), controller.updateMission);
router.delete('/:id', controller.deleteMission);

module.exports = router;
