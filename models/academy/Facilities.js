const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  url: { type: String, required: true },
  altText: { type: String, default: "" },
});

const facilitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  resources: {
    image: fileSchema,
    video: fileSchema,
    featuredImage: fileSchema,
  },
  isFeatured: { type: Boolean, default: false },
});

module.exports = mongoose.model("AcademyFacilities", facilitySchema);
