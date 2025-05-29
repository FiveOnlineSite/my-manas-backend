const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  file: {
    url: {
      type: String,
      required: true
    },
    altText: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      enum: ['image', 'video'],
      required: true
    }
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, { _id: false });

const vidhyaFacilitiesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  resources: {
    type: [resourceSchema],
    default: []
  }
});

module.exports = mongoose.model("VidhyaFacilities", vidhyaFacilitiesSchema);
