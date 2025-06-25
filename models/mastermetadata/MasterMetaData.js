const mongoose = require("mongoose");

const masterMetaDataSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    enum: ["home", "about","scope","institutions", "donate", "scholarship", "academy", "contact", "vidhyavanam", "news"]
  },
  metaTitle: {
    type: String,
    required: true
  },
  metaDescription: {
    type: String,
    required: true
  },
  metaKeywords: {
    type: String
  }
});

module.exports = mongoose.model("MasterMetaData", masterMetaDataSchema);
