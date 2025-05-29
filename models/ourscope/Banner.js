const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  title: String,
  image: {
    url: String,
    altText: String
  }
});

module.exports = mongoose.model("ScopeBanner", bannerSchema);
