const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    console.log("File upload request:", req.body, file);
    let resourceType = "image"; // default
    if (file.mimetype.startsWith("video/")) {
      resourceType = "video";
    }
    return {
      folder: "manas_home",
      resource_type: resourceType,
      allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "webm", "mkv"],
      transformation: [{ quality: "auto" }],
    };
  },
});

const upload = multer({ storage });
console.log(upload, "Upload middleware initialized with Cloudinary storage");

module.exports = upload;
