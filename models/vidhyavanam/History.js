const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
logo: {
  url: String,
  altText: String
},
description: String
});

module.exports = mongoose.model("VidhyaHistory", schema);
