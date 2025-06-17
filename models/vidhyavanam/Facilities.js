const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  url: { type: String, required: true },
  altText: { type: String, default: "" },
});

// const resourceSchema = new mongoose.Schema({
//   file: {
//     url: {
//       type: String,
//       required: true
//     },
//     altText: {
//       type: String,
//       default: ""
//     },
//     type: {
//       type: String,
//       enum: ['image', 'video'],
//       required: true
//     }
//   },
//   isFeatured: {
//     type: Boolean,
//     default: false
//   }
// }, { _id: false });

const vidhyaFacilitiesSchema = new mongoose.Schema({
 resources: {
    image: fileSchema,
    video: fileSchema,
    featuredImage: fileSchema,
     moreFeaturedImages: [fileSchema], // ✅ new array field
    moreFeaturedVideos: [fileSchema], // ✅ new array field
  },
  isFeatured: { type: Boolean, default: false },
});

module.exports = mongoose.model("VidhyaFacilities", vidhyaFacilitiesSchema);
