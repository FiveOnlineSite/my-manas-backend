const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  title: String,
  description: String,
  buttonText: String,
  buttonLink: String,
  images: {
    desktop: { url: String, altText: String },
    mobile: { url: String, altText: String }
  }
});

module.exports = mongoose.model("Banner", bannerSchema);
