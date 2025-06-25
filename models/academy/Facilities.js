const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  url: { type: String, required: true },
  altText: { type: String, default: "" },
});
const videoWithThumbnailSchema = new mongoose.Schema({
  video: fileSchema,
  thumbnail: fileSchema,
});

const facilitySchema = new mongoose.Schema({
  // title: { type: String, required: true },
  resources: {
    image: fileSchema,
    video: fileSchema,
    featuredImage: fileSchema,
     moreFeaturedImages: [fileSchema], // ✅ new array field
     moreFeaturedVideos: [videoWithThumbnailSchema], // ✅ new array field
  },
   sliderText: { type: String },
  isFeatured: { type: Boolean, default: false },
});

module.exports = mongoose.model("AcademyFacilities", facilitySchema);