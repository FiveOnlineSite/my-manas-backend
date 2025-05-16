const express = require('express');
const router = express.Router();
const controller = require('../../controllers/home/bannerController');
const upload = require('../../middlewares/upload');

router.post('/', upload.any(), controller.createBanner);
router.get('/', controller.getAllBanners);
router.put('/:id', upload.any(), controller.updateBanner);
router.delete('/:id', controller.deleteBanner);

module.exports = router;
