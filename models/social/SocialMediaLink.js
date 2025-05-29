const mongoose = require("mongoose");

const socialMediaLinkSchema = new mongoose.Schema({
  icon: {
    url: String,
    altText: String
  },
  link: String
});

module.exports = mongoose.model("SocialMediaLink", socialMediaLinkSchema);
