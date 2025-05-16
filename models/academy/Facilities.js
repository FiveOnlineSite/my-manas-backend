const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  resources: [{
  file: {
    url: String,
    altText: String,
    type: { type: String, enum: ['image', 'video'] }
  },
  isFeatured: Boolean
}]
});

module.exports = mongoose.model("AcademyFacilities", schema);
