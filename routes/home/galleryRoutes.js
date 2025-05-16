const express = require('express');
const router = express.Router();
const controller = require('../../controllers/home/galleryController');
const upload = require('../../middlewares/upload');

router.post('/', upload.any(), controller.createGalleryItem);
router.get('/', controller.getAllGalleryItems);
router.put('/:id', upload.any(), controller.updateGalleryItem);
router.delete('/:id', controller.deleteGalleryItem);

module.exports = router;
