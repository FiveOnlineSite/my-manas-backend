const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "manas_home",
      allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4"],
      transformation: [{ quality: "auto" }],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
