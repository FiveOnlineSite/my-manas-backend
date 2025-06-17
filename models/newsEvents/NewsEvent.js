const mongoose = require("mongoose");

const newsEventSchema = new mongoose.Schema({
  title: String,
  uploadDate: Date,
  type: { type: String, enum: ["news", "event"], default: "news" },
  image: {
    url: String,
    altText: String
  },
  content: String,
  metaTitle: String,
  metaDescription: String
});

module.exports = mongoose.model("NewsEvent", newsEventSchema);
