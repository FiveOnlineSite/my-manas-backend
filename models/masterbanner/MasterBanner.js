const mongoose = require("mongoose");

const masterBannerSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    enum: ["home", "about", "donate", "scholarship", "academy", "contact", "vidhyavanam", "news"]
  },
  subtitle: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  buttonText: {
    type: String
  },
  buttonLink: {
    type: String
  },
  image: {
    url: {
      type: String,
      required: true
    },
    altText: {
      type: String,
      default: ""
    }
  }
});

module.exports = mongoose.model("MasterBanner", masterBannerSchema);
